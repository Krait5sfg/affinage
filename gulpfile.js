'use strict';
var browserSync = require('browser-sync');
var gulp = require('gulp');
var htmlmin = require("gulp-htmlmin");
var sass = require("gulp-sass");
sass.compiler = require('node-sass');
var csso = require("gulp-csso");
var rename = require("gulp-rename");
var plumber = require("gulp-plumber");
var sourcemaps = require("gulp-sourcemaps");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var del = require("del");
var pug = require("gulp-pug");
var uglify = require('gulp-uglify-es').default;
var imagemin = require("gulp-imagemin");

gulp.task("min-js", function () {
  return gulp.src("source/js/*.js")
    .pipe(rename("script.min.js"))
    .pipe(uglify(/* options */))
    .pipe(gulp.dest("build/js"));
});

gulp.task('server', function () {
  browserSync.init({
    server: "build/",
    online: true,
    tunnel: 'test'
  })

  gulp.watch("source/*.pug", gulp.series("pug", "refresh"));
  gulp.watch("source/sass/**/*.scss", gulp.series("css", "refresh"));
  gulp.watch("source/*.html", gulp.series("html", "refresh"));
  gulp.watch("source/js/*.js", gulp.series("min-js", "refresh"));
});

gulp.task('html', function () {
  return gulp.src('source/*.html')
    .pipe(htmlmin({
      collapseWhitespace: true
    }))
    .pipe(gulp.dest('build'));
});

gulp.task("css", function () {
  return gulp.src("source/sass/style.scss")
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer() //добавляет префиксы
    ]))
    .pipe(gulp.dest("build/css")) //неминифицированный css
    .pipe(csso()) //минификация
    .pipe(rename({ //добавляет к файлу суфикс .min
      suffix: ".min"
    }))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("build/css")); //минифицированный css
});


gulp.task("refresh", function (done) {
  browserSync.reload();
  done();
});

gulp.task("delete", function () {
  return del("build");
});

gulp.task("copy", function () {
  return gulp.src([
    "source/fonts/**/*.{woff,woff2,ttf}",
    "source/img/**",
    "source/mock/**"
  ], {
    base: "source"
  })
    .pipe(gulp.dest("build"));
});

gulp.task("pug", function buildHTML() {
  return gulp.src("source/*.pug")
    .pipe(pug())
    .pipe(gulp.dest("source"))
})

gulp.task("images", function () {
  return gulp.src("source/img/**/*.{png,jpg,svg}")
    .pipe(imagemin())
    .pipe(gulp.dest("build/img"));
});


gulp.task("build", gulp.series("delete", "copy", "css", "min-js", "images", "html"));
gulp.task("start", gulp.series("build", "server"));
