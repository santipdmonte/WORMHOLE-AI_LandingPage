// Scroll animation for header
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        header.style.background = 'rgba(13, 11, 38, 0.95)';
    } else {
        header.style.background = 'rgba(13, 11, 38, 0.8)';
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 100,
                behavior: 'smooth'
            });
        }
    });
});

// Animation for glass cards on scroll
const animateOnScroll = () => {
    const cards = document.querySelectorAll('.glass-card');
    
    cards.forEach(card => {
        const cardTop = card.getBoundingClientRect().top;
        const triggerPoint = window.innerHeight * 0.8;
        
        if (cardTop < triggerPoint) {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }
    });
};

// Set initial styles for animation
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.glass-card');
    
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // Initial check for elements in view
    animateOnScroll();
    
    // Listen for scroll events
    window.addEventListener('scroll', animateOnScroll);
    
    // Enhanced text animation control with smoother transition
    const changingText = document.querySelector('.changing-text');
    if (changingText) {
        // Store the original text - ensure no extra spaces
        const originalText = changingText.textContent.trim();
        const alternateText = 'Money';
        
        // Set initial text with no spaces
        changingText.textContent = originalText;
        
        // Create container with fixed width to prevent layout shifts
        changingText.style.display = 'inline-block';
        const width = Math.max(
            getTextWidth(originalText, getComputedStyle(changingText).font),
            getTextWidth(alternateText, getComputedStyle(changingText).font)
        );
        changingText.style.width = `${width + 5}px`; // Add small buffer
        changingText.style.textAlign = 'left'; // Change from center to left alignment
        
        // Set up the animation with fade effect
        let isShowingOriginal = true;
        
        const toggleText = () => {
            // Fade out
            changingText.style.opacity = '0';
            
            setTimeout(() => {
                // Change text while invisible
                changingText.textContent = isShowingOriginal ? alternateText : originalText;
                changingText.style.color = isShowingOriginal ? 'var(--secondary-color)' : 'var(--primary-color)';
                isShowingOriginal = !isShowingOriginal;
                
                // Fade in
                changingText.style.opacity = '1';
            }, 300); // Half of the transition time
        };
        
        // Start the animation
        setInterval(toggleText, 3000); // Longer interval for better readability
    }
    
    // Helper function to calculate text width
    function getTextWidth(text, font) {
        const canvas = getTextWidth.canvas || (getTextWidth.canvas = document.createElement('canvas'));
        const context = canvas.getContext('2d');
        context.font = font;
        const metrics = context.measureText(text);
        return metrics.width;
    }
    
    // Adjust hero content layout for best appearance
    const heroContentH1Elements = document.querySelectorAll('.hero-content h1');
    if (heroContentH1Elements.length > 0) {
        heroContentH1Elements.forEach(h1 => {
            h1.style.lineHeight = '1.1';
        });
    }
}); 