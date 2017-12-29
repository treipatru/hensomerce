const merge = require('webpack-merge');
const baseConfig = require('./base.config.js');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = merge(baseConfig, {
  plugins: [
    new UglifyJSPlugin()
  ]
});