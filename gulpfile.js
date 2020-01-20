// gulpプラグインを読み込みます
const gulp = require("gulp");
// Sassをコンパイルするプラグインを読み込みます
const sass = require("gulp-sass");

/**
* これはすでに非推奨！！！
* var connect = require("gulp-connect");
*/

var browserSync = require('browser-sync').create();

var webserver = require("gulp-webserver");

// Localhost
gulp.task("default", function() {
  return gulp.src('LP_01')
    .pipe(webserver({
      livereload: true,
      open: true
    }));
});

// Connect


// Browser sync
gulp.task('browser-sync', function() {
  browserSync.init({
      server: {
          baseDir: "./"
      },
      startPath: './*.html',
  });
});

// Compile Sass
const compileSass = () =>
  // style.scssファイルを取得
  gulp.src("src/assets/_sass/style.scss")
    // Sassのコンパイルを実行
    .pipe(
      // コンパイル後のCSSを展開
      sass({
        outputStyle: "expanded"
      })
    )
    // cssフォルダー以下に保存
    .pipe(gulp.dest("src/assets/css"));

/**
 * Sassファイルを監視し、変更があったらSassを変換します
 */
const watchSassFiles = () => gulp.watch("src/assets/_sass/style.scss", compileSass);

// npx gulpというコマンドを実行した時、watchSassFilesが実行されるようにします
exports.default = watchSassFiles;