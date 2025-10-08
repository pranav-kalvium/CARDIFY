// FAANG-Level Product Comparison System
class ProductComparison {
    constructor() {
        this.selectedPlan = null;
        this.init();
    }

    init() {
        this.createInteractiveComparison();
        this.createBenefitCalculator();
        this.createROIVisualization();
        this.bindProductCardInteractions();
        console.log('🚀 ProductComparison initialized');
    }

    createInteractiveComparison() {
        // Add comparison toggle to product section
        const productsSection = document.getElementById('products');
        if (productsSection) {
            const comparisonToggle = this.createComparisonToggle();
            productsSection.querySelector('.container').insertBefore(
                comparisonToggle, 
                productsSection.querySelector('.products-grid')
            );
        }
    }

    createComparisonToggle() {
        const toggleContainer = document.createElement('div');
        toggleContainer.className = 'comparison-toggle-container';
        toggleContainer.innerHTML = `
            <div class="comparison-header">
                <h3>Compare All Plans</h3>
                <p>See detailed feature comparison across all tiers</p>
            </div>
            <button class="btn btn-outline" id="show-comparison">
                <i class="fas fa-chart-bar"></i>
                Show Detailed Comparison
            </button>
        `;

        const showBtn = toggleContainer.querySelector('#show-comparison');
        if (showBtn) {
            showBtn.addEventListener('click', () => {
                this.showComparisonTable();
            });
        }

        return toggleContainer;
    }

    showComparisonTable() {
        const modal = this.createModal('comparison-modal', `
            <div class="comparison-modal-content">
                <div class="comparison-header">
                    <h2>Plan Comparison</h2>
                    <p>Detailed feature breakdown across all Cardify tiers</p>
                </div>
                
                <div class="comparison-table-container">
                    <table class="comparison-table">
                        <thead>
                            <tr>
                                <th class="feature-column">Features</th>
                                <th class="plan-column">
                                    <div class="plan-header basic">
                                        <div class="plan-icon">
                                            <i class="fas fa-feather"></i>
                                        </div>
                                        <h4>Basic</h4>
                                        <div class="plan-price">$0<span>/month</span></div>
                                    </div>
                                </th>
                                <th class="plan-column">
                                    <div class="plan-header elite featured">
                                        <div class="plan-icon">
                                            <i class="fas fa-crown"></i>
                                        </div>
                                        <h4>Elite</h4>
                                        <div class="plan-price">$29<span>/month</span></div>
                                        <div class="popular-badge">Most Popular</div>
                                    </div>
                                </th>
                                <th class="plan-column">
                                    <div class="plan-header platinum">
                                        <div class="plan-icon">
                                            <i class="fas fa-gem"></i>
                                        </div>
                                        <h4>Platinum</h4>
                                        <div class="plan-price">$99<span>/month</span></div>
                                    </div>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            ${this.generateComparisonRows()}
                        </tbody>
                    </table>
                </div>

                <div class="comparison-summary">
                    <div class="summary-card">
                        <h4>Annual Value Calculator</h4>
                        <div class="value-calculator">
                            <div class="calculator-input">
                                <label>Monthly Spending:</label>
                                <div class="input-group">
                                    <span class="currency">$</span>
                                    <input type="number" id="monthly-spend" value="1000" min="0" max="100000">
                                </div>
                            </div>
                            <div class="calculator-results">
                                <div class="result-item">
                                    <span>Basic:</span>
                                    <strong id="basic-value">$240</strong>
                                    <span class="value-desc">annual cashback</span>
                                </div>
                                <div class="result-item">
                                    <span>Elite:</span>
                                    <strong id="elite-value">$600</strong>
                                    <span class="value-desc">annual cashback</span>
                                </div>
                                <div class="result-item">
                                    <span>Platinum:</span>
                                    <strong id="platinum-value">$840</strong>
                                    <span class="value-desc">annual cashback</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="comparison-actions">
                    <button class="btn btn-primary btn-large" id="select-plan">
                        Select Recommended Plan
                    </button>
                </div>
            </div>
        `);

        document.body.appendChild(modal);
        this.showModal('comparison-modal');
        this.bindComparisonEvents();
    }

    generateComparisonRows() {
        const features = [
            {
                category: 'Cashback Rewards',
                items: [
                    { name: 'Groceries', basic: '2%', elite: '5%', platinum: '7%' },
                    { name: 'Dining', basic: '1%', elite: '4%', platinum: '6%' },
                    { name: 'Travel', basic: '1%', elite: '5%', platinum: '7%' },
                    { name: 'Everything Else', basic: '0.5%', elite: '3%', platinum: '5%' }
                ]
            },
            {
                category: 'Gamification',
                items: [
                    { name: 'XP Multiplier', basic: '1x', elite: '2x', platinum: '3x' },
                    { name: 'Daily Quests', basic: '✓', elite: '✓', platinum: '✓' },
                    { name: 'Weekly Challenges', basic: '–', elite: '✓', platinum: '✓' },
                    { name: 'Elite Achievements', basic: '–', elite: '✓', platinum: '✓' }
                ]
            },
            {
                category: 'Security Features',
                items: [
                    { name: 'AI Fraud Detection', basic: 'Basic', elite: 'Advanced', platinum: 'Elite' },
                    { name: 'Purchase Alerts', basic: '✓', elite: '✓', platinum: '✓' },
                    { name: 'Virtual Cards', basic: '–', elite: '3', platinum: 'Unlimited' },
                    { name: 'Travel Insurance', basic: '–', elite: '$500k', platinum: '$2M' }
                ]
            },
            {
                category: 'Support & Benefits',
                items: [
                    { name: 'Customer Support', basic: '24/7 Chat', elite: 'Priority', platinum: 'Dedicated' },
                    { name: 'Fee Waivers', basic: '–', elite: '✓', platinum: '✓' },
                    { name: 'Airport Lounge', basic: '–', elite: '4 visits', platinum: 'Unlimited' },
                    { name: 'Concierge Service', basic: '–', elite: '–', platinum: '✓' }
                ]
            }
        ];

        let rows = '';
        features.forEach(category => {
            rows += `
                <tr class="category-row">
                    <td colspan="4" class="category-header">${category.category}</td>
                </tr>
            `;
            
            category.items.forEach(item => {
                rows += `
                    <tr class="feature-row">
                        <td class="feature-name">${item.name}</td>
                        <td class="feature-value basic">${item.basic}</td>
                        <td class="feature-value elite">${item.elite}</td>
                        <td class="feature-value platinum">${item.platinum}</td>
                    </tr>
                `;
            });
        });

        return rows;
    }

    createBenefitCalculator() {
        // Add benefit calculator to product cards
        const productCards = document.querySelectorAll('.product-card');
        productCards.forEach(card => {
            const calculator = this.createCardCalculator(card);
            card.appendChild(calculator);
        });
    }

    createCardCalculator(card) {
        const calculator = document.createElement('div');
        calculator.className = 'benefit-calculator';
        calculator.innerHTML = `
            <div class="calculator-toggle">
                <button class="calc-toggle-btn">
                    <i class="fas fa-calculator"></i>
                    Calculate Your Benefits
                </button>
            </div>
            <div class="calculator-content">
                <div class="calc-inputs">
                    <label>Monthly Spending:</label>
                    <input type="range" min="500" max="10000" value="2000" class="spend-slider">
                    <div class="spend-value">$2,000</div>
                </div>
                <div class="calc-results">
                    <div class="result-item">
                        <span>Estimated Cashback:</span>
                        <strong class="cashback-amount">$60</strong>
                    </div>
                    <div class="result-item">
                        <span>Annual Value:</span>
                        <strong class="annual-value">$720</strong>
                    </div>
                </div>
            </div>
        `;

        const toggleBtn = calculator.querySelector('.calc-toggle-btn');
        const slider = calculator.querySelector('.spend-slider');
        const spendValue = calculator.querySelector('.spend-value');
        const cashbackAmount = calculator.querySelector('.cashback-amount');
        const annualValue = calculator.querySelector('.annual-value');

        if (toggleBtn) {
            toggleBtn.addEventListener('click', () => {
                calculator.classList.toggle('expanded');
            });
        }

        if (slider) {
            slider.addEventListener('input', (e) => {
                const value = e.target.value;
                spendValue.textContent = `$${this.formatNumber(value)}`;
                this.updateCalculatorValues(card, value, cashbackAmount, annualValue);
            });
        }

        return calculator;
    }

    updateCalculatorValues(card, spend, cashbackEl, annualEl) {
        const spendNum = parseInt(spend);
        let cashbackRate = 0.02; // Basic default

        if (card.classList.contains('featured')) {
            cashbackRate = 0.05; // Elite
        } else if (card.querySelector('.fa-gem')) {
            cashbackRate = 0.07; // Platinum
        }

        const monthlyCashback = spendNum * cashbackRate;
        const annualCashback = monthlyCashback * 12;

        cashbackEl.textContent = `$${this.formatNumber(monthlyCashback.toFixed(0))}`;
        annualEl.textContent = `$${this.formatNumber(annualCashback.toFixed(0))}`;
    }

    createROIVisualization() {
        // Add ROI visualization to the products section
        const productsGrid = document.querySelector('.products-grid');
        if (productsGrid) {
            const roiSection = this.createROISection();
            productsGrid.parentNode.insertBefore(roiSection, productsGrid.nextSibling);
        }
    }

    createROISection() {
        const section = document.createElement('div');
        section.className = 'roi-visualization';
        section.innerHTML = `
            <div class="roi-header">
                <h3>See Your Potential Return</h3>
                <p>Calculate how much value you can get with Cardify</p>
            </div>
            <div class="roi-calculator">
                <div class="roi-inputs">
                    <div class="input-group">
                        <label>Monthly Spending</label>
                        <input type="range" id="roi-spend" min="500" max="15000" value="3000">
                        <div class="value-display">$3,000</div>
                    </div>
                    <div class="input-group">
                        <label>Card Tier</label>
                        <div class="tier-selector">
                            <button class="tier-btn active" data-tier="basic">Basic</button>
                            <button class="tier-btn" data-tier="elite">Elite</button>
                            <button class="tier-btn" data-tier="platinum">Platinum</button>
                        </div>
                    </div>
                </div>
                <div class="roi-results">
                    <div class="roi-chart">
                        <div class="chart-bar basic" style="height: 30%">
                            <span>Basic</span>
                            <div class="bar-value">$720</div>
                        </div>
                        <div class="chart-bar elite active" style="height: 60%">
                            <span>Elite</span>
                            <div class="bar-value">$1,800</div>
                        </div>
                        <div class="chart-bar platinum" style="height: 80%">
                            <span>Platinum</span>
                            <div class="bar-value">$2,520</div>
                        </div>
                    </div>
                    <div class="roi-summary">
                        <div class="summary-item">
                            <span>Annual Cashback:</span>
                            <strong id="annual-cashback">$1,800</strong>
                        </div>
                        <div class="summary-item">
                            <span>Net Value:</span>
                            <strong id="net-value">$1,452</strong>
                        </div>
                        <div class="summary-item">
                            <span>ROI:</span>
                            <strong id="roi-percentage">483%</strong>
                        </div>
                    </div>
                </div>
            </div>
        `;

        this.bindROIEvents(section);
        return section;
    }

    bindROIEvents(section) {
        const spendSlider = section.querySelector('#roi-spend');
        const spendValue = section.querySelector('.value-display');
        const tierButtons = section.querySelectorAll('.tier-btn');
        const chartBars = section.querySelectorAll('.chart-bar');

        if (spendSlider && spendValue) {
            spendSlider.addEventListener('input', (e) => {
                const value = e.target.value;
                spendValue.textContent = `$${this.formatNumber(value)}`;
                this.updateROIChart(value);
            });
        }

        tierButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                tierButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.updateROIChart(spendSlider.value, btn.dataset.tier);
            });
        });
    }

    updateROIChart(spend, tier = 'elite') {
        const spendNum = parseInt(spend);
        const rates = { basic: 0.02, elite: 0.05, platinum: 0.07 };
        const fees = { basic: 0, elite: 348, platinum: 1188 };
        
        const annualCashback = spendNum * rates[tier] * 12;
        const netValue = annualCashback - fees[tier];
        const roiPercentage = ((netValue / fees[tier]) * 100).toFixed(0);

        // Update chart bars
        const chartBars = document.querySelectorAll('.chart-bar');
        chartBars.forEach(bar => {
            bar.classList.remove('active');
            if (bar.classList.contains(tier)) {
                bar.classList.add('active');
            }
        });

        // Update summary
        const annualEl = document.getElementById('annual-cashback');
        const netEl = document.getElementById('net-value');
        const roiEl = document.getElementById('roi-percentage');

        if (annualEl) annualEl.textContent = `$${this.formatNumber(annualCashback.toFixed(0))}`;
        if (netEl) netEl.textContent = `$${this.formatNumber(netValue.toFixed(0))}`;
        if (roiEl) roiEl.textContent = `${roiPercentage}%`;
    }

    bindProductCardInteractions() {
        const productCards = document.querySelectorAll('.product-card');
        productCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                this.animateCardHover(card);
            });

            card.addEventListener('click', (e) => {
                if (!e.target.closest('.benefit-calculator')) {
                    this.showQuickComparison(card);
                }
            });
        });
    }

    animateCardHover(card) {
        card.style.transform = 'translateY(-10px) scale(1.02)';
        card.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
    }

    showQuickComparison(card) {
        // Quick comparison tooltip
        console.log('Show quick comparison for:', card);
    }

    bindComparisonEvents() {
        const spendInput = document.getElementById('monthly-spend');
        if (spendInput) {
            spendInput.addEventListener('input', (e) => {
                this.updateValueCalculator(e.target.value);
            });
        }

        const selectBtn = document.getElementById('select-plan');
        if (selectBtn) {
            selectBtn.addEventListener('click', () => {
                this.selectRecommendedPlan();
            });
        }
    }

    updateValueCalculator(spend) {
        const spendNum = parseInt(spend) || 1000;
        const basicValue = spendNum * 0.02 * 12;
        const eliteValue = spendNum * 0.05 * 12;
        const platinumValue = spendNum * 0.07 * 12;

        const basicEl = document.getElementById('basic-value');
        const eliteEl = document.getElementById('elite-value');
        const platinumEl = document.getElementById('platinum-value');

        if (basicEl) basicEl.textContent = `$${this.formatNumber(basicValue.toFixed(0))}`;
        if (eliteEl) eliteEl.textContent = `$${this.formatNumber(eliteValue.toFixed(0))}`;
        if (platinumEl) platinumEl.textContent = `$${this.formatNumber(platinumValue.toFixed(0))}`;
    }

    selectRecommendedPlan() {
        const spendInput = document.getElementById('monthly-spend');
        const spend = parseInt(spendInput?.value) || 1000;

        let recommendedPlan = 'basic';
        if (spend > 2000) recommendedPlan = 'elite';
        if (spend > 5000) recommendedPlan = 'platinum';

        this.hideModal('comparison-modal');
        this.scrollToPlan(recommendedPlan);
    }

    scrollToPlan(plan) {
        const planElement = document.querySelector(`.product-card.${plan === 'elite' ? 'featured' : ''}`);
        if (planElement) {
            planElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
            
            // Add highlight animation
            planElement.style.animation = 'planHighlight 2s ease';
            setTimeout(() => {
                planElement.style.animation = '';
            }, 2000);
        }
    }

    // Utility methods
    createModal(id, content) {
        const modal = document.createElement('div');
        modal.id = id;
        modal.className = 'advanced-modal';
        modal.innerHTML = `
            <div class="advanced-modal-backdrop"></div>
            <div class="advanced-modal-content comparison-modal">
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

    formatNumber(num) {
        return parseInt(num).toLocaleString();
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    new ProductComparison();
});