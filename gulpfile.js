var gulp = require('gulp'),
    //sass = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    clean = require('gulp-clean'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    livereload = require('gulp-livereload'),
    connect = require('gulp-connect');;
gulp.task('default', ['clean', 'scripts', 'libs', 'watch', 'webserver']);
gulp.task('scripts', function() {
    return gulp.src(['src/js/*Service.js','src/js/app.js','src/js/*Controller.js'])
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(concat('main.js'))
        .pipe(gulp.dest('build/js'))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(uglify())
        .pipe(gulp.dest('build/js'))
        .pipe(notify({
            message: 'Scripts task complete'
        }));
});
gulp.task('libs', function() {
    return gulp.src(['src/lib/csv.min.js','src/lib/data.js', 'src/lib/angular.min.js','src/lib/angular-route.min.js'])
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(concat('lib.js'))
        .pipe(gulp.dest('build/lib'))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(uglify())
        .pipe(gulp.dest('build/lib'))
        .pipe(notify({
            message: 'Libs task complete'
        }));
});
gulp.task('webserver', function() {
    connect.server();
});
gulp.task('clean', function() {
    return gulp.src(['build/js', 'build/css'], {
            read: false
        })
        .pipe(clean());
});

gulp.task('watch', function() {
    gulp.watch('src/js/*.js', ['scripts']);
});
