var gulp           = require('gulp');
var gutil          = require('gulp-util');
var browsersync    = require('browser-sync');
var imageOptimizer = require('gulp-imagemin');
var pngquant       = require('imagemin-pngquant');
var plumber        = require('gulp-plumber');
var notify         = require('gulp-notify');
var config         = require('../config');


config.images.options.use = [pngquant()];

/*
 * Сжатие картинок
 */

gulp.task('images', function() {
    browsersync.notify('Compiling images');
    return gulp.src(gutil.env.env === 'prod' ? config.images.srcProduction : config.images.src)
        .pipe(plumber({
            errorHandler: notify.onError(err => ({
                title: 'Image optimizer',
                message: err.message
            }))
        }))
        .pipe(imageOptimizer(config.images.options))
        .pipe(gulp.dest(config.images.dest))
});