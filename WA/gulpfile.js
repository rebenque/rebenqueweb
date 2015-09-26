var gulp = require('gulp');
var webserver = require('gulp-webserver');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var del = require('del');
var ngAnnotate = require('gulp-ng-annotate');

var customOpts = {
    entries: ['./src-web/app.js'],
    debug: true
};

gulp.task('clean', function (cb) {
    del([
        'dist'
    ], cb);
});

gulp.task('copy-static', ['clean'], function(){
    return gulp.src('src-web-static/**/*')
        .pipe(gulp.dest('dist/'));
});

gulp.task('copy-static-dep-css', ['copy-static'], function(){
    return gulp.src('node_modules/bootstrap/dist/css/bootstrap.min.css')
        .pipe(gulp.dest('dist/css'));
});


gulp.task('copy-static-dep-font', ['copy-static-dep-css'], function(){
    return gulp.src('node_modules/bootstrap/dist/fonts/*')
        .pipe(gulp.dest('dist/fonts'));
});

gulp.task('copy', ['copy-static-dep-font'], function(){
    return browserify(customOpts).bundle()
        .pipe(source('bundle.js'))
        .pipe(ngAnnotate())
        .pipe(gulp.dest('dist/'));
});


gulp.task('webserver', ['copy'], function(){
    return gulp.src('dist')
        .pipe(webserver({
            livereload: true,
            directoryListing: false,
            fallback: 'index.html',
            open: true
        }));
});

// Watch Files For Changes
gulp.task('watch',['copy'], function() {
    gulp.watch('src/**/*', ['copy']);
    gulp.watch('src-web/**/*', ['copy']);
    gulp.watch('src-web-static/**/*', ['copy']);
});

gulp.task('run-console', function(){
    var main = require("./src/app");
    main.exec();
    return;
});

gulp.task('default', ['watch', 'webserver'], function(){
    return;
});