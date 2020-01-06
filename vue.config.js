/* eslint-disable import/no-extraneous-dependencies */
const ClosurePlugin = require('closure-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

let configureWebpack;

if (process.env.NODE_ENV === 'production') {
  configureWebpack = {
    entry: './src/index.js',
    externals: [
      'rxjs',
    ],
    optimization: {
      minimize: true,
      minimizer: [
        new ClosurePlugin({
          mode: 'STANDARD',
          childCompilations: true,
        }),
        new TerserPlugin({
          sourceMap: true,
          parallel: true,
          extractComments: true,
        }),
      ],
    },
  };
} else {
  // mutate for development...
  configureWebpack = {};
}

module.exports = {
  configureWebpack,
};
