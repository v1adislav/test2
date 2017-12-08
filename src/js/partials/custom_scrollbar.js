/**
 * Реализует кастомный скроллбар с помощью malihu-custom-scrollbar-plugin
 * @see http://manos.malihu.gr/jquery-custom-content-scroller/
 *
 * @example
 * <div class="some-scroll-block" data-scrollbar="custom"></div>
 */
function customizeScrollbar() {
    if ($('[data-scrollbar="custom"]').length > 0) {
        $('[data-scrollbar="custom"]').mCustomScrollbar({
            theme: 'custom'
        });
    }

    if ($('[data-scrollbar="custom-h"]').length > 0) {
        $('[data-scrollbar="custom-h"]').mCustomScrollbar({
            theme: 'custom',
            autoHideScrollbar: true,
            axis: 'x'
        });
    }
}

$(window).load(function() {
    customizeScrollbar();
});