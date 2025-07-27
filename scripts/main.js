// Main JavaScript functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initScrollHeader();
    initScrollAnimations();
    initNewsletterForm();
    initSmoothScrolling();
    
    console.log('Alpha - Web3 Talent Marketplace initialized');
});

// Header scroll functionality
function initScrollHeader() {
    const header = document.getElementById('header');
    const fixedNav = document.getElementById('fixedNav');
    let lastScrollY = 0;
    let isHeaderVisible = true;
    
    function handleScroll() {
        const currentScrollY = window.scrollY;
        
        // Hide header when scrolling down, show when scrolling up
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
            if (isHeaderVisible) {
                header.classList.add('hidden');
                fixedNav.classList.add('visible');
                isHeaderVisible = false;
            }
        } else if (currentScrollY < lastScrollY) {
            if (!isHeaderVisible) {
                header.classList.remove('hidden');
                fixedNav.classList.remove('visible');
                isHeaderVisible = true;
            }
        }
        
        lastScrollY = currentScrollY;
    }
    
    // Throttle scroll events for better performance
    let ticking = false;
    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(function() {
                handleScroll();
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });
}

// Scroll-triggered animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements with animation classes
    const animatedElements = document.querySelectorAll('.animate-on-scroll, .animate-on-scroll-left, .animate-on-scroll-right, .animate-on-scroll-scale');
    animatedElements.forEach(el => observer.observe(el));
    
    // Add staggered animations to step cards
    const stepCards = document.querySelectorAll('.step-card');
    stepCards.forEach((card, index) => {
        card.classList.add('animate-on-scroll');
        card.style.animationDelay = `${index * 0.2}s`;
    });
    
    // Add staggered animations to feature items
    const featureItems = document.querySelectorAll('.feature-item');
    featureItems.forEach((item, index) => {
        item.classList.add('animate-on-scroll-left');
        item.style.animationDelay = `${index * 0.1}s`;
    });
    
    // Add animation to stats card
    const statsCard = document.querySelector('.stats-card');
    if (statsCard) {
        statsCard.classList.add('animate-on-scroll-scale');
    }
}

// Newsletter form handling
function initNewsletterForm() {
    const form = document.getElementById('newsletterForm');
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = form.querySelector('input[type="email"]').value;
        const button = form.querySelector('button');
        const originalText = button.textContent;
        
        // Basic email validation
        if (!isValidEmail(email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }
        
        // Show loading state
        button.textContent = 'Subscribing...';
        button.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            showNotification('Thank you for subscribing! Welcome to Alpha.', 'success');
            form.reset();
            button.textContent = originalText;
            button.disabled = false;
        }, 1500);
    });
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <div class="notification-icon">
                ${getNotificationIcon(type)}
            </div>
            <span class="notification-message">${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 2rem;
        right: 2rem;
        z-index: 1000;
        max-width: 400px;
        background: ${type === 'success' ? 'rgba(34, 197, 94, 0.1)' : type === 'error' ? 'rgba(239, 68, 68, 0.1)' : 'rgba(59, 130, 246, 0.1)'};
        border: 1px solid ${type === 'success' ? 'rgba(34, 197, 94, 0.2)' : type === 'error' ? 'rgba(239, 68, 68, 0.2)' : 'rgba(59, 130, 246, 0.2)'};
        border-radius: 0.75rem;
        backdrop-filter: blur(16px);
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    const content = notification.querySelector('.notification-content');
    content.style.cssText = `
        display: flex;
        align-items: center;
        gap: 0.75rem;
        padding: 1rem;
        color: white;
    `;
    
    const icon = notification.querySelector('.notification-icon');
    icon.style.cssText = `
        flex-shrink: 0;
        width: 1.25rem;
        height: 1.25rem;
        color: ${type === 'success' ? '#22c55e' : type === 'error' ? '#ef4444' : '#3b82f6'};
    `;
    
    const message_el = notification.querySelector('.notification-message');
    message_el.style.cssText = `
        flex: 1;
        font-size: 0.875rem;
        font-weight: 500;
    `;
    
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.style.cssText = `
        flex-shrink: 0;
        width: 1.5rem;
        height: 1.5rem;
        background: none;
        border: none;
        color: rgba(255, 255, 255, 0.6);
        cursor: pointer;
        border-radius: 0.25rem;
        transition: color 0.2s ease;
    `;
    
    closeBtn.addEventListener('mouseenter', () => {
        closeBtn.style.color = 'white';
    });
    
    closeBtn.addEventListener('mouseleave', () => {
        closeBtn.style.color = 'rgba(255, 255, 255, 0.6)';
    });
    
    // Add to DOM
    document.body.appendChild(notification);
    
    // Animate in
    requestAnimationFrame(() => {
        notification.style.transform = 'translateX(0)';
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

function getNotificationIcon(type) {
    switch (type) {
        case 'success':
            return '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>';
        case 'error':
            return '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>';
        default:
            return '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>';
    }
}

// Smooth scrolling for anchor links
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Performance optimization: Reduce animations on low-end devices
function optimizeForPerformance() {
    // Check if device prefers reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        document.documentElement.style.setProperty('--transition-fast', '0.01ms');
        document.documentElement.style.setProperty('--transition-normal', '0.01ms');
        document.documentElement.style.setProperty('--transition-slow', '0.01ms');
    }
    
    // Disable complex animations on low-end devices
    if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) {
        const style = document.createElement('style');
        style.textContent = `
            .animate-float,
            .animate-gradient-shift,
            .animate-shimmer {
                animation: none !important;
            }
        `;
        document.head.appendChild(style);
    }
}

// Initialize performance optimizations
optimizeForPerformance();

// Export functions for use in other scripts
window.AlphaApp = {
    showNotification,
    debounce,
    throttle
};
