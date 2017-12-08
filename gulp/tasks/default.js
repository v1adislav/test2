var gulp  = require('gulp');
var gutil = require('gulp-util');

gulp.task('default', gutil.env.env === 'prod' ? ['build'] : ['build', 'webserver', 'watch']);