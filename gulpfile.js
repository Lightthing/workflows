//Switching between development and production modes
var production_mode = 1;


// Linking gulp plugins (may be installed rirst through node.js npm)

var gulp = require('gulp'); //core module for Gulp
var gutil = require('gulp-util'); // Gulp utilities library, e.g. 'log' method
var coffee = require('gulp-coffee'); // Processes CoffeeScript into JavaScript
var concat = require('gulp-concat'); // assemble many of JS files into one
var browserify = require('gulp-browserify'); // Mixes libraries (like JQuery) into script code files (needs Ruby to be installed)
var compass = require('gulp-compass'); // Processes Sass into CSS (needs Ruby to be installed)
var minifyjs = require('gulp-js-minify'); //To minimize JS files
var connect = require('gulp-connect'); // Creates HTTP server
var gulpif = require('gulp-if'); // Allows usind advanced 'if' method
var minifyHTML = require('gulp-minify-html'); //Minifies HTML
var imagemin = require('gulp-imagemin'); // For minifying images (requires gulp imagemin-pngcrush installed)
var pngcrush = require('imagemin-pngcrush');



// Variables declaration

var htmlSources, coffeeSources, jsSources, sassSources, outputDir, sassStyle, imgSources;



// ENVIRONMENT

if(!production_mode){//Running Gulp in development mode
	gutil.log('<<<<<<< DEVELOPMENT MODE >>>>>>>');
	outputDir = 'builds/development/';
	sassStyle = 'expanded';
}else{//Running Gulp in production mode
	gutil.log('<<<<<<< PRODUCTION MODE >>>>>>>');
	outputDir = 'builds/production/';
	sassStyle = 'compressed';
}



// Sources

htmlSources = [
	'builds/development/*.html'
];

imgSources = [
	'builds/development/images/**/*.*'
];

coffeeSources = [
	'builds/components/coffee/tagline.coffee'
];

jsSources = [
	'builds/components/scripts/tagline.js',
	'builds/components/scripts/h1_enlarger.js',
	'builds/components/scripts/img_enlarger.js'
];

sassSources = [
	'builds/components/sass/style.scss'
];

// Gulp tasks

gulp.task('html_track', function(){
	gulp.src(htmlSources).
	pipe(gulpif(production_mode, minifyHTML())).
	pipe(gulpif(production_mode, gulp.dest(outputDir))).
	pipe(connect.reload());
});


gulp.task('images', function(){
	gulp.src(imgSources).
	pipe(gulpif(production_mode, imagemin({
		progressive: true,
		svgoPlugins: [{removeViewBox: false}],
		use: [pngcrush()]
	}))).
	pipe(gulpif(production_mode, gulp.dest('builds/production/images/'))).
	pipe(connect.reload());
});

gulp.task('coffee', function(){
	gulp.src(coffeeSources).
	pipe(coffee({bare: true}).
	on('error', gutil.log)).
	pipe(gulp.dest("builds/components/scripts"));
});

gulp.task('js_concat', function(){
	gulp.src(jsSources).
	pipe(concat('script.js')).
	on('error', gutil.log).
	pipe(browserify()).
	pipe(gulpif(production_mode, minifyjs())).
	pipe(gulp.dest(outputDir + 'js')).
	pipe(connect.reload());
});

gulp.task('compass', function(){
	gulp.src(sassSources).
	pipe(compass({
		sass: 'builds/components/sass',
		image: outputDir + 'images',
		style: sassStyle
	})).
	on('error', gutil.log).
	pipe(gulp.dest(outputDir + 'css')).
	pipe(connect.reload());
});

gulp.task('all', ['coffee', 'js_concat', 'compass']);


gulp.task('watch', function(){
	gulp.watch(htmlSources, ['html_track']);
	gulp.watch(coffeeSources, ['coffee']);
	gulp.watch(jsSources, ['js_concat']);
	gulp.watch('builds/components/sass/*.scss', ['compass']);
	gulp.watch(imgSources, ['images']);
});

gulp.task('connect', function(){
	connect.server({
		root: outputDir,
		livereload: true
	});
});

gulp.task('default', ['html_track', 'coffee', 'js_concat', 'compass', 'connect', 'images', 'watch']);