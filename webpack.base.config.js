const webpack = require('webpack')
const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

var ROOT = path.join(__dirname, '../')

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
        verbose: true,
        dry: false
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
    ]),
    new ExtractTextPlugin({
      filename: 'css/styles.css'
    })
  ]
};