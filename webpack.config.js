const path = require("path");

const HtmlWebPackPlugin = require("html-webpack-plugin");

const bundleConfig = {
	entry: "src/index.ts",
	output: "bundle.js",
	isLib: false,
}

if (process.env.npm_lifecycle_event === "lib") {
	bundleConfig.entry = "src/PostGenerator.ts";
	bundleConfig.output = "../lib/PostGenerator.js";
	bundleConfig.isLib = true;
}

const config = {
	entry: path.resolve(__dirname, bundleConfig.entry),
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

	plugins: bundleConfig.isLib ? [] : [
		new HtmlWebPackPlugin({
			template: "./src/index.html",
			filename: "./index.html",
		}),
	],

	// externals: {
	// 	html2canvas: 'html2canvas',
	// }
};

module.exports = config;