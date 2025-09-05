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
            
            // Handle different tabs (in a real app, you would load different content)
            if (tab === 'create-ticket') {
                alert('Create new ticket functionality would open here');
                // Reset to all tickets tab after alert
                tabLinks[0].classList.add('active');
                this.classList.remove('active');
            } else {
                console.log(`Switched to ${tab} view`);
            }
        });
    });
    
    // Search functionality
    const searchInput = document.querySelector('.ticket-search-input');
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                const searchTerm = this.value.trim();
                if (searchTerm) {
                    alert(`Searching tickets for: ${searchTerm}`);
                    // Actual search implementation would go here
                }
            }
        });
    }
    
    // View ticket functionality
    const viewButtons = document.querySelectorAll('.ticket-action-btn.view');
    viewButtons.forEach(button => {
        button.addEventListener('click', function() {
            const ticketModal = document.getElementById('ticketModal');
            if (ticketModal) {
                ticketModal.style.display = 'flex';
            }
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
                
                // In a real app, you would update the ticket in the database
                console.log(`Ticket ${ticketId} assigned to ${username}`);
            }
        });
    });
    
    // Close modal functionality
    const closeModal = document.querySelector('.ticket-modal-close');
    if (closeModal) {
        closeModal.addEventListener('click', function() {
            const ticketModal = document.getElementById('ticketModal');
            if (ticketModal) {
                ticketModal.style.display = 'none';
            }
        });
    }
    
    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        const ticketModal = document.getElementById('ticketModal');
        if (e.target === ticketModal) {
            ticketModal.style.display = 'none';
        }
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
            
            // In a real app, you would save the response and update the ticket
            alert('Response posted and ticket updated');
            responseTextarea.value = '';
            
            // Close the modal
            const ticketModal = document.getElementById('ticketModal');
            if (ticketModal) {
                ticketModal.style.display = 'none';
            }
        });
    }
});

function logoutUser() {
    if (confirm('Are you sure you want to logout?')) {
        localStorage.removeItem("loggedIn");
        localStorage.removeItem("username");
        localStorage.removeItem("userRole");
        window.location.href = "../login_page/index.html";
    }
}