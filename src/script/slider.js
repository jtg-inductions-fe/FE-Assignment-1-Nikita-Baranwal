import Splide from '@splidejs/splide';
import '@splidejs/splide/css'; // Default CSS

document.addEventListener('DOMContentLoaded', () => {
    new Splide('.splide', {
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
});
