'use strict';

import gulp from 'gulp';

gulp.task('watch', ['todo']);

// Build the "dist" folder for css, fonts, images, and javascript
gulp.task('default', ['todo']);

gulp.task('todo', function() {
  console.log("TODO");
  return true;
});