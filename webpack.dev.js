const merge = require('webpack-merge')
const common = require('./webpack.common')

const env = require('./utils/env')

module.exports = merge(common, {
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
    index: env.POPUP
  }
})