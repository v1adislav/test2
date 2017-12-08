/**
 * Добавляет маски в поля форм
 * @see  https://github.com/RobinHerbots/Inputmask
 *
 * @example
 * <input type="tel" name="tel" id="tel" data-mask="phoneRu">
 */
$('[data-mask="phoneRu"]').inputmask('+7(999) 999-99-99', {
    clearMaskOnLostFocus: false
});