/**
 * ====================================================================
 * მთავარი JavaScript ფაილი (main.js)
 * ავტორი: რეზი არაბიძე
 * დანიშნულება: მობილური ბურგერ მენიუს მართვა და ინტერაქციები
 * ====================================================================
 */

'use strict';

/**
 * ბურგერ მენიუს ინიციალიზაცია
 * მუშაობს როგორც DOMContentLoaded-ზე, ისე დაუყოვნებლივ (თუ DOM უკვე მზადაა)
 */
function initMobileMenu() {
    const menuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const openIcon = document.getElementById('menu-icon-open');
    const closeIcon = document.getElementById('menu-icon-close');

    // თუ გვერდზე მენიუს ელემენტები არ არსებობს, შევწყვიტოთ
    if (!menuBtn || !mobileMenu || !openIcon || !closeIcon) {
        return;
    }

    /**
     * მენიუს გახსნა
     */
    function openMenu() {
        mobileMenu.classList.remove('hidden');
        openIcon.classList.add('hidden');
        openIcon.classList.remove('block');
        closeIcon.classList.remove('hidden');
        closeIcon.classList.add('block');
        menuBtn.setAttribute('aria-expanded', 'true');
    }

    /**
     * მენიუს დახურვა
     */
    function closeMenu() {
        mobileMenu.classList.add('hidden');
        openIcon.classList.remove('hidden');
        openIcon.classList.add('block');
        closeIcon.classList.add('hidden');
        closeIcon.classList.remove('block');
        menuBtn.setAttribute('aria-expanded', 'false');
    }

    /**
     * მენიუს სტატუსის გადართვა (Toggle)
     */
    function toggleMenu() {
        const isClosed = mobileMenu.classList.contains('hidden');
        if (isClosed) {
            openMenu();
        } else {
            closeMenu();
        }
    }

    // გლობალური წვდომა (თავსებადობისთვის)
    window.toggleMobileMenu = toggleMenu;
    window.openMobileMenu = openMenu;
    window.closeMobileMenu = closeMenu;

    // 1. ბურგერ ღილაკზე დაკლიკება
    menuBtn.addEventListener('click', (event) => {
        event.stopPropagation();
        toggleMenu();
    });

    // 2. მობილურ მენიუში ნებისმიერ ლინკზე (<a>) დაკლიკებისას მენიუს დახურვა
    const menuLinks = mobileMenu.querySelectorAll('a');
    menuLinks.forEach((link) => {
        link.addEventListener('click', () => {
            closeMenu();
        });
    });

    // 3. მენიუს გარეთ (ფონზე) დაკლიკებისას დახურვა
    document.addEventListener('click', (event) => {
        const isClickInside = mobileMenu.contains(event.target);
        const isClickOnButton = menuBtn.contains(event.target);

        if (!isClickInside && !isClickOnButton && !mobileMenu.classList.contains('hidden')) {
            closeMenu();
        }
    });

    // 4. კლავიატურის "Escape" ღილაკზე დაჭერისას დახურვა (Accessibility)
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && !mobileMenu.classList.contains('hidden')) {
            closeMenu();
            menuBtn.focus();
        }
    });

    // 5. ეკრანის დესკტოპ ზომამდე (>= 768px) გაზრდისას ავტომატური დახურვა
    window.addEventListener('resize', () => {
        if (window.innerWidth >= 768 && !mobileMenu.classList.contains('hidden')) {
            closeMenu();
        }
    });
}

// ინიციალიზაციის გაშვება
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMobileMenu);
} else {
    initMobileMenu();
}

