var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

const VENDOR_LIBS = [ // Libraries that we want to split into the vendor.js output
	'react', 'lodash', 'redux', 'react-redux', 'react-dom',
	'faker', 'react-input-range', 'redux-form', 'redux-thunk'
];

module.exports = {
  entry: {
  	bundle: './src/index.js',
  	vendor: VENDOR_LIBS
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].[chunkhash].js' // dynamically substitute name with the entry file name
  },
  module: {
  	rules: [
  		{
  			use: 'babel-loader',
  			test: /\.js$/,
  			exclude: /node_modules/ // will need if node_modules exists
  		},
  		{
  			use: ['style-loader', 'css-loader'],
  			test: /\.css$/
  		}
  	]
  },
  plugins: [
	  new webpack.optimize.CommonsChunkPlugin({ // prevent duplicate dependencies in both bundle and vendor enry points (i.e. react, redux, etc.)
	  	name: ['vendor', 'manifest']
	  }),
	  new HtmlWebpackPlugin({ // automate <script> additions/changes
	  	template: 'src/index.html' // now can move the root index.html to this template location
	  }),
	  new webpack.DefinePlugin({ // used to define window scope variables to be defined in JS output files
	  	// When React run, it looks for this window scope - process.env.NODE_ENV
	  	// If finds it, and it equals a string production - it will behave differently; React will not run many error-checking, which can be good
	  	// Assumes we do not want more error-checking (it is for development more)
	  	'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV) // so for PRODUCTION - will prevent any error-checking
	  	// (left: variable to find) : (right: variable how defined)
	  })
  ]
};
