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
import notify from 'gulp-notify';
import rename from 'gulp-rename';
import sass from 'gulp-sass';
import sassLint from 'gulp-sass-lint';
import sourcemaps from 'gulp-sourcemaps';
import uglify from 'gulp-uglify';

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
  output: {
    filename: 'app.min.js'
  }
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


gulp.task('javascript', (callback) => {
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


gulp.task('images', (callback) => {
  console.log("TODO: Images task");
  callback();
});


gulp.task('fonts', (callback) => {
  console.log("TODO: Fonts task");
  callback();
});


// Build the "dist" folder for css, fonts, images, and javascript
gulp.task('build', gulp.parallel('sass', 'javascript', 'images', 'fonts'));

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