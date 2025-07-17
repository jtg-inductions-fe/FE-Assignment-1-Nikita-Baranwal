import Splide from '@splidejs/splide';
import '@splidejs/splide/css';

document.addEventListener('DOMContentLoaded', () => {
    const splideElement = document.querySelector('.splide');
    if (!splideElement) {
        return;
    }
    const splide = new Splide('.splide', {
        type: 'loop',
        perPage: 1,
        autoplay: false,
        pagination: true,
        arrows: true,
        classes: {
            pagination: 'testimonial__pagination',
            page: 'testimonial__pagination-page',
            arrows: 'splide__arrows testimonial-arrows',
            arrow: 'splide__arrow testimonial-arrow',
            prev: 'splide__arrow--prev testimonial-prev',
            next: 'splide__arrow--next testimonial-next',
        },
    }).mount();
    window.testimonialSlider = splide;
});
