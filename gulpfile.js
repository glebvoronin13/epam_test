var gulp = require('gulp');
var concatCss = require('gulp-concat-css'),
	rename = require('gulp-rename'),
	sass = require('gulp-sass'),
	notify = require('gulp-notify'),
	prefix = require('gulp-autoprefixer'),
	livereload = require('gulp-livereload'),
	connect = require('gulp-connect');
 

 // default task
gulp.task('default', ['connect', 'html', 'css', 'js', 'img', 'fonts', 'watch']);

// gulp-connect server
gulp.task('connect', function() {
  connect.server({
    root: 'build',
    livereload: true
  });
});

// css
gulp.task('css', function () {
  gulp.src('src/scss/style.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(prefix('last 5 versions', '> 1%', 'ie 9'))
    .pipe(rename('style.css'))
    .pipe(gulp.dest('build/css/'))
    .pipe(notify('Done'))
    .pipe(connect.reload());
});

//html 

gulp.task('html', function () {
  gulp.src('src/templates/index.html')
  	.pipe(gulp.dest('build/'))
    .pipe(connect.reload());
});

//JS 

gulp.task('js', function () {
  gulp.src('src/js/main.js')
  	.pipe(gulp.dest('build/js'))
    .pipe(connect.reload());
});

//IMG

gulp.task('img', function () {
  gulp.src('src/img/*')
  	.pipe(gulp.dest('build/img'))
    .pipe(connect.reload());
});

//Fonts

gulp.task('fonts', function () {
  gulp.src('src/fonts/*')
  	.pipe(gulp.dest('build/fonts'))
    .pipe(connect.reload());
});

// watcher

gulp.task('watch', function () {
	gulp.watch('src/scss/*.scss', ['css'])
	gulp.watch('src/templates/index.html', ['html'])
	gulp.watch('src/js/main.js', ['js'])
	gulp.watch('src/img/*', ['img'])
	gulp.watch('src/fonts/*', ['fonts'])
})