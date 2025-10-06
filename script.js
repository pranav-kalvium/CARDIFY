// // script.js
// document.addEventListener('DOMContentLoaded', function() {
//     // Mobile menu toggle
//     const hamburger = document.querySelector('.hamburger');
//     const navMenu = document.querySelector('.nav-menu');
    
//     if (hamburger) {
//         hamburger.addEventListener('click', function() {
//             this.classList.toggle('active');
//             navMenu.classList.toggle('active');
//         });
//     }
    
//     // Close mobile menu when clicking on a link
//     const navLinks = document.querySelectorAll('.nav-menu a');
//     navLinks.forEach(link => {
//         link.addEventListener('click', function() {
//             hamburger.classList.remove('active');
//             navMenu.classList.remove('active');
//         });
//     });
    
//     // Smooth scrolling for anchor links
//     document.querySelectorAll('a[href^="#"]').forEach(anchor => {
//         anchor.addEventListener('click', function(e) {
//             e.preventDefault();
            
//             const targetId = this.getAttribute('href');
//             if (targetId === '#') return;
            
//             const targetElement = document.querySelector(targetId);
//             if (targetElement) {
//                 window.scrollTo({
//                     top: targetElement.offsetTop - 80,
//                     behavior: 'smooth'
//                 });
//             }
//         });
//     });
    
//     // Header background on scroll
//     window.addEventListener('scroll', function() {
//         const header = document.querySelector('.header');
//         if (window.scrollY > 50) {
//             header.style.background = 'rgba(18, 19, 33, 0.95)';
//             header.style.backdropFilter = 'blur(10px)';
//         } else {
//             header.style.background = 'rgba(18, 19, 33, 0.9)';
//             header.style.backdropFilter = 'blur(10px)';
//         }
//     });
    
//     // Animation on scroll
//     const animateOnScroll = function() {
//         const elements = document.querySelectorAll('.feature-card, .product-card, .testimonial-card');
        
//         elements.forEach(element => {
//             const elementPosition = element.getBoundingClientRect().top;
//             const screenPosition = window.innerHeight / 1.2;
            
//             if (elementPosition < screenPosition) {
//                 element.style.opacity = '1';
//                 element.style.transform = 'translateY(0)';
//             }
//         });
//     };
    
//     // Set initial state for animation
//     const animatedElements = document.querySelectorAll('.feature-card, .product-card, .testimonial-card');
//     animatedElements.forEach(element => {
//         element.style.opacity = '0';
//         element.style.transform = 'translateY(20px)';
//         element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
//     });
    
//     window.addEventListener('scroll', animateOnScroll);
//     // Trigger once on load
//     animateOnScroll();
// });