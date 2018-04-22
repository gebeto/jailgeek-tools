const path = require('path');


const config = {
	entry: './src/generators/index.js',
	output: {
		path: path.resolve(__dirname, 'assets'),
		filename: 'bundle.generators.js'
	},

	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
			}
		],
	}
}


module.exports = config;