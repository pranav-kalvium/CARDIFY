// Theme Management System
class ThemeManager {
    constructor() {
        this.currentTheme = this.getSavedTheme() || 'dark';
        this.init();
    }

    init() {
        this.applyTheme(this.currentTheme);
        this.bindEvents();
        this.updateTogglePosition();
    }

    bindEvents() {
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => this.toggleTheme());
        }

        // Listen for system theme changes
        if (window.matchMedia) {
            const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
            mediaQuery.addEventListener('change', (e) => {
                if (!this.getSavedTheme()) { // Only auto-switch if no user preference
                    this.applyTheme(e.matches ? 'dark' : 'light');
                }
            });
        }
    }

    getSavedTheme() {
        return localStorage.getItem('cardify-theme');
    }

    saveTheme(theme) {
        localStorage.setItem('cardify-theme', theme);
    }

    applyTheme(theme) {
        this.currentTheme = theme;
        document.documentElement.setAttribute('data-theme', theme);
        this.saveTheme(theme);
        this.updateTogglePosition();
        this.updateMetaTheme();
        this.dispatchThemeChange();
    }

    toggleTheme() {
        const newTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
        this.applyTheme(newTheme);
        
        // Add toggle animation
        this.animateToggle();
    }

    updateTogglePosition() {
        const toggleThumb = document.querySelector('.toggle-thumb');
        const toggleLabel = document.querySelector('.toggle-label');
        
        if (toggleThumb && toggleLabel) {
            if (this.currentTheme === 'light') {
                toggleLabel.textContent = 'Light Mode';
            } else {
                toggleLabel.textContent = 'Dark Mode';
            }
        }
    }

    animateToggle() {
        const toggle = document.getElementById('theme-toggle');
        if (toggle) {
            toggle.style.transform = 'scale(0.95)';
            setTimeout(() => {
                toggle.style.transform = '';
            }, 150);
        }
    }

    updateMetaTheme() {
        // Update meta theme color for mobile browsers
        const themeColor = this.currentTheme === 'dark' ? '#121321' : '#f8fafc';
        const metaThemeColor = document.querySelector('meta[name="theme-color"]');
        if (metaThemeColor) {
            metaThemeColor.setAttribute('content', themeColor);
        }
    }

    dispatchThemeChange() {
        // Dispatch custom event for other components to listen to
        const event = new CustomEvent('themeChanged', {
            detail: { theme: this.currentTheme }
        });
        window.dispatchEvent(event);
    }

    // Utility method to check if dark mode is active
    isDarkMode() {
        return this.currentTheme === 'dark';
    }

    // Utility method to check if light mode is active
    isLightMode() {
        return this.currentTheme === 'light';
    }
}

// Initialize theme manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.themeManager = new ThemeManager();
});

// Export for use in other modules
window.ThemeManager = ThemeManager;