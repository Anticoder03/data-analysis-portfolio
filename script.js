document.addEventListener('DOMContentLoaded', () => {
    // 1. Typewriter Effect
    const typeText = document.getElementById('type-text');
    const roles = [
        'Data Analyst',
        'Full Stack Developer',
        'ML Specialist',
        'Python Developer',
        'Insight Generator'
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
            typeSpeed = 2000;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typeSpeed = 500;
        }

        setTimeout(type, typeSpeed);
    }

    if (typeText) type();

    // 2. Navbar Scroll Effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 3. Contact Form Handling
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('.btn-submit');
            const originalBtnText = btn.innerHTML;
            const formData = new FormData(contactForm);
            
            btn.disabled = true;
            btn.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i> Sending...';
            
            try {
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: formData,
                    headers: { 'Accept': 'application/json' }
                });

                if (response.ok) {
                    formStatus.textContent = 'Message Sent Successfully!';
                    formStatus.style.color = '#3b82f6';
                    btn.innerHTML = '<i class="fas fa-check"></i> Sent';
                    contactForm.reset();
                } else {
                    throw new Error('Failed to send');
                }
            } catch (error) {
                formStatus.textContent = 'Error. Please try again.';
                formStatus.style.color = '#ef4444';
                btn.innerHTML = 'Error';
            } finally {
                setTimeout(() => {
                    btn.disabled = false;
                    btn.innerHTML = originalBtnText;
                    formStatus.textContent = '';
                }, 4000);
            }
        });
    }

    // 4. Interactive Background (Simplified)
    const blobs = document.querySelectorAll('.bg-blob');
    if (blobs.length > 0 && typeof gsap !== 'undefined') {
        document.addEventListener('mousemove', (e) => {
            const { clientX, clientY } = e;
            const x = (clientX / window.innerWidth - 0.5) * 30;
            const y = (clientY / window.innerHeight - 0.5) * 30;

            blobs.forEach((blob, index) => {
                const factor = (index + 1) * 0.4;
                gsap.to(blob, {
                    x: x * factor,
                    y: y * factor,
                    duration: 1.2,
                    ease: 'power1.out'
                });
            });
        });
    }
});
