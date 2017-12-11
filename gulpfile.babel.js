'use strict';

import fs from 'fs';
import vinylNamed from 'vinyl-named';
import webpack from 'webpack';
import webpackStream from 'webpack-stream';
import yargs from 'yargs';

import gulp from 'gulp';
import autoprefixer from 'gulp-autoprefixer';
import cleanCss from 'gulp-clean-css';
import gulpIf from 'gulp-if';
import imagemin from 'gulp-imagemin';
import jshint from 'gulp-jshint';
import notify from 'gulp-notify';
import rename from 'gulp-rename';
import sass from 'gulp-sass';
import sassLint from 'gulp-sass-lint';
import sourcemaps from 'gulp-sourcemaps';
import uglify from 'gulp-uglify';
import gutil from 'gulp-util';
import htmllint from 'gulp-htmllint';

// Load build settings
const PRODUCTION = !!(yargs.argv.production);
const jsonConfig = fs.readFileSync('gulp-config.json', 'utf8');
const gulpConfig = JSON.parse(jsonConfig);
const webpackConfig = {
  devtool: PRODUCTION ? false : 'source-map',
  module: {
    rules: [
      {
        test: /.js$/,
        use: [
          {
            loader: 'babel-loader'
          }
        ]
      }
    ]
  },
  externals: {
    jquery: '$'
  },
  output: {
    filename: 'app.min.js'
  },
};

// Lint first-party Sass
gulp.task('sass-lint', () => {
  // All first-party Sass should be written in partials (file name should start with an _) and imported within app.scss
  return gulp.src('resources/css/src/**/_*.scss')
      .pipe(sassLint({
        configFile: 'sass-lint.json'
      }))
      .pipe(sassLint.format())
      .pipe(sassLint.failOnError())
});

// Build Sass into CSS
gulp.task('sass-build', () => {
  return gulp.src('resources/css/src/app.scss')
      .pipe(sourcemaps.init())
      .pipe(sass({
        style: 'expanded',
        includePaths: gulpConfig.PATHS.sass
      }).on('error', notify.onError((error) => {
        return "Problem file : " + error.message;
      })))
      .pipe(autoprefixer({ browsers: gulpConfig.COMPATIBILITY }))
      .pipe(cleanCss())
      .pipe(rename({ suffix: '.min' }))
      .pipe(gulpIf(!PRODUCTION, sourcemaps.write()))
      .pipe(gulp.dest('resources/css/dist'))
      .pipe(notify({ message: 'Sass built to dist/app.min.css' }));
});

// Lint then Build Sass into CSS
gulp.task('sass', (callback) => {
  return gulp.series('sass-lint', 'sass-build')(callback);
});

// Lint first-party Javascript
gulp.task('javascript-lint', () => {
  return gulp.src('resources/javascript/src/**/*.js')
      .pipe(jshint({
        esversion: 6
      }))
      .pipe(jshint.reporter('default'))
      .pipe(jshint.reporter('fail')) // Will fail the task only if errors are found
      .pipe(notify((file) => {
          if (file.jshint.success) {
            return false;
          }

          const errors = file.jshint.results.map((data) => {
            if (data.error) {
              return "(" + data.error.line + ':' + data.error.character + ') ' + data.error.reason;
            }
          }).join("\n");

          return file.relative + " (" + file.jshint.results.length + " errors)\n" + errors;
      }));
});

// Build JS into single file
gulp.task('javascript-build', () => {
  return gulp.src('resources/javascript/src/app.js')
      .pipe(vinylNamed())
      .pipe(sourcemaps.init())
      .pipe(webpackStream(webpackConfig, webpack))
      .pipe(gulpIf(PRODUCTION, uglify()
          .on('error', e => { console.log(e); })
      ))
      .pipe(gulpIf(!PRODUCTION, sourcemaps.write()))
      .pipe(gulp.dest('resources/javascript/dist'))
      .pipe(notify({ message: 'Javascript built to dist/app.min.js' }));
});

gulp.task('javascript', (callback) => {
  return gulp.series('javascript-lint', 'javascript-build')(callback);
});

// Minify images
gulp.task('images', (callback) => {
  return gulp.src('resources/images/src/**/*')
      .pipe(imagemin({
        progressive: true
      }))
      .pipe(gulp.dest('resources/images/dist'));
});

// Grab any font files needed
gulp.task('fonts', (callback) => {
  return gulp.src('node_modules/font-awesome/fonts/*')
      .pipe(gulp.dest('resources/fonts/dist'));
});

function htmlLintReporter(path, issues) {
  if (issues.length > 0) {
    issues.forEach(function (issue) {
      gutil.log(gutil.colors.cyan('[gulp-htmllint] ') +
        gutil.colors.white(path + ' [' + issue.line + ',' + issue.column + ']: ') +
        gutil.colors.red('(' + issue.code + ') ' + issue.msg));
    });
    process.exitCode = 1;
  }
}

// TODO: This task isn't currently part of the build pipeline. Review, polish, and include.
gulp.task('html', (callback) => {
  return gulp.src(['templates/*.htm', 'pages/*/*.htm', 'partials/*.htm'])
      .pipe(htmllint({rules: {
          'indent-width': false,
          'id-class-style': 'dash',
          'attr-name-style': 'dash'}
          }, htmlLintReporter));
});

// Build the "dist" folder for images, fonts, css and javascript
gulp.task('build', gulp.parallel('images', 'fonts', 'sass', 'javascript'));

// If given no command, run the build task
gulp.task('default', gulp.series('build'));

// Watch for changes to files. When a change is detected, re-run specific build tasks based on the file type.
gulp.task('watch', () => {
  gulp.watch('node_modules/**/*').on('all', gulp.series('build'));
  gulp.watch('resources/css/src/**/*.scss').on('all', gulp.series('sass'));
  gulp.watch('resources/javascript/src/**/*.js').on('all', gulp.series('javascript'));
  gulp.watch('resources/images/src/**/*').on('all', gulp.series('images'));
  gulp.watch('resources/fonts/src/**/*').on('all', gulp.series('fonts'));
});

// Build and then watch for changes to source files
gulp.task('build:watch', gulp.series('build', 'watch'));
