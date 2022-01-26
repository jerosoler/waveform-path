const { src, dest } = require("gulp");
const uglify = require("gulp-uglify");
const rename = require("gulp-rename");

exports.default = function () {
  return (
    src("src/*.js")
      .pipe(uglify())
      // So use gulp-rename to change the extension
      .pipe(rename({ extname: ".min.js" }))
      .pipe(dest("dist/"))
  );
};