/**
 * Делает выпадющие календарики
 * @see  http://api.jqueryui.com/datepicker/
 *
 * @example
 * // в data-date-min и data-date-max можно задать дату в формате dd.mm.yyyy
 * <input type="text" name="dateInput" id="" class="datepicker" data-date-min="06.11.2015" data-date-max="10.12.2015">
 */
var Datepicker = function() {
    var datepicker = $('.datepicker'),
        minDate,
        maxDate;

    datepicker.each(function () {

        minDate = $(this).data('date-min');
        maxDate = $(this).data('date-max');

        $(this).datepicker({
            showOtherMonths: true,
            minDate: minDate || null,
            maxDate: maxDate || null,
            onSelect: function () {
                console.log(1);
                $(this).change();
            }
        });
    });
};

var datepicker = new Datepicker();