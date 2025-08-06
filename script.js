// Hello World Interactive Elements
document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    const helloText = document.querySelector('.hello-text');
    const subtitle = document.querySelector('.subtitle');
    const ctaButton = document.querySelector('.cta-button');
    const container = document.querySelector('.container');

    // Animation delays
    let animationDelay = 100;

    // Initialize animations
    function initializeAnimations() {
        // Animate hello text
        if (helloText) {
            setTimeout(() => {
                helloText.style.opacity = '1';
                helloText.style.transform = 'translateY(0)';
            }, animationDelay);
        }

        // Animate subtitle
        if (subtitle) {
            setTimeout(() => {
                subtitle.style.opacity = '1';
                subtitle.style.transform = 'translateY(0)';
            }, animationDelay + 200);
        }

        // Animate CTA button
        if (ctaButton) {
            setTimeout(() => {
                ctaButton.style.opacity = '1';
                ctaButton.style.transform = 'translateY(0)';
            }, animationDelay + 400);
        }
    }

    // Button click handler
    function handleButtonClick() {
        // Create celebration effect
        createConfetti();
        
        // Update text content
        if (helloText) {
            helloText.textContent = 'Welcome to the World! 🌍';
            helloText.style.color = '#4CAF50';
        }
        
        if (subtitle) {
            subtitle.textContent = 'Thanks for clicking! You\'ve made this page interactive.';
        }

        // Change button state
        if (ctaButton) {
            ctaButton.textContent = 'Clicked! ✨';
            ctaButton.style.background = 'linear-gradient(135deg, #4CAF50, #45a049)';
            ctaButton.disabled = true;
            
            // Re-enable button after 3 seconds
            setTimeout(() => {
                ctaButton.textContent = 'Click Me Again!';
                ctaButton.style.background = 'linear-gradient(135deg, #667eea, #764ba2)';
                ctaButton.disabled = false;
            }, 3000);
        }
    }

    // Create confetti effect
    function createConfetti() {
        const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3'];
        const confettiCount = 50;

        for (let i = 0; i < confettiCount; i++) {
            setTimeout(() => {
                createConfettiPiece(colors[Math.floor(Math.random() * colors.length)]);
            }, i * 10);
        }
    }

    // Create individual confetti piece
    function createConfettiPiece(color) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.cssText = `
            position: fixed;
            width: 6px;
            height: 6px;
            background: ${color};
            left: ${Math.random() * window.innerWidth}px;
            top: -10px;
            border-radius: 50%;
            pointer-events: none;
            z-index: 1000;
            animation: confettiFall ${2 + Math.random() * 3}s linear forwards;
        `;

        document.body.appendChild(confetti);

        // Remove confetti after animation
        setTimeout(() => {
            if (confetti.parentNode) {
                confetti.parentNode.removeChild(confetti);
            }
        }, 5000);
    }

    // Add confetti animation styles
    function addConfettiStyles() {
        if (!document.getElementById('confetti-styles')) {
            const style = document.createElement('style');
            style.id = 'confetti-styles';
            style.textContent = `
                @keyframes confettiFall {
                    0% {
                        transform: translateY(-10px) rotate(0deg);
                        opacity: 1;
                    }
                    100% {
                        transform: translateY(${window.innerHeight + 10}px) rotate(360deg);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }

    // Mouse movement parallax effect
    function handleMouseMove(e) {
        if (container) {
            const { clientX, clientY } = e;
            const { innerWidth, innerHeight } = window;
            
            const xPos = (clientX / innerWidth - 0.5) * 20;
            const yPos = (clientY / innerHeight - 0.5) * 20;
            
            container.style.transform = `translate(${xPos}px, ${yPos}px)`;
        }
    }

    // Keyboard accessibility
    function handleKeyPress(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            if (document.activeElement === ctaButton) {
                e.preventDefault();
                handleButtonClick();
            }
        }
    }

    // Responsive text sizing
    function adjustTextSize() {
        if (helloText) {
            const viewportWidth = window.innerWidth;
            let fontSize;
            
            if (viewportWidth < 480) {
                fontSize = '2.5rem';
            } else if (viewportWidth < 768) {
                fontSize = '3.5rem';
            } else {
                fontSize = '4rem';
            }
            
            helloText.style.fontSize = fontSize;
        }
    }

    // Theme toggle functionality
    function toggleTheme() {
        document.body.classList.toggle('dark-theme');
        localStorage.setItem('theme', document.body.classList.contains('dark-theme') ? 'dark' : 'light');
    }

    // Load saved theme
    function loadTheme() {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            document.body.classList.add('dark-theme');
        }
    }

    // Error handling wrapper
    function safeExecute(fn, errorMessage) {
        try {
            fn();
        } catch (error) {
            console.warn(errorMessage, error);
        }
    }

    // Event listeners
    if (ctaButton) {
        ctaButton.addEventListener('click', handleButtonClick);
        ctaButton.addEventListener('keydown', handleKeyPress);
    }

    // Throttled mouse move handler
    let mouseTimeout;
    document.addEventListener('mousemove', (e) => {
        clearTimeout(mouseTimeout);
        mouseTimeout = setTimeout(() => handleMouseMove(e), 16); // ~60fps
    });

    // Window resize handler
    window.addEventListener('resize', adjustTextSize);

    // Initialize everything
    safeExecute(() => {
        loadTheme();
        addConfettiStyles();
        adjustTextSize();
        initializeAnimations();
    }, 'Error during initialization:');

    // Add some interactive hover effects
    if (helloText) {
        helloText.addEventListener('mouseenter', () => {
            helloText.style.textShadow = '0 0 20px rgba(102, 126, 234, 0.5)';
        });
        
        helloText.addEventListener('mouseleave', () => {
            helloText.style.textShadow = 'none';
        });
    }

    // Performance monitoring
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
            }
        });
    });

    // Observe elements for scroll animations
    document.querySelectorAll('.container > *').forEach(el => {
        observer.observe(el);
    });
});