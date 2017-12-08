var gulp  = require('gulp');
var gutil = require('gulp-util');

var devBuildTasks  = ['html', 'js', 'stylelint', 'postcss', 'images', 'fonts'];
var prodBuildTasks = ['js', 'postcss', 'images', 'fonts'];

gulp.task('build', gutil.env.env === 'prod' ? prodBuildTasks : devBuildTasks);