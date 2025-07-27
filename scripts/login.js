// Login page functionality
document.addEventListener('DOMContentLoaded', function() {
    initLoginPage();
});

function initLoginPage() {
    const loginForm = document.getElementById('loginForm');
    const passwordToggle = document.getElementById('passwordToggle');
    const passwordInput = document.getElementById('password');
    const walletLoginBtn = document.getElementById('walletLoginBtn');
    
    if (!loginForm) return;
    
    // Initialize
    function init() {
        setupEventListeners();
        setupPasswordToggle();
        setupFormValidation();
        setupWalletLogin();
    }
    
    // Setup event listeners
    function setupEventListeners() {
        loginForm.addEventListener('submit', handleFormSubmit);
        
        // Real-time validation
        const inputs = loginForm.querySelectorAll('input[required]');
        inputs.forEach(input => {
            input.addEventListener('blur', () => validateField(input));
            input.addEventListener('input', () => clearFieldError(input));
        });
    }
    
    // Setup password toggle
    function setupPasswordToggle() {
        if (!passwordToggle || !passwordInput) return;
        
        passwordToggle.addEventListener('click', function() {
            const isPassword = passwordInput.type === 'password';
            const eyeOpen = this.querySelector('.eye-open');
            const eyeClosed = this.querySelector('.eye-closed');
            
            if (isPassword) {
                passwordInput.type = 'text';
                eyeOpen.style.display = 'none';
                eyeClosed.style.display = 'block';
            } else {
                passwordInput.type = 'password';
                eyeOpen.style.display = 'block';
                eyeClosed.style.display = 'none';
            }
        });
    }
    
    // Setup form validation
    function setupFormValidation() {
        // Add validation styling
        const style = document.createElement('style');
        style.textContent = `
            .form-group.error .form-input {
                border-color: #ef4444;
                background: rgba(239, 68, 68, 0.1);
            }
            
            .form-error {
                color: #ef4444;
                font-size: 0.75rem;
                margin-top: 0.25rem;
                display: flex;
                align-items: center;
                gap: 0.25rem;
            }
            
            .form-success {
                color: #22c55e;
                font-size: 0.75rem;
                margin-top: 0.25rem;
                display: flex;
                align-items: center;
                gap: 0.25rem;
            }
        `;
        document.head.appendChild(style);
    }
    
    // Setup wallet login
    function setupWalletLogin() {
        if (!walletLoginBtn) return;
        
        walletLoginBtn.addEventListener('click', handleWalletLogin);
        
        // Check if MetaMask is available
        if (typeof window.ethereum !== 'undefined') {
            walletLoginBtn.innerHTML = `
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Sign in with MetaMask
            `;
        }
    }
    
    // Validate individual field
    function validateField(field) {
        const value = field.value.trim();
        const fieldName = field.name;
        
        // Email validation
        if (fieldName === 'email') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!value) {
                showFieldError(field, 'Email is required');
                return false;
            } else if (!emailRegex.test(value)) {
                showFieldError(field, 'Please enter a valid email address');
                return false;
            }
        }
        
        // Password validation
        if (fieldName === 'password') {
            if (!value) {
                showFieldError(field, 'Password is required');
                return false;
            } else if (value.length < 6) {
                showFieldError(field, 'Password must be at least 6 characters');
                return false;
            }
        }
        
        // Field is valid
        showFieldSuccess(field, '✓');
        return true;
    }
    
    // Show field error
    function showFieldError(field, message) {
        const formGroup = field.closest('.form-group');
        formGroup.classList.add('error');
        
        // Remove existing messages
        const existingMessage = formGroup.querySelector('.form-error, .form-success');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        // Add error message
        const errorDiv = document.createElement('div');
        errorDiv.className = 'form-error';
        errorDiv.innerHTML = `
            <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
            ${message}
        `;
        formGroup.appendChild(errorDiv);
    }
    
    // Show field success
    function showFieldSuccess(field, message) {
        const formGroup = field.closest('.form-group');
        formGroup.classList.remove('error');
        
        // Remove existing messages
        const existingMessage = formGroup.querySelector('.form-error, .form-success');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        // Add success message
        const successDiv = document.createElement('div');
        successDiv.className = 'form-success';
        successDiv.innerHTML = `
            <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            ${message}
        `;
        formGroup.appendChild(successDiv);
    }
    
    // Clear field error
    function clearFieldError(field) {
        const formGroup = field.closest('.form-group');
        formGroup.classList.remove('error');
        
        const errorMessage = formGroup.querySelector('.form-error');
        if (errorMessage) {
            errorMessage.remove();
        }
    }
    
    // Handle form submission
    async function handleFormSubmit(e) {
        e.preventDefault();
        
        const loginBtn = document.getElementById('loginBtn');
        const btnText = loginBtn.querySelector('.btn-text');
        const emailInput = document.getElementById('email');
        const passwordInput = document.getElementById('password');
        
        // Validate fields
        const isEmailValid = validateField(emailInput);
        const isPasswordValid = validateField(passwordInput);
        
        if (!isEmailValid || !isPasswordValid) {
            if (window.AlphaApp && window.AlphaApp.showNotification) {
                window.AlphaApp.showNotification('Please fix the errors in the form', 'error');
            }
            return;
        }
        
        // Show loading state
        loginBtn.disabled = true;
        btnText.textContent = 'Signing In...';
        
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            const formData = new FormData(loginForm);
            const loginData = Object.fromEntries(formData.entries());
            
            console.log('Login data:', loginData);
            
            // Simulate successful login
            if (window.AlphaApp && window.AlphaApp.showNotification) {
                window.AlphaApp.showNotification('Login successful! This is a demo.', 'success');
            } else {
                alert('Login successful! This is a demo.');
            }
            
        } catch (error) {
            console.error('Login failed:', error);
            
            if (window.AlphaApp && window.AlphaApp.showNotification) {
                window.AlphaApp.showNotification('Login failed. Please check your credentials.', 'error');
            }
            
            // Reset button
            loginBtn.disabled = false;
            btnText.textContent = 'Sign In';
        }
    }
    
    // Handle wallet login
    async function handleWalletLogin() {
        if (typeof window.ethereum === 'undefined') {
            window.open('https://metamask.io/download/', '_blank');
            return;
        }
        
        try {
            walletLoginBtn.textContent = 'Connecting...';
            walletLoginBtn.disabled = true;
            
            const accounts = await window.ethereum.request({
                method: 'eth_requestAccounts'
            });
            
            if (accounts.length > 0) {
                // Get wallet signature for authentication
                const message = `Sign this message to authenticate with Alpha: ${Date.now()}`;
                const signature = await window.ethereum.request({
                    method: 'personal_sign',
                    params: [message, accounts[0]]
                });
                
                console.log('Wallet login:', { address: accounts[0], signature });
                
                if (window.AlphaApp && window.AlphaApp.showNotification) {
                    window.AlphaApp.showNotification('Wallet authentication successful! This is a demo.', 'success');
                } else {
                    alert('Wallet authentication successful! This is a demo.');
                }
            }
        } catch (error) {
            console.error('Wallet login failed:', error);
            
            if (window.AlphaApp && window.AlphaApp.showNotification) {
                window.AlphaApp.showNotification('Wallet authentication failed. Please try again.', 'error');
            }
            
            // Reset button
            walletLoginBtn.disabled = false;
            walletLoginBtn.innerHTML = `
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                </svg>
                Sign in with MetaMask
            `;
        }
    }
    
    // Check if user is already logged in (disabled for demo)
    function checkExistingLogin() {
        // Disabled - allow access to login page always
    }

    // Initialize
    init();
}
