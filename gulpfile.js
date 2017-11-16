// Load plugins
var gulp = require('gulp'),
    sass = require('gulp-sass'),
    minifycss = require('gulp-minify-css'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    notify = require('gulp-notify');

// Source paths
var jsSrc = [
        'resources/scripts/src/*.js'
    ],
    sassSrc = [
        'resources/stylesheets/src/*.scss'
    ];

// Compile and minify Sass 
gulp.task('styles', function () {
    gulp.src(sassSrc)
        .pipe(sass({
            style: 'expanded',
            lineNumbers: true,
            sourcemap: false,
            includePaths: require('node-neat').includePaths
        })
        .on('error', notify.onError(
          function (error) {
            return "Problem file : " + error.message;
        })))
        .pipe(gulp.dest('resources/stylesheets'))
        .pipe(rename({ suffix: '.min' }))
        .pipe(minifycss())
        .pipe(gulp.dest('resources/stylesheets'))
        .pipe(notify({ message: 'Styles task complete' }));
}); 

// Lint
gulp.task('lint', function() {
    return gulp.src(jsSrc)
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(notify(
            function (file) {
              if (file.jshint.success) {
                return false;
              }

              var errors = file.jshint.results.map(function (data) {
                if (data.error) {
                  return "(" + data.error.line + ':' + data.error.character + ') ' + data.error.reason;
                }
              }).join("\n");
              return file.relative + " (" + file.jshint.results.length + " errors)\n" + errors;
            }
        ));
});

// Concat and uglify scripts
gulp.task('scripts', function () {
    gulp.src(jsSrc)
        .pipe(concat('all.js'))
        .pipe(rename({ suffix: '.min' }))
        .pipe(uglify())
        .pipe(gulp.dest('resources/scripts'))
        .pipe(notify({ message: 'Scripts task complete' }));
});   

// Watch for changes
gulp.task('watch', function() {
    gulp.watch(jsSrc, ['lint']);
    gulp.watch(sassSrc, ['styles']);
    gulp.watch(jsSrc, ['scripts']);
});

// Default task
gulp.task('default', ['styles', 'lint', 'scripts', 'watch']);
