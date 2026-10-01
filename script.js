document.addEventListener('DOMContentLoaded', () => {
    // 1. Header Scroll Effect
    const header = document.querySelector('header');
    const handleScroll = () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check on load

    // 2. Mobile Navigation Menu Toggle
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const body = document.body;

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            menuToggle.classList.toggle('open');
            // Toggle hamburger icon animation
            const bars = menuToggle.querySelectorAll('.bar');
            if (menuToggle.classList.contains('open')) {
                bars[0].style.transform = 'rotate(45deg) translate(5px, 6px)';
                bars[1].style.transform = 'rotate(-45deg) translate(5px, -6px)';
            } else {
                bars[0].style.transform = 'none';
                bars[1].style.transform = 'none';
            }
        });

        // Close mobile menu when links are clicked
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                menuToggle.classList.remove('open');
                const bars = menuToggle.querySelectorAll('.bar');
                bars[0].style.transform = 'none';
                bars[1].style.transform = 'none';
            });
        });
    }

    // 3. Scroll Reveal Animation using IntersectionObserver
    const revealElements = [
        '.section-header',
        '.about-image-wrapper',
        '.about-text-content',
        '.project-card',
        '.timeline-item',
        '.contact-card'
    ];

    // Select elements and prepare them for reveal
    const elementsToReveal = [];
    revealElements.forEach(selector => {
        document.querySelectorAll(selector).forEach(el => {
            el.classList.add('reveal-item');
            elementsToReveal.push(el);
        });
    });

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Once visible, we can unobserve
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px' // Trigger slightly before element enters viewport
    });

    elementsToReveal.forEach(el => {
        revealObserver.observe(el);
    });

    // 4. Copy Email Address to Clipboard Interaction
    const emailBtn = document.getElementById('email-btn');
    const copiedTooltip = document.getElementById('copied-tooltip');
    
    if (emailBtn && copiedTooltip) {
        emailBtn.addEventListener('click', () => {
            const email = document.getElementById('email-address').textContent.trim();
            
            navigator.clipboard.writeText(email).then(() => {
                // Show tooltip
                copiedTooltip.classList.add('show');
                
                // Hide after 2 seconds
                setTimeout(() => {
                    copiedTooltip.classList.remove('show');
                }, 2000);
            }).catch(err => {
                console.error('Could not copy email: ', err);
            });
        });
    }

    // 5. Active Link Highlighting in Navigation
    const navItems = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');

    const updateActiveNav = () => {
        let currentSectionId = '';
        const scrollPosition = window.scrollY + 200; // Offset for topbar

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active-nav-link');
            // Add custom visual treatment if active
            if (item.getAttribute('href') === `#${currentSectionId}`) {
                item.style.color = 'var(--text-primary)';
                item.style.borderBottom = '1px solid var(--text-primary)';
            } else {
                item.style.color = '';
                item.style.borderBottom = '';
            }
        });
    };

    window.addEventListener('scroll', updateActiveNav, { passive: true });
    updateActiveNav();

    // 6. Dynamic Tagline Typewriter (Inspired by apriliaananta.com)
    const taglineSuffix = document.getElementById('tagline-suffix');
    if (taglineSuffix) {
        const phrases = [
            "BRIDGING CODE & DESIGN.",
            "CRAFTING NATIVE IOS EXPERIENCES.",
            "ROOTED IN RESEARCH & HIG.",
            "FROM ZERO TO LAUNCH."
        ];
        let phraseIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingSpeed = 90;

        function typeLoop() {
            const currentPhrase = phrases[phraseIndex];
            if (isDeleting) {
                taglineSuffix.textContent = currentPhrase.substring(0, charIndex - 1);
                charIndex--;
                typingSpeed = 40;
            } else {
                taglineSuffix.textContent = currentPhrase.substring(0, charIndex + 1);
                charIndex++;
                typingSpeed = 90;
            }

            if (!isDeleting && charIndex === currentPhrase.length) {
                isDeleting = true;
                typingSpeed = 1800;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
                typingSpeed = 400;
            }

            setTimeout(typeLoop, typingSpeed);
        }

        typeLoop();
    }

});
