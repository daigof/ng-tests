'use strict';

var gulp = require( 'gulp' );
var del = require( 'del' );
var sass = require( 'gulp-ruby-sass' );
var concat = require( 'gulp-concat' );
var sourcemaps = require( 'gulp-sourcemaps' );
var browserSync = require( 'browser-sync' ).create();

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

gulp.task( 'vendor', function() {
  gulp.src( [ 'src/bower-components/angular/angular.js' ] ).pipe( gulp.dest( 'dist/js/vendor' ) );
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

gulp.task( 'browser-sync', function() {
  browserSync.init( {
    server: {
      baseDir: './dist'
    }
  } );
  gulp.watch( 'src/js/**/*.js', [ 'js' ] );
  gulp.watch( 'src/sass/**/*.scss', [ 'sass' ] );
  gulp.watch( 'src/**/*.html', [ 'static' ] );
  gulp.watch( './dist/**/*' ).on( 'change', browserSync.reload );
} );

gulp.task( 'clean', [ 'clean', 'default' ] );

gulp.task( 'default', [ 'sass', 'static', 'vendor', 'js', 'browser-sync' ] );
