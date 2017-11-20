const webpack = require('webpack');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin')

var ROOT = path.join(__dirname, '../');

module.exports = {
  entry: {
    app: './src',
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.vue$/,
        exclude: /node_modules/,
        loader: 'vue-loader',
      },
    ],
  },

  output: {
    path: path.resolve(__dirname, 'build/ext'),
    filename: 'app.js',
  },

  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    }
  },

  plugins: [
    new webpack.EnvironmentPlugin([
      'NODE_ENV',
    ]),
    new CleanWebpackPlugin(
      ['build'],
      {
        verbose:  true,
        dry:      false
      }),
    new CopyWebpackPlugin([
      {
        from: 'static',
        to: './'
      },
      {
        from: 'node_modules/keen-ui/dist/keen-ui.min.css',
        to: './css'
      }
    ])
  ]
};