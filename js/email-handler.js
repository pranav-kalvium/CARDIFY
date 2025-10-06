// FIXED Email Handler - Working Version
class EmailHandler {
    constructor() {
        console.log('🔧 EmailHandler constructor called');
        this.init();
    }

    async init() {
        console.log('🔧 STEP 1: Initializing EmailJS...');
        
        const EMAILJS_PUBLIC_KEY = 'qZ_TgOuDjSwEVF7Dc';
        const EMAILJS_SERVICE_ID = 'service_xafsu67';
        const EMAILJS_TEMPLATE_ID = 'template_gvvrbrj';
        
        try {
            await emailjs.init(EMAILJS_PUBLIC_KEY);
            console.log('✅ EmailJS initialized successfully');
            
            this.serviceId = EMAILJS_SERVICE_ID;
            this.templateId = EMAILJS_TEMPLATE_ID;
            this.isInitialized = true;
            
        } catch (error) {
            console.error('❌ EmailJS initialization failed:', error);
            this.isInitialized = false;
        }
        
        // Wait a bit for DOM to be fully ready, then bind form
        setTimeout(() => {
            this.bindContactForm();
        }, 100);
    }

    bindContactForm() {
        console.log('🔧 STEP 2: Binding contact form...');
        
        const contactForm = document.getElementById('contact-form');
        const submitBtn = document.getElementById('contact-submit');

        console.log('🔧 Contact form found:', contactForm);
        console.log('🔧 Submit button found:', submitBtn);

        if (contactForm && submitBtn) {
            console.log('✅ STEP 2: Both elements found');
            
            // Remove any existing event listeners first
            contactForm.replaceWith(contactForm.cloneNode(true));
            submitBtn.replaceWith(submitBtn.cloneNode(true));
            
            // Get fresh references after cloning
            const freshForm = document.getElementById('contact-form');
            const freshButton = document.getElementById('contact-submit');
            
            // Add submit event to form
            freshForm.addEventListener('submit', (e) => {
                console.log('🎯 FORM SUBMIT EVENT TRIGGERED!');
                e.preventDefault();
                console.log('✅ Default prevented');
                this.handleContactForm(freshForm, freshButton);
            });
            
            // Also add click event to button as backup
            freshButton.addEventListener('click', (e) => {
                console.log('🎯 BUTTON CLICK EVENT TRIGGERED!');
                e.preventDefault();
                this.handleContactForm(freshForm, freshButton);
            });
            
            console.log('✅ Event listeners added successfully');
            
        } else {
            console.error('❌ Form elements not found!');
        }
    }

    async handleContactForm(form, submitBtn) {
        console.log('🔧 STEP 3: handleContactForm called');
        
        // Get form values
        const formData = {
            name: form.querySelector('#name').value,
            email: form.querySelector('#email').value,
            message: form.querySelector('#message').value
        };
        
        console.log('🔧 Form data:', formData);
        
        // Show loading state immediately
        this.setButtonLoading(submitBtn, true, 'Sending...');
        console.log('✅ Loading state activated');

        // Add a small delay to see the loading state
        await new Promise(resolve => setTimeout(resolve, 500));

        try {
            console.log('🔧 STEP 4: Preparing to send email...');
            
            const emailParams = {
                from_name: formData.name || 'Test User',
                from_email: formData.email || 'test@cardify.com',
                message: formData.message || 'Test message from contact form',
                date: new Date().toLocaleString(),
                website: 'Cardify Website'
            };

            console.log('🔧 Email parameters:', emailParams);
            
            if (this.isInitialized) {
                console.log('🔄 Sending via EmailJS...');
                const result = await emailjs.send(
                    this.serviceId,
                    this.templateId, 
                    emailParams
                );
                console.log('✅ Email sent successfully!', result);
                this.showSuccess('Email sent successfully! Check your inbox.');
            } else {
                console.log('🔄 EmailJS not available, using fallback...');
                this.showSuccess('Form submitted! (EmailJS not configured)');
            }

        } catch (error) {
            console.error('❌ Email sending failed:', error);
            this.showError('Failed to send: ' + (error.text || error.message));
        } finally {
            this.setButtonLoading(submitBtn, false, 'Send Message');
            console.log('🔧 Button reset to normal state');
        }
    }

    setButtonLoading(button, isLoading, text = 'Send Message') {
        if (isLoading) {
            button.classList.add('loading');
            button.disabled = true;
            const span = button.querySelector('span');
            if (span) span.textContent = text;
            console.log('🔄 Button loading:', text);
        } else {
            button.classList.remove('loading');
            button.disabled = false;
            const span = button.querySelector('span');
            if (span) span.textContent = text;
            console.log('✅ Button ready:', text);
        }
    }

    showSuccess(message) {
        console.log('✅ SUCCESS:', message);
        alert('✅ ' + message); // Using alert for now to ensure we see it
        
        // Also show the success modal if it exists
        const successModal = document.getElementById('contact-success-modal');
        if (successModal) {
            successModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    showError(message) {
        console.error('❌ ERROR:', message);
        alert('❌ ' + message);
    }
}

// Initialize with multiple safety checks
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 DOM fully loaded - Starting EmailHandler');
    
    // Wait a bit longer to ensure everything is ready
    setTimeout(() => {
        console.log('🔧 Creating EmailHandler instance...');
        window.emailHandler = new EmailHandler();
    }, 500);
});

// Additional safety: Also initialize when window loads
window.addEventListener('load', () => {
    console.log('🏁 Window fully loaded - EmailHandler should be ready');
});