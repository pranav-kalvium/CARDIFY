class Card3D {
    constructor() {
        this.card = document.getElementById('mainCard3d');
        this.isDragging = false;
        this.rotateX = 0;
        this.rotateY = 0;
        this.lastX = 0;
        this.lastY = 0;
        
        this.init();
    }

    init() {
        this.bindEvents();
        this.createGlowEffect();
    }

    bindEvents() {
        // Mouse events
        this.card.addEventListener('mousedown', this.startDrag.bind(this));
        document.addEventListener('mousemove', this.drag.bind(this));
        document.addEventListener('mouseup', this.stopDrag.bind(this));

        // Touch events
        this.card.addEventListener('touchstart', this.startDrag.bind(this));
        document.addEventListener('touchmove', this.drag.bind(this));
        document.addEventListener('touchend', this.stopDrag.bind(this));

        // Control buttons
        document.querySelectorAll('[data-action]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const action = e.currentTarget.dataset.action;
                this.handleAction(action);
            });
        });
    }

    startDrag(e) {
        this.isDragging = true;
        const clientX = e.clientX || e.touches[0].clientX;
        const clientY = e.clientY || e.touches[0].clientY;
        
        this.lastX = clientX;
        this.lastY = clientY;
        
        this.card.style.transition = 'none';
    }

    drag(e) {
        if (!this.isDragging) return;
        
        e.preventDefault();
        const clientX = e.clientX || e.touches[0].clientX;
        const clientY = e.clientY || e.touches[0].clientY;
        
        const deltaX = clientX - this.lastX;
        const deltaY = clientY - this.lastY;
        
        this.rotateY += deltaX * 0.5;
        this.rotateX -= deltaY * 0.5;
        
        // Apply constraints
        this.rotateX = Math.max(-30, Math.min(30, this.rotateX));
        this.rotateY = Math.max(-30, Math.min(30, this.rotateY));
        
        this.updateTransform();
        
        this.lastX = clientX;
        this.lastY = clientY;
    }

    stopDrag() {
        this.isDragging = false;
        this.card.style.transition = 'transform 0.5s ease';
        
        // Return to original position
        setTimeout(() => {
            this.rotateX = 0;
            this.rotateY = 0;
            this.updateTransform();
        }, 100);
    }

    updateTransform() {
        this.card.style.transform = `
            rotateX(${this.rotateX}deg)
            rotateY(${this.rotateY}deg)
            scale3d(1, 1, 1)
        `;
    }

    handleAction(action) {
        switch(action) {
            case 'flip':
                this.flipCard();
                break;
            case 'glow':
                this.toggleGlow();
                break;
            case 'rotate':
                this.rotateCard();
                break;
        }
    }

    flipCard() {
        this.card.classList.toggle('flipped');
    }

    toggleGlow() {
        this.card.classList.toggle('glow');
    }

    rotateCard() {
        this.card.style.transition = 'transform 1s ease';
        this.rotateY += 180;
        this.updateTransform();
        
        setTimeout(() => {
            this.rotateY %= 360;
            this.updateTransform();
        }, 1000);
    }

    createGlowEffect() {
        const glow = document.createElement('div');
        glow.className = 'card-holographic';
        this.card.appendChild(glow);
    }
}

// Initialize 3D card
document.addEventListener('DOMContentLoaded', () => {
    new Card3D();
});