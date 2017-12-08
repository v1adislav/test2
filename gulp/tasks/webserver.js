var gulp        = require('gulp');
var browsersync = require('browser-sync');
var config      = require('../config');

/*
 * Запуск вебсервера BrowserSync
 */

gulp.task('webserver', function() {
    browsersync(config.browsersync);
});
