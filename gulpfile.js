var gulp 					= require('gulp');
var minifycss 		= require('gulp-minify-css');
var stylus 				= require('gulp-stylus');
var autoprefixer 	= require('gulp-autoprefixer');
var notify 				= require('gulp-notify');
var livereload 		= require('gulp-livereload');
var coffee 				= require('gulp-coffee');
var changed 			= require('gulp-changed');
var jade 					= require('gulp-jade');
var watch 				= require('gulp-jade');
var watch 				= require('gulp-jade');
var coffeelint 		= require('gulp-coffeelint');
var plumber 			= require('gulp-plumber');
var uglify 				= require('gulp-uglify');
var jasminePhantomJs = require('gulp-jasmine2-phantomjs');
var clone  = require('gulp-clone');
var rename = require("gulp-rename");

var devFolder 	= '';
var distFolder  = '';

var paths = {
	src: {
		js:  			devFolder + 'js/**/*.coffee',
		mainJs:  	devFolder + 'js/any-resize-event.js',
		css: 			devFolder + 'css/**/*.styl',
		kit: 			devFolder + 'css/kit.jade',
		index: 		devFolder + 'index.jade',
		partials: devFolder + 'css/partials/**/*.jade',
		templates:devFolder + 'templates/**/*.jade',
		tests:  	distFolder + 'spec/**/*.coffee'
	},
	dist:{
		js:  			distFolder + 'js/',
		tests:  	distFolder + 'spec/',
		css: 			distFolder + 'css/',
		kit: 			distFolder + 'css/',
		index: 		distFolder
	}
}


gulp.task('stylus', function(){
	return gulp.src(devFolder + 'css/main.styl')
					.pipe(stylus())
					.pipe(autoprefixer('last 4 version'))
					.pipe(minifycss())
					.pipe(gulp.dest(paths.dist.css))
					.pipe(livereload())
});


gulp.task('coffee', function(e){
	return gulp.src(paths.src.js)
		.pipe(plumber())
		.pipe(changed(paths.src.js))
		.pipe(coffeelint())
		.pipe(coffeelint.reporter())
		.pipe(coffee())
		.pipe(gulp.dest(paths.dist.js))
		.pipe(livereload())
});

gulp.task('build', function() {
	return gulp.src(paths.src.mainJs)
		.pipe(clone())
		.pipe(gulp.dest('dist/'))
		.pipe(uglify({ preserveComments: 'some' }))
		.pipe(rename('any-resize-event.min.js'))
		.pipe(gulp.dest('dist/'))
});

gulp.task('coffee:tests', function(e){
	return gulp.src(paths.src.tests)
					.pipe(plumber())
					.pipe(changed(paths.src.tests))
					.pipe(coffeelint())
        	.pipe(coffeelint.reporter())
					.pipe(coffee())
					.pipe(gulp.dest(paths.dist.tests))
					.pipe(livereload())
});

gulp.task('test', function(){
	return gulp.src('spec/SpecRunner.html')
        .pipe(jasminePhantomJs());
});

gulp.task('kit:jade', function(e){
	return gulp.src(paths.src.kit)
					.pipe(jade({pretty:true}))
					.pipe(gulp.dest(paths.dist.kit))
					.pipe(livereload())
});

gulp.task('index:jade', function(e){
	return gulp.src(paths.src.index)
					.pipe(jade({pretty:true}))
					.pipe(gulp.dest(paths.dist.index))
					.pipe(livereload())
});

gulp.task('default', function(){
	var server = livereload();

	gulp.watch(paths.src.css, function(e){
		gulp.run('stylus');
	});

	gulp.watch(paths.src.js, function(e){
		gulp.run('coffee', 'build');
		server.changed(e.path)
	});

	gulp.watch(paths.src.tests, function(e){
		gulp.run('coffee:tests');
		server.changed(e.path)
	});

	gulp.watch(paths.src.kit, function(e){
		gulp.run('kit:jade');
		server.changed(e.path);
	});

	gulp.watch(paths.src.index, function(e){
		gulp.run('index:jade');
		server.changed(e.path);
	});

	gulp.watch(paths.src.partials, function(e){
		gulp.run('kit:jade');
		gulp.run('index:jade');
		server.changed(e.path);
	});

	gulp.watch(paths.src.templates, function(e){
		gulp.run('index:jade');
		server.changed(e.path);
	});

});











