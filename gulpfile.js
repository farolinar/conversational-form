global.gulp = require('gulp');
var fs = require('fs');
var gulpsync = require('gulp-sync')(global.gulp);
var Server = require('karma').Server;

// include task files
require("./gulp-tasks/styles");
require("./gulp-tasks/scripts");
require("./gulp-tasks/images");
//require("./gulp-tasks/bower");
require("./gulp-tasks/documentation");

//options
var rootPath = "./";

var srcFolder = rootPath + 'src/';
global.srcFolder = srcFolder;

var buildFolder = rootPath + 'build/';
global.buildFolder = buildFolder;

var distFolder = rootPath + 'dist/';
global.distFolder = distFolder;

var tasks = ['scripts-form-build', 'sass-form-build', 'copy-images'];
//var distTasks = tasks.concat(['karma-tests']);

// Default tasks
global.gulp.task('build', global.gulp.series(...tasks));
//global.gulp.task('dist', global.gulp.series(...distTasks));

gulp.task('karma-tests', function (done) {
	new Server({
	  configFile: __dirname + '/karma.conf.js',
	  singleRun: true
	}, done).start();
  });
