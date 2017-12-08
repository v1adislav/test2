/**
 * Проверка поддержки svg, если нет, то заменяем на картинку
 */
$(window).load(function() {
    if (!Modernizr.svg) {
        // $('.logo img').attr('src', 'img/logo.png');
    }
});