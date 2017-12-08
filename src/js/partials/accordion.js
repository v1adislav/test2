/**
 * UI аккордион
 * @see  http://api.jqueryui.com/accordion/
 */
var accordion = function() {
    $('.accordion').accordion({
        header: '.accordion__head',
        animate: global.time,
        heightStyle: 'content',
        beforeActivate: function(event, ui) {
            if ($(event.currentTarget).hasClass('is-disabled')) {
                return false;
            }
        }
    });
};

$(window).load(function() {
    accordion();
});