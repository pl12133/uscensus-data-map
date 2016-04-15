var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: [
    './src/index'
  ],
  output: {
      filename: 'bundle.js',
      path: path.join(__dirname, '..', '/lib/'),
      publicPath: '/lib/'
  },
  plugins: [  
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
          warnings: false
      }
    })
  ],
  resolve: {
    extensions: ['', '.jsx', '.js', '.json'],
    modulesDirectories: ['node_modules', 'src'],
  },
  module: {
    loaders: [{
        test: /\.scss$/,
        loaders: ["style", "css", "sass"] 
      }, {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      }, {
        test: /\.json$/,
        loader: 'json',
      }

    ]
  }
};
