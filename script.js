
// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});



// Contact form handling
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const name = formData.get('name');
    const email = formData.get('email');
    const subject = formData.get('subject');
    const message = formData.get('message');
    
    // Simple validation
    if (!name || !email || !subject || !message) {
        showNotification('Please fill in all fields', 'error');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showNotification('Please enter a valid email address', 'error');
        return;
    }
    
    // Simulate form submission
    showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
    contactForm.reset();
});

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        z-index: 10000;
        max-width: 400px;
        animation: slideInRight 0.3s ease-out;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOutRight 0.3s ease-in';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }
    }, 5000);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.animation = 'slideOutRight 0.3s ease-in';
        setTimeout(() => {
            notification.remove();
        }, 300);
    });
}

// Add CSS for notifications
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        padding: 0;
        line-height: 1;
    }
    
    .notification-close:hover {
        opacity: 0.8;
    }
`;
document.head.appendChild(notificationStyles);

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.skill-category, .project-card, .stat');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Typing animation removed to preserve HTML formatting

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Add CSS for loading animation
const loadingStyles = document.createElement('style');
loadingStyles.textContent = `
    body {
        opacity: 0;
        transition: opacity 0.5s ease;
    }
    
    body.loaded {
        opacity: 1;
    }
`;
document.head.appendChild(loadingStyles);

// Motivational Quotes System
const quotes = [
    {
        text: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
        author: "Winston S. Churchill"
    }
];

let currentQuoteIndex = 0;
let quoteInterval;

// Quote elements
const quoteText = document.getElementById('quote-text');
const quoteAuthor = document.getElementById('quote-author');
const quoteDots = document.getElementById('quote-dots');
const prevBtn = document.getElementById('prev-quote');
const nextBtn = document.getElementById('next-quote');

// Initialize quotes
function initQuotes() {
    if (!quoteText || !quoteAuthor || !quoteDots) return;
    
    // Since we only have one quote, hide the navigation controls
    const quoteControls = document.querySelector('.quote-controls');
    if (quoteControls && quotes.length === 1) {
        quoteControls.style.display = 'none';
    }
    
    // Create dots only if we have multiple quotes
    if (quotes.length > 1) {
        quotes.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.className = 'quote-dot';
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToQuote(index));
            quoteDots.appendChild(dot);
        });
        
        // Add event listeners
        if (prevBtn) prevBtn.addEventListener('click', prevQuote);
        if (nextBtn) nextBtn.addEventListener('click', nextQuote);
        
        // Start auto-rotation
        startQuoteRotation();
    }
}

// Display quote with animation
function displayQuote(index) {
    if (!quoteText || !quoteAuthor) return;
    
    const quote = quotes[index];
    
    // Add fade animation
    quoteText.classList.add('quote-fade-in');
    quoteAuthor.classList.add('quote-fade-in');
    
    // Update content
    quoteText.textContent = `"${quote.text}"`;
    quoteAuthor.textContent = `- ${quote.author}`;
    
    // Update dots
    document.querySelectorAll('.quote-dot').forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
    });
    
    // Remove animation class after animation completes
    setTimeout(() => {
        quoteText.classList.remove('quote-fade-in');
        quoteAuthor.classList.remove('quote-fade-in');
    }, 500);
}

// Go to specific quote
function goToQuote(index) {
    currentQuoteIndex = index;
    displayQuote(currentQuoteIndex);
    resetQuoteRotation();
}

// Next quote
function nextQuote() {
    currentQuoteIndex = (currentQuoteIndex + 1) % quotes.length;
    displayQuote(currentQuoteIndex);
    resetQuoteRotation();
}

// Previous quote
function prevQuote() {
    currentQuoteIndex = currentQuoteIndex === 0 ? quotes.length - 1 : currentQuoteIndex - 1;
    displayQuote(currentQuoteIndex);
    resetQuoteRotation();
}

// Start auto-rotation
function startQuoteRotation() {
    quoteInterval = setInterval(() => {
        nextQuote();
    }, 5000); // Change quote every 5 seconds
}

// Reset rotation timer
function resetQuoteRotation() {
    clearInterval(quoteInterval);
    startQuoteRotation();
}

// Pause rotation on hover
function pauseQuoteRotation() {
    clearInterval(quoteInterval);
}

// Resume rotation when not hovering
function resumeQuoteRotation() {
    startQuoteRotation();
}

// Initialize quotes when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initQuotes();
    
    // Pause rotation on hover
    const quotesContainer = document.querySelector('.quotes-container');
    if (quotesContainer) {
        quotesContainer.addEventListener('mouseenter', pauseQuoteRotation);
        quotesContainer.addEventListener('mouseleave', resumeQuoteRotation);
    }
    
    // Initialize interactive background
    initInteractiveBackground();
    
    // Initialize analytics tracking
    initAnalytics();
});

// Interactive Background Functions
function initInteractiveBackground() {
    const mouseTrail = document.querySelector('.mouse-trail');
    const shapes = document.querySelectorAll('.shape');
    let mouseX = 0;
    let mouseY = 0;
    let trailX = 0;
    let trailY = 0;
    let isMouseMoving = false;
    let mouseTimeout;

    // Mouse movement tracking
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Show trail
        if (mouseTrail) {
            mouseTrail.style.opacity = '1';
            mouseTrail.style.left = mouseX - 10 + 'px';
            mouseTrail.style.top = mouseY - 10 + 'px';
        }
        
        // Update shapes to follow mouse
        shapes.forEach((shape, index) => {
            const speed = (index + 1) * 0.02;
            const offsetX = (mouseX - window.innerWidth / 2) * speed;
            const offsetY = (mouseY - window.innerHeight / 2) * speed;
            
            shape.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
        });
        
        isMouseMoving = true;
        
        // Hide trail after mouse stops moving
        clearTimeout(mouseTimeout);
        mouseTimeout = setTimeout(() => {
            if (mouseTrail) {
                mouseTrail.style.opacity = '0';
            }
        }, 1000);
    });

    // Mouse leave - hide trail
    document.addEventListener('mouseleave', () => {
        if (mouseTrail) {
            mouseTrail.style.opacity = '0';
        }
    });

    // Smooth trail following
    function animateTrail() {
        trailX += (mouseX - trailX) * 0.1;
        trailY += (mouseY - trailY) * 0.1;
        
        if (mouseTrail && isMouseMoving) {
            mouseTrail.style.left = trailX - 10 + 'px';
            mouseTrail.style.top = trailY - 10 + 'px';
        }
        
        requestAnimationFrame(animateTrail);
    }
    
    animateTrail();

    // Add click effects
    document.addEventListener('click', (e) => {
        createClickEffect(e.clientX, e.clientY);
    });

    // Parallax effect on scroll
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        shapes.forEach((shape, index) => {
            const speed = (index + 1) * 0.1;
            shape.style.transform += ` translateY(${rate * speed}px)`;
        });
    });
}

// Click effect function
function createClickEffect(x, y) {
    const effect = document.createElement('div');
    effect.className = 'click-effect';
    effect.style.left = x + 'px';
    effect.style.top = y + 'px';
    
    // Add CSS for click effect
    if (!document.querySelector('#click-effect-style')) {
        const style = document.createElement('style');
        style.id = 'click-effect-style';
        style.textContent = `
            .click-effect {
                position: fixed;
                width: 4px;
                height: 4px;
                background: radial-gradient(circle, rgba(255,255,255,0.8) 0%, transparent 70%);
                border-radius: 50%;
                pointer-events: none;
                z-index: 1000;
                animation: clickPulse 0.6s ease-out forwards;
            }
            
            @keyframes clickPulse {
                0% {
                    transform: scale(0);
                    opacity: 1;
                }
                100% {
                    transform: scale(20);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(effect);
    
    // Remove effect after animation
    setTimeout(() => {
        if (effect.parentNode) {
            effect.parentNode.removeChild(effect);
        }
    }, 600);
}

// Analytics Functions
function initAnalytics() {
    // Track social link clicks
    const socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const platform = getPlatformName(link.href);
            trackEvent('social_click', {
                platform: platform,
                url: link.href
            });
        });
    });
    
    // Track email button clicks
    const emailBtn = document.querySelector('.email-btn');
    if (emailBtn) {
        emailBtn.addEventListener('click', () => {
            trackEvent('contact_click', {
                action: 'email_button',
                value: 'shubhns.dev@gmail.com'
            });
        });
    }
    
    // Track resume downloads
    const resumeLink = document.querySelector('a[href*="resume"]');
    if (resumeLink) {
        resumeLink.addEventListener('click', () => {
            trackEvent('file_download', {
                file_name: 'Shubh_Narayan_Sharma_resume.pdf',
                file_type: 'pdf'
            });
        });
    }
    
    // Track page engagement time
    let startTime = Date.now();
    let maxScroll = 0;
    
    // Track scroll depth
    window.addEventListener('scroll', () => {
        const scrollPercent = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
        if (scrollPercent > maxScroll) {
            maxScroll = scrollPercent;
            trackEvent('scroll_depth', {
                scroll_percent: scrollPercent
            });
        }
    });
    
    // Track time on page when user leaves
    window.addEventListener('beforeunload', () => {
        const timeOnPage = Math.round((Date.now() - startTime) / 1000);
        trackEvent('page_engagement', {
            time_on_page: timeOnPage,
            max_scroll: maxScroll
        });
    });
    
    // Track interactive background interactions
    document.addEventListener('click', (e) => {
        trackEvent('interaction', {
            type: 'click',
            x: e.clientX,
            y: e.clientY
        });
    });
}

function getPlatformName(url) {
    if (url.includes('github.com')) return 'GitHub';
    if (url.includes('linkedin.com')) return 'LinkedIn';
    if (url.includes('instagram.com')) return 'Instagram';
    if (url.includes('resume') || url.includes('.pdf')) return 'Resume';
    return 'Unknown';
}

function trackEvent(eventName, parameters = {}) {
    // Check if gtag is available
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, parameters);
    }
    
    // Also log to console for debugging
    console.log('Analytics Event:', eventName, parameters);
}

// Enhanced page view tracking
function trackPageView() {
    if (typeof gtag !== 'undefined') {
        gtag('event', 'page_view', {
            page_title: document.title,
            page_location: window.location.href,
            page_path: window.location.pathname
        });
    }
}
