// Sample marketplace listings data with Philippine prices
const marketplaceListings = [
    {
        id: 1,
        title: "NVIDIA RTX 3080 Ti Gaming",
        category: "gpu",
        condition: "excellent",
        price: 24500,
        originalPrice: 35000,
        brand: "ASUS",
        model: "ROG Strix RTX 3080 Ti",
        seller: {
            name: "TechGamerPH",
            rating: 4.8,
            sales: 47,
            location: "Quezon City",
            joinDate: "2023-01-15"
        },
        images: [
            "https://via.placeholder.com/300x200/3c2fb7/ffffff?text=RTX+3080Ti"
        ],
        description: "Barely used RTX 3080 Ti, purchased 6 months ago. Only used for light gaming on weekends. Includes original box and documentation.",
        features: ["12GB GDDR6X", "Ray Tracing", "DLSS 3.0", "1665 MHz Boost Clock"],
        postedDate: "2023-10-25",
        shippingOptions: ["local", "ship"],
        hasOriginalBox: true,
        hasWarranty: true,
        distance: 12
    },
    {
        id: 2,
        title: "AMD Ryzen 7 7700X Processor",
        category: "cpu",
        condition: "good",
        price: 15600,
        originalPrice: 22000,
        brand: "AMD",
        model: "Ryzen 7 7700X",
        seller: {
            name: "PCBuilder_Pro",
            rating: 5.0,
            sales: 23,
            location: "Makati",
            joinDate: "2022-08-10"
        },
        images: [
            "https://via.placeholder.com/300x200/3c2fb7/ffffff?text=Ryzen+7700X"
        ],
        description: "Used for about 1 year in a gaming build. Never overclocked. Upgraded to 7800X3D. CPU only, no cooler included.",
        features: ["8 Cores / 16 Threads", "4.5GHz Base Clock", "5.4GHz Max Boost", "AM5 Socket"],
        postedDate: "2023-10-24",
        shippingOptions: ["local", "ship"],
        hasOriginalBox: false,
        hasWarranty: false,
        distance: 8
    },
    {
        id: 3,
        title: "Corsair Vengeance RGB Pro 32GB",
        category: "ram",
        condition: "excellent",
        price: 6700,
        originalPrice: 9500,
        brand: "Corsair",
        model: "Vengeance RGB Pro DDR4-3600",
        seller: {
            name: "MemoryMaster",
            rating: 4.9,
            sales: 156,
            location: "Mandaluyong",
            joinDate: "2021-03-20"
        },
        images: [
            "https://via.placeholder.com/300x200/3c2fb7/ffffff?text=DDR4+RAM"
        ],
        description: "32GB kit (2x16GB) DDR4-3600. Perfect condition, RGB still works flawlessly. Upgraded to DDR5 system.",
        features: ["32GB (2x16GB)", "DDR4-3600", "CL18 Timing", "RGB Lighting"],
        postedDate: "2023-10-23",
        shippingOptions: ["local", "ship"],
        hasOriginalBox: true,
        hasWarranty: true,
        distance: 5
    },
    {
        id: 4,
        title: "Samsung 980 Pro 1TB NVMe SSD",
        category: "storage",
        condition: "good",
        price: 4800,
        originalPrice: 7500,
        brand: "Samsung",
        model: "980 Pro 1TB",
        seller: {
            name: "StorageKing",
            rating: 4.7,
            sales: 89,
            location: "Pasig",
            joinDate: "2022-11-05"
        },
        images: [
            "https://via.placeholder.com/300x200/3c2fb7/ffffff?text=NVMe+SSD"
        ],
        description: "Used as secondary drive for 8 months. Health at 98%. Fast PCIe 4.0 speeds.",
        features: ["1TB Capacity", "PCIe 4.0 NVMe", "7,000 MB/s Read", "5-Year Warranty"],
        postedDate: "2023-10-22",
        shippingOptions: ["ship"],
        hasOriginalBox: false,
        hasWarranty: true,
        distance: 15
    },
    {
        id: 5,
        title: "ASUS ROG Strix B550-F Gaming",
        category: "motherboard",
        condition: "excellent",
        price: 7800,
        originalPrice: 11000,
        brand: "ASUS",
        model: "ROG Strix B550-F Gaming",
        seller: {
            name: "MoboExpert",
            rating: 4.8,
            sales: 34,
            location: "Manila",
            joinDate: "2023-05-12"
        },
        images: [
            "https://via.placeholder.com/300x200/3c2fb7/ffffff?text=B550+Motherboard"
        ],
        description: "Like new condition. Used in a build for 3 months before upgrading to X570. All accessories included.",
        features: ["AM4 Socket", "PCIe 4.0", "WiFi 6", "2.5Gb Ethernet"],
        postedDate: "2023-10-21",
        shippingOptions: ["local", "ship"],
        hasOriginalBox: true,
        hasWarranty: true,
        distance: 3
    },
    {
        id: 6,
        title: "Corsair RM750x 750W PSU",
        category: "psu",
        condition: "good",
        price: 5000,
        originalPrice: 7000,
        brand: "Corsair",
        model: "RM750x",
        seller: {
            name: "PowerSupplyGuy",
            rating: 5.0,
            sales: 67,
            location: "Taguig",
            joinDate: "2022-02-28"
        },
        images: [
            "https://via.placeholder.com/300x200/3c2fb7/ffffff?text=PSU+750W"
        ],
        description: "Reliable 80+ Gold PSU. Used for 1.5 years. All modular cables included.",
        features: ["750W 80+ Gold", "Fully Modular", "10 Year Warranty", "Zero RPM Fan Mode"],
        postedDate: "2023-10-20",
        shippingOptions: ["local", "ship"],
        hasOriginalBox: true,
        hasWarranty: true,
        distance: 10
    }
];

// User's watchlist and data
let watchlist = [];
let currentUser = {
    name: "Juan Dela Cruz",
    listings: 0,
    sales: 0,
    rating: 0
};

// DOM Elements
const recentListings = document.getElementById('recentListings');
const sellModal = document.getElementById('sellModal');
const closeSellModal = document.getElementById('closeSellModal');
const cancelSell = document.getElementById('cancelSell');
const sellBtn = document.getElementById('sellBtn');
const sellNowBtn = document.getElementById('sellNowBtn');
const sellItemForm = document.getElementById('sellItemForm');
const watchlistIcon = document.getElementById('watchlistIcon');
const watchlistCount = document.getElementById('watchlistCount');
const usernameDisplay = document.getElementById('usernameDisplay');
const userListings = document.getElementById('userListings');
const userSales = document.getElementById('userSales');
const userRating = document.getElementById('userRating');
const sortBy = document.getElementById('sortBy');
const browseBtn = document.getElementById('browseBtn');
const dashboardBtn = document.getElementById('dashboardBtn');
const searchInput = document.getElementById('searchInput');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    // Display username and user data
    usernameDisplay.textContent = currentUser.name;
    
    // Load watchlist from localStorage if available
    const savedWatchlist = localStorage.getItem('watchlist');
    if (savedWatchlist) {
        watchlist = JSON.parse(savedWatchlist);
        updateWatchlistCount();
    }
    
    // Render initial content
    renderRecentListings();
    
    // Setup event listeners
    setupEventListeners();
});

function setupEventListeners() {
    // Sell buttons
    sellBtn.addEventListener('click', openSellModal);
    sellNowBtn.addEventListener('click', openSellModal);
    
    // Modal buttons
    closeSellModal.addEventListener('click', closeSellModalFunc);
    cancelSell.addEventListener('click', closeSellModalFunc);
    
    // Sell form submission
    sellItemForm.addEventListener('submit', submitListing);
    
    // Watchlist icon
    watchlistIcon.addEventListener('click', function() {
        alert('Watchlist feature coming soon!');
    });
    
    // Sort dropdown
    sortBy.addEventListener('change', function() {
        renderRecentListings();
    });
    
    // Browse button
    browseBtn.addEventListener('click', function() {
        document.querySelector('.shop-deals-section').scrollIntoView({ 
            behavior: 'smooth' 
        });
    });
    
    // Dashboard button
    dashboardBtn.addEventListener('click', function() {
        alert('Dashboard feature coming soon!');
    });
    
    // Search functionality
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            searchListings(this.value.trim());
        }
    });
    
    // Category navigation
    const categoryLinks = document.querySelectorAll('.shop-header-subnav-link, .shop-category-card');
    categoryLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const category = this.getAttribute('data-category');
            filterByCategory(category);
        });
    });
}

function renderRecentListings() {
    recentListings.innerHTML = '';
    
    // Apply sorting
    let sortedListings = [...marketplaceListings];
    const sortValue = sortBy.value;
    
    switch(sortValue) {
        case 'price-low':
            sortedListings.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            sortedListings.sort((a, b) => b.price - a.price);
            break;
        case 'newest':
        default:
            // Already sorted by date (newest first)
            break;
    }
    
    // Render listings
    sortedListings.forEach(listing => {
        const listingElement = createListingElement(listing);
        recentListings.appendChild(listingElement);
    });
}

function createListingElement(listing) {
    const listingCard = document.createElement('div');
    listingCard.className = 'product-card';
    
    // Calculate savings
    const savings = listing.originalPrice ? 
        Math.round(((listing.originalPrice - listing.price) / listing.originalPrice) * 100) : 0;
    
    // Condition badge class
    const conditionClass = `condition-${listing.condition}`;
    
    listingCard.innerHTML = `
        <div class="product-image">
            <img src="${listing.images[0]}" alt="${listing.title}">
        </div>
        <div class="product-info">
            <h3 class="product-title">${listing.title}</h3>
            <div class="product-price">₱${listing.price.toLocaleString('en-PH')}</div>
            <span class="product-condition ${conditionClass}">
                ${listing.condition.charAt(0).toUpperCase() + listing.condition.slice(1)}
            </span>
            <div class="product-location">
                📍 ${listing.seller.location} • ${listing.distance} km away
            </div>
            <div class="product-actions">
                <button class="contact-seller" data-id="${listing.id}">Contact Seller</button>
                <button class="add-to-watchlist ${watchlist.includes(listing.id) ? 'active' : ''}" 
                        data-id="${listing.id}">
                    ${watchlist.includes(listing.id) ? '❤️' : '🤍'}
                </button>
            </div>
        </div>
    `;
    
    // Add event listeners to buttons
    const contactBtn = listingCard.querySelector('.contact-seller');
    const watchlistBtn = listingCard.querySelector('.add-to-watchlist');
    
    contactBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        contactSeller(listing.id);
    });
    
    watchlistBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        toggleWatchlist(listing.id);
    });
    
    // Add click event to the whole card
    listingCard.addEventListener('click', function() {
        viewListingDetails(listing.id);
    });
    
    return listingCard;
}

function toggleWatchlist(listingId) {
    const index = watchlist.indexOf(listingId);
    
    if (index === -1) {
        // Add to watchlist
        watchlist.push(listingId);
    } else {
        // Remove from watchlist
        watchlist.splice(index, 1);
    }
    
    // Save to localStorage
    localStorage.setItem('watchlist', JSON.stringify(watchlist));
    
    // Update UI
    updateWatchlistCount();
    renderRecentListings();
    
    // Show notification
    const message = index === -1 ? 'Added to watchlist' : 'Removed from watchlist';
    alert(message);
}

function updateWatchlistCount() {
    watchlistCount.textContent = watchlist.length;
}

function contactSeller(listingId) {
    const listing = marketplaceListings.find(l => l.id === listingId);
    if (listing) {
        alert(`Contacting ${listing.seller.name} about ${listing.title}`);
    }
}

function viewListingDetails(listingId) {
    const listing = marketplaceListings.find(l => l.id === listingId);
    if (listing) {
        alert(`Viewing details for: ${listing.title}\nPrice: ₱${listing.price.toLocaleString('en-PH')}\nLocation: ${listing.seller.location}`);
    }
}

function openSellModal() {
    sellModal.classList.add('open');
}

function closeSellModalFunc() {
    sellModal.classList.remove('open');
    sellItemForm.reset();
}

function submitListing(e) {
    e.preventDefault();
    
    // Get form data
    const title = document.getElementById('itemTitle').value;
    const category = document.getElementById('itemCategory').value;
    const condition = document.getElementById('itemCondition').value;
    const price = document.getElementById('itemPrice').value;
    const description = document.getElementById('itemDescription').value;
    const location = document.getElementById('location').value;
    
    // Basic validation
    if (!title || !category || !condition || !price || !location) {
        alert('Please fill in all required fields');
        return;
    }
    
    // In a real app, this would send data to a server
    alert('Your listing has been submitted for review!');
    
    // Update user stats
    currentUser.listings++;
    userListings.textContent = currentUser.listings;
    
    // Close modal and reset form
    closeSellModalFunc();
}

function searchListings(searchTerm) {
    if (!searchTerm) {
        renderRecentListings();
        return;
    }
    
    const filteredListings = marketplaceListings.filter(listing => 
        listing.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        listing.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
        listing.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    recentListings.innerHTML = '';
    
    if (filteredListings.length === 0) {
        recentListings.innerHTML = '<div class="no-results">No listings found matching your search.</div>';
        return;
    }
    
    filteredListings.forEach(listing => {
        const listingElement = createListingElement(listing);
        recentListings.appendChild(listingElement);
    });
}

function filterByCategory(category) {
    let filteredListings;
    
    if (category === 'all') {
        filteredListings = [...marketplaceListings];
    } else {
        filteredListings = marketplaceListings.filter(listing => listing.category === category);
    }
    
    recentListings.innerHTML = '';
    
    if (filteredListings.length === 0) {
        recentListings.innerHTML = '<div class="no-results">No listings found in this category.</div>';
        return;
    }
    
    filteredListings.forEach(listing => {
        const listingElement = createListingElement(listing);
        recentListings.appendChild(listingElement);
    });
    
    // Update active state
    document.querySelectorAll('.shop-header-subnav-link').forEach(link => {
        link.classList.remove('active');
    });
    document.querySelector(`[data-category="${category}"]`).classList.add('active');
    
    // Scroll to listings
    document.querySelector('.shop-deals-section').scrollIntoView({ 
        behavior: 'smooth' 
    });
}