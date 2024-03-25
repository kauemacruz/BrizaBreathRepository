var gulp = require('gulp');
var concat = require('gulp-concat');
var cssmin = require('gulp-cssmin');
var uglify = require('gulp-uglify');

gulp.task('minify-css', function () {
    return gulp.src('wwwroot/css/*.css') // Adjust this path to where your CSS files are
        .pipe(concat('site.min.css')) // This will concatenate all css files into one file named site.min.css
        .pipe(cssmin()) // This will minify the concatenated file
        .pipe(gulp.dest('wwwroot/dist/css')); // Adjust the destination as needed
});

gulp.task('minify-js', function () {
    return gulp.src(['wwwroot/js/*.js', '!wwwroot/js/global.js', '!wwwroot/js/browser.js']) // Adjust this path to where your JavaScript files are
        .pipe(concat('site.min.js')) // This will concatenate all js files into one file named site.min.js
        .pipe(uglify()) // This will minify the concatenated file
        .pipe(gulp.dest('wwwroot/dist/js')); // Adjust the destination as needed
});

gulp.task('default', gulp.series('minify-css', 'minify-js')); // Default task to run both minify tasks
