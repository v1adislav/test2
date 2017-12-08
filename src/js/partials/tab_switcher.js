/**
 * Реализует переключение табов
 *
 * @example
 * <ul class="tabs">
 *     <li class="tabs__item">
 *         <span class="is-active tabs__link">Tab name</span>
 *         <div class="tabs__cnt">
 *             <p>Tab content</p>
 *         </div>
 *     </li>
 * </ul>
 */
var TabSwitcher = function() {
    var self = this,
        tabs = $('.tabs');

    tabs.each(function() {
        $(this).find('.tabs__link.is-active').next().addClass('is-open');
    });

    tabs.on('click', '.tabs__link', function(event) {
        self.open($(this), event);

        // return false;
    });

    /**
     * Открывает таб по клику на какой-то другой элемент
     *
     * @example
     * <span data-tab-open="#tab-login">Open login tab</span>
     */
    $(document).on('click', '[data-tab-open]', function(event) {
        var tabElem = $(this).data('tab-open');
        self.open($(tabElem), event);

        if ($(this).data('popup') == undefined) {
            return false;
        }
    });

    /**
     * Открывает таб
     * @param  {Element} elem элемент .tabs__link, на который нужно переключить
     *
     * @example
     * // вызов метода open, откроет таб
     * tabSwitcher.open($('#some-tab'));
     */
    self.open = function(elem, event) {
        if (!elem.hasClass('is-active')) {
            event.preventDefault();
            var parentTabs = elem.closest(tabs);
            parentTabs.find('.is-open').removeClass('is-open');

            elem.next().toggleClass('is-open');
            parentTabs.find('.is-active').removeClass('is-active');
            elem.addClass('is-active');
        } else {
            event.preventDefault();
        }
    };
};

var tabSwitcher = new TabSwitcher();
