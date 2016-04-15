var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('../webpack/webpack.config.dev');

var port= process.env.PORT || 8080
var host= process.env.HOST || '10.0.3.15' 

module.exports = function start() {
  new WebpackDevServer(webpack(config), {
    publicPath: config.output.publicPath,
    historyApiFallback: true,
    hot: true
  }).listen(port, host, function(err,result) {
    if (err) {
      console.error(err);
    }

    console.log('Listening at ' + host + ':' + port);
  });
}

