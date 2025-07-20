/**
 * Handles the form submission event.
 * Prevents the default form behavior,
 * shows an alert on success, and resets the form.
 */
const form = document.getElementById('subscribeForm');
form.addEventListener('submit', function (e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const email = formData.get('email');

    alert(`${email}, \nThank you for subscribing!`);
    form.reset();
});
