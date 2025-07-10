const hamBtn = document.querySelector('.header-ham__actions');
const drawer = document.querySelector('.header__nav');
const overlay = document.querySelector('.drawer-overlay');
const body = document.body;

// Dynamic icon toggle
function toggleIcon(isOpen) {
    const icon = hamBtn.querySelector('i');
    icon.className = isOpen ? 'icon-cross' : 'icon-ham-burger';
}

// Open Drawer
function openDrawer() {
    drawer.classList.add('active', 'drawer-open');
    overlay.classList.add('active');
    body.classList.add('no-scroll');
    hamBtn.setAttribute('aria-expanded', 'true');
    hamBtn.classList.add('open');
    toggleIcon(true);
}

// Close Drawer
function closeDrawer() {
    drawer.classList.remove('active', 'drawer-open');
    overlay.classList.remove('active');
    body.classList.remove('no-scroll');
    hamBtn.setAttribute('aria-expanded', 'false');
    hamBtn.classList.remove('open');
    toggleIcon(false);
}

// Toggle Drawer
function toggleDrawer() {
    const isOpen = drawer.classList.contains('active');
    isOpen ? closeDrawer() : openDrawer();
}

// Event Listeners
hamBtn.addEventListener('click', toggleDrawer);

hamBtn.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleDrawer();
    }
});

// Escape key to close
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeDrawer();
    }
});

// Outside click handler using mousedown (more reliable)
document.addEventListener('mousedown', (e) => {
    const isClickInsideDrawer = drawer.contains(e.target);
    const isClickOnHam = hamBtn.contains(e.target);
    const isDrawerOpen = drawer.classList.contains('active');

    if (!isClickInsideDrawer && !isClickOnHam && isDrawerOpen) {
        closeDrawer();
    }
});

// Optional: Close on overlay click
overlay.addEventListener('click', closeDrawer);
