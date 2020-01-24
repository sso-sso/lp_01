/*
gulpプラグインを読み込みます
*/
const gulp = require("gulp");
// Sassをコンパイルするプラグインを読み込みます
const sass = require("gulp-sass");

var autoprefixer = require('gulp-autoprefixer');

var plumber = require('gulp-plumber');

var browserSync = require('browser-sync').create();

/**
* これはすでに非推奨！！！
* var connect = require("gulp-connect");
* var webserver = require("gulp-webserver");
*/

// Compile Sass
gulp.task('sass', function(done) {
  gulp.src('src/assets/_sass/*.scss')
    .pipe(plumber({
      errorHandler: notify.onError("Error: <%= error.message %>")
    }))
    .pipe(sass())
    .pipe(autoprefixer({
      cascade: false
    }))
    .pipe(gulp.dest('src/assets/css/'))
    .pipe(browserSync.stream());
  done();
})

// Reload
gulp.task('reload', function(done) {
  browserSync.reload();
  done();
});

// BrowserSync
gulp.task('server', function(done) {
  browserSync.init({
      server: {
          baseDir: 'src/',/* ブラウザに表示させたいHTMLがあるディレクトを指定しましょう。 */
          index: 'index.html' /* ブラウザに表示させたいHTMLファイルを書きます。 */
      }
  });
  done();
});

// Watch
gulp.task('watch', function(done) {
  // createフォルダ内の*.js,*.htmlが更新されたら、reload関数を呼び出す
  gulp.watch('src/index.html', gulp.series('reload'/*タスク名*/));
  gulp.watch('src/js/*.js', gulp.series('reload'));
  // scssフォルダ内が更新されたら、sass関数を呼び出す
  // gulp.watch('./src/assets/_sass/*.scss', gulp.series('sass'));

  done();
});

gulp.task('default',
    gulp.parallel('watch', 'server')
);


// Compile Sass
// const compileSass = () =>
//   // style.scssファイルを取得
//   gulp.src("src/assets/_sass/style.scss")
//     // Sassのコンパイルを実行
//     .pipe(
//       // コンパイル後のCSSを展開
//       sass({
//         outputStyle: "expanded"
//       })
//     )
//     // cssフォルダー以下に保存
//     .pipe(gulp.dest("src/assets/css"));

// /**
//  * Sassファイルを監視し、変更があったらSassを変換します
//  */
// const watchSassFiles = () => gulp.watch("src/assets/_sass/style.scss", compileSass);

// // npx gulpというコマンドを実行した時、watchSassFilesが実行されるようにします
// exports.default = watchSassFiles;