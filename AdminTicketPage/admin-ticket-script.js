document.addEventListener('DOMContentLoaded', function() {
    const isLoggedIn = localStorage.getItem('loggedIn');
    if (isLoggedIn !== 'true') {
        window.location.href = '../login_page/index.html';
        return;
    }
    
    // Check if user is admin (you would implement proper admin validation)
   // const isAdmin = localStorage.getItem('userRole') === 'admin';
   // if (!isAdmin) {
       // alert('Access denied. Admin privileges required.');
      //  window.location.href = '../MainForumPage/mainforum.html';
    //    return;}
    
    // Display username if available
    const username = localStorage.getItem('username');
    if (username) {
        const userElement = document.getElementById('userDisplay');
        if (userElement) {
            userElement.textContent = username.charAt(0).toUpperCase();
            userElement.setAttribute('title', `Logged in as ${username} (Admin)`);
        }
    }
    
    // Tab navigation
    const tabLinks = document.querySelectorAll('.ticket-header-subnav-link');
    tabLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const tab = this.getAttribute('data-tab');
            
            // Remove active class from all tabs
            tabLinks.forEach(l => l.classList.remove('active'));
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Handle different tabs
            if (tab === 'create-ticket') {
                openCreateModal();
                // Reset to all tickets tab after creating
                tabLinks[0].classList.add('active');
                this.classList.remove('active');
            } else {
                filterTicketsByTab(tab);
            }
        });
    });
    
    // Search functionality
    const searchInput = document.querySelector('.ticket-search-input');
    if (searchInput) {
        searchInput.addEventListener('keyup', function(e) {
            const searchTerm = this.value.trim().toLowerCase();
            filterTicketsBySearch(searchTerm);
        });
    }
    
    // Filter functionality
    const filterSelect = document.querySelector('.ticket-filter');
    if (filterSelect) {
        filterSelect.addEventListener('change', function() {
            const filterValue = this.value.toLowerCase();
            if (filterValue !== 'filter by') {
                filterTicketsByCriteria(filterValue);
            }
        });
    }
    
    // Sort functionality
    const sortSelect = document.querySelector('.ticket-sort');
    if (sortSelect) {
        sortSelect.addEventListener('change', function() {
            const sortValue = this.value.toLowerCase();
            if (sortValue !== 'sort by') {
                sortTickets(sortValue);
            }
        });
    }
    
    // View ticket functionality
    const viewButtons = document.querySelectorAll('.ticket-action-btn.view');
    viewButtons.forEach(button => {
        button.addEventListener('click', function() {
            const ticketId = this.closest('tr').querySelector('td:first-child').textContent;
            openTicketModal(ticketId);
        });
    });
    
    // Assign ticket functionality
    const assignButtons = document.querySelectorAll('.ticket-action-btn.assign');
    assignButtons.forEach(button => {
        button.addEventListener('click', function() {
            const ticketRow = this.closest('tr');
            const ticketId = ticketRow.querySelector('td:first-child').textContent;
            const username = localStorage.getItem('username');
            
            if (confirm(`Assign ticket ${ticketId} to yourself?`)) {
                this.textContent = 'Assigned';
                this.disabled = true;
                this.style.backgroundColor = '#9ca3af';
                
                // Update the assignee in the modal if it's open
                const assigneeElement = document.querySelector('.ticket-assignee strong');
                if (assigneeElement) {
                    assigneeElement.nextSibling.textContent = ` ${username}`;
                }
                
                // In a real app, you would update the ticket in the database
                console.log(`Ticket ${ticketId} assigned to ${username}`);
            }
        });
    });
    
    // Close modal functionality
    const closeModalButtons = document.querySelectorAll('.ticket-modal-close');
    closeModalButtons.forEach(button => {
        button.addEventListener('click', function() {
            const modals = document.querySelectorAll('.ticket-modal');
            modals.forEach(modal => {
                modal.style.display = 'none';
            });
        });
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        const modals = document.querySelectorAll('.ticket-modal');
        modals.forEach(modal => {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
    });
    
    // Post response functionality
    const postResponseBtn = document.querySelector('.response-actions .ticket-action-btn.primary');
    if (postResponseBtn) {
        postResponseBtn.addEventListener('click', function() {
            const responseTextarea = document.querySelector('.ticket-response textarea');
            const statusSelect = document.querySelector('.response-actions select');
            
            if (responseTextarea.value.trim() === '') {
                alert('Please enter a response');
                return;
            }
            
            const response = responseTextarea.value;
            const newStatus = statusSelect.value;
            
            // Add the response to the conversation
            const conversation = document.querySelector('.ticket-conversation');
            const newMessage = document.createElement('div');
            newMessage.className = 'ticket-message admin';
            
            const now = new Date();
            const formattedDate = now.toLocaleString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
            
            newMessage.innerHTML = `
                <div class="message-header">
                    <strong>${localStorage.getItem('username') || 'Admin'}</strong> - <span>${formattedDate}</span>
                </div>
                <div class="message-content">
                    <p>${response}</p>
                </div>
            `;
            
            conversation.appendChild(newMessage);
            
            // Update status if changed
            if (newStatus !== 'Update status to...') {
                updateTicketStatus(newStatus);
            }
            
            // Clear the textarea
            responseTextarea.value = '';
            
            // Show success message
            alert('Response posted successfully!');
        });
    }
    
    // Create ticket form submission
    const createTicketForm = document.getElementById('createTicketForm');
    if (createTicketForm) {
        createTicketForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const subject = document.getElementById('ticketSubject').value;
            const requester = document.getElementById('ticketRequester').value;
            const priority = document.getElementById('ticketPriority').value;
            const description = document.getElementById('ticketDescription').value;
            
            // In a real app, you would send this data to the server
            console.log('Creating new ticket:', { subject, requester, priority, description });
            
            // Show success message
            alert(`Ticket created successfully for ${requester}!`);
            
            // Close the modal
            closeCreateModal();
            
            // Reset the form
            this.reset();
            
            // In a real app, you would refresh the ticket list
        });
    }
    
    // Initialize page
    updateStats();
});

function logoutUser() {
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('username');
    window.location.href = '../login_page/index.html';
}

function updateStats() {
    // In a real app, you would fetch these from the server
    const stats = {
        total: document.querySelectorAll('.ticket-table tbody tr').length,
        open: document.querySelectorAll('.ticket-status.open').length,
        pending: document.querySelectorAll('.ticket-status.pending').length,
        resolved: document.querySelectorAll('.ticket-status.resolved').length
    };
    
    document.querySelector('.ticket-stat-card:nth-child(1) .ticket-stat-number').textContent = stats.total;
    document.querySelector('.ticket-stat-card:nth-child(2) .ticket-stat-number').textContent = stats.open;
    document.querySelector('.ticket-stat-card:nth-child(3) .ticket-stat-number').textContent = stats.pending;
    document.querySelector('.ticket-stat-card:nth-child(4) .ticket-stat-number').textContent = stats.resolved;
}

function filterTicketsByTab(tab) {
    const rows = document.querySelectorAll('.ticket-table tbody tr');
    
    rows.forEach(row => {
        const statusElement = row.querySelector('.ticket-status');
        if (!statusElement) return;
        
        const status = statusElement.textContent.toLowerCase();
        
        if (tab === 'all-tickets') {
            row.style.display = '';
        } else if (tab === 'open-tickets' && status === 'open') {
            row.style.display = '';
        } else if (tab === 'pending-tickets' && status === 'pending') {
            row.style.display = '';
        } else if (tab === 'resolved-tickets' && status === 'resolved') {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
    
    updateStats();
}

function filterTicketsBySearch(searchTerm) {
    const rows = document.querySelectorAll('.ticket-table tbody tr');
    
    if (searchTerm === '') {
        rows.forEach(row => row.style.display = '');
        updateStats();
        return;
    }
    
    rows.forEach(row => {
        const subject = row.querySelector('td:nth-child(2)').textContent.toLowerCase();
        const requester = row.querySelector('td:nth-child(3)').textContent.toLowerCase();
        const id = row.querySelector('td:first-child').textContent.toLowerCase();
        
        if (subject.includes(searchTerm) || requester.includes(searchTerm) || id.includes(searchTerm)) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
    
    updateStats();
}

function filterTicketsByCriteria(criteria) {
    const rows = document.querySelectorAll('.ticket-table tbody tr');
    
    rows.forEach(row => {
        if (criteria === 'priority') {
            const priority = row.querySelector('.ticket-priority').textContent.toLowerCase();
            // This is just a demo - in a real app you would have a more sophisticated filter UI
            row.style.display = '';
        } else if (criteria === 'status') {
            const status = row.querySelector('.ticket-status').textContent.toLowerCase();
            // This is just a demo - in a real app you would have a more sophisticated filter UI
            row.style.display = '';
        } else {
            row.style.display = '';
        }
    });
    
    updateStats();
}

function sortTickets(sortBy) {
    const tbody = document.querySelector('.ticket-table tbody');
    const rows = Array.from(tbody.querySelectorAll('tr'));
    
    rows.sort((a, b) => {
        if (sortBy === 'newest') {
            const dateA = new Date(a.querySelector('td:nth-child(6)').textContent);
            const dateB = new Date(b.querySelector('td:nth-child(6)').textContent);
            return dateB - dateA;
        } else if (sortBy === 'oldest') {
            const dateA = new Date(a.querySelector('td:nth-child(6)').textContent);
            const dateB = new Date(b.querySelector('td:nth-child(6)').textContent);
            return dateA - dateB;
        } else if (sortBy === 'priority') {
            const priorityOrder = { 'urgent': 0, 'high': 1, 'medium': 2, 'low': 3 };
            const priorityA = a.querySelector('.ticket-priority').textContent.toLowerCase();
            const priorityB = b.querySelector('.ticket-priority').textContent.toLowerCase();
            return priorityOrder[priorityA] - priorityOrder[priorityB];
        }
        return 0;
    });
    
    // Remove existing rows
    while (tbody.firstChild) {
        tbody.removeChild(tbody.firstChild);
    }
    
    // Add sorted rows
    rows.forEach(row => tbody.appendChild(row));
}

function openTicketModal(ticketId) {
    const modal = document.getElementById('ticketModal');
    if (!modal) return;
    
    // In a real app, you would fetch ticket details from the server
    // For now, we'll just update the ticket ID in the modal
    modal.querySelector('.ticket-modal-header h2').textContent = `Ticket ${ticketId}`;
    
    // Show the modal
    modal.style.display = 'block';
}

function openCreateModal() {
    const modal = document.getElementById('createTicketModal');
    if (!modal) return;
    
    modal.style.display = 'block';
}

function closeCreateModal() {
    const modal = document.getElementById('createTicketModal');
    if (!modal) return;
    
    modal.style.display = 'none';
    
    // Reset the form
    const form = document.getElementById('createTicketForm');
    if (form) form.reset();
}

function updateTicketStatus(newStatus) {
    const statusElement = document.querySelector('.ticket-detail-header .ticket-status');
    if (!statusElement) return;
    
    // Remove existing status classes
    statusElement.classList.remove('open', 'pending', 'resolved');
    
    // Add new status class and update text
    statusElement.classList.add(newStatus.toLowerCase());
    statusElement.textContent = newStatus.charAt(0).toUpperCase() + newStatus.slice(1);
    
    // Also update the status in the main table if the modal is open
    const ticketId = document.querySelector('.ticket-modal-header h2').textContent.replace('Ticket ', '');
    const tableRows = document.querySelectorAll('.ticket-table tbody tr');
    
    tableRows.forEach(row => {
        const rowId = row.querySelector('td:first-child').textContent;
        if (rowId === ticketId) {
            const statusCell = row.querySelector('.ticket-status');
            statusCell.classList.remove('open', 'pending', 'resolved');
            statusCell.classList.add(newStatus.toLowerCase());
            statusCell.textContent = newStatus.charAt(0).toUpperCase() + newStatus.slice(1);
        }
    });
    
    // Update stats
    updateStats();
}