var gulp = require('gulp'),
  uglify = require('gulp-uglify'),
  rename = require('gulp-rename'),
  browserSync = require('browser-sync'),
  eslint = require('gulp-eslint'),
  sass = require('gulp-sass'),
  autoprefixer = require('gulp-autoprefixer'),
  cssnano = require('gulp-cssnano'),
  prettyerror = require('gulp-prettyerror');
  nodemon = require('gulp-nodemon');


gulp.task('sass', ['browser-sync'], function () {
  gulp.src('./sass/style.scss')
    .pipe(prettyerror())
    .pipe(sass())
    .pipe(autoprefixer({
      browsers: ['last 2 versions']
    }))
    .pipe(cssnano())
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest('./public/css'))
});

gulp.task('scripts', ['lint'], function () {
  gulp.src('./mainjs/*.js')
    .pipe(uglify())
    .pipe(rename({ extname: '.min.js' }))
    .pipe(gulp.dest('./public/js'))

});

gulp.task('lint', function () {
  return gulp.src(['./mainjs/*.js', '!node_modules/**'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());

})

gulp.task('browser-sync', ['nodemon'], function () {
  browserSync.init(null, {
    proxy: "http://localhost:3000",
    files: ["app.js"],
    browser: "google chrome",
    port: 7000,
  });

  gulp.watch(['./public/js/*.js', './public/css/*.css']).on('change', browserSync.reload);
});

// gulp.task('hello', function() {
//   console.log('hello');
// })

gulp.task('watch', function () {
  gulp.watch('./mainjs/*.js', ['scripts']);
  gulp.watch('./sass/*.scss', ['sass']);
});


gulp.task('default', ['watch', 'browser-sync']);
gulp.task('nodemon', function (cb) {
	
	var started = false;
	
	return nodemon({
		script: 'app.js'
	}).on('start', function () {
		// to avoid nodemon being started multiple times
		// thanks @matthisk
		if (!started) {
			cb();
			started = true; 
		} 
	});
});