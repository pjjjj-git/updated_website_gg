// Sample listing data (in a real app, this would come from URL params or API)
// Get listing ID from URL parameters
function getListingIdFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return parseInt(urlParams.get('id')) || 1; // Default to ID 1 if no param
}

// Update the initializePage function to use URL param:
function initializePage() {
    const username = localStorage.getItem('username');
    if (username) {
        document.getElementById('userInitial').textContent = username.charAt(0).toUpperCase();
    }
    
    // Get listing ID from URL
    const listingId = getListingIdFromURL();
    
    // In a real app, you would fetch the listing data by ID
    // For now, we'll use the sample data
    loadListingData();
    setupEventListeners();
    loadSimilarItems();
    loadQuestions();
    checkFavoriteStatus();
}

// Update the back button function:
function setupEventListeners() {
    // Back button - updated to go back to marketplace
    document.getElementById('backBtn').addEventListener('click', () => {
        window.location.href = 'shop-it.html';
    });
    
    // Rest of the existing setupEventListeners code...
}
const sampleListing = {
    id: 1,
    title: "NVIDIA GeForce RTX 3080 Ti Gaming Edition",
    category: "gpu",
    condition: "excellent",
    price: 450.00,
    originalPrice: 800.00,
    brand: "ASUS",
    model: "ROG Strix RTX 3080 Ti OC",
    seller: {
        name: "TechGamer23",
        rating: 4.8,
        sales: 47,
        location: "Austin, TX",
        joinDate: "2023-01-15"
    },
    images: [
        "https://via.placeholder.com/600x400/3c2fb7/ffffff?text=RTX+3080Ti+Main",
        "https://via.placeholder.com/600x400/3c2fb7/ffffff?text=RTX+3080Ti+Side",
        "https://via.placeholder.com/600x400/3c2fb7/ffffff?text=RTX+3080Ti+Ports",
        "https://via.placeholder.com/600x400/3c2fb7/ffffff?text=RTX+3080Ti+Box"
    ],
    description: "This RTX 3080 Ti is in excellent condition and has been barely used. I purchased it 6 months ago for a gaming build but only used it on weekends for light gaming. Never overclocked or used for mining. Runs cool and quiet with the excellent ASUS cooling solution.\n\nReason for selling: Upgraded to RTX 4090 for 4K gaming.\n\nIncludes:\n- Graphics card\n- Original box and documentation\n- All original accessories\n- Original receipt for warranty\n\nThis card can handle any modern game at 1440p with ray tracing enabled. Perfect for someone looking to get into high-end gaming without paying full retail price.",
    features: [
        "12GB GDDR6X Memory",
        "Ray Tracing & DLSS 3.0",
        "1665 MHz Boost Clock",
        "Triple Fan Cooling",
        "RGB Lighting",
        "PCIe 4.0 Ready"
    ],
    postedDate: "2025-01-25",
    shippingOptions: ["local", "ship"],
    hasOriginalBox: true,
    hasWarranty: true,
    distance: 12
};

// Sample similar items
const similarItems = [
    {
        id: 2,
        title: "RTX 3080 Gaming X Trio",
        price: 420.00,
        image: "https://via.placeholder.com/250x150/3c2fb7/ffffff?text=RTX+3080"
    },
    {
        id: 3,
        title: "RTX 3070 Ti Suprim X",
        price: 350.00,
        image: "https://via.placeholder.com/250x150/3c2fb7/ffffff?text=RTX+3070Ti"
    },
    {
        id: 4,
        title: "RTX 4070 Ventus 2X",
        price: 520.00,
        image: "https://via.placeholder.com/250x150/3c2fb7/ffffff?text=RTX+4070"
    }
];

// Sample Q&A data
let questions = [
    {
        id: 1,
        question: "Is this card still under warranty?",
        answer: "Yes, it has about 2.5 years left on the ASUS warranty. I have the original receipt.",
        askedDate: "2025-01-26",
        answered: true
    },
    {
        id: 2,
        question: "What's the power consumption? Will a 650W PSU be enough?",
        answer: "The card draws around 350W under full load. A 650W PSU should be fine if it's a quality unit with good 12V rails.",
        askedDate: "2025-01-25",
        answered: true
    }
];

let isFavorited = false;
let currentImageIndex = 0;

document.addEventListener('DOMContentLoaded', function() {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem('loggedIn');
    if (isLoggedIn !== 'true') {
        window.location.href = '../login_page/index.html';
        return;
    }
    
    // Initialize the page
    initializePage();
});

function initializePage() {
    // Display username
    const username = localStorage.getItem('username');
    if (username) {
        document.getElementById('userInitial').textContent = username.charAt(0).toUpperCase();
    }
    
    // Load listing data
    loadListingData();
    
    // Setup event listeners
    setupEventListeners();
    
    // Load similar items
    loadSimilarItems();
    
    // Load Q&A
    loadQuestions();
    
    // Check if item is favorited
    checkFavoriteStatus();
}

function loadListingData() {
    const listing = sampleListing;
    
    // Set title and condition
    document.getElementById('listingTitle').textContent = listing.title;
    const conditionBadge = document.getElementById('conditionBadge');
    conditionBadge.textContent = listing.condition.charAt(0).toUpperCase() + listing.condition.slice(1);
    conditionBadge.className = `condition-badge condition-${listing.condition}`;
    
    // Set pricing
    document.getElementById('currentPrice').textContent = `${listing.price.toFixed(2)}`;
    
    if (listing.originalPrice) {
        const savings = Math.round(((listing.originalPrice - listing.price) / listing.originalPrice) * 100);
        document.getElementById('originalPrice').textContent = `${listing.originalPrice.toFixed(2)}`;
        document.getElementById('savingsAmount').textContent = `Save ${savings}%`;
    } else {
        document.getElementById('originalPrice').style.display = 'none';
        document.getElementById('savingsAmount').style.display = 'none';
    }
    
    // Set features
    const featuresList = document.getElementById('featuresList');
    featuresList.innerHTML = '';
    listing.features.forEach(feature => {
        const li = document.createElement('li');
        li.textContent = feature;
        featuresList.appendChild(li);
    });
    
    // Set seller information
    document.getElementById('sellerAvatar').textContent = listing.seller.name.charAt(0);
    document.getElementById('sellerName').textContent = listing.seller.name;
    document.getElementById('sellerRating').textContent = `⭐ ${listing.seller.rating}`;
    document.getElementById('ratingText').textContent = `(${listing.seller.sales} reviews)`;
    document.getElementById('sellerLocation').textContent = listing.seller.location;
    document.getElementById('sellerSales').textContent = listing.seller.sales;
    
    const memberSince = new Date(listing.seller.joinDate).toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long' 
    });
    document.getElementById('memberSince').textContent = memberSince;
    
    // Set shipping options
    const shippingContainer = document.getElementById('shippingOptions');
    shippingContainer.innerHTML = '';
    
    if (listing.shippingOptions.includes('local')) {
        const localOption = document.createElement('div');
        localOption.className = 'shipping-option';
        localOption.innerHTML = '<i class="fas fa-map-marker-alt"></i> Local pickup available';
        shippingContainer.appendChild(localOption);
    }
    
    if (listing.shippingOptions.includes('ship')) {
        const shipOption = document.createElement('div');
        shipOption.className = 'shipping-option';
        shipOption.innerHTML = '<i class="fas fa-truck"></i> Seller will ship nationwide';
        shippingContainer.appendChild(shipOption);
    }
    
    // Set location and distance
    document.getElementById('itemLocation').textContent = listing.seller.location;
    document.getElementById('itemDistance').textContent = `(${listing.distance} miles away)`;
    
    // Set specifications
    document.getElementById('itemBrand').textContent = listing.brand;
    document.getElementById('itemModel').textContent = listing.model;
    document.getElementById('itemCondition').textContent = listing.condition.charAt(0).toUpperCase() + listing.condition.slice(1);
    document.getElementById('hasBox').textContent = listing.hasOriginalBox ? 'Yes' : 'No';
    document.getElementById('hasWarranty').textContent = listing.hasWarranty ? 'Yes' : 'No';
    
    const postedDate = new Date(listing.postedDate).toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });
    document.getElementById('postedDate').textContent = postedDate;
    
    // Set description
    document.getElementById('descriptionContent').innerHTML = listing.description.replace(/\n/g, '<br>');
    
    // Load images
    loadImages(listing.images);
    
    // Set modal data
    document.getElementById('currentAskingPrice').textContent = `${listing.price.toFixed(2)}`;
}

function loadImages(images) {
    const mainImage = document.getElementById('mainImage');
    const thumbnailGrid = document.getElementById('thumbnailGrid');
    
    // Set main image
    mainImage.src = images[0];
    mainImage.alt = sampleListing.title;
    
    // Create thumbnails
    thumbnailGrid.innerHTML = '';
    images.forEach((image, index) => {
        const thumbnail = document.createElement('div');
        thumbnail.className = `thumbnail ${index === 0 ? 'active' : ''}`;
        thumbnail.innerHTML = `<img src="${image}" alt="Product image ${index + 1}">`;
        
        thumbnail.addEventListener('click', () => {
            switchImage(index);
        });
        
        thumbnailGrid.appendChild(thumbnail);
    });
}

function switchImage(index) {
    const images = sampleListing.images;
    const mainImage = document.getElementById('mainImage');
    const thumbnails = document.querySelectorAll('.thumbnail');
    
    // Update main image
    mainImage.src = images[index];
    currentImageIndex = index;
    
    // Update active thumbnail
    thumbnails.forEach(thumb => thumb.classList.remove('active'));
    thumbnails[index].classList.add('active');
}

function loadSimilarItems() {
    const container = document.getElementById('similarItems');
    container.innerHTML = '';
    
    similarItems.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'similar-item';
        itemElement.innerHTML = `
            <img src="${item.image}" alt="${item.title}">
            <div class="similar-item-info">
                <div class="similar-item-title">${item.title}</div>
                <div class="similar-item-price">${item.price.toFixed(2)}</div>
            </div>
        `;
        
        itemElement.addEventListener('click', () => {
            // In a real app, this would navigate to the other listing
            alert(`Would navigate to listing: ${item.title}`);
        });
        
        container.appendChild(itemElement);
    });
}

function loadQuestions() {
    const container = document.getElementById('questionsList');
    
    if (questions.length === 0) {
        container.innerHTML = '<div class="no-questions">No questions yet. Be the first to ask!</div>';
        return;
    }
    
    container.innerHTML = '';
    
    questions.forEach(q => {
        const questionElement = document.createElement('div');
        questionElement.className = 'question-item';
        
        const questionDate = new Date(q.askedDate).toLocaleDateString('en-US', { 
            month: 'short', 
            day: 'numeric' 
        });
        
        questionElement.innerHTML = `
            <div class="question">
                <strong>Q:</strong> ${q.question}
                <span class="question-date">${questionDate}</span>
            </div>
            ${q.answered ? `
                <div class="answer">
                    <strong>A:</strong> ${q.answer}
                    <span class="answer-by">- ${sampleListing.seller.name}</span>
                </div>
            ` : `
                <div class="pending-answer">Answer pending...</div>
            `}
        `;
        
        container.appendChild(questionElement);
    });
}

function checkFavoriteStatus() {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    isFavorited = favorites.includes(sampleListing.id);
    updateFavoriteButton();
}

function updateFavoriteButton() {
    const favoriteBtn = document.getElementById('favoriteBtn');
    const icon = favoriteBtn.querySelector('i');
    
    if (isFavorited) {
        icon.className = 'fas fa-heart';
        favoriteBtn.classList.add('active');
    } else {
        icon.className = 'far fa-heart';
        favoriteBtn.classList.remove('active');
    }
}

function toggleFavorite() {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    
    if (isFavorited) {
        const index = favorites.indexOf(sampleListing.id);
        if (index > -1) favorites.splice(index, 1);
    } else {
        favorites.push(sampleListing.id);
    }
    
    localStorage.setItem('favorites', JSON.stringify(favorites));
    isFavorited = !isFavorited;
    updateFavoriteButton();
}

function setupEventListeners() {
    // Back button
    document.getElementById('backBtn').addEventListener('click', () => {
        window.history.back();
    });
    
    // Favorite button
    document.getElementById('favoriteBtn').addEventListener('click', toggleFavorite);
    
    // Action buttons
    document.getElementById('contactSellerBtn').addEventListener('click', openContactModal);
    document.getElementById('makeOfferBtn').addEventListener('click', openOfferModal);
    document.getElementById('reportBtn').addEventListener('click', openReportModal);
    document.getElementById('viewSellerProfile').addEventListener('click', viewSellerProfile);
    
    // Ask question
    document.getElementById('askQuestionBtn').addEventListener('click', askQuestion);
    
    // Modal event listeners
    setupModalEventListeners();
}

function setupModalEventListeners() {
    // Contact Modal
    document.getElementById('closeContactModal').addEventListener('click', closeContactModal);
    document.getElementById('cancelContact').addEventListener('click', closeContactModal);
    document.getElementById('contactForm').addEventListener('submit', submitContactForm);
    
    // Offer Modal
    document.getElementById('closeOfferModal').addEventListener('click', closeOfferModal);
    document.getElementById('cancelOffer').addEventListener('click', closeOfferModal);
    document.getElementById('offerForm').addEventListener('submit', submitOfferForm);
    
    // Report Modal
    document.getElementById('closeReportModal').addEventListener('click', closeReportModal);
    document.getElementById('cancelReport').addEventListener('click', closeReportModal);
    document.getElementById('reportForm').addEventListener('submit', submitReportForm);
    
    // Close modals when clicking outside
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeAllModals();
            }
        });
    });
}

function openContactModal() {
    document.getElementById('contactModal').classList.add('open');
}

function closeContactModal() {
    document.getElementById('contactModal').classList.remove('open');
    document.getElementById('contactForm').reset();
}

function openOfferModal() {
    document.getElementById('offerModal').classList.add('open');
}

function closeOfferModal() {
    document.getElementById('offerModal').classList.remove('open');
    document.getElementById('offerForm').reset();
}

function openReportModal() {
    document.getElementById('reportModal').classList.add('open');
}

function closeReportModal() {
    document.getElementById('reportModal').classList.remove('open');
    document.getElementById('reportForm').reset();
}

function closeAllModals() {
    document.querySelectorAll('.modal').forEach(modal => {
        modal.classList.remove('open');
    });
}

function submitContactForm(e) {
    e.preventDefault();
    
    const message = document.getElementById('contactMessage').value;
    const phone = document.getElementById('contactPhone').value;
    const shareEmail = document.getElementById('shareEmail').checked;
    
    // In a real app, this would send the message to the seller
    alert(`Message sent to ${sampleListing.seller.name}!\n\nYour message: "${message}"\n\nThey will contact you soon.`);
    
    closeContactModal();
}

function submitOfferForm(e) {
    e.preventDefault();
    
    const offerAmount = parseFloat(document.getElementById('offerAmount').value);
    const message = document.getElementById('offerMessage').value;
    const currentPrice = sampleListing.price;
    
    if (offerAmount >= currentPrice) {
        alert('Your offer should be less than the asking price. Consider contacting the seller directly if you want to pay full price.');
        return;
    }
    
    const percentageOffer = ((offerAmount / currentPrice) * 100).toFixed(0);
    
    // In a real app, this would send the offer to the seller
    alert(`Offer sent to ${sampleListing.seller.name}!\n\nYour offer: ${offerAmount.toFixed(2)} (${percentageOffer}% of asking price)\n\nThey will review and respond to your offer.`);
    
    closeOfferModal();
}

function submitReportForm(e) {
    e.preventDefault();
    
    const reason = document.querySelector('input[name="reportReason"]:checked');
    const details = document.getElementById('reportDetails').value;
    
    if (!reason) {
        alert('Please select a reason for reporting.');
        return;
    }
    
    // In a real app, this would submit the report to admins
    alert('Thank you for your report. Our team will review this listing and take appropriate action if needed.');
    
    closeReportModal();
}

function askQuestion() {
    const questionInput = document.getElementById('questionInput');
    const question = questionInput.value.trim();
    
    if (!question) {
        alert('Please enter a question.');
        return;
    }
    
    // Add question to the list
    const newQuestion = {
        id: questions.length + 1,
        question: question,
        answer: null,
        askedDate: new Date().toISOString().split('T')[0],
        answered: false
    };
    
    questions.push(newQuestion);
    questionInput.value = '';
    
    // Reload questions
    loadQuestions();
    
    alert(`Question sent to ${sampleListing.seller.name}! They will be notified and can answer your question.`);
}

function viewSellerProfile() {
    // In a real app, this would navigate to the seller's profile page
    alert(`Would show profile for ${sampleListing.seller.name}\n\nProfile details:\n- Rating: ${sampleListing.seller.rating}⭐\n- Total Sales: ${sampleListing.seller.sales}\n- Location: ${sampleListing.seller.location}\n- Member since: ${new Date(sampleListing.seller.joinDate).toLocaleDateString()}`);
}

// Keyboard navigation for images
document.addEventListener('keydown', function(e) {
    const images = sampleListing.images;
    
    if (e.key === 'ArrowLeft' && currentImageIndex > 0) {
        switchImage(currentImageIndex - 1);
    } else if (e.key === 'ArrowRight' && currentImageIndex < images.length - 1) {
        switchImage(currentImageIndex + 1);
    } else if (e.key === 'Escape') {
        closeAllModals();
    }
});
// Add to both shop-it-script.js and listing-detail-script.js
function navigateToListing(listingId) {
    window.location.href = `listing-detail.html?id=${listingId}`;
}

function navigateToMarketplace() {
    window.location.href = 'shop-it.html';
}

// Add some CSS for the Q&A styling
const qaStyles = `
<style>
.question-item {
    background: #f8fafc;
    border-radius: 8px;
    padding: 1rem;
    margin-bottom: 1rem;
}

.question {
    margin-bottom: 0.5rem;
    color: #1f2937;
}

.question strong {
    color: #2f48d4;
}

.question-date {
    float: right;
    color: #6b7280;
    font-size: 0.85rem;
}

.answer {
    color: #4b5563;
    padding-left: 1rem;
    border-left: 3px solid #10b981;
}

.answer strong {
    color: #10b981;
}

.answer-by {
    font-style: italic;
    color: #6b7280;
    font-size: 0.9rem;
}

.pending-answer {
    color: #f59e0b;
    font-style: italic;
    padding-left: 1rem;
}
</style>
`;

document.head.insertAdjacentHTML('beforeend', qaStyles);