/**
 * Sets tabIndex for logo and hamburger button on tablet screens.
 */
const logo = document.querySelector('.header__logo');
const ham = document.querySelector('.header-ham');

if (window.innerWidth >= 1024 && window.innerWidth < 1440) {
    logo.tabIndex = 0;
    ham.tabIndex = 1;
}

/**
 * Traps focus within a given container.
 * Prevents focus from escaping when using Tab or Shift+Tab.
 *
 * @param {HTMLElement} container - The container element to trap focus within.
 */
function trapFocus(container) {
    const focusableSelectors = `
        a[href],
        button:not([disabled]),
        textarea:not([disabled]),
        input:not([disabled]),
        select:not([disabled]),
        [tabindex]:not([tabindex="-1"])
    `;

    const focusableElements = container.querySelectorAll(focusableSelectors);
    if (!focusableElements.length) return;

    const first = focusableElements[0];
    const last = focusableElements[focusableElements.length - 1];

    const handleKeydown = (e) => {
        if (e.key === 'Tab') {
            if (e.shiftKey) {
                if (document.activeElement === first) {
                    e.preventDefault();
                    last.focus();
                }
            } else {
                if (document.activeElement === last) {
                    e.preventDefault();
                    first.focus();
                }
            }
        }
    };

    container.addEventListener('keydown', handleKeydown);

    first.focus();

    // Return cleanup function
    return () => {
        container.removeEventListener('keydown', handleKeydown);
    };
}

const hamBtn = document.querySelector('.header-ham');
const drawer = document.querySelector('.header__nav');
const overlay = document.querySelector('.drawer-overlay');
const body = document.body;

/**
 * DOMContentLoaded guard for essential elements.
 */
document.addEventListener('DOMContentLoaded', () => {
    if (!hamBtn || !drawer || !overlay) return;
});

/**
 * Opens the navigation drawer.
 * Adds classes to display drawer and overlay, disables body scroll,
 * updates ARIA attributes, and traps focus inside the drawer.
 *
 * @returns {void}
 */
function openDrawer() {
    drawer.classList.add('active', 'drawer-open');
    overlay.classList.add('active');
    body.classList.add('no-scroll');
    hamBtn.setAttribute('aria-expanded', 'true');
    trapFocus(drawer);
}

/**
 * Closes the navigation drawer.
 * Removes drawer and overlay classes, re-enables scroll,
 * resets ARIA attribute, and focuses the hamburger button.
 *
 * @returns {void}
 */
function closeDrawer() {
    drawer.classList.remove('active', 'drawer-open');
    overlay.classList.remove('active');
    body.classList.remove('no-scroll');
    hamBtn.setAttribute('aria-expanded', 'false');
    hamBtn.focus();
}

/**
 * Toggles the drawer based on its current state.
 *
 * @returns {void}
 */
function toggleDrawer() {
    const isOpen = drawer.classList.contains('active');
    isOpen ? closeDrawer() : openDrawer();
}

// Event listener for hamburger button
hamBtn.addEventListener('click', toggleDrawer);

/**
 * Global listener to close the drawer when Escape key is pressed.
 *
 * @param {KeyboardEvent} e - The keydown event.
 */
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeDrawer();
    }
});

/**
 * Closes drawer when clicking outside the drawer or hamburger icon.
 *
 * @param {MouseEvent} e - The click event.
 */
document.addEventListener('click', (e) => {
    const isClickInsideDrawer = drawer.contains(e.target);
    const isClickOnHam = hamBtn.contains(e.target);
    const isDrawerOpen = drawer.classList.contains('active');

    if (!isClickInsideDrawer && !isClickOnHam && isDrawerOpen) {
        closeDrawer();
    }
});

const header = document.querySelector('header');

/**
 * Delegates click events inside header to close drawer
 * when nav links or drawer buttons are clicked.
 *
 * @param {MouseEvent} e - The click event.
 */
header.addEventListener('click', (e) => {
    const target = e.target;
    if (
        target.closest('.header__nav-item a') ||
        target.closest('.drawer__button')
    ) {
        closeDrawer();
    }
});

/**
 * Closes drawer when clicking the close (×) button inside drawer.
 */
const closeBtn = drawer.querySelector('.drawer-close');
closeBtn.addEventListener('click', closeDrawer);

window.addEventListener('resize', () => {
    const isDrawerOpen = drawer.classList.contains('active');
    if (window.innerWidth >= 1440 && isDrawerOpen) {
        closeDrawer();
    }
});
