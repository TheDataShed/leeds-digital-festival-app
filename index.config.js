const fs = require('fs');
const { minify } = require('html-minifier');

const html = fs.readFileSync('./index.html');
const content = html.toString().replace(/\/assets/ig, '');
const result = minify(content, {
  collapseWhitespace: true,
  removeComments: true,
  minifyJS: true,
  minifyCSS: true,
});
fs.writeFileSync('./build/index.html', result);
