const path = require('path');
const ExtractPlugin = require('extract-text-webpack-plugin');


const config = {
	entry: './src/index.js',
	output: {
		path: path.resolve(__dirname, 'assets'),
		filename: 'bundle.js'
	},

	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
			},
			{
				test: /\.(scss|sass)$/,
				exclude: /node_modules/,
				use: ExtractPlugin.extract({
					fallback: 'style-loader',
					use: ['css-loader', 'sass-loader']
				}),
			},
			{
				// test: /\.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
				test: /\.(ttf|otf|eot|svg|woff)/,
				use: [{
					loader: 'file-loader',
					options: {
						name: '[name].[ext]',
						outputPath: 'fonts/',		// where the fonts will go
						publicPath: './fonts/'			// override the default path
					}
				}]
			}
		],
	},
	plugins: [
		new ExtractPlugin('styles.css')
	]
}


module.exports = config;