const webpack = require('webpack');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: {
    app: './src/index.js',
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
      {
        test: /\.svg$/,
        loader: 'vue-svg-loader'
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        })
      }
    ]
  },

  output: {
    path: path.resolve(__dirname, '../build/ext'),
    filename: 'app.js',
  },

  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    }
  },

  plugins: [
    new CleanWebpackPlugin(
      ['build'],
      {
        root: path.resolve(__dirname , '../'),
        verbose: true,
        dry: false
      }),
    new CopyWebpackPlugin([
      {
        from: 'static',
        to: './'
      }
    ]),
    new ExtractTextPlugin({
      filename: 'styles.css'
    })
  ],

  stats: {
    assets: true,
    children: true,
    chunks: false,
    chunkModules: false,
    chunkOrigins: false,
    colors: true,
    entrypoints: false,
    errors: true,
    errorDetails: true,
    hash: false,
    maxModules: 15,
    modules: false,
    moduleTrace: false,
    performance: true,
    providedExports: false,
    publicPath: true,
    reasons: true,
    source: true,
    timings: true,
    usedExports: false,
    version: true,
    warnings: true
  }
};