/* eslint-disable import/no-extraneous-dependencies */
const TerserPlugin = require("terser-webpack-plugin");

let configureWebpack;

if (process.env.NODE_ENV === "production") {
  configureWebpack = {
    entry: "./src/index.js",
    externals: ["rxjs", "lodash-es"],
    optimization: {
      minimize: true,
      minimizer: [
        new TerserPlugin({
          sourceMap: true,
          parallel: true,
          extractComments: "all",
          terserOptions: {
            mangle: true
          }
        })
      ]
    }
  };
} else {
  // mutate for development...
  configureWebpack = {};
}

module.exports = {
  configureWebpack
};
