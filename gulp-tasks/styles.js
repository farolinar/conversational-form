const flatten = require('gulp-flatten');
const changed = require('gulp-changed');
// const gutil = require('gulp-util');
const log = require('fancy-log');
const livereload = require('gulp-livereload');
// const notify = require("gulp-notify");
const concat = require('gulp-concat');
const cleanCSS = require('gulp-clean-css');
const rename = require('gulp-rename');

const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');

function swallowError(error) {
	// If you want details of the error in the console
	log.error(error.toString());
	this.emit('end');
}

/**
 * OBS: seperate build tasks out so we can split the project into smaller pieces later.
 */

/**
 * SCSS
 */
global.gulp.task('sass-form', function () {
	const src = [
		global.srcFolder + "/styles/conversational-form*.scss"
	]
	const dst = global.buildFolder;

	const stream = global.gulp.src(src)
		.pipe(sass().on('error', sass.logError))
		.pipe(autoprefixer({ browsers: ['> 1%']}))
		.pipe(global.gulp.dest(dst))
		.pipe(livereload())
		// .pipe(notify("CSS compiled."));

	return stream;
});

/**
 * form style tasks
 */

global.gulp.task('sass-form-build', gulp.series('sass-form', function(){
        const src = [
                global.buildFolder + "conversational-form*.css"
        ]

        const stream = global.gulp.src(src)
                // .pipe(concat('conversational-form.css'))
                .pipe(global.gulp.dest(global.distFolder))
                .pipe(cleanCSS())
                .pipe(rename({suffix: '.min'}))
                .pipe(global.gulp.dest(global.distFolder));

        return stream;
}));
