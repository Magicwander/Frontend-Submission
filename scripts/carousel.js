// Carousel functionality
document.addEventListener('DOMContentLoaded', function() {
    initCarousel();
});

function initCarousel() {
    const carouselContainer = document.getElementById('carousel');
    if (!carouselContainer) return;
    
    // Carousel data
    const slides = [
        {
            id: 1,
            subtitle: "Connect with the best",
            title: "Elite Web3 Developers",
            description: "Access a curated network of top-tier blockchain developers, smart contract experts, and DeFi specialists ready to bring your vision to life.",
            cta: { text: "Find Talent", link: "projects.html" }
        },
        {
            id: 2,
            subtitle: "Secure & Transparent",
            title: "Smart Contract Escrow",
            description: "Built-in escrow system using smart contracts ensures secure payments and transparent project milestones for both clients and freelancers.",
            cta: { text: "Learn More", link: "register.html" }
        },
        {
            id: 3,
            subtitle: "Global Opportunities",
            title: "Decentralized Marketplace",
            description: "Join a borderless ecosystem where talent meets opportunity. Work on cutting-edge Web3 projects from anywhere in the world.",
            cta: { text: "Get Started", link: "register.html" }
        }
    ];
    
    let currentSlide = 0;
    let isAutoPlaying = true;
    let autoPlayInterval;
    
    // Create carousel HTML
    function createCarouselHTML() {
        const carouselHTML = `
            <div class="carousel-track" id="carouselTrack">
                ${slides.map((slide, index) => `
                    <div class="carousel-slide" data-slide="${index}">
                        <div class="carousel-content">
                            <p class="carousel-subtitle">${slide.subtitle}</p>
                            <h3 class="carousel-title">${slide.title}</h3>
                            <p class="carousel-description">${slide.description}</p>
                            <a href="${slide.cta.link}" class="carousel-cta">
                                ${slide.cta.text}
                                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </a>
                        </div>
                        <div class="carousel-image">
                            <div class="carousel-image-placeholder">
                                <svg width="120" height="120" fill="currentColor" viewBox="0 0 24 24" style="color: rgba(59, 130, 246, 0.3);">
                                    ${getSlideIcon(slide.id)}
                                </svg>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
            
            <div class="carousel-controls">
                ${slides.map((_, index) => `
                    <button class="carousel-dot ${index === 0 ? 'active' : ''}" data-slide="${index}"></button>
                `).join('')}
            </div>
            
            <button class="carousel-nav prev" id="carouselPrev">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                </svg>
            </button>
            
            <button class="carousel-nav next" id="carouselNext">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
            </button>
        `;
        
        carouselContainer.innerHTML = carouselHTML;
    }
    
    // Get icon for each slide
    function getSlideIcon(slideId) {
        switch (slideId) {
            case 1:
                return '<path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>';
            case 2:
                return '<path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>';
            case 3:
                return '<path d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>';
            default:
                return '<path d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>';
        }
    }
    
    // Update carousel position
    function updateCarousel() {
        const track = document.getElementById('carouselTrack');
        const dots = document.querySelectorAll('.carousel-dot');
        
        if (!track) return;
        
        // Update track position
        track.style.transform = `translateX(-${currentSlide * 100}%)`;
        
        // Update dots
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
        
        // Add animation classes to current slide content
        const currentSlideElement = track.children[currentSlide];
        if (currentSlideElement) {
            const content = currentSlideElement.querySelector('.carousel-content');
            const image = currentSlideElement.querySelector('.carousel-image');
            
            // Reset animations
            content.style.animation = 'none';
            image.style.animation = 'none';
            
            // Trigger reflow
            content.offsetHeight;
            image.offsetHeight;
            
            // Apply animations
            content.style.animation = 'fadeInLeft 0.8s ease-out forwards';
            image.style.animation = 'fadeInRight 0.8s ease-out forwards';
        }
    }
    
    // Go to specific slide
    function goToSlide(slideIndex) {
        if (slideIndex < 0) {
            currentSlide = slides.length - 1;
        } else if (slideIndex >= slides.length) {
            currentSlide = 0;
        } else {
            currentSlide = slideIndex;
        }
        updateCarousel();
    }
    
    // Next slide
    function nextSlide() {
        goToSlide(currentSlide + 1);
    }
    
    // Previous slide
    function prevSlide() {
        goToSlide(currentSlide - 1);
    }
    
    // Start auto-play
    function startAutoPlay() {
        if (isAutoPlaying) {
            autoPlayInterval = setInterval(nextSlide, 5000);
        }
    }
    
    // Stop auto-play
    function stopAutoPlay() {
        if (autoPlayInterval) {
            clearInterval(autoPlayInterval);
            autoPlayInterval = null;
        }
    }
    
    // Initialize carousel
    function init() {
        createCarouselHTML();
        updateCarousel();
        
        // Add event listeners
        const prevBtn = document.getElementById('carouselPrev');
        const nextBtn = document.getElementById('carouselNext');
        const dots = document.querySelectorAll('.carousel-dot');
        
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                prevSlide();
                stopAutoPlay();
                setTimeout(startAutoPlay, 1000); // Restart auto-play after 1 second
            });
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                nextSlide();
                stopAutoPlay();
                setTimeout(startAutoPlay, 1000);
            });
        }
        
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                goToSlide(index);
                stopAutoPlay();
                setTimeout(startAutoPlay, 1000);
            });
        });
        
        // Pause auto-play on hover
        carouselContainer.addEventListener('mouseenter', stopAutoPlay);
        carouselContainer.addEventListener('mouseleave', startAutoPlay);
        
        // Handle keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                prevSlide();
                stopAutoPlay();
                setTimeout(startAutoPlay, 1000);
            } else if (e.key === 'ArrowRight') {
                nextSlide();
                stopAutoPlay();
                setTimeout(startAutoPlay, 1000);
            }
        });
        
        // Handle touch/swipe gestures
        let startX = 0;
        let endX = 0;
        
        carouselContainer.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
        }, { passive: true });
        
        carouselContainer.addEventListener('touchend', (e) => {
            endX = e.changedTouches[0].clientX;
            handleSwipe();
        }, { passive: true });
        
        function handleSwipe() {
            const swipeThreshold = 50;
            const diff = startX - endX;
            
            if (Math.abs(diff) > swipeThreshold) {
                if (diff > 0) {
                    nextSlide(); // Swipe left - next slide
                } else {
                    prevSlide(); // Swipe right - previous slide
                }
                stopAutoPlay();
                setTimeout(startAutoPlay, 1000);
            }
        }
        
        // Start auto-play
        startAutoPlay();
        
        // Pause auto-play when page is not visible
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                stopAutoPlay();
            } else if (isAutoPlaying) {
                startAutoPlay();
            }
        });
    }
    
    // Initialize
    init();
    
    // Expose methods for external use
    window.carousel = {
        next: nextSlide,
        prev: prevSlide,
        goTo: goToSlide,
        play: startAutoPlay,
        pause: stopAutoPlay
    };
}
