'use strict';

import gulp from 'gulp';

// Placeholder task, will be removed once real tasks are in place
gulp.task('sass', () => {
  console.log("TODO: Sass task");
  return true;
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