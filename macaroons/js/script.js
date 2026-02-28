$(document).ready(function () {

    //_____________ВАЛИДАЦИЯ_____________\\
    // находим элементы
    $('#submit').click(function (e) {
        e.preventDefault();
        let product = $('#product');
        let name = $('#name');
        let phone = $('#phone');
        let hasError = false;
        let loader = $('#loader-wrap')

        // цвет рамок по умолчанию
        $('#product, #name, #phone').css('border-color', 'rgb(130, 19, 40)');

        // скрываем предупреждения
        $('.error-input').hide();

        // проверяем наличие ввода
        if (!product.val()) {
            product.next().show();
            product.css('border-color', 'red');
            hasError = true;
        }
        if (!name.val()) {
            name.next().show();
            name.css('border-color', 'red');
            hasError = true;
        }
        if (!phone.val()) {
            phone.next().show();
            phone.css('border-color', 'red');
            hasError = true;
        }

        //_____________ЗАДАНИЕ №2,3____________\\
        if (!hasError) {
            // появление лоадера
            loader.css('display', 'flex')
            // ajax
            $.ajax({
                method: "POST",
                url: "https://testologia.ru/checkout",
                data: {
                    product: product.val(),
                    name: name.val(),
                    phone: phone.val()
                }
            })
                .done(function (msg) {
                    // скрытие лоадера
                    loader.hide();
                    console.log((msg));

                    if (msg.success === 1) {
                        $('.wrapper-hidden').hide();
                        $('.order__success_1').css('display', 'flex');

                    } else {
                        alert('Возникла ошибка при оформлении заказа, позвоните нам и сделайте заказ');
                    }
                });
        }
    })

    //_____________СЛАЙДЕР_____________\\
    $('.responsive').slick({
        adaptiveHeight: true,
        infinite: true,
        speed: 300,
        slidesToShow: 4,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                }
            },
            {
                breakpoint: 800,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            },
        ]
    });

    //_____________АНИМАЦИИ_____________\\
    new WOW({
        animateClass: 'animate__animated'
    }).init();

    //_____________POPAP_____________\\
    $('.open-popup-link').magnificPopup({
        type: 'inline',
        midClick: true
    });
});