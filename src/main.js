/**
 * TIGRA DRIVEX - Master Script 2026
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. INIZIALIZZAZIONE ICONE
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // 2. MENU MOBILE
    const navToggle = document.querySelector('.nav__toggle');
    const navMenu = document.querySelector('.nav__menu');
    const navLinks = document.querySelectorAll('.nav__link');

    navToggle?.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
    });

    // Chiudi menu al click su un link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            document.body.classList.remove('no-scroll');
        });
    });

    // 3. SCROLL HEADER EFFECT
    const header = document.querySelector('#header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.padding = '1rem 0';
            header.style.background = 'rgba(10, 10, 10, 0.95)';
        } else {
            header.style.padding = '1.5rem 0';
            header.style.background = 'rgba(10, 10, 10, 0.8)';
        }
    });

    // 4. COOKIE POPUP LOGIC (Aggiornata chiave localStorage)
    const cookiePopup = document.querySelector('#cookie-popup');
    const acceptBtn = document.querySelector('#cookie-accept');
    const declineBtn = document.querySelector('#cookie-decline');

    if (!localStorage.getItem('drivex_cookies')) {
        setTimeout(() => {
            cookiePopup?.classList.add('active');
        }, 2000);
    }

    acceptBtn?.addEventListener('click', () => {
        localStorage.setItem('drivex_cookies', 'accepted');
        cookiePopup.classList.remove('active');
    });

    declineBtn?.addEventListener('click', () => {
        localStorage.setItem('drivex_cookies', 'declined');
        cookiePopup.classList.remove('active');
    });

    // 5. AOS (Animations on Scroll)
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            once: true,
            offset: 100
        });
    }

    // 6. SWIPER (Blog Slider)
    if (typeof Swiper !== 'undefined') {
        new Swiper('.blog-slider', {
            slidesPerView: 1,
            spaceBetween: 30,
            loop: true,
            pagination: { el: '.swiper-pagination', clickable: true },
            navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
            breakpoints: { 768: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }
        });
    }

    // 7. TYPEIT (Terminal Effect aggiornato con DriveX)
    if (typeof TypeIt !== 'undefined' && document.querySelector('#typeit-terminal')) {
        new TypeIt("#typeit-terminal", {
            speed: 50,
            startDelay: 900,
            waitUntilVisible: true,
            loop: true,
            cursorChar: "█",
        })
        .type('<span class="code-comment">// Protocollo DriveX v2.4</span>')
        .break().type('> Collegamento UE... <span class="code-success">[OK]</span>')
        .break().type('> Moduli AI attivi.')
        .break().pause(1000).type('> Efficienza Tigra +45%')
        .go();
    }

    // 8. CONTACT FORM & CAPTCHA (ID aggiornato in drivex-form)
    const form = document.getElementById('drivex-form');
    if (form) {
        const captchaText = document.getElementById('captcha-question');
        const captchaInput = document.getElementById('captcha-answer');
        let num1 = Math.floor(Math.random() * 10) + 1;
        let num2 = Math.floor(Math.random() * 10) + 1;
        let correctAnswer = num1 + num2;
        if(captchaText) captchaText.innerText = `${num1} + ${num2}`;

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            if (parseInt(captchaInput.value) !== correctAnswer) {
                alert("Calcolo errato!");
                return;
            }
            
            const btn = form.querySelector('button');
            const originalText = btn.innerHTML;
            btn.innerText = "Invio...";
            btn.disabled = true;

            setTimeout(() => {
                form.reset();
                document.getElementById('form-success').classList.add('active');
                btn.innerHTML = originalText;
                btn.disabled = false;
                lucide.createIcons();
                
                // Reset captcha
                num1 = Math.floor(Math.random() * 10) + 1;
                num2 = Math.floor(Math.random() * 10) + 1;
                correctAnswer = num1 + num2;
                captchaText.innerText = `${num1} + ${num2}`;

                setTimeout(() => {
                    document.getElementById('form-success').classList.remove('active');
                }, 5000);
            }, 1500);
        });
    }

    // 9. THREE.JS HERO
    if (typeof THREE !== 'undefined' && typeof initThreeJS === 'function') {
        initThreeJS(); 
    }
});