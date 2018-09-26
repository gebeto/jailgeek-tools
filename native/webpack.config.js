const path = require("path");

const HtmlWebPackPlugin = require("html-webpack-plugin");

const bundleConfig = {
	entry: path.resolve(__dirname, "src/index.ts"),
	output: "../../dist/bundle.js",
	isLib: false,
}

if (process.env.npm_lifecycle_event === "lib") {
	bundleConfig.entry = {
		Post: path.resolve(__dirname, "src/PostGenerator/PostGenerator.ts"),
		Wallpapers: path.resolve(__dirname, "src/WallpapersGenerator/WallpapersGenerator.ts"),
	};
	bundleConfig.output = "../../libs/[name]/[name]Generator.js";
	bundleConfig.isLib = true;
}

const config = {
	entry: bundleConfig.entry,
	output: {
		// path: path.resolve(__dirname, "../../dist"),
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
				use: ["to-string-loader", "css-loader"]
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
};

module.exports = config;