// FAANG-Level Interactive Journey System
class JourneyFlow {
    constructor() {
        this.currentStep = 0;
        this.userSelections = {};
        this.init();
    }

    init() {
        this.bindStartJourney();
        this.bindWatchMore();
        console.log('🚀 JourneyFlow initialized');
    }

    bindStartJourney() {
        const startBtn = document.querySelector('.btn-primary.btn-large');
        if (startBtn) {
            startBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.startInteractiveOnboarding();
            });
        }
    }

    bindWatchMore() {
        const watchBtn = document.querySelector('.btn-outline.btn-large');
        if (watchBtn) {
            watchBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.showVideoShowcase();
            });
        }
    }

    startInteractiveOnboarding() {
        this.createCardCustomizer();
    }

    createCardCustomizer() {
        const modal = this.createModal('card-customizer-modal', `
            <div class="onboarding-flow">
                <div class="onboarding-header">
                    <h2>Design Your Cardify Experience</h2>
                    <p>Customize your card in 3 simple steps</p>
                    <div class="progress-steps">
                        <div class="step active" data-step="1">Design</div>
                        <div class="step" data-step="2">Features</div>
                        <div class="step" data-step="3">Preview</div>
                    </div>
                </div>
                <div class="onboarding-content">
                    <div class="step-content active" data-step="1">
                        <h3>Choose Your Card Design</h3>
                        <div class="design-options">
                            <div class="design-option active" data-design="elite">
                                <div class="card-preview elite"></div>
                                <span>Elite Black</span>
                            </div>
                            <div class="design-option" data-design="crystal">
                                <div class="card-preview crystal"></div>
                                <span>Crystal Blue</span>
                            </div>
                            <div class="design-option" data-design="neon">
                                <div class="card-preview neon"></div>
                                <span>Neon Purple</span>
                            </div>
                        </div>
                    </div>
                    <div class="step-content" data-step="2">
                        <h3>Select Your Features</h3>
                        <div class="feature-options">
                            <div class="feature-option active" data-feature="cashback">
                                <div class="feature-icon">
                                    <i class="fas fa-coins"></i>
                                </div>
                                <h4>Cashback Rewards</h4>
                                <p>Earn up to 5% cashback on all purchases</p>
                            </div>
                            <div class="feature-option" data-feature="travel">
                                <div class="feature-icon">
                                    <i class="fas fa-plane"></i>
                                </div>
                                <h4>Travel Insurance</h4>
                                <p>Global coverage and lounge access</p>
                            </div>
                            <div class="feature-option" data-feature="security">
                                <div class="feature-icon">
                                    <i class="fas fa-shield-alt"></i>
                                </div>
                                <h4>AI Security</h4>
                                <p>Advanced fraud protection</p>
                            </div>
                        </div>
                    </div>
                    <div class="step-content" data-step="3">
                        <h3>Your Card Preview</h3>
                        <div class="card-final-preview">
                            <div class="preview-card elite">
                                <div class="card-content">
                                    <div class="card-logo">
                                        <i class="fas fa-crown"></i>
                                        <span>Cardify Elite</span>
                                    </div>
                                    <div class="card-chip"></div>
                                    <div class="card-number">•••• •••• •••• 1234</div>
                                    <div class="card-holder">YOUR NAME</div>
                                </div>
                            </div>
                        </div>
                        <div class="preview-features">
                            <h4>Selected Features:</h4>
                            <ul class="features-list">
                                <li><i class="fas fa-check"></i> Cashback Rewards</li>
                                <li><i class="fas fa-check"></i> Travel Insurance</li>
                                <li><i class="fas fa-check"></i> AI Security</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="onboarding-actions">
                    <button class="btn btn-outline" id="prev-step">Back</button>
                    <button class="btn btn-primary" id="next-step">Next</button>
                </div>
            </div>
        `);
        
        document.body.appendChild(modal);
        this.showModal('card-customizer-modal');
        this.bindOnboardingEvents();
    }

    bindOnboardingEvents() {
        const nextBtn = document.getElementById('next-step');
        const prevBtn = document.getElementById('prev-step');
        const designOptions = document.querySelectorAll('.design-option');
        const featureOptions = document.querySelectorAll('.feature-option');

        // Design selection
        designOptions.forEach(option => {
            option.addEventListener('click', () => {
                designOptions.forEach(opt => opt.classList.remove('active'));
                option.classList.add('active');
                this.userSelections.design = option.dataset.design;
            });
        });

        // Feature selection
        featureOptions.forEach(option => {
            option.addEventListener('click', () => {
                option.classList.toggle('active');
            });
        });

        // Navigation
        if (nextBtn) {
            nextBtn.addEventListener('click', () => this.nextStep());
        }
        if (prevBtn) {
            prevBtn.addEventListener('click', () => this.prevStep());
        }
    }

    nextStep() {
        this.currentStep = Math.min(this.currentStep + 1, 2);
        this.updateStepUI();
    }

    prevStep() {
        this.currentStep = Math.max(this.currentStep - 1, 0);
        this.updateStepUI();
    }

    updateStepUI() {
        // Update progress steps
        const steps = document.querySelectorAll('.step');
        steps.forEach((step, index) => {
            step.classList.toggle('active', index === this.currentStep);
        });

        // Update step content
        const stepContents = document.querySelectorAll('.step-content');
        stepContents.forEach((content, index) => {
            content.classList.toggle('active', index === this.currentStep);
        });

        // Update button text
        const nextBtn = document.getElementById('next-step');
        if (nextBtn) {
            nextBtn.textContent = this.currentStep === 2 ? 'Get Started' : 'Next';
        }

        // Hide back button on first step
        const prevBtn = document.getElementById('prev-step');
        if (prevBtn) {
            prevBtn.style.visibility = this.currentStep === 0 ? 'hidden' : 'visible';
        }
    }

    showVideoShowcase() {
        const modal = this.createModal('video-showcase-modal', `
            <div class="video-showcase">
                <div class="video-header">
                    <h2>See Cardify in Action</h2>
                    <p>Watch how Cardify transforms everyday spending into rewarding experiences</p>
                </div>
                <div class="video-container">
                    <div class="video-placeholder">
                        <div class="play-button">
                            <i class="fas fa-play"></i>
                        </div>
                        <p>Product Demo Video</p>
                        <span>See how Cardify works in 2 minutes</span>
                    </div>
                </div>
                <div class="testimonial-carousel">
                    <div class="testimonial active">
                        <div class="testimonial-content">
                            <p>"Cardify made managing finances actually fun! The gamification elements keep me engaged and the rewards are incredible."</p>
                            <div class="testimonial-author">
                                <div class="author-avatar"></div>
                                <div class="author-info">
                                    <strong>Sarah Chen</strong>
                                    <span>Level 25 Elite User</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="video-features">
                    <h3>What You'll Discover:</h3>
                    <div class="features-grid">
                        <div class="feature-item">
                            <i class="fas fa-gamepad"></i>
                            <span>Gamified Experience</span>
                        </div>
                        <div class="feature-item">
                            <i class="fas fa-trophy"></i>
                            <span>Achievement System</span>
                        </div>
                        <div class="feature-item">
                            <i class="fas fa-shield-alt"></i>
                            <span>AI Security</span>
                        </div>
                        <div class="feature-item">
                            <i class="fas fa-bolt"></i>
                            <span>Instant Rewards</span>
                        </div>
                    </div>
                </div>
            </div>
        `);
        
        document.body.appendChild(modal);
        this.showModal('video-showcase-modal');
        
        // Bind video play event
        const videoPlaceholder = document.querySelector('.video-placeholder');
        if (videoPlaceholder) {
            videoPlaceholder.addEventListener('click', () => {
                this.playVideo();
            });
        }
    }

    playVideo() {
        const videoPlaceholder = document.querySelector('.video-placeholder');
        if (videoPlaceholder) {
            videoPlaceholder.innerHTML = `
                <div class="video-playing">
                    <div class="loading-spinner">
                        <i class="fas fa-spinner fa-spin"></i>
                    </div>
                    <p>Video loading...</p>
                </div>
            `;
            
            // Simulate video loading
            setTimeout(() => {
                videoPlaceholder.innerHTML = `
                    <div class="video-player">
                        <div class="video-thumbnail" style="background: linear-gradient(135deg, #667eea, #764ba2);">
                            <div class="play-overlay">
                                <i class="fas fa-play-circle"></i>
                            </div>
                        </div>
                        <p>Demo: Cardify Experience</p>
                    </div>
                `;
            }, 2000);
        }
    }

    createModal(id, content) {
        const modal = document.createElement('div');
        modal.id = id;
        modal.className = 'advanced-modal';
        modal.innerHTML = `
            <div class="advanced-modal-backdrop"></div>
            <div class="advanced-modal-content">
                <button class="advanced-modal-close">
                    <i class="fas fa-times"></i>
                </button>
                ${content}
            </div>
        `;
        return modal;
    }

    showModal(id) {
        const modal = document.getElementById(id);
        if (modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';

            // Bind close event
            const closeBtn = modal.querySelector('.advanced-modal-close');
            if (closeBtn) {
                closeBtn.addEventListener('click', () => {
                    this.hideModal(id);
                });
            }

            // Bind backdrop click
            const backdrop = modal.querySelector('.advanced-modal-backdrop');
            if (backdrop) {
                backdrop.addEventListener('click', () => {
                    this.hideModal(id);
                });
            }
        }
    }

    hideModal(id) {
        const modal = document.getElementById(id);
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
            
            // Remove after animation
            setTimeout(() => {
                if (modal.parentNode) {
                    modal.parentNode.removeChild(modal);
                }
            }, 300);
        }
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    new JourneyFlow();
});