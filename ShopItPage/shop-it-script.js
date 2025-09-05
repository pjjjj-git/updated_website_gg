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
            userElement.textContent = `Welcome, ${username}`;
        }
    }
    
    // Add to cart functionality
    const addToCartButtons = document.querySelectorAll('.shop-add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productCard = this.closest('.shop-product-card');
            const productName = productCard.querySelector('.shop-product-title').textContent;
            
            // Show added to cart message
            const originalText = this.textContent;
            this.textContent = 'Added to Cart!';
            this.style.backgroundColor = '#4CAF50';
            
            setTimeout(() => {
                this.textContent = originalText;
                this.style.backgroundColor = '';
            }, 1500);
            
            // Add to cart logic would go here
            console.log(`Added ${productName} to cart`);
        });
    });
    
    // Search functionality
    const searchInput = document.querySelector('.shop-search-input');
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                const searchTerm = this.value.trim();
                if (searchTerm) {
                    alert(`Searching for: ${searchTerm}`);
                    // Actual search implementation would go here
                }
            }
        });
    }
});

function logoutUser() {
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("username");
    window.location.href = "../login_page/index.html";
}