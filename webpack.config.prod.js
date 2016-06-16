var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var pacakgeJson = require('./package.json');

module.exports = {
  devtool: 'eval',
  entry: [
	  './src/index.js',
    './src/style/index.less'
  ],
  output: {
    path: path.resolve(__dirname, 'build'),
		filename: 'js/app.bundle.js',
    publicPath: '../'
  },
  module: {
    loaders: [{
      test: /\.(js|jsx)$/,
      loader: 'babel',
      exclude: /node_modules/
    }, {
			test: /\.json$/,
			loader: 'json'
    }, {
      test: /\.less$/,
      loader: ExtractTextPlugin.extract('style-loader', 'css!less')
    }, {
      test: /\.(gif|png|jpg)$/,
      loader: 'file?name=[path][name].[ext]'
    }]
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({ compressor: { warnings: false} }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('development')
      }
    }),
    new ExtractTextPlugin('css/app.bundle.css')
  ]
};
