const {series, src, dest, watch, parallel}= require("gulp");
const sass = require("gulp-sass");
// const imagemin = require("gulp-imagemin");
const webp = require("gulp-webp");
const concat= require("gulp-concat");


//utlidades css

const autoprefixer= require("autoprefixer");
const postcss= require("gulp-postcss");
const cssnano= require("cssnano");
const sourcemaps= require("gulp-sourcemaps");




const paths = {
    scss:"src/scss/**/*",
    js: "src/js/**/*.js"
}



// Funcion que compila sass

function css(){
    
    return src("src/scss/app.scss")
        .pipe(sourcemaps.init())
        .pipe(sass(
            {outputStyle: "expanded"}
        ))
        .pipe(postcss([autoprefixer(), cssnano()] ))
        .pipe(sourcemaps.write("."))
        .pipe(dest("./build/css"))
};

function minificarcss(){
return src("src/scss/app.scss")
.pipe(sass({outputStyle: "compressed"}))
.pipe(dest("./build/css"))

}

function javascript(){
    return src(paths.js)
        .pipe(concat("bundle.js"))
        .pipe(dest("./build/js"))
}

// function imagenes(){
//     return src("src/img/**/*")
//          .pipe(imagemin())
//          .pipe(dest("./build/img"))
//  }

function versionwebp(){
    return src("src/img/**/*")
        .pipe(webp)
        .pipe(dest(".build/img"))
        .pipe(notify({message:"Version webP lista"}))
}

function watchArchivos(){
watch("src/scss/**/*.scss", css);
watch(paths.js, javascript);
}

exports.css=css;
exports.minificarcss=minificarcss;
// exports.imagenes=imagenes;
exports.javascript=javascript;
exports.watchArchivos=watchArchivos;

exports.default= series(css, javascript,watchArchivos);



