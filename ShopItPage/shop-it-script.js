// Shop-It PC Parts Marketplace JavaScript - Fixed Version
// Main application state
const ShopIt = {
    currentUser: {
        username: 'JohnDoe123',
        listings: 3,
        sales: 7,
        rating: '⭐⭐⭐⭐⭐ 4.8',
        watchlist: []
    },
    products: [],
    filteredProducts: [],
    currentCategory: 'all',
    currentSort: 'newest'
};

// Sample product data - Updated with better images
const sampleProducts = [
    {
        id: 1,
        title: 'NVIDIA GeForce RTX 3080 Ti - Gaming Beast',
        price: 25000,
        condition: 'excellent',
        category: 'gpu',
        location: 'Quezon City, Metro Manila',
        seller: 'TechGuru2023',
        sellerRating: 4.9,
        description: 'Used for light gaming only. Never overclocked. Runs perfectly cool and quiet. Upgraded to RTX 4080 so selling this beauty.',
        image: 'gpu.jpg',
        dateAdded: new Date('2023-12-01'),
        views: 145
    },
    {
        id: 2,
        title: 'AMD Ryzen 7 5800X - 8 Core Beast',
        price: 12500,
        condition: 'good',
        category: 'cpu',
        location: 'Makati, Metro Manila',
        seller: 'PCMaster88',
        sellerRating: 4.7,
        description: 'Excellent performance for gaming and productivity. Used for 1 year. Comes with original packaging and Wraith Prism cooler.',
        image: 'cpu.jpg',
        dateAdded: new Date('2023-11-28'),
        views: 89
    },
    {
        id: 3,
        title: 'Corsair Vengeance RGB Pro 32GB (2x16GB) DDR4',
        price: 6800,
        condition: 'excellent',
        category: 'ram',
        location: 'Cebu City, Cebu',
        seller: 'MemoryKing',
        sellerRating: 4.8,
        description: 'RGB lighting works perfectly. 3200MHz speed, CL16 timing. Great for high-end gaming builds. Used for 8 months only.',
        image: 'ram.jpg',
        dateAdded: new Date('2023-12-02'),
        views: 67
    },
    {
        id: 4,
        title: 'Samsung 980 Pro NVMe SSD 1TB - Lightning Fast',
        price: 4200,
        condition: 'good',
        category: 'storage',
        location: 'Davao City, Davao',
        seller: 'StorageHero',
        sellerRating: 4.6,
        description: 'Perfect condition SSD. Used for 1 year. Health at 96%. No bad sectors. Includes heatsink. Great boot drive.',
        image: 'ssd.jpg',
        dateAdded: new Date('2023-11-30'),
        views: 123
    },
    {
        id: 5,
        title: 'ASUS ROG Strix Z590-E Gaming Motherboard',
        price: 8900,
        condition: 'excellent',
        category: 'motherboard',
        location: 'Iloilo City, Iloilo',
        seller: 'MoboExpert',
        sellerRating: 4.9,
        description: 'All features working perfectly. WiFi 6, multiple M.2 slots, RGB lighting. Perfect for Intel 11th gen CPUs. Like new condition.',
        image: 'mobo.jpg',
        dateAdded: new Date('2023-11-29'),
        views: 98
    },
    {
        id: 6,
        title: 'Seasonic Focus GX-750 80+ Gold Modular PSU',
        price: 4500,
        condition: 'good',
        category: 'psu',
        location: 'Taguig, Metro Manila',
        seller: 'PowerSupplyPro',
        sellerRating: 4.7,
        description: 'Reliable 750W power supply. All modular cables included. 8 years warranty remaining. Perfect for high-end systems.',
        image: 'psu.jpg',
        dateAdded: new Date('2023-12-03'),
        views: 76
    },
    {
        id: 7,
        title: 'NZXT Kraken X63 280mm AIO Liquid Cooler',
        price: 5200,
        condition: 'excellent',
        category: 'cooling',
        location: 'Pasig, Metro Manila',
        seller: 'CoolRunner',
        sellerRating: 4.8,
        description: 'Keeps CPU temps low even under heavy loads. RGB lighting and smart controls. All mounting hardware included for Intel/AMD.',
        image: 'cooling.jpg',
        dateAdded: new Date('2023-12-01'),
        views: 54
    },
    {
        id: 8,
        title: 'AMD Radeon RX 6700 XT - Excellent Gaming Card',
        price: 18000,
        condition: 'good',
        category: 'gpu',
        location: 'Baguio City, Benguet',
        seller: 'GraphicsGuru',
        sellerRating: 4.6,
        description: 'Great for 1440p gaming. Never used for mining. Thermal paste recently replaced. Runs cool and quiet.',
        image: 'gpu2.jpg',
        dateAdded: new Date('2023-11-27'),
        views: 167
    }
];


// Utility functions
const formatPrice = (price) => {
    return new Intl.NumberFormat('en-PH', {
        style: 'currency',
        currency: 'PHP'
    }).format(price).replace('PHP', '₱');
};

const formatDate = (date) => {
    return date.toLocaleDateString('en-PH', { 
        month: 'short', 
        day: 'numeric'
    });
};

const getConditionClass = (condition) => {
    const classes = {
        'excellent': 'condition-excellent',
        'good': 'condition-good',
        'fair': 'condition-fair',
        'poor': 'condition-poor'
    };
    return classes[condition] || 'condition-good';
};

const getConditionText = (condition) => {
    const texts = {
        'excellent': 'Like New',
        'good': 'Good',
        'fair': 'Fair',
        'poor': 'For Parts'
    };
    return texts[condition] || 'Good';
};

// Product rendering functions
const createProductCard = (product) => {
    const isInWatchlist = ShopIt.currentUser.watchlist.includes(product.id);
    
    return `
        <div class="product-card" data-id="${product.id}">
            <div class="product-image">
                <img src="${product.image}" alt="${product.title}" 
                     onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjBmMGYwIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxOCIgZmlsbD0iIzk5OTk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPk5vIEltYWdlPC90ZXh0Pjwvc3ZnPg=='">
            </div>
            <div class="product-info">
                <h3 class="product-title">${product.title}</h3>
                <div class="product-price">${formatPrice(product.price)}</div>
                <span class="product-condition ${getConditionClass(product.condition)}">
                    ${getConditionText(product.condition)}
                </span>
                <div class="product-location">
                    <i class="fas fa-map-marker-alt"></i> ${product.location}
                </div>
                <p class="product-description">${product.description}</p>
                <div class="product-actions">
                    <button class="contact-seller" onclick="contactSeller(${product.id})">
                        Contact Seller
                    </button>
                    <button class="add-to-watchlist ${isInWatchlist ? 'active' : ''}" 
                            onclick="toggleWatchlist(${product.id})">
                        ${isInWatchlist ? '❤️ In Watchlist' : '🤍 Add to Watchlist'}
                    </button>
                </div>
            </div>
        </div>
    `;
};

const renderProducts = (products) => {
    const container = document.getElementById('recentListings');
    
    if (!container) {
        console.error('Products container not found');
        return;
    }
    
    if (products.length === 0) {
        container.innerHTML = '<div class="no-results">No products found matching your criteria.</div>';
        return;
    }
    
    container.innerHTML = products.map(product => createProductCard(product)).join('');
};

// Filter and sort functions
const filterProducts = () => {
    let filtered = [...ShopIt.products];
    
    // Filter by category
    if (ShopIt.currentCategory !== 'all') {
        filtered = filtered.filter(product => product.category === ShopIt.currentCategory);
    }
    
    // Search filter
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        const searchTerm = searchInput.value.toLowerCase().trim();
        if (searchTerm) {
            filtered = filtered.filter(product => 
                product.title.toLowerCase().includes(searchTerm) ||
                product.description.toLowerCase().includes(searchTerm) ||
                product.category.toLowerCase().includes(searchTerm)
            );
        }
    }
    
    // Sort products
    const sortBy = document.getElementById('sortBy');
    if (sortBy) {
        ShopIt.currentSort = sortBy.value;
    }
    
    filtered.sort((a, b) => {
        switch (ShopIt.currentSort) {
            case 'price-low':
                return a.price - b.price;
            case 'price-high':
                return b.price - a.price;
            case 'newest':
            default:
                return new Date(b.dateAdded) - new Date(a.dateAdded);
        }
    });
    
    ShopIt.filteredProducts = filtered;
    renderProducts(filtered);
};

// Watchlist functions
const toggleWatchlist = (productId) => {
    const index = ShopIt.currentUser.watchlist.indexOf(productId);
    
    if (index > -1) {
        ShopIt.currentUser.watchlist.splice(index, 1);
        showNotification('Removed from watchlist', 'info');
    } else {
        ShopIt.currentUser.watchlist.push(productId);
        showNotification('Added to watchlist', 'success');
    }
    
    updateWatchlistCount();
    renderProducts(ShopIt.filteredProducts);
};

const updateWatchlistCount = () => {
    const countElement = document.getElementById('watchlistCount');
    if (countElement) {
        countElement.textContent = ShopIt.currentUser.watchlist.length;
    }
};

// Contact and interaction functions
const contactSeller = (productId) => {
    const product = ShopIt.products.find(p => p.id === productId);
    if (product) {
        showNotification(`Opening chat with ${product.seller}...`, 'info');
        setTimeout(() => {
            alert(`Chat feature coming soon! For now, you can contact ${product.seller} through the forum.`);
        }, 1000);
    }
};

// Modal functions
const openSellModal = () => {
    const sellModal = document.getElementById('sellModal');
    if (sellModal) {
        sellModal.style.display = 'flex';
        sellModal.classList.add('open');
    }
};

const closeSellModal = () => {
    const sellModal = document.getElementById('sellModal');
    if (sellModal) {
        sellModal.style.display = 'none';
        sellModal.classList.remove('open');
    }
    const sellForm = document.getElementById('sellItemForm');
    if (sellForm) {
        sellForm.reset();
    }
};

// Form handling
const handleSellForm = (event) => {
    event.preventDefault();
    
    const titleInput = document.getElementById('itemTitle');
    const priceInput = document.getElementById('itemPrice');
    const conditionInput = document.getElementById('itemCondition');
    const categoryInput = document.getElementById('itemCategory');
    const locationInput = document.getElementById('location');
    const descriptionInput = document.getElementById('itemDescription');
    
    if (!titleInput || !priceInput || !conditionInput || !categoryInput) {
        showNotification('Please fill in all required fields', 'error');
        return;
    }
    
    const newProduct = {
        id: ShopIt.products.length + 1,
        title: titleInput.value,
        price: parseInt(priceInput.value),
        condition: conditionInput.value,
        category: categoryInput.value,
        location: locationInput?.value || 'Metro Manila',
        seller: ShopIt.currentUser.username,
        sellerRating: 4.8,
        description: descriptionInput?.value || 'No description provided.',
        image: './images/placeholder.jpg',
        dateAdded: new Date(),
        views: 0
    };
    
    ShopIt.products.unshift(newProduct);
    ShopIt.currentUser.listings++;
    
    updateUserStats();
    filterProducts();
    closeSellModal();
    showNotification('Your item has been listed successfully!', 'success');
};

// User interface updates
const updateUserStats = () => {
    const usernameDisplay = document.getElementById('usernameDisplay');
    const userListings = document.getElementById('userListings');
    const userSales = document.getElementById('userSales');
    const userRating = document.getElementById('userRating');
    
    if (usernameDisplay) usernameDisplay.textContent = ShopIt.currentUser.username;
    if (userListings) userListings.textContent = ShopIt.currentUser.listings;
    if (userSales) userSales.textContent = ShopIt.currentUser.sales;
    if (userRating) userRating.textContent = ShopIt.currentUser.rating;
};

// Notification system
const showNotification = (message, type = 'info') => {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notif => notif.remove());
    
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 1001;
        font-weight: 500;
        max-width: 350px;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
};

// Navigation functions
const setActiveCategory = (category) => {
    // Update active state in navigation - matching your HTML structure
    document.querySelectorAll('.category-link').forEach(link => {
        link.classList.remove('active');
        if (link.dataset.category === category) {
            link.classList.add('active');
        }
    });
    
    ShopIt.currentCategory = category;
    filterProducts();
};

// Logout function
const logoutUser = () => {
    if (confirm('Are you sure you want to logout?')) {
        showNotification('Logging out...', 'info');
        setTimeout(() => {
            window.location.href = '../MainForumPage/mainforum.html';
        }, 1500);
    }
};

// Search with debounce
let searchTimeout;
const handleSearch = () => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
        filterProducts();
    }, 300);
};

// Initialize application
const initializeApp = () => {
    // Load sample data
    ShopIt.products = [...sampleProducts];
    ShopIt.filteredProducts = [...sampleProducts];
    
    // Update user interface
    updateUserStats();
    updateWatchlistCount();
    renderProducts(ShopIt.filteredProducts);
    
    // Add CSS for notifications
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
        
        .product-description {
            font-size: 0.85rem;
            color: #718096;
            margin: 0.8rem 0;
            line-height: 1.4;
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
            overflow: hidden;
        }
    `;
    document.head.appendChild(style);
};

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
    
    // Search functionality
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', handleSearch);
    }
    
    // Sort functionality
    const sortBy = document.getElementById('sortBy');
    if (sortBy) {
        sortBy.addEventListener('change', (e) => {
            ShopIt.currentSort = e.target.value;
            filterProducts();
        });
    }
    
    // Category navigation - matching your HTML structure
    document.querySelectorAll('.category-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            setActiveCategory(e.target.dataset.category);
        });
    });
    
    // Category cards
    document.querySelectorAll('.shop-category-card').forEach(card => {
        card.addEventListener('click', () => {
            setActiveCategory(card.dataset.category);
            const dealSection = document.querySelector('.shop-deals-section');
            if (dealSection) {
                dealSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
    
    // Modal controls
    const sellNowBtn = document.getElementById('sellNowBtn');
    const closeSellModalBtn = document.getElementById('closeSellModal');
    const cancelSellBtn = document.getElementById('cancelSell');
    
    if (sellNowBtn) {
        sellNowBtn.addEventListener('click', openSellModal);
    }
    
    if (closeSellModalBtn) {
        closeSellModalBtn.addEventListener('click', closeSellModal);
    }
    
    if (cancelSellBtn) {
        cancelSellBtn.addEventListener('click', closeSellModal);
    }
    
    // Form submission
    const sellItemForm = document.getElementById('sellItemForm');
    if (sellItemForm) {
        sellItemForm.addEventListener('submit', handleSellForm);
    }
    
    // Close modal when clicking outside
    const sellModal = document.getElementById('sellModal');
    if (sellModal) {
        sellModal.addEventListener('click', (e) => {
            if (e.target.id === 'sellModal') {
                closeSellModal();
            }
        });
    }
    
    // Dashboard button
    const dashboardBtn = document.getElementById('dashboardBtn');
    if (dashboardBtn) {
        dashboardBtn.addEventListener('click', () => {
            showNotification('Dashboard feature coming soon!', 'info');
        });
    }
    
    // Watchlist icon
    const watchlistIcon = document.getElementById('watchlistIcon');
    if (watchlistIcon) {
        watchlistIcon.addEventListener('click', () => {
            if (ShopIt.currentUser.watchlist.length === 0) {
                showNotification('Your watchlist is empty', 'info');
            } else {
                const watchlistProducts = ShopIt.products.filter(product => 
                    ShopIt.currentUser.watchlist.includes(product.id)
                );
                renderProducts(watchlistProducts);
                showNotification(`Showing ${watchlistProducts.length} items from your watchlist`, 'info');
            }
        });
    }
    
    // Browse button
    const browseBtn = document.getElementById('browseBtn');
    if (browseBtn) {
        browseBtn.addEventListener('click', () => {
            const categoriesSection = document.querySelector('.shop-categories-section');
            if (categoriesSection) {
                categoriesSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
    
    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        // Escape key to close modals
        if (e.key === 'Escape') {
            closeSellModal();
        }
        
        // Ctrl/Cmd + K to focus search
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            const searchInput = document.getElementById('searchInput');
            if (searchInput) {
                searchInput.focus();
            }
        }
    });
});

// Export functions for global use
window.toggleWatchlist = toggleWatchlist;
window.contactSeller = contactSeller;
window.logoutUser = logoutUser;