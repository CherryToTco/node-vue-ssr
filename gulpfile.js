const gulp = require('gulp');
var plugins = require('gulp-load-plugins')();

var srcPaths = {
  js:'./dist/*.js',
};

gulp.task('minify-js',function () {
  gulp.src(srcPaths.js)
    .pipe(plugins.uglify())
    .pipe(gulp.dest('./dist'));
});

gulp.task('default',['minify-js']);