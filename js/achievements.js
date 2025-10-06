class AchievementSystem {
    constructor() {
        this.achievements = [];
        this.unlocked = new Set();
        this.progress = new Map();
        
        this.init();
    }

    init() {
        this.loadAchievements();
        this.renderAchievements();
        this.setupEventListeners();
        this.simulateProgress();
    }

    loadAchievements() {
        this.achievements = [
            {
                id: 'first_card',
                title: 'First Card',
                description: 'Apply for your first Cardify card',
                icon: 'fa-credit-card',
                points: 100,
                unlocked: true
            },
            {
                id: 'savings_master',
                title: 'Savings Master',
                description: 'Save $1,000 in your account',
                icon: 'fa-piggy-bank',
                points: 250,
                unlocked: false,
                progress: 65
            },
            {
                id: 'transaction_pro',
                title: 'Transaction Pro',
                description: 'Make 50 successful transactions',
                icon: 'fa-exchange-alt',
                points: 150,
                unlocked: false,
                progress: 30
            },
            {
                id: 'security_expert',
                title: 'Security Expert',
                description: 'Set up all security features',
                icon: 'fa-shield-alt',
                points: 200,
                unlocked: true
            },
            {
                id: 'traveler',
                title: 'Global Traveler',
                description: 'Use your card in 5 different countries',
                icon: 'fa-plane',
                points: 300,
                unlocked: false,
                progress: 20
            },
            {
                id: 'reward_collector',
                title: 'Reward Collector',
                description: 'Earn 10,000 reward points',
                icon: 'fa-gem',
                points: 500,
                unlocked: false,
                progress: 45
            }
        ];
    }

    renderAchievements() {
        const container = document.querySelector('.achievements-list');
        if (!container) return;

        container.innerHTML = this.achievements.map(achievement => `
            <div class="achievement-item ${achievement.unlocked ? 'unlocked' : 'locked'}">
                <div class="achievement-icon">
                    <i class="fas ${achievement.icon}"></i>
                </div>
                <div class="achievement-info">
                    <h4>${achievement.title}</h4>
                    <p>${achievement.description}</p>
                    ${achievement.progress ? `
                        <div class="achievement-progress">
                            <div class="progress-bar">
                                <div class="progress-fill" style="width: ${achievement.progress}%"></div>
                            </div>
                            <span>${achievement.progress}%</span>
                        </div>
                    ` : ''}
                </div>
                <div class="achievement-points">
                    +${achievement.points} XP
                </div>
            </div>
        `).join('');
    }

    setupEventListeners() {
        // Achievement click handlers
        document.addEventListener('click', (e) => {
            const achievementItem = e.target.closest('.achievement-item');
            if (achievementItem) {
                this.showAchievementDetails(achievementItem);
            }
        });
    }

    showAchievementDetails(item) {
        // Show modal with achievement details
        console.log('Achievement details:', item);
    }

    simulateProgress() {
        // Simulate achievement progress updates
        setInterval(() => {
            this.achievements.forEach(achievement => {
                if (!achievement.unlocked && achievement.progress) {
                    achievement.progress = Math.min(100, achievement.progress + Math.random() * 5);
                    
                    if (achievement.progress >= 100) {
                        achievement.unlocked = true;
                        this.unlockAchievement(achievement);
                    }
                }
            });
            this.renderAchievements();
        }, 5000);
    }

    unlockAchievement(achievement) {
        // Show unlock animation
        this.showUnlockAnimation(achievement);
        
        // Update user XP
        this.updateUserXP(achievement.points);
        
        // Play sound
        this.playUnlockSound();
    }

    showUnlockAnimation(achievement) {
        const animation = document.createElement('div');
        animation.className = 'achievement-unlock-animation';
        animation.innerHTML = `
            <div class="unlock-content">
                <div class="unlock-icon">
                    <i class="fas ${achievement.icon}"></i>
                </div>
                <h3>Achievement Unlocked!</h3>
                <h4>${achievement.title}</h4>
                <p>+${achievement.points} XP</p>
            </div>
        `;
        
        document.body.appendChild(animation);
        
        setTimeout(() => {
            animation.remove();
        }, 3000);
    }

    updateUserXP(points) {
        const xpElement = document.querySelector('.xp-fill');
        const xpText = document.querySelector('.xp-text');
        
        if (xpElement && xpText) {
            const currentWidth = parseFloat(xpElement.style.width) || 0;
            const newWidth = Math.min(100, currentWidth + (points / 10));
            
            xpElement.style.width = `${newWidth}%`;
            
            const currentXP = parseInt(xpText.textContent.split('/')[0]) || 0;
            const newXP = currentXP + points;
            
            xpText.textContent = `${newXP}/1000 XP`;
        }
    }

    playUnlockSound() {
        // Play unlock sound (implementation depends on audio files)
        console.log('Achievement unlocked sound played');
    }
}

// Initialize achievement system
document.addEventListener('DOMContentLoaded', () => {
    new AchievementSystem();
});