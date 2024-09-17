const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const csso = require('gulp-csso');
const rename = require("gulp-rename");
const clean = require('gulp-clean');
const autoprefixer = require('autoprefixer');
const postcss = require('gulp-postcss');
const htmlmin = require('gulp-htmlmin');
const browserSync = require('browser-sync').create();

function css() {
    return gulp
    .src('./src/sass/style.scss')
    .pipe(sass().on('error', sass.logError)) // Обработчик ошибок
    .pipe(csso())
    .pipe(postcss([autoprefixer()]))
    .pipe(rename({suffix: ".min"}))
    .pipe(gulp.dest("./build"))
    .pipe(browserSync.stream());
}


function clear (){
    return gulp.src('build', {read: false, allowEmpty: true})
    .pipe(clean());
}

function watching () {
    gulp.watch("./src/sass/**/*.scss", css)
    gulp.watch("./src/html/*.html", html) .on('change', browserSync.reload);
    gulp.watch("./src/js/*.js", js).on('change', browserSync.reload); // Слежение за JS файлами
}

function html () {
    return gulp.src('./src/html/*.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('./build'))
}

function copy() { 
    return gulp 
      .src("./src/assets/**/*", { 
        encoding: false, 
      }).pipe(gulp.dest("./build")); 
  }

  function js() {
    return gulp
    .src('./src/js/main.js') // Обрабатываем все JS файлы
    .pipe(gulp.dest('./build'));
}

function server () {
    browserSync.init({
        server: {
            baseDir: "./build"
        }
    });
}

exports.start = gulp.series(clear,
    gulp.parallel(css, html, copy, js),
    gulp.parallel(watching, server)
    );