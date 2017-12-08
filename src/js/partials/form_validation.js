/* TODO:
Если после ввода некорректного значения в поле даты выбрать дату в календаре кликом, то не вызывается событие change -> не срабатывает валидация 
Переписать стили для чекбоксов типа slide
Проверить новые чекбоксы во всех браузерах -> поправить, если что не так
*/
Parsley.addMessages('ru', {
    defaultMessage: "Некорректное значение.",
    type: {
        email:        "Введите адрес электронной почты.",
        url:          "Введите URL адрес.",
        integer:      "Введите целое число.",
        digits:       "Введите только цифры.",
        alphanum:     "Введите только английские буквы и цифры."
    },
    required:       "Обязательное поле.",
    pattern:        "Это значение некорректно.",
    min:            "Это значение должно быть не менее чем %s.",
    max:            "Это значение должно быть не более чем %s.",
    range:          "Это значение должно быть от %s до %s.",
    minlength:      "Это значение должно содержать не менее %s символов.",
    maxlength:      "Это значение должно содержать не более %s символов.",
    length:         "Это значение должно содержать от %s до %s символов.",
    mincheck:       "Выберите не менее %s значений.",
    maxcheck:       "Выберите не более %s значений.",
    check:          "Выберите от %s до %s значений.",
    equalto:        "Это значение должно совпадать с предыдущим."
});

Parsley.setLocale('ru');

/*Настройки Parsley*/
$.extend(Parsley.options, {
    trigger: 'input change', //change нужен для select'а
    validationThreshold: '0',
    errorsWrapper: '<div></div>',
    errorTemplate: '<p class="parsley-error-message"></p>',
    classHandler: function(instance) {
        var $element = instance.$element,
            type = $element.attr('type'),
            $handler;
        if (type == 'checkbox' || type == 'radio')
            $handler = $element; //то есть ничего не выделяем (input скрыт), иначе выделяет родительский блок
        else if ($element.hasClass('select2-hidden-accessible'))
            $handler = $('.select2-selection--single', $element.next('.select2'));

        return $handler;
    },
    errorsContainer: function(instance) {
        var $element = instance.$element,
            type = $element.attr('type'),
            $container;

        if (type == 'checkbox' || type == 'radio')
            $container = $('[name="' + $element.attr('name') + '"]:last + label').next('.errors-placement');
        else if ($element.hasClass('select2-hidden-accessible'))
            $container = $element.next('.select2').next('.errors-placement');
        else if (type == 'file')
            $container = $element.closest('.custom-file').next('.errors-placement');

        return $container;
    }
});

/*Кастомные валидаторы*/

/* Только русские буквы, тире, пробелы */
Parsley.addValidator('nameRu', {
    validateString: function(value) {
        return /^[а-яё\- ]*$/i.test(value);
    },
    messages: {
        ru: 'Cимволы А-Я, а-я, " ", "-".'
    }
});

/* Только латинские буквы, тире, пробелы */
Parsley.addValidator('nameEn', {
    validateString: function(value) {
        return /^[a-z\- ]*$/i.test(value);
    },
    messages: {
        ru: 'Cимволы A-Z, a-z, " ", "-".'
    }
});

/* Только латинские и русские буквы, тире, пробелы */
Parsley.addValidator('name', {
    validateString: function(value) {
        return /^[а-яёa-z\- ]*$/i.test(value);
    },
    messages: {
        ru: 'Cимволы A-Z, a-z, А-Я, а-я, " ", "-".'
    }
});

/* Только цифры и русские буквы */
Parsley.addValidator('numLetterRu', {
    validateString: function(value) {
        return /^[0-9а-яё]*$/i.test(value);
    },
    messages: {
        ru: 'Cимволы А-Я, а-я, 0-9.'
    }
});

/* Только цифры, латинские и русские буквы */
Parsley.addValidator('numLetter', {
    validateString: function(value) {
        return /^[а-яёa-z0-9]*$/i.test(value);
    },
    messages: {
        ru: 'Cимволы A-Z, a-z, А-Я, а-я, 0-9.'
    }
});

/* Телефонный номер */
Parsley.addValidator('phone', {
    validateString: function(value) {
        return /^[-+0-9() ]*$/i.test(value);
    },
    messages: {
        ru: 'Некорректный телефонный номер.'
    }
});

/* Формат даты DD.MM.YYYY */
Parsley.addValidator('date', {
    validateString: function(value) {
        var regTest = /^(?:(?:31(\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\.)(?:0?[1,3-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{4})$/,
            regMatch = /(\d{1,2})\.(\d{1,2})\.(\d{4})/,
            min = arguments[2].$element.data('dateMin'),
            max = arguments[2].$element.data('dateMax'),
            minDate, maxDate, valueDate, result;

        if (min && (result = min.match(regMatch)))
            minDate = new Date(+result[3], result[2] - 1, +result[1]);
        if (max && (result = max.match(regMatch)))
            maxDate = new Date(+result[3], result[2] - 1, +result[1]);
        if (result = value.match(regMatch))
            valueDate = new Date(+result[3], result[2] - 1, +result[1]);

        return regTest.test(value) && (minDate ? valueDate >= minDate : true) && (maxDate ? valueDate <= maxDate : true);
    },
    messages: {
        ru: 'Некорректная дата.'
    }
});

/* Файл ограниченного размера */
Parsley.addValidator('maxFileSize', {
    validateString: function(value, maxSize, parsleyInstance) {
        var files = parsleyInstance.$element[0].files;
        return files.length != 1  || files[0].size <= maxSize * 1024;
    },
    requirementType: 'integer',
    messages: {
        ru: 'Файл должен весить не более, чем %s Kb'
    }
});

/*Включает/отключает кнопку submit'а*/
Parsley.on('field:validated', function() {
    var $form = this.$element.closest('form');
    $form.find('[type="submit"], [data-submit="true"]').prop('disabled', !$form.parsley().isValid());
});

/*Создаёт контейнеры для ошибок у нетипичных элементов*/
Parsley.on('field:init', function() {
    var $element = this.$element,
        type = $element.attr('type'),
        $block = $('<div/>').addClass('errors-placement'),
        $last;

    if (type == 'checkbox' || type == 'radio') {
        $last = $('[name="' + $element.attr('name') + '"]:last + label');
        if (!$last.next('.errors-placement').length)
            $last.after($block);
    } else if ($element.hasClass('select2-hidden-accessible')) {
        $last = $element.next('.select2');
        if (!$last.next('.errors-placement').length)
            $last.after($block);
    } else if (type == 'file') {
        $last = $element.closest('.custom-file');
        if (!$last.next('.errors-placement').length)
            $last.after($('<div/>').addClass('errors-placement'));
    }
});

$('form[data-validate="true"]').parsley();