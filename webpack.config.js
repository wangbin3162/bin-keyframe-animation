var version = require('./package.json').version
var webpack = require('webpack')

module.exports = {
  mode: 'development',
  entry: {
    animation: './src/animation.js'
  },
  output: {
    path: __dirname + '/build',
    filename: '[name].js',
    library: 'animation',
    libraryTarget: 'umd',
    publicPath: '/assets/'
  },
  plugins: [
    new webpack.DefinePlugin({
      __VERSION__: JSON.stringify(version)
    })
  ]
}
