const gulp = require('gulp');  
const sass = require('gulp-sass');  
const browserSync = require('browser-sync').create();


// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
  return gulp.src("sass/*.scss")
      .pipe(sass())
      .pipe(sass().on('error', sass.logError))
      .pipe(gulp.dest("./"))
      .pipe(browserSync.stream());
});

gulp.task('serve', gulp.series('sass', function() { 
  browserSync.init({
    proxy: "zone.devel"
  });

  gulp.watch("sass/*.scss", gulp.series('sass'));
  gulp.watch("./*.php").on('change', browserSync.reload);
  gulp.watch("./js/*.js").on('change', browserSync.reload);
}));

gulp.task('default', gulp.series('serve'));