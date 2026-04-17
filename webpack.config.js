const path = require("path");
const CopyPlugin = require("copy-webpack-plugin")

module.exports = {
    entry: {
        content: "./src/content/Controller.ts",
        background: "./src/background/background.ts",
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].js",
        clean: true,
    },
    resolve: {
        extensions: [".ts", ".js"],
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: "ts-loader",
                exclude: /node_modules/,
            },
        ],
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                {from: "manifest.json", to: "manifest.json"},
            ],
        }),
    ],
};