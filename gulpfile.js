var gulp = require("gulp");
var ts = require("gulp-typescript");
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
// const babel = require('gulp-babel');
var tsProject = ts.createProject("tsconfig.json");
gulp.task("default", function () {
    return tsProject.src()
        .pipe(tsProject())
        .js
        // .pipe(uglify())
        // .pipe(babel({
        //     presets: ['@babel/preset-env']
        // }))
        .pipe(rename({
            basename:'EasyDebug',
            // extname: '.min.js'
        }))
        .pipe(gulp.dest("dist"));
});
