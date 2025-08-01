const { defineConfig } = require('vitest/config');

module.exports = defineConfig({
  test: {
    environment: 'node',
    timeout: 15000, // 15 seconds timeout for network requests
    testTimeout: 20000,
    hookTimeout: 30000,
    globals: true,
    reporters: ['verbose'],
    include: ['tests/**/*.test.js', '**/*.test.js'],
    exclude: ['node_modules/**', 'dist/**']
  }
});