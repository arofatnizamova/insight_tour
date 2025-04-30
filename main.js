$(document).ready(function() {
    $('.splide-slider').each(function() {
        const slider = $(this);
        const sliderElement = slider[0]; // Получаем DOM-элемент из jQuery-объекта

        // Базовые настройки
        const options = {
            type: 'loop',
            gap: '1rem',
            autoplay: true,
            arrows: slider.parent().find('.slider-prev, .slider-next').length ? 'container' : false,
        };

        let extraOptions = {};

        if (slider.hasClass('image-slider')) {
            extraOptions = {
                focus: 0,
                interval: 4000,
                pagination: false,
                perPage: 3, // Добавляем базовое значение
                breakpoints: {
                    1200: {
                        perPage: 2,
                    },
                    500: {
                        perPage: 1.2,
                    },
                    480: {
                        perPage: 1,
                    },
                },
            };
        }

        // Объединяем настройки
        const finalOptions = {...options, ...extraOptions };

        // Инициализация Splide
        const splide = new Splide(sliderElement, finalOptions);

        // Кастомные стрелки (если есть)
        const prevArrow = slider.parent().find('.slider-prev')[0];
        const nextArrow = slider.parent().find('.slider-next')[0];

        if (prevArrow && nextArrow) {
            splide.on('mounted', () => {
                prevArrow.addEventListener('click', () => splide.go('-1'));
                nextArrow.addEventListener('click', () => splide.go('+1'));
            });
        }

        // Прогресс-бар
        function updateCaptionAndProgress() {
            const progress = ((splide.index + 1) / splide.length) * 100;
            slider.find('.custom-progress').css('--progress', progress + '%');
        }

        splide.on('mounted move', updateCaptionAndProgress);
        splide.mount();
    });
});