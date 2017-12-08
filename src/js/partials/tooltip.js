/**
 * Реализует тултипы
 * @see  http://api.jqueryui.com/tooltip/
 */
$('.tooltip').tooltip({
    position: {
        my: 'center top+15',
        at: 'center bottom',
        collision: "flip",
        using: function(position, feedback) {
            $(this).css(position).addClass(feedback.vertical);
        },
        show: {
            effect: 'fade',
            duration: global.time
        }
    }
});