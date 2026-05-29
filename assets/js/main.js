// Dark Mode Toggle Logic
document.addEventListener('DOMContentLoaded', () => {
    const themeToggleBtn = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;
    
    // Check local storage or system preference
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        htmlElement.classList.add('dark');
        updateIcon(true);
    } else {
        htmlElement.classList.remove('dark');
        updateIcon(false);
    }

    if(themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            htmlElement.classList.toggle('dark');
            const isDark = htmlElement.classList.contains('dark');
            
            if (isDark) {
                localStorage.theme = 'dark';
            } else {
                localStorage.theme = 'light';
            }
            updateIcon(isDark);
        });
    }

    function updateIcon(isDark) {
        if(!themeToggleBtn) return;
        const lightIcon = document.getElementById('theme-toggle-light-icon');
        const darkIcon = document.getElementById('theme-toggle-dark-icon');
        
        if(isDark) {
            lightIcon.classList.remove('hidden');
            darkIcon.classList.add('hidden');
        } else {
            lightIcon.classList.add('hidden');
            darkIcon.classList.remove('hidden');
        }
    }

    // Mobile menu toggle
    const mobileMenuButton = document.getElementById("mobile-menu-button");
    const mobileMenu = document.getElementById("mobile-menu");

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener("click", () => {
            // Apply transitions
            if (mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.remove('hidden');
                setTimeout(() => {
                    mobileMenu.classList.remove('opacity-0', '-translate-y-4');
                    mobileMenu.classList.add('opacity-100', 'translate-y-0');
                }, 10);
            } else {
                mobileMenu.classList.add('opacity-0', '-translate-y-4');
                mobileMenu.classList.remove('opacity-100', 'translate-y-0');
                setTimeout(() => {
                    mobileMenu.classList.add('hidden');
                }, 300); // Wait for transition
            }
        });

        // Close mobile menu when clicking on a link
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('opacity-0', '-translate-y-4');
                mobileMenu.classList.remove('opacity-100', 'translate-y-0');
                setTimeout(() => {
                    mobileMenu.classList.add('hidden');
                }, 300);
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        });
    }

    // Scroll to top button functionality
    const scrollToTopBtn = document.getElementById('scroll-to-top');
    
    if (scrollToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                scrollToTopBtn.classList.remove('translate-y-20', 'opacity-0', 'pointer-events-none');
                scrollToTopBtn.classList.add('translate-y-0', 'opacity-100');
            } else {
                scrollToTopBtn.classList.add('translate-y-20', 'opacity-0', 'pointer-events-none');
                scrollToTopBtn.classList.remove('translate-y-0', 'opacity-100');
            }
        });
        
        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // Scroll animations
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

    // Observe all elements with fade-in-up
    document.querySelectorAll('.fade-in-up').forEach(el => observer.observe(el));

    // Typing Effect for Hero Section (only on index.html)
    const typingElement = document.getElementById('typing-text');
    if (typingElement) {
        const words = ['Frontend', 'Backend', 'Full Stack'];
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingSpeed = 100;

        function type() {
            const currentWord = words[wordIndex];
            
            if (isDeleting) {
                typingElement.textContent = currentWord.substring(0, charIndex - 1);
                charIndex--;
                typingSpeed = 50;
            } else {
                typingElement.textContent = currentWord.substring(0, charIndex + 1);
                charIndex++;
                typingSpeed = 150;
            }

            if (!isDeleting && charIndex === currentWord.length) {
                isDeleting = true;
                typingSpeed = 2000; // Pause at end
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                typingSpeed = 500; // Pause before new word
            }

            setTimeout(type, typingSpeed);
        }

        setTimeout(type, 1000); // Start after 1 second
    }
});
