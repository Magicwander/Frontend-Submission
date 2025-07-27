// Animated Menu functionality
document.addEventListener('DOMContentLoaded', function() {
    initAnimatedMenu();
});

function initAnimatedMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const menuToggleSmall = document.getElementById('menuToggleSmall');
    const animatedMenu = document.getElementById('animatedMenu');
    const menuClose = document.getElementById('menuClose');
    const menuBackdrop = animatedMenu?.querySelector('.menu-backdrop');

    if (!menuToggle || !animatedMenu) {
        return;
    }
    
    let isMenuOpen = false;
    
    // Open menu
    function openMenu() {
        if (isMenuOpen) return;

        isMenuOpen = true;
        animatedMenu.classList.add('open');
        document.body.classList.add('menu-open');
        document.body.style.overflow = 'hidden';

        // Focus management for accessibility
        const firstFocusableElement = animatedMenu.querySelector('a, button');
        if (firstFocusableElement) {
            setTimeout(() => firstFocusableElement.focus(), 100);
        }

        // Add escape key listener
        document.addEventListener('keydown', handleEscapeKey);

        // Animate hamburger and menu items
        animateMenuToggle();
        setTimeout(animateMenuItems, 100);
    }

    // Close menu
    function closeMenu() {
        if (!isMenuOpen) return;

        isMenuOpen = false;
        animatedMenu.classList.remove('open');
        document.body.classList.remove('menu-open');
        document.body.style.overflow = '';

        // Remove escape key listener
        document.removeEventListener('keydown', handleEscapeKey);

        // Return focus to menu toggle
        menuToggle.focus();

        // Animate hamburger back
        animateMenuToggle();
    }
    
    // Handle escape key
    function handleEscapeKey(e) {
        if (e.key === 'Escape') {
            closeMenu();
        }
    }
    
    // Toggle menu
    function toggleMenu() {
        if (isMenuOpen) {
            closeMenu();
        } else {
            openMenu();
        }
    }

    // Event listeners - try multiple approaches
    menuToggle.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        toggleMenu();
    });

    // Also try with mousedown as backup
    menuToggle.addEventListener('mousedown', function(e) {
        console.log('Menu toggle mousedown');
        e.preventDefault();
        e.stopPropagation();
    });

    // Also try with touchstart for mobile
    menuToggle.addEventListener('touchstart', function(e) {
        console.log('Menu toggle touchstart');
        e.preventDefault();
        e.stopPropagation();
    });

    if (menuToggleSmall) {
        menuToggleSmall.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            toggleMenu();
        });
    }

    if (menuClose) {
        menuClose.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            closeMenu();
        });
    }
    
    if (menuBackdrop) {
        menuBackdrop.addEventListener('click', closeMenu);
    }
    
    // Close menu when clicking on menu links
    const menuLinks = animatedMenu.querySelectorAll('a[href]');
    menuLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // Don't close if it's an external link or hash link
            const href = link.getAttribute('href');
            if (href.startsWith('http') || href.startsWith('#')) {
                return;
            }
            
            // Add a small delay to allow for visual feedback
            setTimeout(closeMenu, 150);
        });
    });
    
    // Handle focus trap within menu
    function trapFocus(e) {
        if (!isMenuOpen) return;
        
        const focusableElements = animatedMenu.querySelectorAll(
            'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select'
        );
        const firstFocusableElement = focusableElements[0];
        const lastFocusableElement = focusableElements[focusableElements.length - 1];
        
        if (e.key === 'Tab') {
            if (e.shiftKey) {
                // Shift + Tab
                if (document.activeElement === firstFocusableElement) {
                    lastFocusableElement.focus();
                    e.preventDefault();
                }
            } else {
                // Tab
                if (document.activeElement === lastFocusableElement) {
                    firstFocusableElement.focus();
                    e.preventDefault();
                }
            }
        }
    }
    
    document.addEventListener('keydown', trapFocus);
    
    // Handle window resize
    function handleResize() {
        if (window.innerWidth > 768 && isMenuOpen) {
            // Close menu on larger screens if it was opened on mobile
            closeMenu();
        }
    }
    
    window.addEventListener('resize', handleResize);
    
    // Animate menu items on open
    function animateMenuItems() {
        const menuSections = animatedMenu.querySelectorAll('.menu-section');
        const menuAuthLinks = animatedMenu.querySelector('.menu-auth-links');
        const menuFooterLinks = animatedMenu.querySelector('.menu-footer-links');
        const menuSocialLinks = animatedMenu.querySelector('.menu-social-links');
        const menuActionButtons = animatedMenu.querySelector('.menu-action-buttons');
        const menuCloseButton = animatedMenu.querySelector('.menu-close-button');
        
        // Reset animations
        const elementsToAnimate = [
            ...menuSections,
            menuAuthLinks,
            menuFooterLinks,
            menuSocialLinks,
            menuActionButtons,
            menuCloseButton
        ].filter(Boolean);
        
        elementsToAnimate.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
        });
        
        // Animate in sequence when menu opens
        if (isMenuOpen) {
            elementsToAnimate.forEach((element, index) => {
                setTimeout(() => {
                    element.style.transition = 'all 0.6s ease-out';
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0)';
                }, index * 100);
            });
        }
    }
    
    // Enhanced menu toggle animation
    function animateMenuToggle() {
        const hamburgerLines = menuToggle.querySelectorAll('.hamburger-line');
        const hamburgerLinesSmall = menuToggleSmall ? menuToggleSmall.querySelectorAll('.hamburger-line-small') : [];

        if (isMenuOpen) {
            // Transform to X - main hamburger
            hamburgerLines[0].style.transform = 'rotate(45deg) translate(6px, 6px)';
            hamburgerLines[1].style.opacity = '0';
            hamburgerLines[2].style.transform = 'rotate(-45deg) translate(6px, -6px)';

            // Transform to X - small hamburger
            if (hamburgerLinesSmall.length > 0) {
                hamburgerLinesSmall[0].style.transform = 'rotate(45deg) translate(4px, 4px)';
                hamburgerLinesSmall[1].style.opacity = '0';
                hamburgerLinesSmall[2].style.transform = 'rotate(-45deg) translate(4px, -4px)';
            }
        } else {
            // Transform back to hamburger - main
            hamburgerLines[0].style.transform = 'none';
            hamburgerLines[1].style.opacity = '1';
            hamburgerLines[2].style.transform = 'none';

            // Transform back to hamburger - small
            if (hamburgerLinesSmall.length > 0) {
                hamburgerLinesSmall[0].style.transform = 'none';
                hamburgerLinesSmall[1].style.opacity = '1';
                hamburgerLinesSmall[2].style.transform = 'none';
            }
        }
    }
    

    
    // Add hover effects to menu items
    function addHoverEffects() {
        const menuActionButtons = animatedMenu.querySelectorAll('.menu-action-button');
        const menuAuthLinks = animatedMenu.querySelectorAll('.menu-auth-link');
        
        [...menuActionButtons, ...menuAuthLinks].forEach(button => {
            button.addEventListener('mouseenter', function() {
                this.style.transform = 'translateX(5px) scale(1.02)';
            });
            
            button.addEventListener('mouseleave', function() {
                this.style.transform = 'translateX(0) scale(1)';
            });
        });
    }
    
    addHoverEffects();
    
    // Expose menu controls
    window.menu = {
        open: openMenu,
        close: closeMenu,
        toggle: toggleMenu,
        isOpen: () => isMenuOpen
    };
    
    // Add ARIA attributes for accessibility
    menuToggle.setAttribute('aria-label', 'Open navigation menu');
    menuToggle.setAttribute('aria-expanded', 'false');
    animatedMenu.setAttribute('role', 'dialog');
    animatedMenu.setAttribute('aria-modal', 'true');
    animatedMenu.setAttribute('aria-label', 'Navigation menu');
    
    // Update ARIA attributes when menu state changes
    function updateAriaAttributes() {
        menuToggle.setAttribute('aria-expanded', isMenuOpen.toString());
        menuToggle.setAttribute('aria-label', isMenuOpen ? 'Close navigation menu' : 'Open navigation menu');
    }

    // Update the toggle function to include ARIA updates
    const originalToggleMenu = toggleMenu;
    toggleMenu = function() {
        originalToggleMenu();
        updateAriaAttributes();
    };
}
