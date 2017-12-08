var gulp        = require('gulp');
var browsersync = require('browser-sync');
var fileinclude = require('gulp-file-include');
var plumber     = require('gulp-plumber');
var notify      = require('gulp-notify');
var config      = require('../config');

/*
 * Сборка html
 */

gulp.task('html', function() {
    browsersync.notify('Compiling html');

    return gulp.src(config.html.src)
        .pipe(plumber({
            errorHandler: notify.onError(err => ({
                title: 'Html',
                message: err.message
            }))
        }))
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file',
            indent: true
        }))
        .pipe(gulp.dest(config.html.dest))
});