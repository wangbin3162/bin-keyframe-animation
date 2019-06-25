var version = require('./package.json').version
var webpack = require('webpack')

module.exports = {
  mode: 'production',
  entry: {
    animation: './src/animation.js'
  },
  output: {
    path: __dirname + '/build',
    filename: '[name].min.js',
    library: 'animation',
    libraryTarget: 'umd'
  },
  plugins: [
    new webpack.DefinePlugin({
      __VERSION__: JSON.stringify(version)
    })
  ]
}
