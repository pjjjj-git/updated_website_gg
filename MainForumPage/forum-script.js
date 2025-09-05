document.addEventListener('DOMContentLoaded', function() {
    const isLoggedIn = localStorage.getItem('loggedIn');
    if (isLoggedIn !== 'true') {
        window.location.href = '../login_page/index.html';
        return;
    }
    
    // Display username if available
    const username = localStorage.getItem('username');
    if (username) {
        const userElement = document.getElementById('userDisplay');
        if (userElement) {
            userElement.textContent = username.charAt(0).toUpperCase();
            userElement.setAttribute('title', `Logged in as ${username}`);
        }
    }
    
    // Add search functionality
    const searchInput = document.querySelector('.forum-search-input');
    const quickSearchInput = document.querySelector('.quick-search-input');
    
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                const searchTerm = this.value.trim();
                if (searchTerm) {
                    alert(`Searching forums for: ${searchTerm}`);
                    // Actual search implementation would go here
                }
            }
        });
    }
    
    if (quickSearchInput) {
        quickSearchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                const searchTerm = this.value.trim();
                if (searchTerm) {
                    alert(`Quick searching for: ${searchTerm}`);
                    // Actual quick search implementation would go here
                }
            }
        });
    }
});

function logoutUser() {
    if (confirm('Are you sure you want to logout?')) {
        localStorage.removeItem("loggedIn");
        localStorage.removeItem("username");
        window.location.href = "../login_page/index.html";
    }
}