// Main JavaScript file - Only initialization, no class declarations
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initNavigation();
    initCardInteractions();
    initAnimations();
    initCounters();
    initTheme();
    
    // Auth system is initialized separately in auth.js
    // Email handler is initialized separately in email-handler.js
    console.log('All systems initialized!');
});

// Navigation functionality
function initNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const header = document.querySelector('.header');

    // Mobile menu toggle
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on links
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (hamburger) hamburger.classList.remove('active');
            if (navMenu) navMenu.classList.remove('active');
        });
    });

    // Header background on scroll
    window.addEventListener('scroll', function() {
        if (header) {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement && header) {
                const headerHeight = header.offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Active link highlighting
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 100)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Card interactions
function initCardInteractions() {
    const cardContainer = document.getElementById('main-card');
    const flipButton = document.getElementById('flip-card');
    const glowButton = document.getElementById('glow-effect');

    // Manual card flip
    if (flipButton && cardContainer) {
        flipButton.addEventListener('click', function() {
            cardContainer.classList.toggle('flipped');
        });
    }

    // Glow effect toggle
    if (glowButton && cardContainer) {
        glowButton.addEventListener('click', function() {
            cardContainer.classList.toggle('glow-mode');
            this.classList.toggle('active');
            
            if (this.classList.contains('active')) {
                this.innerHTML = '<i class="fas fa-magic"></i> Glow Mode: ON';
            } else {
                this.innerHTML = '<i class="fas fa-magic"></i> Glow Mode';
            }
        });
    }

    // Auto flip on hover (desktop only)
    if (window.innerWidth > 768 && cardContainer) {
        cardContainer.addEventListener('mouseenter', function() {
            if (!this.classList.contains('flipped')) {
                setTimeout(() => {
                    this.classList.add('flipped');
                }, 1000);
            }
        });

        cardContainer.addEventListener('mouseleave', function() {
            if (this.classList.contains('flipped')) {
                setTimeout(() => {
                    this.classList.remove('flipped');
                }, 1000);
            }
        });
    }
}

// Animation initialization
function initAnimations() {
    // Initialize AOS (Animation On Scroll)
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
            }
        });
    }, observerOptions);

    // Observe all elements with data-aos attribute
    document.querySelectorAll('[data-aos]').forEach(el => {
        observer.observe(el);
    });

    // Add floating particles to cards
    createCardParticles();
}

// Create floating particles for cards
function createCardParticles() {
    const cards = document.querySelectorAll('.card');
    
    cards.forEach(card => {
        const particlesContainer = card.querySelector('.card-particles');
        if (!particlesContainer) return;
        
        for (let i = 0; i < 15; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            
            // Random position
            const left = Math.random() * 100;
            const top = Math.random() * 100;
            
            // Random animation delay and duration
            const delay = Math.random() * 5;
            const duration = 3 + Math.random() * 2;
            
            particle.style.left = `${left}%`;
            particle.style.top = `${top}%`;
            particle.style.animationDelay = `${delay}s`;
            particle.style.animationDuration = `${duration}s`;
            
            particlesContainer.appendChild(particle);
        }
    });
}

// Counter animations
function initCounters() {
    const counters = document.querySelectorAll('[data-count]');
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => {
        observer.observe(counter);
    });
}

function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-count'));
    const duration = 2000; // 2 seconds
    const step = target / (duration / 16); // 60fps
    let current = 0;
    
    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        
        if (target > 1000) {
            // Format large numbers with commas
            element.textContent = Math.floor(current).toLocaleString();
        } else if (target === 98) {
            // Percentage
            element.textContent = Math.floor(current) + '%';
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// Theme initialization
function initTheme() {
    // Theme is handled by theme.js
    console.log('Theme system ready');
}

// Enhanced utility functions
function getRandomNumber(min, max) {
    return Math.random() * (max - min) + min;
}

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

// Additional enhancements for better user experience
function initEnhancedInteractions() {
    // Add loading states to all buttons
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            // Only add loading to buttons that aren't in modals (auth system handles those)
            if (!this.closest('.modal')) {
                const originalText = this.innerHTML;
                this.classList.add('loading');
                this.disabled = true;
                
                // Simulate action completion
                setTimeout(() => {
                    this.classList.remove('loading');
                    this.disabled = false;
                    this.innerHTML = originalText;
                }, 1500);
            }
        });
    });

    // Add hover effects to cards
    document.querySelectorAll('.feature-card, .product-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Add scroll progress indicator
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: var(--primary-gradient);
        z-index: 10000;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const winHeight = window.innerHeight;
        const docHeight = document.documentElement.scrollHeight;
        const scrollTop = window.pageYOffset;
        const scrollPercent = (scrollTop / (docHeight - winHeight)) * 100;
        progressBar.style.width = scrollPercent + '%';
    });
}

// Initialize enhanced interactions
document.addEventListener('DOMContentLoaded', initEnhancedInteractions);

// Export functions for potential use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initNavigation,
        initCardInteractions,
        initAnimations,
        initCounters,
        initTheme,
        getRandomNumber,
        debounce
    };
}