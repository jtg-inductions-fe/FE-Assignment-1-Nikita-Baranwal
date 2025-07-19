/**
 * Initializes accessible accordion functionality.
 *
 * - Toggles aria-expanded and data-state attributes.
 * - Adds/removes 'is-toggle' class for visual indicators.
 * - Closes other open accordions when one is toggled.
 */
const accordions = document.querySelectorAll('.accordion');

accordions.forEach((accordion) => {
    const accordionBtn = accordion.querySelector('.accordion__header');
    const toggleBtn = accordionBtn.querySelector('.toggle-btn');

    accordionBtn.addEventListener('click', () => {
        const isOpen = accordion.getAttribute('data-state') === 'open';

        // Toggle the aria-expanded state on the clicked header
        accordionBtn.setAttribute('aria-expanded', isOpen ? 'false' : 'true');

        // Close all other accordions
        accordions.forEach((otherAccordion) => {
            otherAccordion.setAttribute('data-state', 'closed');

            const otherToggleBtn = otherAccordion.querySelector('.toggle-btn');
            otherToggleBtn?.classList.remove('is-toggle');
        });

        // Open the clicked accordion if it was closed
        accordion.setAttribute('data-state', isOpen ? 'closed' : 'open');

        // Toggle classname
        toggleBtn?.classList.toggle('is-toggle', !isOpen);
    });
});
