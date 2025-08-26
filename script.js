// DOM Elements
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeScrollAnimations();
    initializeSkillBars();
    initializeScrollProgress();
    initializeContactForm();
    initializeScrollEffects();
    
    // Failsafe: Ensure all content is visible after 1 second
    setTimeout(() => {
        ensureAllContentVisible();
    }, 1000);
});

// Failsafe function to ensure all content is visible
function ensureAllContentVisible() {
    // Force visibility on all potentially hidden elements
    const hiddenElements = document.querySelectorAll('[class*="slide-in"]:not(.visible), [class*="fade-in"]:not(.visible)');
    hiddenElements.forEach(element => {
        element.classList.add('visible');
    });
    
    // Specifically ensure about and contact sections are visible
    const criticalSections = [
        '.about-text', '.about-card', 
        '.contact-card', '.contact-form-container',
        '.section-header', '.skill-category', 
        '.project-card', '.timeline-content'
    ];
    
    criticalSections.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(element => {
            element.style.opacity = '1';
            element.style.transform = 'translateX(0) translateY(0)';
            element.classList.add('visible');
        });
    });
}

// Navigation functionality
function initializeNavigation() {
    // Mobile menu toggle
    hamburger.addEventListener('click', toggleMobileMenu);
    
    // Close mobile menu when clicking on nav links
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            closeMobileMenu();
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navbar.contains(e.target)) {
            closeMobileMenu();
        }
    });
    
    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Update active navigation link on scroll
    window.addEventListener('scroll', updateActiveNavLink);
}

function toggleMobileMenu() {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
    
    // Animate hamburger bars
    const bars = hamburger.querySelectorAll('.bar');
    bars.forEach((bar, index) => {
        if (hamburger.classList.contains('active')) {
            if (index === 0) bar.style.transform = 'rotate(45deg) translate(5px, 5px)';
            if (index === 1) bar.style.opacity = '0';
            if (index === 2) bar.style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            bar.style.transform = 'none';
            bar.style.opacity = '1';
        }
    });
}

function closeMobileMenu() {
    navMenu.classList.remove('active');
    hamburger.classList.remove('active');
    
    const bars = hamburger.querySelectorAll('.bar');
    bars.forEach(bar => {
        bar.style.transform = 'none';
        bar.style.opacity = '1';
    });
}

function updateActiveNavLink() {
    const scrollPosition = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// Scroll animations using Intersection Observer
function initializeScrollAnimations() {
    // Add animation classes to elements first
    addAnimationClasses();
    
    // Only observe elements that have the animate-on-scroll class
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

function addAnimationClasses() {
    // Add fade-in animation to section headers (with scroll animation)
    document.querySelectorAll('.section-header').forEach(header => {
        header.classList.add('fade-in', 'animate-on-scroll');
    });
    
    // Add slide-in animations to cards and content (with scroll animation)
    document.querySelectorAll('.skill-category').forEach((category, index) => {
        category.classList.add(index % 2 === 0 ? 'slide-in-left' : 'slide-in-right', 'animate-on-scroll');
    });
    
    document.querySelectorAll('.project-card').forEach(card => {
        card.classList.add('fade-in', 'animate-on-scroll');
    });
    
    document.querySelectorAll('.timeline-content').forEach((content, index) => {
        content.classList.add(index % 2 === 0 ? 'slide-in-left' : 'slide-in-right', 'animate-on-scroll');
    });
    
    // Add animation classes to about section elements (always visible, no hiding)
    const aboutText = document.querySelector('.about-text');
    const aboutCard = document.querySelector('.about-card');
    const contactCard = document.querySelector('.contact-card');
    const contactForm = document.querySelector('.contact-form-container');
    
    if (aboutText) {
        aboutText.classList.add('slide-in-left');
        aboutText.classList.add('visible'); // Force visible
    }
    if (aboutCard) {
        aboutCard.classList.add('slide-in-right');
        aboutCard.classList.add('visible'); // Force visible
    }
    if (contactCard) {
        contactCard.classList.add('slide-in-left');
        contactCard.classList.add('visible'); // Force visible
    }
    if (contactForm) {
        contactForm.classList.add('slide-in-right');
        contactForm.classList.add('visible'); // Force visible
    }
}

// Skill bar animations
function initializeSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillBar = entry.target;
                const progress = skillBar.getAttribute('data-progress');
                
                // Animate skill bar
                setTimeout(() => {
                    skillBar.style.width = progress + '%';
                }, 200);
            }
        });
    }, { threshold: 0.5 });
    
    skillBars.forEach(bar => {
        skillObserver.observe(bar);
    });
}

// Scroll progress indicator
function initializeScrollProgress() {
    // Create scroll progress bar
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

// Navbar scroll effects
function initializeScrollEffects() {
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add scrolled class for backdrop blur effect
        if (scrollTop > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        lastScrollTop = scrollTop;
    });
}

// Contact form handling
function initializeContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
    }
}

function handleFormSubmit(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(e.target);
    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        subject: formData.get('subject'),
        message: formData.get('message')
    };
    
    // Validate form
    if (!validateForm(data)) {
        return;
    }
    
    // Show loading state
    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    // Simulate form submission (replace with actual form handling)
    setTimeout(() => {
        showSuccessMessage();
        e.target.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }, 2000);
}

function validateForm(data) {
    const errors = [];
    
    if (!data.name || data.name.trim().length < 2) {
        errors.push('Name must be at least 2 characters long');
    }
    
    if (!data.email || !isValidEmail(data.email)) {
        errors.push('Please enter a valid email address');
    }
    
    if (!data.subject || data.subject.trim().length < 5) {
        errors.push('Subject must be at least 5 characters long');
    }
    
    if (!data.message || data.message.trim().length < 10) {
        errors.push('Message must be at least 10 characters long');
    }
    
    if (errors.length > 0) {
        showErrorMessage(errors.join(', '));
        return false;
    }
    
    return true;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showSuccessMessage() {
    showMessage('Thank you for your message! I\'ll get back to you soon.', 'success');
}

function showErrorMessage(message) {
    showMessage(message, 'error');
}

function showMessage(message, type) {
    // Remove existing messages
    const existingMessages = document.querySelectorAll('.form-message');
    existingMessages.forEach(msg => msg.remove());
    
    // Create message element
    const messageEl = document.createElement('div');
    messageEl.className = `form-message form-message-${type}`;
    messageEl.textContent = message;
    
    // Style the message
    messageEl.style.cssText = `
        padding: 1rem;
        margin: 1rem 0;
        border-radius: 8px;
        font-weight: 500;
        animation: slideIn 0.3s ease;
        ${type === 'success' 
            ? 'background: #dcfce7; color: #166534; border: 1px solid #bbf7d0;' 
            : 'background: #fef2f2; color: #dc2626; border: 1px solid #fecaca;'
        }
    `;
    
    // Insert message
    const form = document.getElementById('contactForm');
    form.insertBefore(messageEl, form.firstChild);
    
    // Remove message after 5 seconds
    setTimeout(() => {
        if (messageEl.parentNode) {
            messageEl.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => messageEl.remove(), 300);
        }
    }, 5000);
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Add smooth scrolling to all anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', throttle(() => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        const rate = scrolled * -0.5;
        hero.style.transform = `translateY(${rate}px)`;
    }
}, 10));

// Add hover effects to project cards
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Add hover effects to skill categories
document.querySelectorAll('.skill-category').forEach(category => {
    category.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px) scale(1.02)';
    });
    
    category.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Add copy email functionality
const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
emailLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const email = this.getAttribute('href').replace('mailto:', '');
        
        if (navigator.clipboard) {
            navigator.clipboard.writeText(email).then(() => {
                showMessage('Email address copied to clipboard!', 'success');
            });
        } else {
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = email;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            showMessage('Email address copied to clipboard!', 'success');
        }
    });
});

// Add animation keyframes dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { opacity: 0; transform: translateY(-20px); }
        to { opacity: 1; transform: translateY(0); }
    }
    
    @keyframes slideOut {
        from { opacity: 1; transform: translateY(0); }
        to { opacity: 0; transform: translateY(-20px); }
    }
    
    .form-message {
        animation: slideIn 0.3s ease;
    }
`;
document.head.appendChild(style);

// Performance optimization: Use passive event listeners for scroll events
if (typeof window.addEventListener === 'function') {
    window.addEventListener('scroll', updateActiveNavLink, { passive: true });
    window.addEventListener('scroll', initializeScrollProgress, { passive: true });
}

// Print-friendly styles
const printStyles = `
    @media print {
        .navbar, .hamburger, .hero-buttons, .contact-form-container, .footer {
            display: none !important;
        }
        
        .hero {
            min-height: auto;
            padding: 2rem 0;
        }
        
        section {
            page-break-inside: avoid;
            padding: 1rem 0;
        }
        
        .project-card, .skill-category, .timeline-content {
            page-break-inside: avoid;
        }
    }
`;

const printStyleSheet = document.createElement('style');
printStyleSheet.textContent = printStyles;
document.head.appendChild(printStyleSheet);