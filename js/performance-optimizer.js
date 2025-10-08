// FAANG-Level Performance Optimization System
class PerformanceOptimizer {
    constructor() {
        this.performanceMetrics = {
            fps: 0,
            memory: 0,
            loadTime: 0,
            interactions: 0
        };
        this.init();
    }

    init() {
        this.startPerformanceMonitoring();
        this.optimizeAssets();
        this.implementCaching();
        this.optimizeAnimations();
        this.setupServiceWorker();
        console.log('🚀 PerformanceOptimizer initialized');
    }

    startPerformanceMonitoring() {
        // Monitor FPS
        this.monitorFPS();
        
        // Monitor memory usage
        this.monitorMemory();
        
        // Monitor load times
        this.monitorLoadTime();
        
        // Monitor user interactions
        this.monitorInteractions();
        
        // Report metrics to analytics
        this.reportMetrics();
    }

    monitorFPS() {
        let frameCount = 0;
        let lastTime = performance.now();
        
        const checkFPS = () => {
            frameCount++;
            const currentTime = performance.now();
            
            if (currentTime - lastTime >= 1000) {
                this.performanceMetrics.fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
                frameCount = 0;
                lastTime = currentTime;
                
                // Adjust animations based on FPS
                this.optimizeBasedOnFPS(this.performanceMetrics.fps);
            }
            
            requestAnimationFrame(checkFPS);
        };
        
        checkFPS();
    }

    optimizeBasedOnFPS(fps) {
        if (fps < 30) {
            // Reduce animation complexity
            document.body.classList.add('reduced-animations');
        } else {
            document.body.classList.remove('reduced-animations');
        }
    }

    monitorMemory() {
        if (performance.memory) {
            setInterval(() => {
                this.performanceMetrics.memory = performance.memory.usedJSHeapSize;
                this.checkMemoryUsage();
            }, 5000);
        }
    }

    checkMemoryUsage() {
        const memoryLimit = 50 * 1024 * 1024; // 50MB
        if (this.performanceMetrics.memory > memoryLimit) {
            this.cleanupMemory();
        }
    }

    cleanupMemory() {
        // Clear unused event listeners
        this.cleanupEventListeners();
        
        // Clear unused timeouts/intervals
        this.cleanupTimers();
        
        // Force garbage collection if available
        if (window.gc) {
            window.gc();
        }
    }

    cleanupEventListeners() {
        // Implementation would track and remove unused listeners
    }

    cleanupTimers() {
        // Clear any non-essential intervals/timeouts
    }

    monitorLoadTime() {
        window.addEventListener('load', () => {
            this.performanceMetrics.loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
            this.optimizeBasedOnLoadTime();
        });
    }

    optimizeBasedOnLoadTime() {
        if (this.performanceMetrics.loadTime > 3000) {
            // Implement more aggressive optimizations
            this.aggressiveOptimizations();
        }
    }

    aggressiveOptimizations() {
        // Delay non-critical resources
        this.delayNonCriticalResources();
        
        // Compress images further
        this.compressImages();
        
        // Remove unused CSS
        this.removeUnusedCSS();
    }

    monitorInteractions() {
        let interactionCount = 0;
        const interactionEvents = ['click', 'keydown', 'scroll', 'mousemove'];
        
        interactionEvents.forEach(eventType => {
            document.addEventListener(eventType, () => {
                interactionCount++;
                this.performanceMetrics.interactions = interactionCount;
            }, { passive: true });
        });
    }

    reportMetrics() {
        setInterval(() => {
            // Send metrics to analytics service
            if (typeof gtag !== 'undefined') {
                gtag('event', 'performance_metrics', {
                    fps: this.performanceMetrics.fps,
                    memory: Math.round(this.performanceMetrics.memory / 1024 / 1024),
                    load_time: this.performanceMetrics.loadTime,
                    interactions: this.performanceMetrics.interactions
                });
            }
        }, 30000); // Report every 30 seconds
    }

    optimizeAssets() {
        this.optimizeImages();
        this.optimizeFonts();
        this.optimizeThirdParty();
        this.bundleResources();
    }

    optimizeImages() {
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            // Lazy load images
            if (!img.hasAttribute('loading')) {
                img.setAttribute('loading', 'lazy');
            }
            
            // Add responsive images
            this.addResponsiveImages(img);
            
            // Compress images if needed
            this.compressImage(img);
        });
    }

    addResponsiveImages(img) {
        const src = img.getAttribute('src');
        if (src && !src.includes('.svg')) {
            const srcset = `
                ${src.replace('.jpg', '-320w.jpg')} 320w,
                ${src.replace('.jpg', '-640w.jpg')} 640w,
                ${src.replace('.jpg', '-1024w.jpg')} 1024w,
                ${src.replace('.jpg', '-1920w.jpg')} 1920w
            `;
            img.setAttribute('srcset', srcset);
            img.setAttribute('sizes', '(max-width: 320px) 280px, (max-width: 640px) 600px, (max-width: 1024px) 1000px, 1920px');
        }
    }

    compressImage(img) {
        // Implementation for client-side image compression
        // This would typically be done server-side
    }

    optimizeFonts() {
        // Preload critical fonts
        this.preloadFonts();
        
        // Use font-display: swap
        this.optimizeFontLoading();
        
        // Subset fonts if possible
        this.subsetFonts();
    }

    preloadFonts() {
        const preloadLinks = [
            'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap',
            'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'
        ];
        
        preloadLinks.forEach(href => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.href = href;
            link.as = 'style';
            document.head.appendChild(link);
        });
    }

    optimizeFontLoading() {
        // Add font loading optimization
        const fontLink = document.querySelector('link[href*="fonts.googleapis.com"]');
        if (fontLink) {
            fontLink.href += '&display=swap';
        }
    }

    subsetFonts() {
        // Implementation for font subsetting
        // Typically done during build process
    }

    optimizeThirdParty() {
        this.delayThirdPartyScripts();
        this.optimizeAnalytics();
        this.lazyLoadEmbeds();
    }

    delayThirdPartyScripts() {
        const thirdPartyScripts = [
            'analytics',
            'ads',
            'social-widgets',
            'chat-widgets'
        ];
        
        thirdPartyScripts.forEach(type => {
            const scripts = document.querySelectorAll(`script[src*="${type}"]`);
            scripts.forEach(script => {
                script.setAttribute('defer', '');
                script.setAttribute('async', '');
            });
        });
    }

    optimizeAnalytics() {
        // Use minimal analytics configuration
        if (typeof gtag !== 'undefined') {
            gtag('config', 'GA_MEASUREMENT_ID', {
                page_title: document.title,
                page_location: window.location.href
            });
        }
    }

    lazyLoadEmbeds() {
        const embeds = document.querySelectorAll('iframe, video');
        embeds.forEach(embed => {
            if (!embed.hasAttribute('loading')) {
                embed.setAttribute('loading', 'lazy');
            }
        });
    }

    bundleResources() {
        // Combine CSS files in production
        this.bundleCSS();
        
        // Combine JS files in production
        this.bundleJS();
        
        // Implement resource hints
        this.addResourceHints();
    }

    bundleCSS() {
        // Implementation for CSS bundling
        // Typically done during build process
    }

    bundleJS() {
        // Implementation for JS bundling
        // Typically done during build process
    }

    addResourceHints() {
        // Preconnect to important domains
        const domains = [
            'https://fonts.googleapis.com',
            'https://fonts.gstatic.com',
            'https://cdnjs.cloudflare.com'
        ];
        
        domains.forEach(domain => {
            const link = document.createElement('link');
            link.rel = 'preconnect';
            link.href = domain;
            link.crossOrigin = 'true';
            document.head.appendChild(link);
        });
    }

    implementCaching() {
        this.setupMemoryCache();
        this.implementStorageCache();
        this.cacheCriticalResources();
    }

    setupMemoryCache() {
        this.memoryCache = new Map();
        
        // Cache frequently used DOM elements
        this.cacheDOMElements();
    }

    cacheDOMElements() {
        const selectors = [
            '.header',
            '.nav-menu',
            '.hero-content',
            '.footer'
        ];
        
        selectors.forEach(selector => {
            const element = document.querySelector(selector);
            if (element) {
                this.memoryCache.set(selector, element);
            }
        });
    }

    implementStorageCache() {
        // Cache API responses
        this.cacheAPIResponses();
        
        // Cache user preferences
        this.cacheUserPreferences();
    }

    cacheAPIResponses() {
        // Implementation for API response caching
    }

    cacheUserPreferences() {
        const preferences = {
            theme: localStorage.getItem('cardify-theme'),
            language: navigator.language,
            reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches
        };
        
        sessionStorage.setItem('user-preferences', JSON.stringify(preferences));
    }

    cacheCriticalResources() {
        // Cache critical CSS
        this.cacheCriticalCSS();
        
        // Cache critical JS
        this.cacheCriticalJS();
    }

    cacheCriticalCSS() {
        // Extract and cache above-the-fold CSS
        const criticalStyles = document.querySelectorAll('style, link[rel="stylesheet"]');
        const criticalCSS = Array.from(criticalStyles)
            .map(style => style.textContent || style.href)
            .join('\n');
        
        localStorage.setItem('critical-css', criticalCSS);
    }

    cacheCriticalJS() {
        // Cache essential JS functions
        const criticalJS = `
            // Essential functionality
            window.themeManager = window.themeManager || {};
            window.authSystem = window.authSystem || {};
        `;
        
        try {
            localStorage.setItem('critical-js', criticalJS);
        } catch (e) {
            // Storage might be full
        }
    }

    optimizeAnimations() {
        this.useTransformOpacity();
        this.avoidLayoutThrashing();
        this.optimizeRAF();
        this.useWillChange();
    }

    useTransformOpacity() {
        // Ensure animations use transform and opacity
        const animatedElements = document.querySelectorAll('[data-animate]');
        animatedElements.forEach(el => {
            el.style.willChange = 'transform, opacity';
        });
    }

    avoidLayoutThrashing() {
        // Batch DOM reads/writes
        this.batchDOMOperations();
    }

    batchDOMOperations() {
        let readQueue = [];
        let writeQueue = [];
        let scheduled = false;
        
        const scheduleFlush = () => {
            if (!scheduled) {
                scheduled = true;
                requestAnimationFrame(() => {
                    // Process reads
                    readQueue.forEach(fn => fn());
                    readQueue = [];
                    
                    // Process writes
                    writeQueue.forEach(fn => fn());
                    writeQueue = [];
                    
                    scheduled = false;
                });
            }
        };
        
        window.batchedRead = (fn) => {
            readQueue.push(fn);
            scheduleFlush();
        };
        
        window.batchedWrite = (fn) => {
            writeQueue.push(fn);
            scheduleFlush();
        };
    }

    optimizeRAF() {
        // Optimize requestAnimationFrame usage
        let rafCallbacks = [];
        let rafScheduled = false;
        
        const optimizedRAF = (callback) => {
            rafCallbacks.push(callback);
            
            if (!rafScheduled) {
                rafScheduled = true;
                requestAnimationFrame(() => {
                    const callbacks = rafCallbacks;
                    rafCallbacks = [];
                    rafScheduled = false;
                    
                    callbacks.forEach(cb => cb());
                });
            }
        };
        
        window.optimizedRAF = optimizedRAF;
    }

    useWillChange() {
        // Add will-change property to animated elements
        const animated = document.querySelectorAll('.animated, [data-aos]');
        animated.forEach(el => {
            el.style.willChange = 'transform, opacity';
        });
    }

    setupServiceWorker() {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('/sw.js')
                .then(registration => {
                    console.log('SW registered: ', registration);
                })
                .catch(registrationError => {
                    console.log('SW registration failed: ', registrationError);
                });
        }
    }

    // Utility methods
    debounce(func, wait) {
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

    throttle(func, limit) {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    // Performance monitoring alerts
    showPerformanceAlert(metric, value, threshold) {
        if (value > threshold) {
            console.warn(`Performance alert: ${metric} is ${value}, threshold is ${threshold}`);
            
            // Could show user-facing alert for critical issues
            if (metric === 'fps' && value < 20) {
                this.showUserAlert('Performance issues detected. Some animations may be disabled.');
            }
        }
    }

    showUserAlert(message) {
        const alert = document.createElement('div');
        alert.className = 'performance-alert';
        alert.innerHTML = `
            <div class="alert-content">
                <i class="fas fa-exclamation-triangle"></i>
                <span>${message}</span>
                <button class="alert-close">&times;</button>
            </div>
        `;
        
        document.body.appendChild(alert);
        
        setTimeout(() => {
            alert.classList.add('show');
        }, 100);
        
        const closeBtn = alert.querySelector('.alert-close');
        closeBtn.addEventListener('click', () => {
            alert.classList.remove('show');
            setTimeout(() => {
                if (alert.parentNode) {
                    alert.parentNode.removeChild(alert);
                }
            }, 300);
        });
        
        // Auto-hide after 5 seconds
        setTimeout(() => {
            if (alert.parentNode) {
                alert.classList.remove('show');
                setTimeout(() => {
                    if (alert.parentNode) {
                        alert.parentNode.removeChild(alert);
                    }
                }, 300);
            }
        }, 5000);
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    new PerformanceOptimizer();
});