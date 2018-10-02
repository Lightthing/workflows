// Link gulp libraries

var gulp = require('gulp');
var gutil = require('gulp-util');
var coffee = require('gulp-coffee');
var concat = require('gulp-concat');
var browserify = require('gulp-browserify');
var compass = require('gulp-compass');

// Sources

var coffeeSources = [
	'builds/components/coffee/tagline.coffee'
];

var jsSources = [
	'builds/components/scripts/tagline.js',
	'builds/components/scripts/h1_enlarger.js',
	'builds/components/scripts/img_enlarger.js'
];

var sassSources = [
	'builds/components/sass/style.scss'
];

// Gulp tasks

gulp.task('coffee', function(){
	gulp.src(coffeeSources).pipe(coffee({bare: true}).on('error', gutil.log)).pipe(gulp.dest("builds/components/scripts"));
});

gulp.task('js_concat', function(){
	gulp.src(jsSources).pipe(concat('script.js')).on('error', gutil.log).pipe(browserify()).pipe(gulp.dest('builds/development/js'));
});

gulp.task('compass', function(){
	gulp.src(sassSources).pipe(compass({
		sass: 'builds/components/sass',
		image: 'builds/development/images',
		style: 'expanded'
	})).on('error', gutil.log).pipe(gulp.dest('builds/development/css'));
});

gulp.task('all', ['coffee', 'js_concat', 'compass']);

gulp.task('default', ['coffee', 'js_concat', 'compass']);