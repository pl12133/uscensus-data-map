var path = require('path');
var webpack = require('webpack');

var host = process.env.HOST || 'localhost';
var port = process.env.PORT || '8080';

module.exports = {
  entry: [
    'webpack-dev-server/client?http://'+host+':'+port,
    'webpack/hot/only-dev-server',
    './src/index'
  ],
  output: {
      filename: 'bundle.js',
      path: path.join(__dirname, '..', '/dist/'),
      publicPath: '/dist/'
  },
  plugins: [  
      new webpack.ProvidePlugin({
        'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
//				'CitySDK': 'imports?this=>windowCitySDK=citysdk'
      }),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoErrorsPlugin()
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
				test: /\.json/,
        loader: 'json'
			}, {
				test: /\.svg$/,
        loader: 'svg-inline'
			}
    ]
  },
  devtool: 'source-map'
};
