document.addEventListener('DOMContentLoaded', () => {
    // Typewriter Effect
    const typeText = document.getElementById('type-text');
    const roles = [
        'Data Analyst',
        'Machine Learning Enthusiast',
        'Problem Solver',
        'Python Developer',
        'Visualization Expert'
    ];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;

    function type() {
        const currentRole = roles[roleIndex];
        
        if (isDeleting) {
            typeText.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 50;
        } else {
            typeText.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 150;
        }

        if (!isDeleting && charIndex === currentRole.length) {
            isDeleting = true;
            typeSpeed = 2000; // Pause at end
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typeSpeed = 500;
        }

        setTimeout(type, typeSpeed);
    }

    type();

    // Reveal Animations on Scroll
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.section, .skill-category, .project-card, .timeline-item').forEach(el => {
        el.classList.add('hide');
        observer.observe(el);
    });

    // Navbar Scroll Effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.padding = '0.5rem 0';
            navbar.style.background = 'rgba(10, 10, 10, 0.95)';
        } else {
            navbar.style.padding = '1rem 0';
            navbar.style.background = 'rgba(10, 10, 10, 0.8)';
        }
    });

    // Contact Form Handling (Simple mockup)
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            formStatus.textContent = 'Sending...';
            formStatus.style.color = '#6366f1';

            // Simulate form submission
            setTimeout(() => {
                formStatus.textContent = 'Thank you! Your message has been sent successfully.';
                formStatus.style.color = '#10b981';
                contactForm.reset();
            }, 1500);
        });
    }
});

// Add CSS for Reveal Animations
const style = document.createElement('style');
style.textContent = `
    .hide {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.8s ease-out;
    }
    .reveal {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(style);
