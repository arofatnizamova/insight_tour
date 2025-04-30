$(document).ready(function() {
    $('.slider-wrapper').each(function() {
        const wrapper = $(this);
        const slider = wrapper.find('.splide-slider');
        const prevBtn = wrapper.find('.slider-prev')[0];
        const nextBtn = wrapper.find('.slider-next')[0]; // Получаем DOM-элемент из jQuery-объекта

        // Базовые настройки
        const options = {
            type: 'loop',
            gap: '1rem',
            autoplay: true,
        };

        let extraOptions = {};

        if (slider.hasClass('image-slider')) {
            extraOptions = {
                focus: 0,
                interval: 4000,
                pagination: false,
                arrows: false,
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
        } else if (slider.hasClass('tours')) {
            extraOptions = {
                focus: 0,
                interval: 4000,
                pagination: false,
                arrows: false,
                perPage: 3.8, // Добавляем базовое значение
                breakpoints: {
                    1600: {
                        perPage: 3,
                    },
                    990: {
                        perPage: 2.3,
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
        const splide = new Splide(slider[0], finalOptions);

        // Кастомные стрелки (если есть)
        // Привязка кастомных стрелок
        if (prevBtn) prevBtn.addEventListener('click', () => splide.go('-1'));
        if (nextBtn) nextBtn.addEventListener('click', () => splide.go('+1'));

        // Прогресс-бар
        function updateCaptionAndProgress() {
            const progress = ((splide.index + 1) / splide.length) * 100;
            wrapper.find('.custom-progress').css('--progress', progress + '%');
        }

        splide.on('mounted move', updateCaptionAndProgress);
        splide.mount();
    });
});