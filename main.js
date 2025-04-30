$(document).ready(function() {
    var splide = new Splide('#image-slider', {
        type: 'loop',
        perPage: 3,
        focus: 0,
        gap: '1rem',
        autoplay: true,
        interval: 4000,
        pagination: false,
        arrows: false,
        breakpoints: {
            1200: {
                autoWidth: false,
                perPage: 2,
            },
            500: {
                autoWidth: false,
                perPage: 1.2,
            },
            480: {
                autoWidth: false,
                perPage: 1,
            },
        },
    });

    function updateCaptionAndProgress() {
        var activeSlide = $(splide.Components.Slides.getAt(splide.index).slide);
        var progress = ((splide.index + 1) / splide.length) * 100;
        $('.custom-progress').css('--progress', progress + '%');
    }

    splide.on('mounted move', function() {
        updateCaptionAndProgress();
        hideLeftSlide();
    });

    splide.mount();
});