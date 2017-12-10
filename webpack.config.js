const webpack = require('webpack');
const path = require('path');

const PATHS = {
  SRC: path.resolve(__dirname, 'src'),
  BUILD: path.resolve(__dirname, 'build')
};

const WebpackConfig = {
  entry: `${PATHS.SRC}/index.js`,
  output: {
    path: PATHS.BUILD,
    filename: 'index.js',
    libraryTarget: 'commonjs2'
  },
  externals: {
    'react': 'react',
    'prop-types': 'prop-types'
  },
  module: {
    rules: [
      {
        loader: 'babel-loader',
        test: /.js$/,
        exclude: /node_modules/,
        include : PATHS.SRC,
        options: {
          "plugins": [
            "babel-plugin-transform-class-properties",
            "babel-plugin-transform-object-rest-spread"
          ],
          presets: [ 'env', 'react' ]
        }
      }
    ],
  },
};

module.exports = WebpackConfig;
