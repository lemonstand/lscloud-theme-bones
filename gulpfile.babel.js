'use strict';

import fs from 'fs';
import yargs from 'yargs';

import gulp from 'gulp';
import autoprefixer from 'gulp-autoprefixer';
import sass from 'gulp-sass';
import cleanCss from 'gulp-clean-css';
import gulpIf from 'gulp-if';
import rename from 'gulp-rename';
import notify from 'gulp-notify';
import sourcemaps from 'gulp-sourcemaps';

// Load build settings
const PRODUCTION = !!(yargs.argv.production);
const jsonConfig = fs.readFileSync('gulp-config.json', 'utf8');
const gulpConfig = JSON.parse(jsonConfig);

// Build Sass into CSS
gulp.task('sass', () => {
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
      .pipe(notify({ message: 'Sass task complete' }));
});


gulp.task('javascript', () => {
  console.log("TODO: Javascript task");
  return true;
});


gulp.task('images', () => {
  console.log("TODO: Images task");
  return true;
});


gulp.task('fonts', () => {
  console.log("TODO: Fonts task");
  return true;
});


// Build the "dist" folder for css, fonts, images, and javascript
gulp.task('build', gulp.parallel('sass', 'javascript', 'images', 'fonts'));

// If given no command, run the build task
gulp.task('default', gulp.series('build'));

// Watch for changes to files. When a change is detected, re-run specific build tasks based on the file type.
gulp.task('watch', () => {
  gulp.watch('node_modules/**/*').on('all', ['build']);
  gulp.watch('resources/css/src/**/*.scss').on('all', gulp.series('sass'));
  gulp.watch('resources/javascript/src/**/*.js').on('all', gulp.series('javascript'));
  gulp.watch('resources/images/src/**/*').on('all', gulp.series('images'));
  gulp.watch('resources/fonts/src/**/*').on('all', gulp.series('fonts'));
});

// Build and then watch for changes to source files
gulp.task('build:watch', gulp.series('build', 'watch'));