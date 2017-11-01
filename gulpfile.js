const gulp = require('gulp');
const del = require('del');
const babel = require('gulp-babel');
const sourcemaps = require('gulp-sourcemaps');

gulp.task('clean', () => del(['dist']));

gulp.task('copy', ['clean'], () => {
    return gulp.src('src/**')
        .pipe(gulp.dest('dist'));
});

gulp.task('babel', ['copy'], () => {
    return gulp.src('dist/*.js')
        .pipe(sourcemaps.init())
        .pipe(babel())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist'));
});

gulp.task('default', ['babel']);