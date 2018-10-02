// Link gulp libraries

var gulp = require('gulp');
var gutil = require('gulp-util');
var coffee = require('gulp-coffee');
var concat = require('gulp-concat');
var browserify = require('gulp-browserify');

// Sources

var coffeeSources = [
	'builds/components/coffee/tagline.coffee'
];

var jsSources = [
	'builds/components/scripts/tagline.js',
	'builds/components/scripts/h1_enlarger.js',
	'builds/components/scripts/img_enlarger.js'
];


// Gulp tasks

gulp.task('coffee', function(){
	gulp.src(coffeeSources).pipe(coffee({bare: true}).on('error', gutil.log)).pipe(gulp.dest("builds/components/scripts"));
});

gulp.task('js_concat', function(){
	gulp.src(jsSources).pipe(concat('script.js')).on('error', gutil.log).pipe(browserify()).pipe(gulp.dest('builds/development/js'));
});