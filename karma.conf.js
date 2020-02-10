process.env.TZ = 'Europe/London';
process.env.CHROME_BIN = require('puppeteer').executablePath();

const browser = process.env.browser || 'ChromeHeadless';

module.exports = function test(config) {
  config.set({
    basePath: '',
    frameworks: ['source-map-support', 'mocha'],
    files: [
      { pattern: 'tests/exclude-dupe-elements.js', type: 'module' },
      { pattern: 'tests/*.js', type: 'module' },
    ],
    reporters: ['mocha'],
    autoWatch: true,
    browsers: [browser],
    singleRun: false,
    logLevel: 'ERROR',
    browserConsoleLogOptions: { level: 'info', format: '%b %T: %m', terminal: true },
  });
};
