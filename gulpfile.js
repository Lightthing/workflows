// Link gulp plugins (may be installed rirst through node.js npm)

var gulp = require('gulp'); //core module for Gulp
var gutil = require('gulp-util'); // Gulp utilities library, e.g. 'log' method
var coffee = require('gulp-coffee'); // Processes CoffeeScript into JavaScript
var concat = require('gulp-concat'); // assemble many of JS files into one
var browserify = require('gulp-browserify'); // Mixes libraries (like JQuery) into script code files (needs Ruby to be installed)
var compass = require('gulp-compass'); // Processes Sass into CSS (needs Ruby to be installed)
var connect = require('gulp-connect'); // Creates HTTP server

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
	gulp.src(jsSources).pipe(concat('script.js')).on('error', gutil.log).pipe(browserify()).pipe(gulp.dest('builds/development/js')).pipe(connect.reload());
});

gulp.task('compass', function(){
	gulp.src(sassSources).pipe(compass({
		sass: 'builds/components/sass',
		image: 'builds/development/images',
		style: 'expanded'
	})).on('error', gutil.log).pipe(gulp.dest('builds/development/css')).pipe(connect.reload());
});

gulp.task('all', ['coffee', 'js_concat', 'compass']);


gulp.task('watch', function(){
	gulp.watch(coffeeSources, ['coffee']);
	gulp.watch(jsSources, ['js_concat']);
	gulp.watch('builds/components/sass/*.scss', ['compass']);
});

gulp.task('connect', function(){
	connect.server({
		root: 'builds/development',
		livereload: true
	});
});

gulp.task('default', ['coffee', 'js_concat', 'compass', 'connect', 'watch']);