var gulp   = require('gulp');
var rimraf = require('rimraf');
var config = require('../config');


/*
 * Удаление папки build
 */

gulp.task('clean', function(cb) {
    rimraf(config.clean.dest, cb);
});