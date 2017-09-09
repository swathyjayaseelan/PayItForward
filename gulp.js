var gulp        = require('gulp');
var browserSync = require('browser-sync');

gulp.task('browser-sync', function() {
    browserSync({
        files: ["./dev/css/*.css", "./dev/**/*.js", "./dev/**/*.html"],
        server: {
            baseDir: "./dev/"
        },
        browser: ["google chrome", "firefox"]
    });
});

gulp.task('default', ["browser-sync"]);
