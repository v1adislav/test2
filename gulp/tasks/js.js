var gulp        = require('gulp');
var gutil       = require('gulp-util');
var browsersync = require('browser-sync');
var fileinclude = require('gulp-file-include');
var uglify      = require('gulp-uglify');
var sourcemaps  = require('gulp-sourcemaps');
var plumber     = require('gulp-plumber');
var notify      = require('gulp-notify');
var config      = require('../config');

/*
 * Сборка js
 * Минификация
 */

gulp.task('js', [
    'js-internal',
    'js-external'
]);

gulp.task('js-internal', function() {
    browsersync.notify('Compiling js');

    return gulp.src(config.js.srcInternal)
        .pipe(plumber({
            errorHandler: notify.onError(err => ({
                title: 'Js internal',
                message: err.message
            }))
        }))
        .pipe(gutil.env.env === 'prod' ? gutil.noop() : sourcemaps.init())
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file',
            indent: true
        }))
        .pipe(gutil.env.env === 'prod' ? uglify() : gutil.noop())
        .pipe(gutil.env.env === 'prod' ? gutil.noop() : sourcemaps.write())
        .pipe(gulp.dest(config.js.dest));
});

gulp.task('js-external', function() {
    browsersync.notify('Compiling js');

    // jQuery делаем отдельно чтобы подключить его в head
    gulp.src(config.js.srcJquery)
        .pipe(gulp.dest(config.js.destJquery));

    return gulp.src(config.js.srcExternal)
        .pipe(plumber({
            errorHandler: notify.onError(err => ({
                title: 'Js external',
                message: err.message
            }))
        }))
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file',
            indent: true
        }))
        .pipe(gutil.env.env === 'prod' ? uglify() : gutil.noop())
        .pipe(gulp.dest(config.js.dest));
});