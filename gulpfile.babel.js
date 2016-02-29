import gulp from "gulp";
import gutil, {PluginError} from "gulp-util";
import source from "vinyl-source-stream";
import buffer from "vinyl-buffer";
import sourcemaps from "gulp-sourcemaps";

import assign from "object-assign";
import browserify from "browserify";
import watchify from "watchify";
import babelify from "babelify";

import del from "del";
import path from "path";

// custom
import sass from "gulp-sass";
import concat from "gulp-concat";
import runSequence from "run-sequence";
import watch from "gulp-watch";
import prettify from "gulp-html-prettify";
import eslint from "gulp-eslint";
import jscs from "gulp-jscs";

// live reload
import clr from "connect-livereload";
import express from "express";
import open from "open";
import tinylr from "tiny-lr";

var lr = tinylr();

var EXPRESS_PORT = 4000;
var EXPRESS_ROOT = __dirname + "/public";
var LIVERELOAD_PORT = 35729;

let paths = {
    sass: {
        input: ["src/**/*.scss"],
        bootstrap: ["./node_modules/bootstrap-sass/assets/stylesheets"],
        outputFile: "combined.css",
        outputDir: "./public/css"
    },
    html: {
        input: ["src/**/*.html"],
        outputDir: "./public",
        formatOutputDir: "./src"
    },
    fonts: {
        input: ["./node_modules/bootstrap-sass/assets/fonts/**/*"],
        output: "./public/fonts"
    },
    js: {
        allFiles: ["src/**/*.js"],
        testFiles: ["src/**/*-test.js"],
        entryPoint: "./src/entrypoint.js",
        outputFile: "bundle.js",
        outputDir: "./public/js"
    },
    assets: {
        input: ["./assets/**/*"],
        output: "./public/"
    },
    public: {
        allFiles: ["./public/**/*"]
    }
};

gulp.task("compile-sass", function() {
    gulp.src(paths.sass.input)
        .pipe(sass({
            includePaths: paths.sass.bootstrap
        }))
        .on("error", e => {
            console.log(`ERROR: ${e.message}`);
        })
        .pipe(concat(paths.sass.outputFile))
        .pipe(gulp.dest(paths.sass.outputDir))
});

gulp.task("copy-fonts", function() {
    gulp.src(paths.fonts.input)
        .pipe(gulp.dest(paths.fonts.output))
});

gulp.task("copy-assets", function() {
    gulp.src(paths.assets.input)
        .pipe(gulp.dest(paths.assets.output))
});

gulp.task("copy-html", function() {
    gulp.src(paths.html.input)
        .pipe(gulp.dest(paths.html.outputDir))
});

gulp.task("compile-js", function() {
    browserify(paths.js.entryPoint, {
            debug: true
        })
        .transform(babelify)
        .bundle()
        .on("error", gutil.log)
        .pipe(source(paths.js.outputFile))
        .pipe(buffer())
        .pipe(sourcemaps.init({
            loadMaps: true
        }))
        .pipe(sourcemaps.write("./"))
        .pipe(gulp.dest(paths.js.outputDir))
});

gulp.task("clean", function() {
    return del("public");
});

gulp.task("build-frontend", function(done) {
    runSequence("clean", "compile-sass", "copy-html", "copy-fonts", "copy-assets", "compile-js", done);
});

gulp.task("watch", function() {
    // run the initial sequence once, minus the clean
    runSequence("compile-sass", "copy-html", "copy-fonts", "copy-assets", "compile-js");
    startExpress();
    startLiveReload();
    watch(paths.sass.input, () => runSequence("copy-fonts"));
    watch(paths.sass.input, () => runSequence("compile-sass"));
    watch(paths.js.allFiles, () => runSequence("compile-js"));
    watch(paths.html.input, () => runSequence("copy-html"));
    watch(paths.assets.input, () => runSequence("copy-assets"));
    watch(paths.public.allFiles, notifiyLiveReload);
    open(`http://localhost:${EXPRESS_PORT}/index.html`);
});

gulp.task("format-js", function() {
    return gulp.src(paths.js, {
            base: "./"
        })
        .pipe(jscs({
            fix: true,
            configPath: __dirname + "/.jscsrc"
        }))
        .pipe(gulp.dest("./"));
});

function startExpress() {
    var app = express();
    app.use(clr());
    app.use(express.static(EXPRESS_ROOT));
    app.listen(EXPRESS_PORT);
}

function startLiveReload() {
    var port = 35729;
    lr.listen(LIVERELOAD_PORT);
}

function notifiyLiveReload(event) {
    var fileName = path.relative("public", event.path);
    lr.changed({
        body: {
            files: [fileName]
        }
    });
}

gulp.task("format-html", function() {
    /*eslint-disable */
    var options = {
        indent_char: "	",
        indent_size: 1
    };
    /*eslint-enable */
    gulp.src(paths.html.input)
        .pipe(prettify(options))
        .pipe(gulp.dest(paths.html.formatOutputDir));
});

gulp.task("lint", function() {
    return gulp.src(paths.js.allFiles)
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

gulp.task("jscs", function() {
    return gulp.src(paths.js.allFiles)
        .pipe(jscs({
            configPath: __dirname + "/.jscsrc"
        }))
        .pipe(jscs.reporter())
        .pipe(jscs.reporter("fail"));
});

gulp.task("format-js", function() {
    return gulp.src(paths.js.allFiles, {
            base: "./"
        })
        .pipe(jscs({
            fix: true,
            configPath: __dirname + "/.jscsrc"
        }))
        .pipe(gulp.dest("./"));
});
