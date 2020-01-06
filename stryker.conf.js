// This config was generated using a preset.
// Please see the handbook for more information: https://github.com/stryker-mutator/stryker-handbook/blob/master/stryker/guides/vuejs.md#vuejs
module.exports = function asyncConfig(config) {
  config.set({
    mutate: ['src/**/*.js'],
    mutator: 'vue',
    testRunner: 'jest',
    jest: {
      // eslint-disable-next-line global-require
      config: require('./jest.config.js'),
    },
    reporters: ['progress', 'clear-text', 'html'],
    coverageAnalysis: 'off',
  });
};
