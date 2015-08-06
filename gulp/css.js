var gulp = require('gulp');
var concat = require('gulp-concat');
var stylus = require('gulp-stylus');

gulp.task('css', function(){
	gulp.src('css/**/*.styl')
		.pipe(concat('app.css'))
		.pipe(stylus())
		.pipe(gulp.dest('assets'));
});

// 감시
gulp.task('watch:css', ['css'], function(){
	gulp.watch('css/**/*.styl', ['css']);
});

