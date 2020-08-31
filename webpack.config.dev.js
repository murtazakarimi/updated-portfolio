const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

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

	devServer: {
    contentBase: path.join(__dirname, 'public_html'),
    compress: true,
		hot: true,
		open: true,
		// host: ,
    port: 9000
	},

	devtool: 'source-map',

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
		minimize: false
	},
  	plugins: [

			new webpack.ProvidePlugin({
					$: 'jquery',
					jQuery: 'jquery',
				}),

		new MiniCssExtractPlugin({
			filename: '../css/[name].min.css',
			chunkFilename: '[name].min.css',
			allChunks: true
		})
	]

};
