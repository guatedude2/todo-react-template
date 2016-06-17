var path = require('path');
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  devtool: 'eval',
  entry: [
	  'webpack-hot-middleware/client?http://localhost:3000&reload=true',
	  './src/index.js',
	  './src/style/index.less'
  ],
	externals: {
		config: 'APP_CONFIG',
	},
  output: {
    path: path.resolve(__dirname, 'build'),
		filename: 'js/app.bundle.js'
  },
  module: {
    loaders: [{
      test: /\.(js|jsx)$/,
      loaders: ['react-hot', 'babel'],
      exclude: /node_modules/
    }, {
			test: /\.json$/,
			loader: 'json'
    }, {
      test: /\.less$/,
      loader: 'style!css!postcss!less'
    }, {
      test: /\.(gif|png|jpg)$/,
      loader: 'file?name=[path][name].[ext]'
    }]
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('development')
      }
    }),
    new CopyWebpackPlugin([
      { from: 'assets/index.html' }
    ])
  ],
  postcss: function () {
      return [autoprefixer];
  },
  devServer: {
    headers: { 'Access-Control-Allow-Origin': '*' },
    noInfo: true,
    hot: true,
    contentBase: path.resolve(__dirname, './build')
  }
};
