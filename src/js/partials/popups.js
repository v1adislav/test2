/**
 * Открывает и закрывает попапы и модальные окна
 *
 * @example
 * <a href="#popupId" data-popup="open">Text</a>
 * <a href="#modalId" data-modal="open">Text</a>
 *
 * <div id="popupId" style="display: none;">Popup content</div>
 * <div id="modalId" style="display: none;">Modal content</div>
 *
 * Закроет все попапы и модальные окна
 * <button type="button" data-popup="close">Text</button>
 */
var Popups = function() {
    var self = this,
        btnOpen = $('[data-popup="open"]'),
        btnModalOpen = $('[data-modal="open"]'),
        btnIframeOpen = $('[data-popup="iframe"]'),
        btnClose = $('[data-popup="close"]'),
        settings = {
            fitToView: false,
            margin: 0,
            padding: 0,
            openSpeed: global.time,
            closeSpeed: global.time,
            helpers: {
                title: null
            }
        };

    /**
     * Открывает попап
     * @param  {String} id       id попапа, который надо открыть
     * @param  {Object} options  параметры попапа (необязательный)
     *
     * @example
     * popups.open('#some-popup')
     */
    self.open = function(id, options) {
        options = options || {};
        if (!options || Object.keys(options).length == 0) {
            $.each(settings, function(key, value) {
                options[key] = value;
            });
        }

        options.href = id;
        $.fancybox(options);
    };

    /**
     * Закрывает попап
     */
    self.close = function() {
        $.fancybox.close();
    };

    if (btnOpen.length > 0) {
        btnOpen.on('click', function () {
            var id = $(this).attr('href') || $(this).data('href'),
                options = {};

            $.each(settings, function(key, value) {
                options[key] = value;
            });

            self.open(id, options);

            // return false;
        });
    }

    if (btnModalOpen.length > 0) {
        btnOpen.on('click', function () {
            var id = $(this).attr('href') || $(this).data('href'),
                optionsModal = {};

            $.each(settings, function(key, value) {
                optionsModal[key] = value;
            });

            optionsModal['modal'] = true;
            optionsModal['beforeShow'] = function() {
                $('.fancybox-overlay').addClass('fancybox-overlay_type_modal');
            };
            optionsModal['afterClose'] = function() {
                setTimeout(function() {
                    $('.fancybox-overlay').removeClass('fancybox-overlay_type_modal');
                }, global.time);
            };

            self.open(id, optionsModal);
        });
    }

    if (btnIframeOpen.length > 0) {
        var optionsIframe = {};
        $.each(settings, function(key, value) {
            optionsIframe[key] = value;
        });

        optionsIframe['padding'] = 48;
        optionsIframe['beforeShow'] = function() {
            $('.fancybox-overlay').addClass('fancybox-overlay_type_iframe');
        };
        optionsIframe['afterClose'] = function() {
            setTimeout(function() {
                $('.fancybox-overlay').removeClass('fancybox-overlay_type_iframe');
            }, global.time);
        };

        btnIframeOpen.fancybox(optionsIframe);
    }

    if ($('[data-popup="close"]').length > 0) {
        $('[data-popup="close"]').on('click', function () {
            self.close();
        });
    }
};

var popups = new Popups();