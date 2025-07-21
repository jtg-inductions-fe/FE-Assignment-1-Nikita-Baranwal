/**
 * Initializes accessible accordion functionality.
 *
 * Features:
 * - Toggles aria-expanded and data-state attributes.
 * - Adds/removes 'is-toggle' class for visual indicator (rotation icon).
 * - Closes other open accordions when one is toggled.
 * - Manages tabIndex of inner links for accessibility.
 * - Keeps links focusable on desktop view even when accordion is closed.
 */

const accordions = document.querySelectorAll('.accordion');

accordions.forEach((accordion) => {
    const accordionBtn = accordion.querySelector('.accordion__header');
    const toggleBtn = accordion.querySelector('.toggle-btn');
    const links = accordion.querySelectorAll('.accordion__content a');

    /**
     * Updates the tabIndex for links inside an accordion.
     * - On mobile: focusable only if open.
     * - On desktop: always focusable regardless of state.
     */
    const updateTabIndex = () => {
        const isOpen = accordion.getAttribute('data-state') === 'open';
        const isDesktop = window.innerWidth >= 1024;

        links.forEach((link) => {
            link.tabIndex = isOpen || isDesktop ? 0 : -1;
        });
    };

    // Initial update for tabIndex on load
    updateTabIndex();

    /**
     * Handles accordion toggle when header is clicked.
     * Closes all other accordions and updates all tabindex values.
     */
    accordionBtn.addEventListener('click', () => {
        const isOpen = accordion.getAttribute('data-state') === 'open';

        // Close all other accordions and reset their state
        accordions.forEach((otherAccordion) => {
            otherAccordion.setAttribute('data-state', 'closed');

            const otherToggleBtn = otherAccordion.querySelector('.toggle-btn');
            otherToggleBtn?.classList.remove('is-toggle');

            otherAccordion
                .querySelectorAll('.accordion__content a')
                .forEach((link) => (link.tabIndex = -1));
        });

        // Toggle current accordion
        accordion.setAttribute('data-state', isOpen ? 'closed' : 'open');
        toggleBtn?.classList.toggle('is-toggle', !isOpen);

        // Update focusable elements
        updateTabIndex();
    });
});
