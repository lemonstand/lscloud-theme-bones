'use strict';

import gulp from 'gulp';

// Placeholder task, will be removed once real tasks are in place
gulp.task('todo', () => {
  console.log("TODO");
  return true;
});

// Build the "dist" folder for css, fonts, images, and javascript
gulp.task('build', gulp.series('todo'));

// If given no command, run the build task
gulp.task('default', gulp.series('build'));

// Watch for changes to files. When a change is detected, re-run specific build tasks based on the file type.
gulp.task('watch', () => {
  gulp.watch('node_modules/**/*').on('all', ['build']);
});

// Build and then watch for changes to source files
gulp.task('build:watch', gulp.series('build', 'watch'));