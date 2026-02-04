// ====================================
// Navigation & Scroll Effects
// ====================================

// Navigation elements
const navbar = document.getElementById('navbar');
const mobileToggle = document.getElementById('mobile-toggle');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const backToTopBtn = document.getElementById('back-to-top');

// Navbar scroll effect
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Add shadow when scrolled
    if (currentScroll > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Back to top button visibility
    if (currentScroll > 300) {
        backToTopBtn.classList.add('visible');
    } else {
        backToTopBtn.classList.remove('visible');
    }
    
    lastScroll = currentScroll;
});

// Mobile menu toggle
mobileToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    
    // Animate hamburger icon
    const spans = mobileToggle.querySelectorAll('span');
    if (navMenu.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translateY(8px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translateY(-8px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

// Smooth scroll for navigation links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 70; // Account for navbar height
            
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            navMenu.classList.remove('active');
            const spans = mobileToggle.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
});

// Active navigation link on scroll
function setActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', setActiveNavLink);

// Back to top button
backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ====================================
// Contact Form Handling
// ====================================

const contactForm = document.getElementById('contact-form');
const formMessage = document.getElementById('form-message');

// Form validation only - Formspree handles submission
contactForm.addEventListener('submit', (e) => {
    // Show loading state
    const submitBtn = contactForm.querySelector('.btn-submit');
    const originalBtnText = submitBtn.textContent;
    submitBtn.textContent = '送信中...';
    submitBtn.disabled = true;
    
    // Allow form to submit naturally to Formspree
    // No e.preventDefault() - let the browser handle the POST request
});

// ====================================
// Form Validation Enhancement
// ====================================

const formInputs = contactForm.querySelectorAll('input, textarea, select');

formInputs.forEach(input => {
    // Real-time validation feedback
    input.addEventListener('blur', () => {
        validateField(input);
    });
    
    input.addEventListener('input', () => {
        if (input.classList.contains('error')) {
            validateField(input);
        }
    });
});

function validateField(field) {
    const value = field.value.trim();
    const isRequired = field.hasAttribute('required');
    
    if (isRequired && !value) {
        field.style.borderColor = '#ef4444';
        return false;
    }
    
    // Email validation
    if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            field.style.borderColor = '#ef4444';
            return false;
        }
    }
    
    // If validation passes
    field.style.borderColor = '#10b981';
    setTimeout(() => {
        field.style.borderColor = '';
    }, 2000);
    
    return true;
}

// ====================================
// Intersection Observer for Animations
// ====================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all cards and sections
const animatedElements = document.querySelectorAll(
    '.why-card, .result-card, .pillar-card, .service-detail-card, .about-message, .company-info-card'
);

animatedElements.forEach(element => {
    observer.observe(element);
});

// ====================================
// Hero Stats Animation
// ====================================

function animateValue(element, start, end, duration, suffix = '') {
    const range = end - start;
    const increment = range / (duration / 16); // 60 FPS
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
            current = end;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current) + suffix;
    }, 16);
}

// Animate stats when hero section is in view
const heroSection = document.querySelector('.hero');
let statsAnimated = false;

const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !statsAnimated) {
            const statNumbers = document.querySelectorAll('.stat-number');
            
            // Animate each stat
            setTimeout(() => {
                // +10~15% becomes 10
                const stat1 = statNumbers[0];
                animateValue(stat1, 0, 15, 1500, '%');
                stat1.textContent = '+10～15%'; // Override after animation
            }, 200);
            
            setTimeout(() => {
                // +20%
                const stat2 = statNumbers[1];
                animateValue(stat2, 0, 20, 1500, '%');
                stat2.textContent = '+20%'; // Ensure correct format
            }, 400);
            
            setTimeout(() => {
                // 3ヶ月
                const stat3 = statNumbers[2];
                animateValue(stat3, 0, 3, 1000, 'ヶ月');
            }, 600);
            
            statsAnimated = true;
        }
    });
}, { threshold: 0.5 });

heroObserver.observe(heroSection);

// ====================================
// Smooth Reveal for Service Details
// ====================================

const serviceDetails = document.querySelectorAll('.service-detail-card');

serviceDetails.forEach((detail, index) => {
    detail.style.opacity = '0';
    detail.style.transform = 'translateY(30px)';
    detail.style.transition = 'all 0.6s ease';
});

const serviceObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 100);
            serviceObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

serviceDetails.forEach(detail => {
    serviceObserver.observe(detail);
});

// ====================================
// Utility Functions
// ====================================

// Debounce function for performance optimization
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

// ====================================
// Page Load Effects
// ====================================

window.addEventListener('load', () => {
    // Add loaded class to body for CSS transitions
    document.body.classList.add('loaded');
    
    // Set initial active nav link
    setActiveNavLink();
    
    console.log('MIトラスト合同会社 ウェブサイト initialized successfully');
});

// ====================================
// External Link Handling
// ====================================

document.querySelectorAll('a[href^="http"]').forEach(link => {
    // Don't add target="_blank" to phone and email links
    if (!link.href.includes('tel:') && !link.href.includes('mailto:')) {
        link.setAttribute('target', '_blank');
        link.setAttribute('rel', 'noopener noreferrer');
    }
});

// ====================================
// Keyboard Navigation Accessibility
// ====================================

document.addEventListener('keydown', (e) => {
    // ESC key closes mobile menu
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        const spans = mobileToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

// ====================================
// Performance Monitoring (Development)
// ====================================

if (window.performance && window.performance.timing) {
    window.addEventListener('load', () => {
        setTimeout(() => {
            const perfData = window.performance.timing;
            const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
            console.log(`Page load time: ${pageLoadTime}ms`);
        }, 0);
    });
}
