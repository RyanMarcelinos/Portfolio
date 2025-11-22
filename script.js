// Ryan Marcelino Portfolio - Enhanced JavaScript - Light Theme
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initParticles();
    initTrueFocusAnimation();
    initSpotlightEffect();
    initMobileMenu();
    initScrollAnimations();
    initTerminalAnimation();
    initContactForm();
    initContactItems();
    initGooeyNav();
    initSmoothScrolling();
    initParallaxEffects();
    initTypingEffects();
    
    console.log('🚀 Portfolio Ryan Marcelino carregado com sucesso!');
});

// Enhanced Background Particles Animation
function initParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 75; // Increased for more visual appeal
    
    for (let i = 0; i < particleCount; i++) {
        createParticle(particlesContainer);
    }
    
    function createParticle(container) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random properties with better distribution
        const size = Math.random() * 6 + 2;
        const startX = Math.random() * window.innerWidth;
        const duration = Math.random() * 25 + 15; // Slower animations
        const delay = Math.random() * 8;
        
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${startX}px`;
        particle.style.animationDuration = `${duration}s`;
        particle.style.animationDelay = `${delay}s`;
        
        container.appendChild(particle);
        
        // Remove and recreate particle after animation
        setTimeout(() => {
            if (particle.parentNode) {
                particle.remove();
                createParticle(container);
            }
        }, (duration + delay) * 1000);
    }
}

// Enhanced True Focus Text Animation with slower timing
function initTrueFocusAnimation() {
    const trueFocusText = document.querySelector('.true-focus-text');
    if (!trueFocusText) return;
    
    const text = trueFocusText.getAttribute('data-text') || trueFocusText.textContent;
    trueFocusText.innerHTML = '';
    
    // Split text into words and create spans
    const words = text.split(' ');
    words.forEach((word, index) => {
        const span = document.createElement('span');
        span.textContent = word;
        span.style.animationDelay = `${index * 1.2}s`; // Slower timing
        trueFocusText.appendChild(span);
        trueFocusText.appendChild(document.createTextNode(' '));
    });
    
    // Animate words with slower timing
    function animateWords() {
        const spans = trueFocusText.querySelectorAll('span');
        spans.forEach((span, index) => {
            setTimeout(() => {
                spans.forEach(s => s.classList.remove('active'));
                span.classList.add('active');
            }, index * 1200); // Much slower timing
        });
    }
    
    // Start animation
    setTimeout(() => {
        animateWords();
    }, 1000);
    
    // Repeat animation with longer intervals
    setInterval(() => {
        setTimeout(animateWords, 2000);
    }, (words.length + 1) * 1200 + 3000);
}

// Enhanced Spotlight Effect for Cards
function initSpotlightEffect() {
    const spotlightCards = document.querySelectorAll('.spotlight-card');
    
    spotlightCards.forEach(card => {
        let isHovered = false;
        
        card.addEventListener('mouseenter', () => {
            isHovered = true;
        });
        
        card.addEventListener('mouseleave', () => {
            isHovered = false;
            card.style.removeProperty('--mouse-x');
            card.style.removeProperty('--mouse-y');
        });
        
        card.addEventListener('mousemove', (e) => {
            if (!isHovered) return;
            
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });
}

// Enhanced Mobile Menu with better animations
function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navItems = document.getElementById('navItems');
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (mobileMenuBtn && navItems && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            const isHidden = mobileMenu.classList.contains('hidden');
            
            if (isHidden) {
                mobileMenu.classList.remove('hidden');
                // Add entrance animation
                setTimeout(() => {
                    mobileMenu.style.transform = 'translateY(0)';
                    mobileMenu.style.opacity = '1';
                }, 50);
            } else {
                mobileMenu.style.transform = 'translateY(-20px)';
                mobileMenu.style.opacity = '0';
                setTimeout(() => {
                    mobileMenu.classList.add('hidden');
                }, 300);
            }
            
            // Toggle icon with better animation
            const spans = mobileMenuBtn.querySelectorAll('span');
            if (isHidden) {
                spans[0].style.transform = 'rotate(45deg) translateY(7px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translateY(-7px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }
}

// Enhanced Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                
                // Animate progress bars with delay
                const progressBars = entry.target.querySelectorAll('.bg-accent-blue');
                progressBars.forEach((bar, index) => {
                    const width = bar.style.width;
                    bar.style.width = '0%';
                    setTimeout(() => {
                        bar.style.transition = 'width 2s ease-out';
                        bar.style.width = width;
                    }, 300 + (index * 200));
                });
                
                // Stagger animation for child elements
                const children = entry.target.querySelectorAll('.magic-card, .skill-badge, .tech-item, .contact-item');
                children.forEach((child, index) => {
                    setTimeout(() => {
                        child.style.opacity = '1';
                        child.style.transform = 'translateY(0)';
                    }, index * 100);
                });
            }
        });
    }, observerOptions);
    
    // Observe magic cards and other animatable elements
    document.querySelectorAll('.magic-card, .skill-badge, .tech-item, .contact-item').forEach(card => {
        card.classList.add('scroll-animate');
        card.style.opacity = '0';
        card.style.transform = 'translateY(40px)';
        card.style.transition = 'all 0.8s cubic-bezier(0.25, 0.8, 0.25, 1)';
        observer.observe(card);
    });
}

// Enhanced Terminal Animation with slower timing
function initTerminalAnimation() {
    const cmdElements = document.querySelectorAll('.cmd[data-cmd]');
    const outputs = document.querySelectorAll('.output');
    
    function typeCommand(element, callback) {
        const cmd = element.getAttribute('data-cmd');
        element.innerHTML = `<div class="cursor"></div>`;
        element.style.width = '0';
        
        let i = 0;
        const timer = setInterval(() => {
            if (i < cmd.length) {
                element.style.width = `${(i + 1) * 12}px`; // Slower character typing
                i++;
            } else {
                clearInterval(timer);
                setTimeout(callback, 800); // Longer pause
            }
        }, 150); // Slower typing speed
    }
    
    function showOutputs(outputElements) {
        outputElements.forEach((output, index) => {
            setTimeout(() => {
                output.style.opacity = '1';
                output.style.transform = 'translateY(0)';
                output.style.transition = 'all 0.6s ease-out';
            }, index * 400); // Slower stagger
        });
    }
    
    // Initialize outputs
    outputs.forEach(output => {
        output.style.opacity = '0';
        output.style.transform = 'translateY(20px)';
        output.style.transition = 'all 0.6s ease-out';
    });
    
    // Start terminal animation with delay
    if (cmdElements.length > 0) {
        setTimeout(() => {
            typeCommand(cmdElements[0], () => {
                setTimeout(() => {
                    typeCommand(cmdElements[1], () => {
                        setTimeout(() => {
                            showOutputs(outputs);
                        }, 1000); // Longer delay
                    });
                }, 1200); // Longer pause
            });
        }, 3000); // Longer initial delay
    }
}

// Enhanced Contact items with ripple effect
function initContactItems() {
    const contactItems = document.querySelectorAll('.contact-item');
    
    contactItems.forEach(item => {
        item.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('div');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(74, 144, 226, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
                z-index: 1000;
            `;
            
            this.appendChild(ripple);
            
            // Remove ripple after animation
            setTimeout(() => {
                ripple.remove();
            }, 600);
            
            // Add floating animation
            this.style.transform = 'translateX(15px) scale(1.02)';
            setTimeout(() => {
                this.style.transform = '';
            }, 200);
        });
    });
}

// Contact Form with enhanced UX
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const inputs = this.querySelectorAll('input, textarea');
            const name = inputs[0].value;
            const email = inputs[1].value;
            const subject = inputs[2].value;
            const message = inputs[3].value;
            
            // Create WhatsApp message
            const whatsappMessage = `*Olá Ryan!*\n\n` +
                `*Nome:* ${name}\n` +
                `*Email:* ${email}\n` +
                `*Assunto:* ${subject}\n\n` +
                `*Mensagem:*\n${message}`;
            
            const encodedMessage = encodeURIComponent(whatsappMessage);
            const whatsappURL = `https://wa.me/5517991629421?text=${encodedMessage}`;
            
            // Show loading state
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Redirecionando...';
            submitBtn.disabled = true;
            
            // Open WhatsApp
            setTimeout(() => {
                window.open(whatsappURL, '_blank');
                showNotification('Mensagem sendo redirecionada para WhatsApp!', 'success');
                
                // Reset form
                this.reset();
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 1500);
        });
    }
}

// Enhanced Gooey Navigation Effects
function initGooeyNav() {
    const navItems = document.querySelectorAll('.nav-item');
    const gooeyContainer = document.querySelector('.gooey-nav');
    
    navItems.forEach((item, index) => {
        item.addEventListener('mouseenter', () => {
            // Add enhanced bubble effect
            createBubbleEffect(item, gooeyContainer);
            
            // Add wave effect to the item
            item.style.transform = 'translateY(-3px) scale(1.05)';
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'translateY(0) scale(1)';
        });
        
        item.addEventListener('click', (e) => {
            // Remove active class from all items
            navItems.forEach(i => i.classList.remove('active-cyan'));
            
            // Add active class to clicked item
            item.classList.add('active-cyan');
            
            // Add ripple effect
            createRippleEffect(e, item);
        });
    });
    
    function createBubbleEffect(target, container) {
        for (let i = 0; i < 8; i++) {
            setTimeout(() => {
                const bubble = document.createElement('div');
                bubble.style.cssText = `
                    position: absolute;
                    background: var(--accent-blue);
                    border-radius: 50%;
                    pointer-events: none;
                    z-index: 10;
                    opacity: 0.6;
                    animation: bubbleFloat 0.8s ease-out forwards;
                `;
                
                const rect = target.getBoundingClientRect();
                const containerRect = container.getBoundingClientRect();
                
                bubble.style.left = `${rect.left - containerRect.left + rect.width / 2 + (Math.random() - 0.5) * 40}px`;
                bubble.style.top = `${rect.top - containerRect.top + rect.height / 2 + (Math.random() - 0.5) * 20}px`;
                bubble.style.width = `${Math.random() * 8 + 4}px`;
                bubble.style.height = bubble.style.width;
                
                container.appendChild(bubble);
                
                setTimeout(() => {
                    bubble.remove();
                }, 800);
            }, i * 50);
        }
    }
    
    function createRippleEffect(e, target) {
        const ripple = document.createElement('div');
        const rect = target.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(74, 144, 226, 0.3);
            transform: scale(0);
            animation: ripple 0.6s ease-out;
            left: ${x}px;
            top: ${y}px;
            width: ${size}px;
            height: ${size}px;
            pointer-events: none;
        `;
        
        target.style.position = 'relative';
        target.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }
}

// Smooth Scrolling with enhanced easing
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const navHeight = document.querySelector('nav').offsetHeight;
                const targetPosition = targetElement.offsetTop - navHeight - 20;
                
                // Enhanced smooth scrolling
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Update active nav item
                document.querySelectorAll('.nav-item').forEach(item => {
                    item.classList.remove('active');
                });
                link.classList.add('active');
            }
        });
    });
}

// Enhanced Notification System
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `fixed top-6 right-6 z-50 p-4 rounded-2xl shadow-2xl transform transition-all duration-500 translate-x-full backdrop-blur-lg border`;
    
    const bgColor = type === 'success' ? 'bg-green-500' : 
                   type === 'error' ? 'bg-red-500' : 'bg-blue-500';
    
    notification.classList.add(bgColor);
    notification.innerHTML = `
        <div class="flex items-center text-white">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'} mr-3 text-lg"></i>
            <span class="font-medium">${message}</span>
            <button class="ml-4 text-white hover:text-gray-200" onclick="this.parentElement.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.classList.remove('translate-x-full');
    }, 100);
    
    // Auto-remove after delay
    setTimeout(() => {
        notification.classList.add('translate-x-full');
        setTimeout(() => {
            if (notification.parentNode) {
                document.body.removeChild(notification);
            }
        }, 500);
    }, 4000);
}

// Copy Terminal Code Function with enhanced feedback
function copyTerminalCode() {
    const terminalCommands = [
        'cd ~/projetos/backend',
        'npm run start-dev'
    ];
    
    const code = terminalCommands.join('\n');
    
    navigator.clipboard.writeText(code).then(() => {
        showNotification('Comandos copiados para a área de transferência!', 'success');
        
        // Enhanced visual feedback
        const copyButton = document.querySelector('.copy-toggle');
        const originalHTML = copyButton.innerHTML;
        copyButton.innerHTML = `
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 5H7a2 2 0 0 0 -2 2v 12 a 2 2 0 0 0 2 2 h 10 a 2 2 0 0 0 2 -2 V 7 a 2 2 0 0 0 -2 -2 h -2 M 9 5 a 2 2 0 0 0 2 2 h 2 a 2 2 0 0 0 2 -2 M 9 5 a 2 2 0 0 1 2 -2 h 2 a 2 2 0 0 1 2 2 m -6 9 l 2 2 l 4 -4" stroke="#10b981" stroke-width="2"/>
            </svg>
        `;
        copyButton.style.background = 'rgba(16, 185, 129, 0.2)';
        copyButton.style.borderColor = '#10b981';
        
        setTimeout(() => {
            copyButton.innerHTML = originalHTML;
            copyButton.style.background = '';
            copyButton.style.borderColor = '';
        }, 2500);
    });
}

// Parallax Effects for enhanced visual appeal
function initParallaxEffects() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.magic-card');
        
        parallaxElements.forEach((element, index) => {
            const speed = 0.1 + (index * 0.05);
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    });
}

// Enhanced Typing Effects
function initTypingEffects() {
    const typingElements = document.querySelectorAll('[data-typing]');
    
    typingElements.forEach(element => {
        const text = element.getAttribute('data-typing');
        const speed = parseInt(element.getAttribute('data-speed')) || 100;
        
        let i = 0;
        const timer = setInterval(() => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(timer);
            }
        }, speed);
    });
}

// Add CSS for additional animations
const style = document.createElement('style');
style.textContent = `
    .nav-item.active {
        color: var(--accent-blue) !important;
        background: rgba(74, 144, 226, 0.1) !important;
        transform: translateY(-2px);
    }
    
    .nav-item.active::after {
        width: 100% !important;
    }
    
    @keyframes bubbleFloat {
        0% {
            transform: translateY(0) scale(1);
            opacity: 0.6;
        }
        100% {
            transform: translateY(-50px) scale(1.5);
            opacity: 0;
        }
    }
    
    @keyframes ripple {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
    
    .backdrop-blur-lg {
        backdrop-filter: blur(16px);
    }
    
    /* Enhanced hover states */
    .magic-card:hover .contact-item {
        transform: translateX(5px);
    }
    
    .magic-card:hover .project-image {
        transform: scale(1.05);
    }
    
    /* Loading states */
    .loading {
        position: relative;
        overflow: hidden;
    }
    
    .loading::after {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, 
            transparent, 
            rgba(74, 144, 226, 0.2), 
            transparent);
        animation: shimmer 2s infinite;
    }
    
    @keyframes shimmer {
        0% { left: -100%; }
        100% { left: 100%; }
    }
`;
document.head.appendChild(style);

// Enhanced Easter egg - Konami Code with more effects
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.code);
    
    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }
    
    if (konamiCode.join(',') === konamiSequence.join(',')) {
        activateEnhancedEasterEgg();
        konamiCode = [];
    }
});

function activateEnhancedEasterEgg() {
    showNotification('🐱 Você encontrou o segredo! Ryan ama gatos! 🐱', 'success');
    
    // Enhanced flying cats with different animations
    const catAnimations = ['flyAcross', 'spinAcross', 'bounceAcross', 'wiggleAcross'];
    
    for (let i = 0; i < 8; i++) {
        setTimeout(() => {
            createEnhancedFlyingCat(catAnimations[i % catAnimations.length]);
        }, i * 300);
    }
    
    // Add rainbow effect to the page
    document.body.style.animation = 'rainbow 3s ease-in-out';
    setTimeout(() => {
        document.body.style.animation = '';
    }, 3000);
}

function createEnhancedFlyingCat(animationType) {
    const cat = document.createElement('div');
    cat.innerHTML = '🐱';
    cat.style.cssText = `
        position: fixed;
        font-size: 40px;
        pointer-events: none;
        z-index: 1000;
        left: -60px;
        animation: ${animationType} 4s ease-in-out forwards;
    `;
    
    cat.style.top = `${Math.random() * (window.innerHeight - 100)}px`;
    document.body.appendChild(cat);
    
    setTimeout(() => {
        cat.remove();
    }, 4000);
}

// Add CSS for enhanced cat animations
const catStyle = document.createElement('style');
catStyle.textContent = `
    @keyframes flyAcross {
        0% { transform: translateX(0) rotate(0deg); }
        25% { transform: translateX(25vw) rotate(15deg); }
        50% { transform: translateX(50vw) rotate(-15deg); }
        75% { transform: translateX(75vw) rotate(10deg); }
        100% { transform: translateX(100vw) rotate(0deg); }
    }
    
    @keyframes spinAcross {
        0% { transform: translateX(0) rotate(0deg) scale(1); }
        50% { transform: translateX(50vw) rotate(180deg) scale(1.2); }
        100% { transform: translateX(100vw) rotate(360deg) scale(1); }
    }
    
    @keyframes bounceAcross {
        0% { transform: translateX(0) translateY(0); }
        25% { transform: translateX(25vw) translateY(-50px); }
        50% { transform: translateX(50vw) translateY(0); }
        75% { transform: translateX(75vw) translateY(-30px); }
        100% { transform: translateX(100vw) translateY(0); }
    }
    
    @keyframes wiggleAcross {
        0% { transform: translateX(0) rotate(0deg); }
        25% { transform: translateX(25vw) rotate(10deg); }
        37.5% { transform: translateX(37.5vw) rotate(-10deg); }
        50% { transform: translateX(50vw) rotate(10deg); }
        62.5% { transform: translateX(62.5vw) rotate(-10deg); }
        75% { transform: translateX(75vw) rotate(10deg); }
        100% { transform: translateX(100vw) rotate(0deg); }
    }
    
    @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        25% { filter: hue-rotate(90deg); }
        50% { filter: hue-rotate(180deg); }
        75% { filter: hue-rotate(270deg); }
        100% { filter: hue-rotate(360deg); }
    }
`;
document.head.appendChild(catStyle);

// Performance optimization with requestAnimationFrame
let ticking = false;

function updateScrollPosition() {
    // Update scroll-dependent animations here
    ticking = false;
}

function requestTick() {
    if (!ticking) {
        requestAnimationFrame(updateScrollPosition);
        ticking = true;
    }
}

window.addEventListener('scroll', requestTick);

// Add smooth reveal animations
function revealOnScroll() {
    const reveals = document.querySelectorAll('.scroll-animate');
    
    reveals.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
            element.classList.add('animate');
        }
    });
}

window.addEventListener('scroll', revealOnScroll);

// Initialize reveal animations
revealOnScroll();