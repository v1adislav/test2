$(document).ready(function() {
    /**
     * Глобальные переменные, которые используются многократно
     */
    var global = {
        // время для анимаций
        time:  200,

        // контрольные точки адаптива
        desktopXlSize: 1599,
        desktopLgSize: 1379,
        desktopSize:   1199,
        tabletLgSize:   959,
        tabletSize:     767,
        mobileSize:     479,

        // проверка touch устройств
        isTouch: function() {
            var md = new MobileDetect(window.navigator.userAgent);
            if (md.mobile() == null) {
                return false;
            } else {
                return true;
            }
        }
    };

    $(window).load(function() {
        if (global.isTouch()) {
            $('body').removeClass('no-touch');
        } else {
            $('body').addClass('no-touch');
        }

        if (Modernizr.flexbox) {
            // Modern Flexbox with `flex-wrap` is supported
        } else {
            flexibility(document.documentElement);
        } 
    });


    /**
     * Подключение js partials
     */
    @@include('partials/partials.js')


    var resizeTimer;
    $(window).resize(function(e) {
        clearTimeout(resizeTimer);
        /**
         * Отрабатывает после завершения события ресайза
         */
        resizeTimer = setTimeout(function() {
            
        }, 250);
    });

});