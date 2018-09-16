const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");

const bundleConfig = {
	entry: path.resolve(__dirname, "src/index.ts"),
	output: "bundle.js",
	isLib: false,
}

const config = {
	entry: bundleConfig.entry,
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: bundleConfig.output,
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
				test: /\.css$/,
				use: ["style-loader", "css-loader"]
			},
			{
				test: /\.css$/,
				use: ["style-loader", "css-loader"]
			},
			{
				test: /\.(jpg|png)$/,
				loader: "file-loader",
			},
			{
				test: /\.(ttf|otf)$/,
				loader: "file-loader",
				options: {
					name: 'fonts/[name].[ext]',
				}
			},
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
	],
};

module.exports = config;