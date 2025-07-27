// Particles system
document.addEventListener('DOMContentLoaded', function() {
    initParticles();
});

function initParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;
    
    const particleCount = 50;
    const particles = [];
    
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
        return; // Don't create particles if user prefers reduced motion
    }
    
    // Check device performance
    const isLowEndDevice = navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4;
    const adjustedParticleCount = isLowEndDevice ? Math.floor(particleCount / 2) : particleCount;
    
    // Create particles
    function createParticles() {
        for (let i = 0; i < adjustedParticleCount; i++) {
            const particle = createParticle(i);
            particles.push(particle);
            particlesContainer.appendChild(particle.element);
        }
    }
    
    // Create individual particle
    function createParticle(index) {
        const element = document.createElement('div');
        element.className = 'particle';
        
        // Use deterministic positioning to avoid hydration issues
        const seed = index * 17;
        const x = (seed * 37) % 100;
        const y = (seed * 23) % 100;
        const delay = (index * 0.2) % 3;
        const duration = 3 + (index % 3);
        const size = 2 + (index % 3);
        
        // Set initial position and properties
        element.style.left = `${x}%`;
        element.style.top = `${y}%`;
        element.style.width = `${size}px`;
        element.style.height = `${size}px`;
        element.style.animationDelay = `${delay}s`;
        element.style.animationDuration = `${duration}s`;
        
        // Add random color variation
        const colors = ['#60a5fa', '#a78bfa', '#4ade80'];
        const colorIndex = index % colors.length;
        element.style.background = colors[colorIndex];
        
        // Add opacity variation
        const opacity = 0.2 + (index % 5) * 0.1;
        element.style.opacity = opacity;
        
        return {
            element,
            x,
            y,
            vx: (Math.sin(index) * 0.5), // Velocity X
            vy: (Math.cos(index) * 0.5), // Velocity Y
            size,
            originalX: x,
            originalY: y
        };
    }
    
    // Animate particles with mouse interaction
    function animateParticles(mouseX, mouseY) {
        particles.forEach((particle, index) => {
            const rect = particlesContainer.getBoundingClientRect();
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            // Calculate distance from mouse
            const dx = mouseX - centerX;
            const dy = mouseY - centerY;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const maxDistance = 200;
            
            if (distance < maxDistance) {
                // Move particle away from mouse
                const force = (maxDistance - distance) / maxDistance;
                const angle = Math.atan2(dy, dx);
                const pushX = Math.cos(angle) * force * 20;
                const pushY = Math.sin(angle) * force * 20;
                
                particle.element.style.transform = `translate(${pushX}px, ${pushY}px) scale(${1 + force * 0.5})`;
                particle.element.style.opacity = Math.min(1, particle.element.style.opacity * (1 + force));
            } else {
                // Return to original position
                particle.element.style.transform = 'translate(0, 0) scale(1)';
                particle.element.style.opacity = 0.2 + (index % 5) * 0.1;
            }
        });
    }
    
    // Mouse interaction
    let mouseX = 0;
    let mouseY = 0;
    let isMouseMoving = false;
    let mouseTimeout;
    
    function handleMouseMove(e) {
        const rect = particlesContainer.getBoundingClientRect();
        mouseX = e.clientX - rect.left;
        mouseY = e.clientY - rect.top;
        isMouseMoving = true;
        
        // Clear existing timeout
        clearTimeout(mouseTimeout);
        
        // Set timeout to stop mouse interaction
        mouseTimeout = setTimeout(() => {
            isMouseMoving = false;
            resetParticles();
        }, 2000);
        
        // Throttle animation for performance
        if (!particlesContainer.animating) {
            particlesContainer.animating = true;
            requestAnimationFrame(() => {
                if (isMouseMoving) {
                    animateParticles(mouseX, mouseY);
                }
                particlesContainer.animating = false;
            });
        }
    }
    
    // Reset particles to original state
    function resetParticles() {
        particles.forEach((particle, index) => {
            particle.element.style.transform = 'translate(0, 0) scale(1)';
            particle.element.style.opacity = 0.2 + (index % 5) * 0.1;
        });
    }
    
    // Touch interaction for mobile
    function handleTouchMove(e) {
        e.preventDefault();
        const touch = e.touches[0];
        const rect = particlesContainer.getBoundingClientRect();
        mouseX = touch.clientX - rect.left;
        mouseY = touch.clientY - rect.top;
        
        animateParticles(mouseX, mouseY);
    }
    
    function handleTouchEnd() {
        setTimeout(resetParticles, 1000);
    }
    
    // Scroll-based animation
    function handleScroll() {
        const scrollY = window.scrollY;
        const maxScroll = 500;
        const scrollProgress = Math.min(scrollY / maxScroll, 1);
        
        particles.forEach((particle, index) => {
            const element = particle.element;
            const offset = scrollProgress * 50 * (index % 2 === 0 ? 1 : -1);
            
            element.style.transform = `translateY(${offset}px)`;
            element.style.opacity = Math.max(0.1, 0.3 - scrollProgress * 0.2);
        });
    }
    
    // Resize handler
    function handleResize() {
        // Recalculate particle positions on resize
        particles.forEach((particle, index) => {
            const seed = index * 17;
            const x = (seed * 37) % 100;
            const y = (seed * 23) % 100;
            
            particle.element.style.left = `${x}%`;
            particle.element.style.top = `${y}%`;
        });
    }
    
    // Performance monitoring
    function monitorPerformance() {
        let frameCount = 0;
        let lastTime = performance.now();
        
        function checkFPS() {
            frameCount++;
            const currentTime = performance.now();
            
            if (currentTime - lastTime >= 1000) {
                const fps = frameCount;
                frameCount = 0;
                lastTime = currentTime;
                
                // Reduce particles if FPS is too low
                if (fps < 30 && particles.length > 20) {
                    const particlesToRemove = particles.splice(20);
                    particlesToRemove.forEach(particle => {
                        particle.element.remove();
                    });
                }
            }
            
            requestAnimationFrame(checkFPS);
        }
        
        requestAnimationFrame(checkFPS);
    }
    
    // Initialize
    function init() {
        createParticles();
        
        // Add event listeners
        particlesContainer.addEventListener('mousemove', handleMouseMove, { passive: true });
        particlesContainer.addEventListener('touchmove', handleTouchMove, { passive: false });
        particlesContainer.addEventListener('touchend', handleTouchEnd, { passive: true });
        
        // Throttled scroll listener
        let scrollTicking = false;
        window.addEventListener('scroll', () => {
            if (!scrollTicking) {
                requestAnimationFrame(() => {
                    handleScroll();
                    scrollTicking = false;
                });
                scrollTicking = true;
            }
        }, { passive: true });
        
        // Debounced resize listener
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(handleResize, 250);
        });
        
        // Start performance monitoring on non-low-end devices
        if (!isLowEndDevice) {
            monitorPerformance();
        }
        
        // Pause animations when page is not visible
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                particles.forEach(particle => {
                    particle.element.style.animationPlayState = 'paused';
                });
            } else {
                particles.forEach(particle => {
                    particle.element.style.animationPlayState = 'running';
                });
            }
        });
    }
    
    // Initialize particles
    init();
    
    // Expose controls for external use
    window.particles = {
        reset: resetParticles,
        count: () => particles.length,
        destroy: () => {
            particles.forEach(particle => particle.element.remove());
            particles.length = 0;
        }
    };
}
