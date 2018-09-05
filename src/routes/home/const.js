/* eslint-disable import/prefer-default-export */
import React from 'react';
export const SETTINGS = {
    customPaging: i => <span>&bull;</span>,
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    pauseOnHover: false,
    // autoplay: true,
    autoplaySpeed: 5000,
    lazyLoad: 'ondemand',
    arrows: true,
    cssEase: 'linear',
    responsive: [
        {
            breakpoint: 1190,
            settings: {
                arrows: false,
            },
        },
    ],
};
