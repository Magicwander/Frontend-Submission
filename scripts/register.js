// Registration page functionality
document.addEventListener('DOMContentLoaded', function() {
    initRegisterPage();
});

function initRegisterPage() {
    const registerForm = document.getElementById('registerForm');
    const connectWalletBtn = document.getElementById('connectWallet');
    const walletAddressInput = document.getElementById('walletAddress');
    const userTypeSelect = document.getElementById('userType');
    const skillsInput = document.getElementById('skills');
    const experienceSelect = document.getElementById('experience');
    
    if (!registerForm) return;
    
    // Form validation rules
    const validationRules = {
        fullName: {
            required: true,
            minLength: 2,
            pattern: /^[a-zA-Z\s]+$/,
            message: 'Please enter a valid full name'
        },
        email: {
            required: true,
            pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: 'Please enter a valid email address'
        },
        walletAddress: {
            required: true,
            pattern: /^0x[a-fA-F0-9]{40}$/,
            message: 'Please enter a valid Ethereum wallet address'
        },
        userType: {
            required: true,
            message: 'Please select your role'
        },
        terms: {
            required: true,
            message: 'You must agree to the terms and conditions'
        }
    };
    
    // Initialize form
    function init() {
        setupEventListeners();
        setupFormValidation();
        setupWalletConnection();
        setupSkillsInput();
        setupConditionalFields();
    }
    
    // Setup event listeners
    function setupEventListeners() {
        registerForm.addEventListener('submit', handleFormSubmit);
        
        if (connectWalletBtn) {
            connectWalletBtn.addEventListener('click', handleWalletConnect);
        }
        
        if (userTypeSelect) {
            userTypeSelect.addEventListener('change', handleUserTypeChange);
        }
        
        // Real-time validation
        const inputs = registerForm.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', () => validateField(input));
            input.addEventListener('input', () => clearFieldError(input));
        });
    }
    
    // Setup form validation
    function setupFormValidation() {
        // Add validation styling
        const style = document.createElement('style');
        style.textContent = `
            .form-group.error .form-input,
            .form-group.error .form-select,
            .form-group.error .form-textarea {
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
    
    // Setup wallet connection
    function setupWalletConnection() {
        // Always show Connect Wallet
        connectWalletBtn.textContent = 'Connect Wallet';
    }
    
    // Setup skills input with suggestions
    function setupSkillsInput() {
        if (!skillsInput) return;
        
        const commonSkills = [
            'Solidity', 'React', 'Web3.js', 'Node.js', 'JavaScript', 'TypeScript',
            'Python', 'Rust', 'Go', 'Smart Contracts', 'DeFi', 'NFT', 'DAO',
            'Ethereum', 'Polygon', 'Chainlink', 'IPFS', 'The Graph', 'Hardhat',
            'Truffle', 'OpenZeppelin', 'Metamask', 'Wallet Connect', 'UI/UX Design',
            'Figma', 'Adobe Creative Suite', 'Marketing', 'Community Management'
        ];
        
        // Create skills suggestions dropdown
        const suggestionsContainer = document.createElement('div');
        suggestionsContainer.className = 'skills-suggestions';
        suggestionsContainer.style.cssText = `
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: rgba(17, 24, 39, 0.95);
            border: 1px solid rgba(255, 255, 255, 0.2);
            border-radius: 0.5rem;
            backdrop-filter: blur(16px);
            max-height: 200px;
            overflow-y: auto;
            z-index: 10;
            display: none;
        `;
        
        skillsInput.parentElement.style.position = 'relative';
        skillsInput.parentElement.appendChild(suggestionsContainer);
        
        skillsInput.addEventListener('input', function() {
            const value = this.value.toLowerCase();
            const lastSkill = value.split(',').pop().trim();
            
            if (lastSkill.length > 0) {
                const matches = commonSkills.filter(skill => 
                    skill.toLowerCase().includes(lastSkill) &&
                    !value.includes(skill)
                );
                
                if (matches.length > 0) {
                    showSkillsSuggestions(matches, lastSkill);
                } else {
                    hideSkillsSuggestions();
                }
            } else {
                hideSkillsSuggestions();
            }
        });
        
        function showSkillsSuggestions(suggestions, query) {
            suggestionsContainer.innerHTML = suggestions.map(skill => `
                <div class="skill-suggestion" style="
                    padding: 0.75rem;
                    cursor: pointer;
                    transition: background-color 0.2s ease;
                    color: white;
                    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
                " onmouseover="this.style.backgroundColor='rgba(59, 130, 246, 0.2)'"
                   onmouseout="this.style.backgroundColor='transparent'"
                   onclick="selectSkill('${skill}')">
                    ${skill}
                </div>
            `).join('');
            suggestionsContainer.style.display = 'block';
        }
        
        function hideSkillsSuggestions() {
            suggestionsContainer.style.display = 'none';
        }
        
        // Global function for skill selection
        window.selectSkill = function(skill) {
            const currentValue = skillsInput.value;
            const skills = currentValue.split(',').map(s => s.trim());
            skills[skills.length - 1] = skill;
            skillsInput.value = skills.join(', ') + ', ';
            hideSkillsSuggestions();
            skillsInput.focus();
        };
        
        // Hide suggestions when clicking outside
        document.addEventListener('click', function(e) {
            if (!skillsInput.parentElement.contains(e.target)) {
                hideSkillsSuggestions();
            }
        });
    }
    
    // Setup conditional fields
    function setupConditionalFields() {
        handleUserTypeChange(); // Initial setup
    }
    
    // Handle user type change
    function handleUserTypeChange() {
        const userType = userTypeSelect?.value;
        const skillsGroup = skillsInput?.closest('.form-group');
        const experienceGroup = experienceSelect?.closest('.form-group');
        
        if (userType === 'client') {
            // Hide freelancer-specific fields
            if (skillsGroup) skillsGroup.style.display = 'none';
            if (experienceGroup) experienceGroup.style.display = 'none';
        } else {
            // Show freelancer fields
            if (skillsGroup) skillsGroup.style.display = 'flex';
            if (experienceGroup) experienceGroup.style.display = 'flex';
        }
    }
    
    // Handle wallet connection
    async function handleWalletConnect() {
        if (typeof window.ethereum === 'undefined') {
            if (window.AlphaApp && window.AlphaApp.showNotification) {
                window.AlphaApp.showNotification('Please install a Web3 wallet to connect.', 'error');
            }
            return;
        }
        
        try {
            connectWalletBtn.textContent = 'Connecting...';
            connectWalletBtn.disabled = true;
            
            const accounts = await window.ethereum.request({
                method: 'eth_requestAccounts'
            });
            
            if (accounts.length > 0) {
                walletAddressInput.value = accounts[0];
                connectWalletBtn.textContent = 'Connected';
                connectWalletBtn.style.background = 'linear-gradient(90deg, #22c55e, #16a34a)';
                
                // Show success message
                showFieldSuccess(walletAddressInput, 'Wallet connected successfully');
                
                if (window.AlphaApp && window.AlphaApp.showNotification) {
                    window.AlphaApp.showNotification('Wallet connected successfully!', 'success');
                }
            }
        } catch (error) {
            console.error('Wallet connection failed:', error);
            connectWalletBtn.textContent = 'Connect Failed';
            connectWalletBtn.disabled = false;
            
            if (window.AlphaApp && window.AlphaApp.showNotification) {
                window.AlphaApp.showNotification('Failed to connect wallet. Please try again.', 'error');
            }
            
            setTimeout(() => {
                connectWalletBtn.textContent = 'Connect Wallet';
                connectWalletBtn.style.background = '';
            }, 3000);
        }
    }
    
    // Validate individual field
    function validateField(field) {
        const fieldName = field.name;
        const rule = validationRules[fieldName];
        
        if (!rule) return true;
        
        const value = field.type === 'checkbox' ? field.checked : field.value.trim();
        
        // Required validation
        if (rule.required && (!value || value === '')) {
            showFieldError(field, rule.message || `${fieldName} is required`);
            return false;
        }
        
        // Skip other validations if field is empty and not required
        if (!value && !rule.required) {
            clearFieldError(field);
            return true;
        }
        
        // Pattern validation
        if (rule.pattern && !rule.pattern.test(value)) {
            showFieldError(field, rule.message);
            return false;
        }
        
        // Min length validation
        if (rule.minLength && value.length < rule.minLength) {
            showFieldError(field, `Minimum ${rule.minLength} characters required`);
            return false;
        }
        
        // Field is valid
        showFieldSuccess(field, '✓');
        return true;
    }
    
    // Show field error
    function showFieldError(field, message) {
        const formGroup = field.closest('.form-group');
        formGroup.classList.add('error');
        
        // Remove existing error/success messages
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
        
        // Remove existing error/success messages
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
        
        const registerBtn = document.getElementById('registerBtn');
        const btnText = registerBtn.querySelector('.btn-text');
        
        // Validate all fields
        const inputs = registerForm.querySelectorAll('input[required], select[required]');
        let isValid = true;
        
        inputs.forEach(input => {
            if (!validateField(input)) {
                isValid = false;
            }
        });
        
        if (!isValid) {
            if (window.AlphaApp && window.AlphaApp.showNotification) {
                window.AlphaApp.showNotification('Please fix the errors in the form', 'error');
            }
            return;
        }
        
        // Show loading state
        registerBtn.disabled = true;
        btnText.textContent = 'Creating Account...';
        
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Get form data
            const formData = new FormData(registerForm);
            const userData = Object.fromEntries(formData.entries());
            
            // Process skills
            if (userData.skills) {
                userData.skills = userData.skills.split(',').map(skill => skill.trim()).filter(skill => skill);
            }
            
            console.log('Registration data:', userData);
            
            // Show success
            if (window.AlphaApp && window.AlphaApp.showNotification) {
                window.AlphaApp.showNotification('Account created successfully! Welcome to Alpha.', 'success');
            }
            
            // Redirect to dashboard (simulate)
            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 1500);
            
        } catch (error) {
            console.error('Registration failed:', error);
            
            if (window.AlphaApp && window.AlphaApp.showNotification) {
                window.AlphaApp.showNotification('Registration failed. Please try again.', 'error');
            }
            
            // Reset button
            registerBtn.disabled = false;
            btnText.textContent = 'Create Account';
        }
    }
    
    // Initialize
    init();
}
