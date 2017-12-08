var gulp        = require('gulp');
var gutil       = require('gulp-util');
var rename      = require('gulp-rename');
var browsersync = require('browser-sync');
var sourcemaps  = require('gulp-sourcemaps');
var prefixer    = require('gulp-autoprefixer');
var cssnano     = require('gulp-cssnano');
var plumber     = require('gulp-plumber');
var notify      = require('gulp-notify');
// var mqpacker    = require('css-mqpacker');
var postcss     = require('gulp-postcss');
var svg         = require('postcss-svg');
var easysprite  = require('postcss-easysprites');
var atImport    = require('postcss-import');
var precss      = require('precss');
var mixins      = require('postcss-sassy-mixins');
var lost        = require('lost');
var next        = require('postcss-cssnext');
var shortsize   = require('postcss-size');
var center      = require('postcss-center');
var shortpos    = require('postcss-position');
var pxtorem     = require('postcss-pxtorem');
var flexibility = require('postcss-flexibility');

var config      = require('../config');

/*
 * Компиляция CSS в CSS
 * Создание sourcemaps
 * Минификация
 */


gulp.task('postcss', [
    'postcss-internal',
    'postcss-external'
]);

var processors = [
    atImport(),
    mixins(),
    precss(),
    lost(),
    shortsize(),
    shortpos(),
    center(),
    pxtorem(),
    easysprite(config.sprites),
    svg(config.svg),
    flexibility(),
    next()
];


gulp.task('postcss-internal', function() {
    browsersync.notify('Postcss magic!');

    return gulp.src(config.css.srcInternal)
        .pipe(plumber({
            errorHandler: notify.onError(err => ({
                title: 'Styles internal',
                message: err.message
            }))
        }))
        .pipe(gutil.env.env === 'prod' ? gutil.noop() : sourcemaps.init())
        .pipe(postcss(processors))
        .pipe(prefixer(config.autoprefixer))
        // .pipe(gutil.env.env === 'prod' ? mqpacker() : gutil.noop()) // есть непонятная бага
        .pipe(gutil.env.env === 'prod' ? cssnano({zindex: false}) : gutil.noop())
        .pipe(gutil.env.env === 'prod' ? gutil.noop() : sourcemaps.write())
        .pipe(rename({extname: '.css'}))
        .pipe(gulp.dest(config.css.dest));
});

gulp.task('postcss-external', function() {
    browsersync.notify('Postcss magic!');

    return gulp.src(config.css.srcExternal)
        .pipe(plumber({
            errorHandler: notify.onError(err => ({
                title: 'Styles external',
                message: err.message
            }))
        }))
        .pipe(gutil.env.env === 'prod' ? gutil.noop() : sourcemaps.init())
        .pipe(postcss([atImport()]))
        .pipe(gutil.env.env === 'prod' ? cssnano({zindex: false}) : gutil.noop())
        .pipe(gutil.env.env === 'prod' ? gutil.noop() : sourcemaps.write())
        .pipe(rename({extname: '.css'}))
        .pipe(gulp.dest(config.css.dest));
});