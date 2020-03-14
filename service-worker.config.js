module.exports = {
  globDirectory: 'build/',
  globPatterns: [
    '**/*.{ico,html,js}',
  ],
  swDest: 'build/service-worker.js',
  cleanupOutdatedCaches: true,
  inlineWorkboxRuntime: true,
};
