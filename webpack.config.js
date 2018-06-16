const path = require("path");

const HtmlWebPackPlugin = require("html-webpack-plugin");


const config = {
	entry: path.resolve(__dirname, "src/index.ts"),
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: "bundle.js",
	},

	resolve: {
		extensions: [".js", ".ts", ".css"],
	},

	module: {
		rules: [
			{
				test: /\.ts$/,
				loader: "awesome-typescript-loader"
			},
			{
				test: /\.html$/,
				loader: "html-loader",
			},
			{
				test: /\.(jpg|png)$/,
				loader: "file-loader",
			},
			{
				test: /\.(ttf|otf)$/,
				loader: "file-loader",
			}
		]
	},

	devServer: {
		port: 3000,
	},

	plugins: [
		new HtmlWebPackPlugin({
			template: "./src/index.html",
			filename: "./index.html",
		}),
	]
};

module.exports = config;