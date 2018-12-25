"use strict";

const gulp = require("gulp");
const fractal = require("./fractal.js");
const logger = fractal.cli.console;
const sass = require("gulp-sass");
const sassGlob = require("gulp-sass-glob");
const plumber = require("gulp-plumber");
const notify = require("gulp-notify");
const cleanCSS = require("gulp-clean-css");
const autoprefixer = require("gulp-autoprefixer");
const concat = require("gulp-concat");
const path = require("path");
const browserSync = require("browser-sync").create();
const sourcemaps = require("gulp-sourcemaps");
const uglify = require("gulp-uglify-es").default;

const babel = require("gulp-babel");

gulp.task("scripts", function() {
	return gulp
		.src("assets/scripts/script.js")
		.pipe(sourcemaps.init())
		.pipe(concat("script.js"))
		.pipe(babel())
		.pipe(uglify())
		.pipe(sourcemaps.write("."))
		.pipe(gulp.dest("public/js"));
});

gulp.task("scriptsSlider", function() {
	return gulp
		.src([
			"assets/scripts/jquery-3.1.1.min.js",
			"assets/scripts/slick.min.js",
			"assets/scripts/slider.js"
		])
		.pipe(sourcemaps.init())
		.pipe(concat("slider.js"))
		.pipe(babel())
		.pipe(uglify())
		.pipe(sourcemaps.write("."))
		.pipe(gulp.dest("public/js"));
});

gulp.task("sass", function() {
	return gulp
		.src("assets/scss/**/*.scss")
		.pipe(customPlumber("Error running Sass"))
		.pipe(sassGlob())
		.pipe(sass())
		.pipe(autoprefixer({ browsers: ["last 2 versions"], cascade: false }))
		.pipe(
			cleanCSS({ debug: true }, details => {
				console.log(`${details.name}: ${details.stats.originalSize}`);
				console.log(`${details.name}: ${details.stats.minifiedSize}`);
			})
		)
		.pipe(gulp.dest("public/css"))
		.pipe(browserSync.stream());
});

function customPlumber(errTitle) {
	return plumber({
		errorHandler: notify.onError({
			title: errTitle || "Error running Gulp",
			message: "Error: <%= error.message %>"
		})
	});
}

gulp.task("fractal", function() {
	const server = fractal.web.server({
		sync: true
	});
	server.on("error", err => logger.error(err.message));
	return server.start().then(() => {
		logger.success(`Fractal server is now running at ${server.url}`);
	});
});

// Static Server + watching sass/html files
gulp.task("serve", ["fractal", "sass", "scripts"], function() {
	browserSync.init({ proxy: "http://local-ecobreeze.com" });

	gulp
		.watch(["assets/scripts/**/*.js"], ["scripts"])
		.on("change", browserSync.reload);
	gulp
		.watch(["assets/scss/**/*.scss"], ["sass"])
		.on("change", browserSync.reload);
	gulp.watch("components/**/*.twig").on("change", browserSync.reload);
});

gulp.task("default", ["serve"]);
