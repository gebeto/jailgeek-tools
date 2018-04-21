const path = require('path');


const config = {
	entry: './src/tools/index.js',
	output: {
		path: path.resolve(__dirname, 'assets'),
		filename: 'bundle.tools.js'
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