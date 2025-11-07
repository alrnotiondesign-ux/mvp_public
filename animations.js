// Advanced animations and interactions

class ScrollAnimator {
    constructor() {
        this.elements = [];
        this.init();
    }
    
    init() {
        this.cacheElements();
        this.setupObserver();
        this.initParallax();
    }
    
    cacheElements() {
        // Cache elements that need animation
        this.elements = Array.from(document.querySelectorAll('[data-animate]'));
    }
    
    setupObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateElement(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        this.elements.forEach(el => observer.observe(el));
    }
    
    animateElement(element) {
        const animationType = element.getAttribute('data-animate');
        
        switch(animationType) {
            case 'fadeInUp':
                element.classList.add('fade-in-up');
                break;
            case 'fadeInLeft':
                element.classList.add('slide-in-left');
                break;
            case 'fadeInRight':
                element.classList.add('slide-in-right');
                break;
            case 'bounce':
                element.classList.add('bounce');
                break;
            case 'pulse':
                element.classList.add('pulse');
                break;
            default:
                element.classList.add('fade-in');
        }
    }
    
    initParallax() {
        const parallaxElements = document.querySelectorAll('[data-parallax]');
        
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            
            parallaxElements.forEach(element => {
                element.style.transform = `translateY(${rate}px)`;
            });
        });
    }
}

// Counter animations
class CounterAnimator {
    constructor() {
        this.counters = [];
        this.init();
    }
    
    init() {
        this.cacheCounters();
        this.setupCounterObserver();
    }
    
    cacheCounters() {
        this.counters = Array.from(document.querySelectorAll('[data-counter]'));
    }
    
    setupCounterObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        this.counters.forEach(counter => observer.observe(counter));
    }
    
    animateCounter(element) {
        const target = parseInt(element.getAttribute('data-counter'));
        const duration = parseInt(element.getAttribute('data-duration')) || 2000;
        const suffix = element.getAttribute('data-suffix') || '';
        const prefix = element.getAttribute('data-prefix') || '';
        
        let start = 0;
        const increment = target / (duration / 16);
        
        const updateCounter = () => {
            start += increment;
            if (start < target) {
                element.textContent = prefix + Math.floor(start) + suffix;
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = prefix + target + suffix;
            }
        };
        
        updateCounter();
    }
}

// Interactive elements
class InteractiveElements {
    constructor() {
        this.init();
    }
    
    init() {
        this.initHoverEffects();
        this.initClickEffects();
        this.initFormInteractions();
    }
    
    initHoverEffects() {
        // Add hover effects to cards
        const cards = document.querySelectorAll('.feature-card, .pricing-card, .fiche-card');
        
        cards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.classList.add('hover-lift');
            });
            
            card.addEventListener('mouseleave', () => {
                card.classList.remove('hover-lift');
            });
        });
    }
    
    initClickEffects() {
        // Add ripple effect to buttons
        document.addEventListener('click', function(e) {
            if (e.target.matches('.btn, button')) {
                createRipple(e);
            }
        });
        
        function createRipple(event) {
            const button = event.currentTarget;
            const circle = document.createElement('span');
            const diameter = Math.max(button.clientWidth, button.clientHeight);
            const radius = diameter / 2;
            
            circle.style.width = circle.style.height = `${diameter}px`;
            circle.style.left = `${event.clientX - button.getBoundingClientRect().left - radius}px`;
            circle.style.top = `${event.clientY - button.getBoundingClientRect().top - radius}px`;
            circle.classList.add('ripple');
            
            const ripple = button.getElementsByClassName('ripple')[0];
            if (ripple) {
                ripple.remove();
            }
            
            button.appendChild(circle);
        }
    }
    
    initFormInteractions() {
        // Add focus effects to form inputs
        const inputs = document.querySelectorAll('input, textarea, select');
        
        inputs.forEach(input => {
            input.addEventListener('focus', () => {
                input.parentElement.classList.add('focused');
            });
            
            input.addEventListener('blur', () => {
                if (!input.value) {
                    input.parentElement.classList.remove('focused');
                }
            });
        });
    }
}

// Initialize all animations
document.addEventListener('DOMContentLoaded', function() {
    new ScrollAnimator();
    new CounterAnimator();
    new InteractiveElements();
    
    // Add CSS for ripple effect
    const style = document.createElement('style');
    style.textContent = `
        .ripple {
            position: absolute;
            border-radius: 50%;
            background-color: rgba(255, 255, 255, 0.7);
            transform: scale(0);
            animation: ripple-animation 0.6s linear;
        }
        
        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        .btn {
            position: relative;
            overflow: hidden;
        }
        
        .focused {
            transform: translateY(-2px);
        }
    `;
    document.head.appendChild(style);
});
