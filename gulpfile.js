// Initialize modules
// Importing specific gulp API functions lets us write them below as series() instead of gulp.series()
const {
    src,
    dest,
    watch,
    series,
    parallel
} = require('gulp');
// Importing all the Gulp-related packages we want to use
const sourcemaps = require('gulp-sourcemaps');
const sass = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
var replace = require('gulp-replace');
const fileinclude = require('gulp-file-include');
const browsersync = require("browser-sync").create();

// File paths
const files = {
    scssPath: 'build/scss/*.scss',
    jsPath: 'build/js/custom_script.js',
    htmlPath: 'pages/*.html',
    includePath: 'include/*.html'
}

// Sass task: compiles the style.scss file into style.css
function scssTask() {
    return src(files.scssPath)
        .pipe(sourcemaps.init()) // initialize sourcemaps first
        .pipe(sass()) // compile SCSS to CSS
        .pipe(postcss([autoprefixer()])) // PostCSS plugins
        .pipe(sourcemaps.write('.')) // write sourcemaps file in current directory
        .pipe(dest('dist/css')); // put final CSS in dist folder
}

// JS task: concatenates and uglifies JS files to script.js
function jsTask() {
    return src([
            // files.jsPath
            //,'!' + 'includes/js/jquery.min.js', // to exclude any specific files
            'build/js/jquery-3.5.1.min.js',
            'build/js/popper.min.js',
            'build/js/bootstrap.min.js',            
            'build/js/owl.carousel.min.js',
            'build/js/jquery.magnific-popup.min.js',
            'build/js/aos.js',
            'build/js/custom_script.js',

        ])
        .pipe(concat('all.js'))
        .pipe(uglify())
        .pipe(dest('dist/js'));
}
function fileInclude() {
    return  src('pages/*.html')
    .pipe(fileinclude({
        prefix: '@@',
        basepath: '@file'
    }))
    .pipe(dest('.'));
}
// Cachebust
// function cacheBustTask() {
//     var cbString = new Date().getTime();
//     return src(['index.html'])
//         .pipe(replace(/cb=\d+/g, 'cb=' + cbString))
//         .pipe(dest('.'));
// }

// Watch task: watch SCSS and JS files for changes
// If any change, run scss and js tasks simultaneously
function watchTask() {
    watch([files.scssPath,files.includePath, files.htmlPath, files.jsPath], {
            interval: 1000,
            usePolling: true
        }, //Makes docker work
        series(
            parallel(scssTask, jsTask , fileInclude),
            // cacheBustTask
        )
    );
}

// Export the default Gulp task so it can be run
// Runs the scss and js tasks simultaneously
// then runs cacheBust, then watch task
exports.default = series(
    parallel(scssTask, jsTask, fileInclude),
    watchTask
);