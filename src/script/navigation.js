const hamBtn = document.querySelector('.header-ham');
const drawer = document.querySelector('.header__nav');
const overlay = document.querySelector('.drawer-overlay');
const body = document.body;

/**
 * Toggles the hamburger icon to a close icon or vice versa.
 *
 * @param {boolean} isOpen - Whether the drawer is open.
 * @returns {void}
 */
function toggleIcon(isOpen) {
    const icon = hamBtn.querySelector('i');
    icon.className = isOpen ? 'icon-cross' : 'icon-ham-burger';
}

/**
 * Opens the navigation drawer and updates the UI accordingly.
 *
 * Adds active classes to the drawer and overlay,
 * prevents scrolling on the body, updates the ARIA state,
 * and changes the hamburger icon to a close icon.
 *
 * @returns {void}
 */
function openDrawer() {
    drawer.classList.add('active', 'drawer-open');
    overlay.classList.add('active');
    body.classList.add('no-scroll');
    hamBtn.setAttribute('aria-expanded', 'true');
    hamBtn.classList.add('open');
    toggleIcon(true);
}

/**
 * Closes the navigation drawer and resets the UI.
 *
 * Removes active classes, restores scroll,
 * resets the ARIA attributes, and switches the icon back.
 *
 * @returns {void}
 */
function closeDrawer() {
    drawer.classList.remove('active', 'drawer-open');
    overlay.classList.remove('active');
    body.classList.remove('no-scroll');
    hamBtn.setAttribute('aria-expanded', 'false');
    hamBtn.classList.remove('open');
    toggleIcon(false);
}

/**
 * Toggles the drawer open or closed based on its current state.
 *
 * If the drawer is currently open, it closes it;
 * otherwise, it opens the drawer.
 *
 * @returns {void}
 */
function toggleDrawer() {
    const isOpen = drawer.classList.contains('active');
    isOpen ? closeDrawer() : openDrawer();
}

/**
 * Handles click events on the hamburger button to toggle the drawer.
 */
hamBtn.addEventListener('click', toggleDrawer);

/**
 * Handles Escape key to close the drawer from anywhere in the document.
 *
 * @param {KeyboardEvent} e - The keydown event.
 */
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeDrawer();
    }
});

/**
 * Closes the drawer when clicking outside of it or the hamburger icon.
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

/**
 * Handles click events on the header using event delegation.
 * Closes the navigation drawer if a nav link or drawer button is clicked.
 *
 * @param {MouseEvent} e - The click event triggered within the header.
 */
const header = document.querySelector('header');

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
 * Handles clicks on the overlay to close the drawer.
 */
overlay.addEventListener('click', closeDrawer);

/**
 * Reference to the subscription form element
 * @type {HTMLFormElement}
 */
const form = document.getElementById('subscribeForm');

/**
 * Handles the form submission event.
 * Prevents the default form behavior, checks email validity,
 * shows an alert on success, and resets the form.
 */
form.addEventListener('submit', function (e) {
    e.preventDefault();
    const emailInput = document.getElementById('emailInput');
    const user = emailInput.value;

    // Check if the email input is valid
    if (emailInput.checkValidity()) {
        console.log(user);
        alert(`${user}, \nThank you for subscribing!`);
        form.reset();
    } else {
        // Trigger browser's built-in validation error display
        emailInput.reportValidity();
    }
});
