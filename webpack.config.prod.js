const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = {
	target: "web",
	mode: 'production',

	entry: {
		app: './src/js/app.js',
	},

	output: {
		filename: '[name].min.js',
		path: path.resolve(__dirname, 'public_html/assets/js/'),
		chunkFilename: '[name].min.js'
	},

	module: {
    rules: [
		{
			test: /\.js$/,
			exclude: /(node_modules|bower_components)/,
			use: [{
				loader: 'babel-loader',
				options: {
          presets: ['@babel/preset-env']
        }
			}
		]},
		{
			test: /\.(sa|sc|c)ss$/,
			use: [
				MiniCssExtractPlugin.loader,
				'css-loader',
				'postcss-loader',
				'sass-loader',
			],
		},
	]},
	optimization: {
		splitChunks: {
			name: 'vendors',
      chunks: 'all',
    },
		minimizer: [
			new UglifyJsPlugin(),
			new OptimizeCSSAssetsPlugin({})
		]
	},
  	plugins: [
		new MiniCssExtractPlugin({
			filename: '../css/[name].min.css',
			chunkFilename: '[name].min.css',
			allChunks: true
		})
	]

};
