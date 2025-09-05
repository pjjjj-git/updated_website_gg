document.addEventListener('DOMContentLoaded', function() {
    // Check if user is already logged in
    checkLoginStatus();
    
    // Add form submission handler
    const loginForm = document.getElementById('loginForm');
    loginForm.addEventListener('submit', handleLogin);
});

function checkLoginStatus() {
    const isLoggedIn = localStorage.getItem('loggedIn');
    if (isLoggedIn === 'true') {
        // Redirect to forum page if already logged in
        window.location.href = '../MainForumPage/mainforum.html';
    }
}

function handleLogin(e) {
    e.preventDefault();
    
    // Get form values
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const messageElement = document.getElementById('formMessage');
    
    // Simple validation
    if (!username || !password) {
        showMessage('Please fill in all fields', 'error');
        return;
    }
    
    // Check credentials (in a real app, this would be a server request)
    if (username === 'admin' && password === '1234') {
        // Save login status
        localStorage.setItem('loggedIn', 'true');
        localStorage.setItem('username', username);
        
        // Show success message
        showMessage('Login successful! Redirecting...', 'success');
        
        // Redirect after a short delay
        setTimeout(() => {
            window.location.href = '../MainForumPage/mainforum.html';
        }, 1500);
    } else {
        showMessage('Invalid credentials. Please try again.', 'error');
    }
}

function showMessage(message, type) {
    const messageElement = document.getElementById('formMessage');
    messageElement.textContent = message;
    messageElement.className = `form-message ${type}`;
    messageElement.style.display = 'block';
    
    // Hide message after 5 seconds
    setTimeout(() => {
        messageElement.style.display = 'none';
    }, 5000);
}