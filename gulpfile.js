'use strict';

var gulp = require( 'gulp' );
var del = require( 'del' );
var sass = require( 'gulp-ruby-sass' );
var concat = require( 'gulp-concat' );
var sourcemaps = require( 'gulp-sourcemaps' );

gulp.task( 'clean', function() {
  return del.sync( [
    // here we use a globbing pattern to match everything inside the ` folder
    'dist/**/*'
    // we don't want to clean this file though so we negate the pattern
    // '!dist/mobile/deploy.json'
  ] );
} );

gulp.task( 'sass', function() {
  return sass( 'src/sass/app.scss', {
    verbose: true
      // loadPath: ['src/sass/bourbon']
  } ).on( 'error', sass.logError ).pipe( gulp.dest( 'dist/css' ) );
} );

gulp.task( 'static', function() {
  gulp.src( [ 'src/**/*.html', 'src/favicon.ico' ] ).pipe( gulp.dest( 'dist' ) );
} );

gulp.task( 'js', function() {
  return gulp.src( [ 'src/js/app.js'
      // './lib/file1.js',
      // './lib/file2.js'
    ] )
    .pipe( sourcemaps.init() )
    .pipe( concat( 'all.js' ) )
    .pipe( sourcemaps.write() )
    .pipe( gulp.dest( 'dist/js' ) );
} );

gulp.task( 'default', [ 'clean', 'sass', 'static', 'js' ] );
