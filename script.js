
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
});
