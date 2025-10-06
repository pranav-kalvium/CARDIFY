// Authentication Modal System
class AuthSystem {
    constructor() {
        this.currentModal = null;
        this.init();
    }

    init() {
        this.injectAuthStyles();
        this.bindEvents();
        this.initPasswordStrength();
        this.initFormValidation();
    }

    injectAuthStyles() {
        // Only inject styles if they haven't been injected already
        if (!document.getElementById('auth-styles')) {
            const styleSheet = document.createElement('style');
            styleSheet.id = 'auth-styles';
            styleSheet.textContent = `
                @keyframes shake {
                    0%, 100% { transform: translateX(0); }
                    25% { transform: translateX(-5px); }
                    75% { transform: translateX(5px); }
                }

                .toast-success {
                    border-left: 4px solid #2ed573;
                }

                .toast-error {
                    border-left: 4px solid #ff4757;
                }

                .btn.loading {
                    position: relative;
                    color: transparent;
                }

                .btn.loading::after {
                    content: '';
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    width: 20px;
                    height: 20px;
                    border: 2px solid transparent;
                    border-top: 2px solid white;
                    border-radius: 50%;
                    animation: spin 1s linear infinite;
                }

                @keyframes spin {
                    0% { transform: translate(-50%, -50%) rotate(0deg); }
                    100% { transform: translate(-50%, -50%) rotate(360deg); }
                }
            `;
            document.head.appendChild(styleSheet);
        }
    }

    bindEvents() {
        // Login button
        const loginBtn = document.querySelector('.nav-actions .btn-outline');
        if (loginBtn) {
            loginBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.openModal('login-modal');
            });
        }

        // Signup button
        const signupBtn = document.querySelector('.nav-actions .btn-primary');
        if (signupBtn) {
            signupBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.openModal('signup-modal');
            });
        }

        // Modal close buttons
        document.querySelectorAll('.modal-close').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const modalId = btn.getAttribute('data-modal');
                this.closeModal(modalId);
            });
        });

        // Close modal on backdrop click
        document.querySelectorAll('.modal').forEach(modal => {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    this.closeModal(modal.id);
                }
            });
        });

        // Switch between modals
        document.querySelectorAll('.switch-to-signup').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                this.closeModal('login-modal');
                this.openModal('signup-modal');
            });
        });

        document.querySelectorAll('.switch-to-login').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                this.closeModal('signup-modal');
                this.closeModal('forgot-modal');
                this.openModal('login-modal');
            });
        });

        // Forgot password
        document.querySelectorAll('.forgot-password').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                this.closeModal('login-modal');
                this.openModal('forgot-modal');
            });
        });

        // Success modal close
        const closeSuccess = document.querySelector('.close-success');
        if (closeSuccess) {
            closeSuccess.addEventListener('click', () => {
                this.closeModal('success-modal');
            });
        }

        // Form submissions
        document.querySelectorAll('.auth-form').forEach(form => {
            form.addEventListener('submit', (e) => this.handleFormSubmit(e));
        });

        // Password toggle
        document.querySelectorAll('.password-toggle').forEach(btn => {
            btn.addEventListener('click', (e) => this.togglePasswordVisibility(e));
        });

        // Escape key to close modal
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.currentModal) {
                this.closeModal(this.currentModal);
            }
        });
    }

    openModal(modalId) {
        // Close any open modal first
        if (this.currentModal) {
            this.closeModal(this.currentModal);
        }

        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('active');
            this.currentModal = modalId;
            document.body.style.overflow = 'hidden';

            // Add entrance animation
            modal.style.animation = 'modalFadeIn 0.3s ease';
        }
    }

    closeModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.remove('active');
            this.currentModal = null;
            document.body.style.overflow = '';

            // Reset forms
            const form = modal.querySelector('form');
            if (form) {
                form.reset();
                this.resetFormValidation(form);
            }
        }
    }

    togglePasswordVisibility(e) {
        const button = e.currentTarget;
        const input = button.closest('.input-with-icon').querySelector('input');
        const icon = button.querySelector('i');

        if (input.type === 'password') {
            input.type = 'text';
            icon.classList.remove('fa-eye');
            icon.classList.add('fa-eye-slash');
        } else {
            input.type = 'password';
            icon.classList.remove('fa-eye-slash');
            icon.classList.add('fa-eye');
        }
    }

    initPasswordStrength() {
        const passwordInput = document.getElementById('signup-password');
        if (!passwordInput) return;

        passwordInput.addEventListener('input', (e) => {
            this.updatePasswordStrength(e.target.value);
        });
    }

    updatePasswordStrength(password) {
        const strengthBar = document.querySelector('.strength-fill');
        const strengthText = document.querySelector('.strength-text');
        if (!strengthBar || !strengthText) return;

        let strength = 0;
        let feedback = '';

        // Length check
        if (password.length >= 8) strength++;
        if (password.length >= 12) strength++;

        // Complexity checks
        if (/[A-Z]/.test(password)) strength++;
        if (/[0-9]/.test(password)) strength++;
        if (/[^A-Za-z0-9]/.test(password)) strength++;

        // Cap strength at 4
        strength = Math.min(strength, 4);

        // Update UI
        strengthBar.setAttribute('data-strength', strength);

        switch (strength) {
            case 0:
                feedback = 'Very Weak';
                break;
            case 1:
                feedback = 'Weak';
                break;
            case 2:
                feedback = 'Fair';
                break;
            case 3:
                feedback = 'Good';
                break;
            case 4:
                feedback = 'Strong';
                break;
        }

        strengthText.textContent = feedback;
    }

    initFormValidation() {
        // Real-time validation for email fields
        document.querySelectorAll('input[type="email"]').forEach(input => {
            input.addEventListener('blur', (e) => this.validateEmail(e.target));
        });

        // Real-time validation for password confirmation
        const confirmPassword = document.getElementById('signup-confirm');
        if (confirmPassword) {
            confirmPassword.addEventListener('input', (e) => {
                this.validatePasswordMatch();
            });
        }
    }

    validateEmail(input) {
        const email = input.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isValid = emailRegex.test(email);

        this.setFieldValidation(input, isValid, 'Please enter a valid email address');
        return isValid;
    }

    validatePasswordMatch() {
        const password = document.getElementById('signup-password');
        const confirm = document.getElementById('signup-confirm');
        
        if (!password || !confirm) return;

        const isValid = password.value === confirm.value && password.value.length > 0;
        this.setFieldValidation(confirm, isValid, 'Passwords do not match');
        return isValid;
    }

    setFieldValidation(input, isValid, message) {
        const formGroup = input.closest('.form-group');
        
        formGroup.classList.remove('success', 'error');
        
        // Remove existing error message
        const existingError = formGroup.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }

        if (input.value.trim() === '') {
            return; // Don't validate empty fields
        }

        if (isValid) {
            formGroup.classList.add('success');
        } else {
            formGroup.classList.add('error');
            const errorElement = document.createElement('div');
            errorElement.className = 'error-message';
            errorElement.textContent = message;
            formGroup.appendChild(errorElement);
        }
    }

    resetFormValidation(form) {
        form.querySelectorAll('.form-group').forEach(group => {
            group.classList.remove('success', 'error');
            const error = group.querySelector('.error-message');
            if (error) error.remove();
        });

        // Reset password strength
        const strengthBar = document.querySelector('.strength-fill');
        const strengthText = document.querySelector('.strength-text');
        if (strengthBar && strengthText) {
            strengthBar.setAttribute('data-strength', 0);
            strengthText.textContent = 'Password strength';
        }
    }

    async handleFormSubmit(e) {
        e.preventDefault();
        const form = e.target;
        const submitBtn = form.querySelector('button[type="submit"]');
        
        // Basic validation
        let isValid = true;
        
        // Validate all required fields
        form.querySelectorAll('input[required]').forEach(input => {
            if (input.type === 'email') {
                if (!this.validateEmail(input)) isValid = false;
            }
            
            if (input.value.trim() === '') {
                this.setFieldValidation(input, false, 'This field is required');
                isValid = false;
            }
        });

        // Special validation for signup form
        if (form.closest('#signup-modal')) {
            if (!this.validatePasswordMatch()) isValid = false;
            
            const termsCheckbox = document.getElementById('agree-terms');
            if (termsCheckbox && !termsCheckbox.checked) {
                isValid = false;
                // You could add visual feedback for the checkbox here
            }
        }

        if (!isValid) {
            // Shake animation for invalid form
            form.style.animation = 'shake 0.5s ease-in-out';
            setTimeout(() => {
                form.style.animation = '';
            }, 500);
            return;
        }

        // Show loading state
        this.setButtonLoading(submitBtn, true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Hide loading state
        this.setButtonLoading(submitBtn, false);

        // Show success modal for signup
        if (form.closest('#signup-modal')) {
            this.closeModal('signup-modal');
            this.openModal('success-modal');
        } else if (form.closest('#login-modal')) {
            // For login, just close the modal (simulate successful login)
            this.closeModal('login-modal');
            
            // You could update UI to show logged in state here
            this.showLoginSuccess();
        } else if (form.closest('#forgot-modal')) {
            // For forgot password, show success message
            this.closeModal('forgot-modal');
            this.showForgotPasswordSuccess();
        }

        // Reset form
        form.reset();
        this.resetFormValidation(form);
    }

    setButtonLoading(button, isLoading) {
        if (isLoading) {
            button.classList.add('loading');
            button.disabled = true;
        } else {
            button.classList.remove('loading');
            button.disabled = false;
        }
    }

    showLoginSuccess() {
        // You could update the header to show user is logged in
        const loginBtn = document.querySelector('.nav-actions .btn-outline');
        const signupBtn = document.querySelector('.nav-actions .btn-primary');
        
        if (loginBtn && signupBtn) {
            loginBtn.innerHTML = '<i class="fas fa-user"></i> Dashboard';
            signupBtn.style.display = 'none';
            
            // Add user avatar or other logged-in indicators
        }
    }

    showForgotPasswordSuccess() {
        // Show a temporary toast notification
        this.showToast('Password reset link sent to your email!', 'success');
    }

    showToast(message, type = 'info') {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.textContent = message;
        toast.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--glass-bg);
            backdrop-filter: blur(20px);
            border: 1px solid var(--glass-border);
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 10px;
            z-index: 10001;
            transform: translateX(100%);
            transition: transform 0.3s ease;
        `;

        document.body.appendChild(toast);

        // Animate in
        setTimeout(() => {
            toast.style.transform = 'translateX(0)';
        }, 100);

        // Remove after 3 seconds
        setTimeout(() => {
            toast.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (toast.parentNode) {
                    toast.parentNode.removeChild(toast);
                }
            }, 300);
        }, 3000);
    }
}

// Initialize auth system when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new AuthSystem();
});

// Export for use in other modules
window.AuthSystem = AuthSystem;