import Splide from '@splidejs/splide';

new Splide('.splide', {
    type: 'loop',
    perPage: 1,
    autoplay: false,
    pagination: true,
    arrows: true,
    classes: {
        pagination: 'testimonial__pagination',
        page: 'testimonial__pagination-page',
    },
}).mount();
