var gulp    = require('gulp');
var plumber = require('gulp-plumber');
var notify  = require('gulp-notify');
var config  = require('../config');

/*
 * Копирование шрифтов
 */

gulp.task('fonts', function() {
    gulp.src(config.fonts.src)
        .pipe(plumber({
            errorHandler: notify.onError(err => ({
                title: 'Fonts',
                message: err.message
            }))
        }))
        .pipe(gulp.dest(config.fonts.dest))
});