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
const path = require("path");

gulp.task("sass", function() {
	return gulp
		.src("assets/styles/**/*.scss")
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
		.pipe(gulp.dest("public/css"));
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
gulp.task("serve", ["fractal", "sass"], function() {
	gulp.watch(["assets/styles/**/*.scss"], ["sass"]);
});

gulp.task("default", ["serve"]);
