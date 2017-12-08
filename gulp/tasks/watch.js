var gulp   = require('gulp');
var watch  = require('gulp-watch');
var config = require('../config');

/*
 * Смотрит за изменениями
 */

gulp.task('watch', function(){
    watch([config.watch.html], function(event, cb) {
        gulp.start('html');
    });
    watch(config.watch.cssInternal, function(event, cb) {
        gulp.start('postcss-internal');
        gulp.start('stylelint');
    });
    watch([config.watch.cssExternal], function(event, cb) {
        gulp.start('postcss-external');
    });
    watch(config.watch.jsInternal, function(event, cb) {
        gulp.start('js-internal');
    });
    watch(config.watch.jsExternal, function(event, cb) {
        gulp.start('js-external');
    });
    watch([config.watch.images], function(event, cb) {
        gulp.start('images');
    });
    watch([config.watch.fonts], function(event, cb) {
        gulp.start('fonts');
    });
});