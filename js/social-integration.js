// FAANG-Level Social Integration System
class SocialIntegration {
    constructor() {
        this.socialData = {
            twitter: { followers: '12.5K', tweets: '1.2K' },
            instagram: { followers: '45.2K', posts: '856' },
            discord: { members: '23.7K', online: '1.2K' },
            linkedin: { followers: '8.9K', updates: '234' }
        };
        this.init();
    }

    init() {
        this.enhanceFooterSocialLinks();
        this.createSocialFeeds();
        this.createCommunityShowcase();
        this.createShareFunctionality();
        console.log('🚀 SocialIntegration initialized');
    }

    enhanceFooterSocialLinks() {
        const socialLinks = document.querySelectorAll('.social-link');
        socialLinks.forEach(link => {
            link.addEventListener('mouseenter', (e) => {
                this.animateSocialHover(e.target);
            });

            link.addEventListener('click', (e) => {
                e.preventDefault();
                this.showSocialPreview(e.target);
            });
        });

        // Add social stats to footer
        this.addSocialStats();
    }

    addSocialStats() {
        const footerSection = document.querySelector('.footer-section:first-child');
        if (footerSection) {
            const statsContainer = document.createElement('div');
            statsContainer.className = 'social-stats';
            statsContainer.innerHTML = `
                <div class="stats-header">
                    <h4>Join Our Community</h4>
                    <p>50,000+ members leveling up together</p>
                </div>
                <div class="stats-grid">
                    <div class="stat-item">
                        <i class="fab fa-discord"></i>
                        <div class="stat-info">
                            <strong>23.7K</strong>
                            <span>Members</span>
                        </div>
                    </div>
                    <div class="stat-item">
                        <i class="fab fa-twitter"></i>
                        <div class="stat-info">
                            <strong>12.5K</strong>
                            <span>Followers</span>
                        </div>
                    </div>
                </div>
            `;

            const existingSocial = footerSection.querySelector('.social-links');
            if (existingSocial) {
                footerSection.insertBefore(statsContainer, existingSocial);
            }
        }
    }

    animateSocialHover(link) {
        const icon = link.querySelector('i');
        if (icon) {
            icon.style.transform = 'scale(1.2)';
            icon.style.transition = 'transform 0.3s ease';
            
            setTimeout(() => {
                icon.style.transform = 'scale(1)';
            }, 300);
        }

        // Add ripple effect
        const ripple = document.createElement('span');
        ripple.className = 'social-ripple';
        link.appendChild(ripple);

        setTimeout(() => {
            if (ripple.parentNode) {
                ripple.parentNode.removeChild(ripple);
            }
        }, 600);
    }

    showSocialPreview(link) {
        const platform = this.getPlatformFromLink(link);
        const modal = this.createSocialModal(platform);
        document.body.appendChild(modal);
        this.showModal(`social-${platform}-modal`);
    }

    getPlatformFromLink(link) {
        const icon = link.querySelector('i');
        if (icon.classList.contains('fa-twitter')) return 'twitter';
        if (icon.classList.contains('fa-discord')) return 'discord';
        if (icon.classList.contains('fa-linkedin')) return 'linkedin';
        if (icon.classList.contains('fa-github')) return 'github';
        return 'twitter';
    }

    createSocialModal(platform) {
        const platformData = this.socialData[platform] || { followers: '10K', posts: '500' };
        
        const modal = this.createModal(`social-${platform}-modal`, `
            <div class="social-modal-content">
                <div class="social-header">
                    <div class="platform-icon ${platform}">
                        <i class="fab fa-${platform}"></i>
                    </div>
                    <div class="platform-info">
                        <h3>Cardify on ${this.capitalizeFirst(platform)}</h3>
                        <p>Join our ${platform} community</p>
                    </div>
                </div>
                
                <div class="social-stats-large">
                    <div class="stat-large">
                        <strong>${platformData.followers}</strong>
                        <span>Followers</span>
                    </div>
                    <div class="stat-large">
                        <strong>${platformData.posts}</strong>
                        <span>${platform === 'twitter' ? 'Tweets' : platform === 'instagram' ? 'Posts' : 'Updates'}</span>
                    </div>
                </div>

                <div class="social-feeds">
                    ${this.generateSocialFeed(platform)}
                </div>

                <div class="social-actions">
                    <button class="btn btn-primary btn-large" onclick="window.open('https://${platform}.com/cardify', '_blank')">
                        <i class="fab fa-${platform}"></i>
                        Follow on ${this.capitalizeFirst(platform)}
                    </button>
                </div>
            </div>
        `);

        return modal;
    }

    generateSocialFeed(platform) {
        const feeds = {
            twitter: `
                <div class="feed-item">
                    <div class="tweet-header">
                        <div class="tweet-avatar"></div>
                        <div class="tweet-author">
                            <strong>Cardify Official</strong>
                            <span>@cardify · 2h ago</span>
                        </div>
                    </div>
                    <div class="tweet-content">
                        <p>🚀 Just hit 50,000 users! To celebrate, we're giving 5,000 bonus XP to everyone who completes a transaction this week! 🎉</p>
                    </div>
                    <div class="tweet-stats">
                        <span><i class="far fa-heart"></i> 234</span>
                        <span><i class="far fa-retweet"></i> 89</span>
                    </div>
                </div>
                <div class="feed-item">
                    <div class="tweet-header">
                        <div class="tweet-avatar"></div>
                        <div class="tweet-author">
                            <strong>Cardify Updates</strong>
                            <span>@cardifyupdates · 1d ago</span>
                        </div>
                    </div>
                    <div class="tweet-content">
                        <p>New achievement unlocked! "Global Explorer" - use your Cardify card in 3 different countries 🌍</p>
                        <p>Reward: 2,500 XP + Special badge</p>
                    </div>
                    <div class="tweet-stats">
                        <span><i class="far fa-heart"></i> 156</span>
                        <span><i class="far fa-retweet"></i> 45</span>
                    </div>
                </div>
            `,
            discord: `
                <div class="discord-channel">
                    <div class="channel-header">
                        <i class="fas fa-hashtag"></i>
                        <span>#announcements</span>
                    </div>
                    <div class="discord-message">
                        <div class="message-avatar"></div>
                        <div class="message-content">
                            <div class="message-author">
                                <strong>CardifyBot</strong>
                                <span>Today at 14:30</span>
                            </div>
                            <p>🎯 Weekly Challenge: "Spend Smart" - Make 5 grocery transactions this week for 1,000 XP bonus!</p>
                        </div>
                    </div>
                </div>
                <div class="discord-channel">
                    <div class="channel-header">
                        <i class="fas fa-hashtag"></i>
                        <span>#achievements</span>
                    </div>
                    <div class="discord-message">
                        <div class="message-avatar"></div>
                        <div class="message-content">
                            <div class="message-author">
                                <strong>SarahPro</strong>
                                <span>Today at 13:45</span>
                            </div>
                            <p>Just unlocked "Savings Master" achievement! Level 25 here I come! 💪</p>
                        </div>
                    </div>
                </div>
            `,
            linkedin: `
                <div class="linkedin-post">
                    <div class="post-header">
                        <div class="company-avatar"></div>
                        <div class="post-author">
                            <strong>Cardify Technologies</strong>
                            <span>Fintech · 1,234 followers · 2d ago</span>
                        </div>
                    </div>
                    <div class="post-content">
                        <p>We're excited to announce our new partnership with leading retailers to bring you even better rewards! 🛍️</p>
                        <p>Cardify Elite members now get 7% cashback at partner stores. Level up your shopping experience!</p>
                    </div>
                    <div class="post-stats">
                        <span>124 likes · 23 comments</span>
                    </div>
                </div>
            `,
            github: `
                <div class="github-repo">
                    <div class="repo-header">
                        <i class="fab fa-github"></i>
                        <div class="repo-info">
                            <strong>cardify/wallet-sdk</strong>
                            <span>Public</span>
                        </div>
                    </div>
                    <div class="repo-description">
                        <p>Official Cardify Wallet SDK for developers. Build amazing financial experiences with our APIs.</p>
                    </div>
                    <div class="repo-stats">
                        <span><i class="fas fa-star"></i> 234</span>
                        <span><i class="fas fa-code-branch"></i> 45</span>
                        <span>JavaScript</span>
                    </div>
                </div>
            `
        };

        return feeds[platform] || feeds.twitter;
    }

    createSocialFeeds() {
        // Add social feeds to the about section or create new section
        const aboutSection = document.getElementById('about');
        if (aboutSection) {
            const socialFeeds = this.createSocialFeedsSection();
            aboutSection.parentNode.insertBefore(socialFeeds, aboutSection.nextSibling);
        }
    }

    createSocialFeedsSection() {
        const section = document.createElement('section');
        section.className = 'social-feeds-section';
        section.innerHTML = `
            <div class="container">
                <div class="section-header">
                    <div class="section-badge">COMMUNITY</div>
                    <h2>Join Our Growing Community</h2>
                    <p>Connect with other Cardify users and stay updated</p>
                </div>
                
                <div class="feeds-grid">
                    <div class="feed-card twitter-feed">
                        <div class="feed-header">
                            <i class="fab fa-twitter"></i>
                            <div class="feed-info">
                                <h4>Twitter</h4>
                                <span>Latest updates & announcements</span>
                            </div>
                        </div>
                        <div class="feed-content">
                            <div class="tweet-preview">
                                <p>🎉 50K users milestone! Bonus XP for everyone this week! #Cardify #Milestone</p>
                                <span>2 hours ago</span>
                            </div>
                        </div>
                        <button class="btn btn-outline follow-btn" data-platform="twitter">
                            Follow @cardify
                        </button>
                    </div>

                    <div class="feed-card discord-feed">
                        <div class="feed-header">
                            <i class="fab fa-discord"></i>
                            <div class="feed-info">
                                <h4>Discord</h4>
                                <span>23.7K members · 1.2K online</span>
                            </div>
                        </div>
                        <div class="feed-content">
                            <div class="discord-preview">
                                <div class="channel-preview">
                                    <i class="fas fa-hashtag"></i>
                                    <span>#achievements: 45 new unlocks today</span>
                                </div>
                                <div class="channel-preview">
                                    <i class="fas fa-hashtag"></i>
                                    <span>#help: 12 active conversations</span>
                                </div>
                            </div>
                        </div>
                        <button class="btn btn-primary join-btn" data-platform="discord">
                            Join Community
                        </button>
                    </div>

                    <div class="feed-card instagram-feed">
                        <div class="feed-header">
                            <i class="fab fa-instagram"></i>
                            <div class="feed-info">
                                <h4>Instagram</h4>
                                <span>User stories & behind the scenes</span>
                            </div>
                        </div>
                        <div class="feed-content">
                            <div class="instagram-grid">
                                <div class="insta-post"></div>
                                <div class="insta-post"></div>
                                <div class="insta-post"></div>
                                <div class="insta-post"></div>
                            </div>
                        </div>
                        <button class="btn btn-outline follow-btn" data-platform="instagram">
                            Follow @cardify
                        </button>
                    </div>
                </div>
            </div>
        `;

        this.bindFeedEvents(section);
        return section;
    }

    bindFeedEvents(section) {
        const followButtons = section.querySelectorAll('.follow-btn, .join-btn');
        followButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const platform = btn.dataset.platform;
                this.showSocialPreview({ querySelector: () => ({ classList: { contains: () => platform } }) });
            });
        });
    }

    createCommunityShowcase() {
        // Add community showcase to footer or create new section
        this.addUserTestimonials();
    }

    addUserTestimonials() {
        const footer = document.querySelector('.footer');
        if (footer) {
            const communitySection = document.createElement('div');
            communitySection.className = 'community-showcase';
            communitySection.innerHTML = `
                <div class="container">
                    <div class="community-header">
                        <h3>Loved by Thousands</h3>
                        <p>See what our community is saying</p>
                    </div>
                    <div class="testimonials-grid">
                        <div class="testimonial-card">
                            <div class="user-avatar"></div>
                            <div class="testimonial-content">
                                <p>"Cardify turned boring finances into a game I actually enjoy!"</p>
                                <div class="user-info">
                                    <strong>Alex Chen</strong>
                                    <span>Level 32 · Elite Member</span>
                                </div>
                            </div>
                        </div>
                        <div class="testimonial-card">
                            <div class="user-avatar"></div>
                            <div class="testimonial-content">
                                <p>"The rewards are incredible. Earned $500 cashback last month!"</p>
                                <div class="user-info">
                                    <strong>Maria Rodriguez</strong>
                                    <span>Level 28 · Platinum Member</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;

            footer.parentNode.insertBefore(communitySection, footer);
        }
    }

    createShareFunctionality() {
        // Add share buttons to key sections
        this.addShareButtons();
    }

    addShareButtons() {
        const heroSection = document.querySelector('.hero');
        if (heroSection) {
            const shareButton = this.createShareButton();
            heroSection.querySelector('.hero-actions').appendChild(shareButton);
        }
    }

    createShareButton() {
        const shareBtn = document.createElement('button');
        shareBtn.className = 'btn btn-outline share-btn';
        shareBtn.innerHTML = `
            <i class="fas fa-share-alt"></i>
            Share Cardify
        `;

        shareBtn.addEventListener('click', () => {
            this.showShareModal();
        });

        return shareBtn;
    }

    showShareModal() {
        const modal = this.createModal('share-modal', `
            <div class="share-modal-content">
                <h3>Share Cardify</h3>
                <p>Spread the word about gamified finance!</p>
                
                <div class="share-options">
                    <button class="share-option twitter" data-platform="twitter">
                        <i class="fab fa-twitter"></i>
                        <span>Twitter</span>
                    </button>
                    <button class="share-option linkedin" data-platform="linkedin">
                        <i class="fab fa-linkedin"></i>
                        <span>LinkedIn</span>
                    </button>
                    <button class="share-option facebook" data-platform="facebook">
                        <i class="fab fa-facebook"></i>
                        <span>Facebook</span>
                    </button>
                    <button class="share-option link" data-platform="link">
                        <i class="fas fa-link"></i>
                        <span>Copy Link</span>
                    </button>
                </div>

                <div class="share-preview">
                    <p>Check out Cardify - the future of gamified banking! 🚀</p>
                    <p>Earn XP, unlock achievements, and level up your financial game.</p>
                    <span>#Cardify #Fintech #Gamification</span>
                </div>
            </div>
        `);

        document.body.appendChild(modal);
        this.showModal('share-modal');
        this.bindShareEvents();
    }

    bindShareEvents() {
        const shareOptions = document.querySelectorAll('.share-option');
        shareOptions.forEach(option => {
            option.addEventListener('click', () => {
                const platform = option.dataset.platform;
                this.handleShare(platform);
            });
        });
    }

    handleShare(platform) {
        const shareText = "Check out Cardify - the future of gamified banking! 🚀 Earn XP, unlock achievements, and level up your financial game. #Cardify #Fintech #Gamification";
        const shareUrl = window.location.href;

        const shareUrls = {
            twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
            linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
            facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
            link: shareUrl
        };

        if (platform === 'link') {
            navigator.clipboard.writeText(shareUrl).then(() => {
                this.showShareSuccess('Link copied to clipboard!');
            });
        } else {
            window.open(shareUrls[platform], '_blank', 'width=600,height=400');
        }

        this.hideModal('share-modal');
    }

    showShareSuccess(message) {
        const toast = document.createElement('div');
        toast.className = 'share-toast';
        toast.textContent = message;
        document.body.appendChild(toast);

        setTimeout(() => {
            toast.classList.add('show');
        }, 100);

        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                if (toast.parentNode) {
                    toast.parentNode.removeChild(toast);
                }
            }, 300);
        }, 3000);
    }

    // Utility methods
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

            const closeBtn = modal.querySelector('.advanced-modal-close');
            const backdrop = modal.querySelector('.advanced-modal-backdrop');

            if (closeBtn) {
                closeBtn.addEventListener('click', () => this.hideModal(id));
            }
            if (backdrop) {
                backdrop.addEventListener('click', () => this.hideModal(id));
            }
        }
    }

    hideModal(id) {
        const modal = document.getElementById(id);
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
            setTimeout(() => {
                if (modal.parentNode) {
                    modal.parentNode.removeChild(modal);
                }
            }, 300);
        }
    }

    capitalizeFirst(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    new SocialIntegration();
});