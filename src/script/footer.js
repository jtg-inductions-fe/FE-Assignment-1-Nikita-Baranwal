/**
 * Initializes the accordion functionality in the footer section.
 * It selects all elements with the class `.footer__content-title`
 * and sets up click event listeners to toggle their expanded/collapsed state.
 *
 * The toggled state is reflected via:
 * - `.is-open` class for styling
 * - `aria-expanded` attribute for accessibility
 * - `.is-toggle` class on the icon for rotation or animation
 *
 * Only one accordion section remains open at a time.
 */

// Select all accordion toggle headers
const accordionTitles = document.querySelectorAll('.footer__content-title');

// Loop through each title and attach a click event listener
accordionTitles.forEach((accordionTitle) => {
    const toggleBtn = accordionTitle.querySelector('.toggle-btn');

    accordionTitle.addEventListener('click', () => {
        // Check if the clicked accordion is already open
        const isOpen = accordionTitle.classList.contains('is-open');

        // First, close all accordion sections
        accordionTitles.forEach((otherTitle) => {
            otherTitle.classList.remove('is-open');
            otherTitle.setAttribute('aria-expanded', 'false');

            const otherToggleBtn = otherTitle.querySelector('.toggle-btn');
            otherToggleBtn?.classList.remove('is-toggle');
        });

        // If it was not open earlier, open the clicked one
        if (!isOpen) {
            accordionTitle.classList.add('is-open');
            accordionTitle.setAttribute('aria-expanded', 'true');
            toggleBtn?.classList.add('is-toggle');
        }
    });
});
