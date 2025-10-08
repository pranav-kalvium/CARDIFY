// FAANG-Level Advanced Interactions System
class AdvancedInteractions {
    constructor() {
        this.scrollProgress = 0;
        this.isScrolling = false;
        this.scrollTimeout = null;
        this.init();
    }

    init() {
        this.createMicroInteractions();
        this.createPageTransitions();
        this.createLoadingStates();
        this.createPerformanceOptimizations();
        this.createAccessibilityFeatures();
        console.log('🚀 AdvancedInteractions initialized');
    }

    createMicroInteractions() {
        this.createHoverEffects();
        this.createClickAnimations();
        this.createScrollAnimations();
        this.createCursorEffects();
        this.createMorphingAnimations();
    }

    createHoverEffects() {
        // Enhanced button hover effects
        const buttons = document.querySelectorAll('.btn, .nav-link, .social-link, .control-btn');
        buttons.forEach(btn => {
            btn.addEventListener('mouseenter', (e) => {
                this.animateButtonHover(e.target);
            });
            
            btn.addEventListener('mouseleave', (e) => {
                this.animateButtonLeave(e.target);
            });
        });

        // Card hover effects
        const cards = document.querySelectorAll('.feature-card, .product-card, .achievement-card');
        cards.forEach(card => {
            card.addEventListener('mouseenter', (e) => {
                this.animateCardHover(e.target);
            });
            
            card.addEventListener('mouseleave', (e) => {
                this.animateCardLeave(e.target);
            });
        });

        // Input field interactions
        const inputs = document.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('focus', (e) => {
                this.animateInputFocus(e.target);
            });
            
            input.addEventListener('blur', (e) => {
                this.animateInputBlur(e.target);
            });
        });
    }

    animateButtonHover(button) {
        // Add magnetic effect
        button.style.transform = 'translateY(-2px) scale(1.02)';
        button.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        
        // Add glow effect for primary buttons
        if (button.classList.contains('btn-primary')) {
            button.style.boxShadow = '0 8px 25px rgba(102, 126, 234, 0.4)';
        }

        // Create ripple background effect
        button.style.background = this.getHoverGradient(button);
    }

    animateButtonLeave(button) {
        button.style.transform = 'translateY(0) scale(1)';
        button.style.boxShadow = '';
        button.style.background = '';
    }

    getHoverGradient(button) {
        if (button.classList.contains('btn-primary')) {
            return 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
        } else if (button.classList.contains('btn-outline')) {
            return 'rgba(255, 255, 255, 0.1)';
        }
        return '';
    }

    animateCardHover(card) {
        const rect = card.getBoundingClientRect();
        const x = rect.left + rect.width / 2;
        const y = rect.top + rect.height / 2;
        
        card.style.transform = `
            translateY(-10px) 
            scale(1.02)
            perspective(1000px) 
            rotateX(${(y - window.innerHeight / 2) * 0.01}deg) 
            rotateY(${(x - window.innerWidth / 2) * 0.01}deg)
        `;
        card.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
        card.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.3), 0 0 80px rgba(102, 126, 234, 0.1)';

        // Add floating animation
        card.style.animation = 'cardFloat 3s ease-in-out infinite';
    }

    animateCardLeave(card) {
        card.style.transform = 'translateY(0) scale(1) rotateX(0) rotateY(0)';
        card.style.boxShadow = '';
        card.style.animation = '';
    }

    animateInputFocus(input) {
        const parent = input.closest('.form-group') || input.closest('.input-with-icon');
        if (parent) {
            parent.style.transform = 'translateY(-2px)';
            parent.style.transition = 'all 0.3s ease';
            
            // Add focus glow
            parent.style.boxShadow = '0 5px 15px rgba(102, 126, 234, 0.2)';
        }
    }

    animateInputBlur(input) {
        const parent = input.closest('.form-group') || input.closest('.input-with-icon');
        if (parent) {
            parent.style.transform = 'translateY(0)';
            parent.style.boxShadow = '';
        }
    }

    createClickAnimations() {
        // Enhanced click effects for all interactive elements
        document.addEventListener('click', (e) => {
            this.createClickRipple(e);
            
            // Add tap animation for buttons
            if (e.target.closest('.btn, .nav-link, .control-btn')) {
                this.animateTap(e.target.closest('.btn, .nav-link, .control-btn'));
            }
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                const activeElement = document.activeElement;
                if (activeElement.closest('.btn, .nav-link, .control-btn')) {
                    this.animateTap(activeElement);
                }
            }
        });
    }

    createClickRipple(event) {
        const target = event.target;
        if (target.closest('.btn, .card, .nav-link')) {
            const element = target.closest('.btn, .card, .nav-link');
            const rect = element.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;
            
            const ripple = document.createElement('span');
            ripple.className = 'advanced-ripple';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            
            element.style.position = 'relative';
            element.style.overflow = 'hidden';
            element.appendChild(ripple);
            
            setTimeout(() => {
                if (ripple.parentNode) {
                    ripple.parentNode.removeChild(ripple);
                }
            }, 600);
        }
    }

    animateTap(element) {
        element.style.transform = 'scale(0.95)';
        element.style.transition = 'transform 0.1s ease';
        
        setTimeout(() => {
            element.style.transform = '';
        }, 100);
    }

    createScrollAnimations() {
        // Smooth scroll with momentum
        this.enableSmoothScroll();
        
        // Parallax effects
        this.createParallaxElements();
        
        // Scroll progress animations
        this.createScrollProgress();
        
        // Section reveal animations
        this.createSectionReveals();
    }

    enableSmoothScroll() {
        let isScrolling = false;
        
        window.addEventListener('scroll', () => {
            if (!isScrolling) {
                window.requestAnimationFrame(() => {
                    this.handleScroll();
                    isScrolling = false;
                });
                isScrolling = true;
            }
        }, { passive: true });
    }

    handleScroll() {
        const scrolled = window.pageYOffset;
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        this.scrollProgress = (scrolled / maxScroll) * 100;
        
        // Update progress bar if exists
        const progressBar = document.querySelector('.scroll-progress');
        if (progressBar) {
            progressBar.style.width = this.scrollProgress + '%';
        }
        
        // Trigger scroll-based animations
        this.animateOnScroll();
    }

    createParallaxElements() {
        const parallaxElements = document.querySelectorAll('.parallax');
        
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            
            parallaxElements.forEach(element => {
                const speed = element.dataset.speed || 0.5;
                const yPos = -(scrolled * speed);
                element.style.transform = `translateY(${yPos}px)`;
            });
        });
    }

    createScrollProgress() {
        // Remove existing progress bar if any
        const existingProgress = document.querySelector('.scroll-progress');
        if (existingProgress) existingProgress.remove();
        
        const progressBar = document.createElement('div');
        progressBar.className = 'scroll-progress-advanced';
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 0%;
            height: 3px;
            background: linear-gradient(90deg, #667eea, #f093fb, #4facfe);
            z-index: 10000;
            transition: width 0.1s ease;
            box-shadow: 0 2px 10px rgba(102, 126, 234, 0.3);
        `;
        document.body.appendChild(progressBar);
    }

    createSectionReveals() {
        const sections = document.querySelectorAll('section');
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('section-visible');
                    this.animateSectionReveal(entry.target);
                }
            });
        }, observerOptions);

        sections.forEach(section => {
            sectionObserver.observe(section);
        });
    }

    animateSectionReveal(section) {
        const elements = section.querySelectorAll('[data-reveal]');
        elements.forEach((element, index) => {
            element.style.animationDelay = `${index * 0.1}s`;
            element.classList.add('reveal-animate');
        });
    }

    animateOnScroll() {
        const animatedElements = document.querySelectorAll('[data-scroll-animate]');
        const windowHeight = window.innerHeight;
        
        animatedElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < windowHeight - elementVisible) {
                element.classList.add('scroll-animated');
            }
        });
    }

    createCursorEffects() {
        // Custom cursor for premium feel
        this.createCustomCursor();
        
        // Mouse follower effects
        this.createMouseFollower();
    }

    createCustomCursor() {
        // Only enable on desktop
        if (window.innerWidth < 768) return;
        
        const cursor = document.createElement('div');
        cursor.className = 'custom-cursor';
        document.body.appendChild(cursor);
        
        const follower = document.createElement('div');
        follower.className = 'cursor-follower';
        document.body.appendChild(follower);
        
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
            
            // Follower with delay
            setTimeout(() => {
                follower.style.left = e.clientX + 'px';
                follower.style.top = e.clientY + 'px';
            }, 50);
        });
        
        // Interactive elements cursor change
        const interactiveElements = document.querySelectorAll('a, button, .btn, input, [role="button"]');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.classList.add('cursor-hover');
                follower.classList.add('cursor-hover');
            });
            
            el.addEventListener('mouseleave', () => {
                cursor.classList.remove('cursor-hover');
                follower.classList.remove('cursor-hover');
            });
        });
    }

    createMouseFollower() {
        // Particle trail effect
        let particles = [];
        let mouseX = 0;
        let mouseY = 0;
        
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            
            // Create particles on fast movement
            if (this.isFastMovement(e)) {
                this.createParticleTrail(mouseX, mouseY);
            }
        });
        
        function animateParticles() {
            particles = particles.filter(particle => {
                particle.x += particle.vx;
                particle.y += particle.vy;
                particle.alpha -= 0.02;
                
                if (particle.alpha <= 0) return false;
                
                particle.element.style.left = particle.x + 'px';
                particle.element.style.top = particle.y + 'px';
                particle.element.style.opacity = particle.alpha;
                
                return true;
            });
            
            requestAnimationFrame(animateParticles);
        }
        
        animateParticles();
    }

    isFastMovement(event) {
        // Calculate movement speed (simplified)
        return true; // Implement proper speed detection
    }

    createParticleTrail(x, y) {
        for (let i = 0; i < 3; i++) {
            const particle = document.createElement('div');
            particle.className = 'cursor-particle';
            particle.style.cssText = `
                position: fixed;
                width: 4px;
                height: 4px;
                background: var(--primary-color);
                border-radius: 50%;
                pointer-events: none;
                z-index: 10000;
            `;
            document.body.appendChild(particle);
            
            this.particles.push({
                element: particle,
                x: x,
                y: y,
                vx: (Math.random() - 0.5) * 4,
                vy: (Math.random() - 0.5) * 4,
                alpha: 1
            });
        }
    }

    createMorphingAnimations() {
        // Morphing shapes in background
        this.createMorphingShapes();
        
        // Liquid fill effects
        this.createLiquidEffects();
    }

    createMorphingShapes() {
        const shapesContainer = document.querySelector('.floating-shapes');
        if (!shapesContainer) return;
        
        const shapes = shapesContainer.querySelectorAll('.shape');
        shapes.forEach(shape => {
            setInterval(() => {
                this.morphShape(shape);
            }, 3000);
        });
    }

    morphShape(shape) {
        const borderRadius = `${Math.random() * 50}%`;
        const rotation = Math.random() * 360;
        
        shape.style.borderRadius = borderRadius;
        shape.style.transform = `rotate(${rotation}deg)`;
        shape.style.transition = 'all 2s cubic-bezier(0.4, 0, 0.2, 1)';
    }

    createLiquidEffects() {
        // Add liquid fill to progress bars
        const progressBars = document.querySelectorAll('.progress-fill, .xp-fill');
        progressBars.forEach(bar => {
            bar.style.background = `
                linear-gradient(90deg, 
                    #667eea 0%, 
                    #764ba2 50%, 
                    #f093fb 100%
                )
            `;
            bar.style.backgroundSize = '200% 100%';
            bar.style.animation = 'liquidShift 3s ease-in-out infinite';
        });
    }

    createPageTransitions() {
        // Smooth page transitions
        this.enablePageTransitions();
        
        // Loading states between interactions
        this.createLoadingTransitions();
    }

    enablePageTransitions() {
        // Handle internal link clicks for smooth transitions
        document.addEventListener('click', (e) => {
            const link = e.target.closest('a');
            if (link && link.href && link.href.includes(window.location.origin)) {
                e.preventDefault();
                this.navigateWithTransition(link.href);
            }
        });
    }

    navigateWithTransition(url) {
        // Add page transition overlay
        const overlay = document.createElement('div');
        overlay.className = 'page-transition-overlay';
        document.body.appendChild(overlay);
        
        // Animate out
        setTimeout(() => {
            overlay.classList.add('active');
        }, 50);
        
        // Navigate after animation
        setTimeout(() => {
            window.location.href = url;
        }, 500);
    }

    createLoadingStates() {
        // Enhanced loading states for all async operations
        this.createButtonLoadingStates();
        this.createSkeletonScreens();
        this.createProgressIndicators();
    }

    createButtonLoadingStates() {
        document.addEventListener('click', (e) => {
            const button = e.target.closest('.btn[data-loading]');
            if (button) {
                this.showButtonLoading(button);
            }
        });
    }

    showButtonLoading(button) {
        const originalText = button.innerHTML;
        button.innerHTML = `
            <span class="loading-spinner"></span>
            <span class="loading-text">Loading...</span>
        `;
        button.disabled = true;
        
        // Auto reset after 3 seconds (for demo)
        setTimeout(() => {
            button.innerHTML = originalText;
            button.disabled = false;
        }, 3000);
    }

    createSkeletonScreens() {
        // Add skeleton loading for dynamic content
        const dynamicSections = document.querySelectorAll('[data-skeleton]');
        dynamicSections.forEach(section => {
            this.showSkeleton(section);
            
            // Simulate content load
            setTimeout(() => {
                this.hideSkeleton(section);
            }, 2000);
        });
    }

    showSkeleton(section) {
        section.classList.add('skeleton-loading');
    }

    hideSkeleton(section) {
        section.classList.remove('skeleton-loading');
    }

    createProgressIndicators() {
        // Add progress indicators for long operations
        this.createUploadProgress();
        this.createFormProgress();
    }

    createUploadProgress() {
        // Implementation for file upload progress
    }

    createFormProgress() {
        const forms = document.querySelectorAll('form[data-multi-step]');
        forms.forEach(form => {
            this.initializeFormProgress(form);
        });
    }

    initializeFormProgress(form) {
        const steps = form.querySelectorAll('[data-step]');
        const progressBar = document.createElement('div');
        progressBar.className = 'form-progress';
        
        form.insertBefore(progressBar, form.firstChild);
    }

    createPerformanceOptimizations() {
        this.optimizeImages();
        this.lazyLoadContent();
        this.debounceScrollEvents();
        this.throttleResizeEvents();
    }

    optimizeImages() {
        const images = document.querySelectorAll('img[data-src]');
        images.forEach(img => {
            const src = img.getAttribute('data-src');
            img.setAttribute('src', src);
            img.removeAttribute('data-src');
        });
    }

    lazyLoadContent() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    element.classList.add('lazy-loaded');
                    observer.unobserve(element);
                }
            });
        });

        const lazyElements = document.querySelectorAll('[data-lazy]');
        lazyElements.forEach(el => observer.observe(el));
    }

    debounceScrollEvents() {
        let scrollTimeout;
        window.addEventListener('scroll', () => {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                this.handleScrollEnd();
            }, 100);
        }, { passive: true });
    }

    handleScrollEnd() {
        // Perform actions after scroll ends
        document.body.classList.add('scroll-ended');
        setTimeout(() => {
            document.body.classList.remove('scroll-ended');
        }, 1000);
    }

    throttleResizeEvents() {
        let resizeTimeout;
        window.addEventListener('resize', () => {
            if (!resizeTimeout) {
                resizeTimeout = setTimeout(() => {
                    resizeTimeout = null;
                    this.handleResize();
                }, 250);
            }
        });
    }

    handleResize() {
        // Optimize layout on resize
        this.optimizeLayout();
    }

    optimizeLayout() {
        // Adjust layout based on viewport
        if (window.innerWidth < 768) {
            document.body.classList.add('mobile-layout');
        } else {
            document.body.classList.remove('mobile-layout');
        }
    }

    createAccessibilityFeatures() {
        this.enhanceKeyboardNavigation();
        this.addScreenReaderSupport();
        this.implementFocusManagement();
        this.addReducedMotionSupport();
    }

    enhanceKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            // Escape key to close modals
            if (e.key === 'Escape') {
                this.closeAllModals();
            }
            
            // Tab key management
            if (e.key === 'Tab') {
                this.manageFocus(e);
            }
        });
    }

    closeAllModals() {
        const modals = document.querySelectorAll('.advanced-modal.active');
        modals.forEach(modal => {
            modal.classList.remove('active');
        });
    }

    manageFocus(event) {
        // Implement focus trapping for modals
        const activeModal = document.querySelector('.advanced-modal.active');
        if (activeModal) {
            const focusableElements = activeModal.querySelectorAll(
                'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
            );
            
            if (focusableElements.length === 0) return;
            
            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];
            
            if (event.shiftKey) {
                if (document.activeElement === firstElement) {
                    lastElement.focus();
                    event.preventDefault();
                }
            } else {
                if (document.activeElement === lastElement) {
                    firstElement.focus();
                    event.preventDefault();
                }
            }
        }
    }

    addScreenReaderSupport() {
        // Add ARIA labels and live regions
        this.createLiveRegions();
        this.enhanceFormAccessibility();
    }

    createLiveRegions() {
        const liveRegion = document.createElement('div');
        liveRegion.setAttribute('aria-live', 'polite');
        liveRegion.setAttribute('aria-atomic', 'true');
        liveRegion.className = 'sr-only';
        document.body.appendChild(liveRegion);
    }

    enhanceFormAccessibility() {
        const forms = document.querySelectorAll('form');
        forms.forEach(form => {
            form.setAttribute('aria-label', form.getAttribute('name') || 'Form');
        });
    }

    implementFocusManagement() {
        // Manage focus for dynamic content
        this.manageDynamicFocus();
    }

    manageDynamicFocus() {
        // Focus management for modal openings
        const observer = new MutationObserver((mutations) => {
            mutations.forEach(mutation => {
                mutation.addedNodes.forEach(node => {
                    if (node.nodeType === 1 && node.classList && node.classList.contains('advanced-modal')) {
                        this.focusFirstElement(node);
                    }
                });
            });
        });
        
        observer.observe(document.body, { childList: true, subtree: true });
    }

    focusFirstElement(modal) {
        const focusable = modal.querySelector(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable) focusable.focus();
    }

    addReducedMotionSupport() {
        // Respect user motion preferences
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            document.body.classList.add('reduced-motion');
        }
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    new AdvancedInteractions();
});