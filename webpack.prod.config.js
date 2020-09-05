const path = require('path');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
    mode: 'production',
    entry: path.join(__dirname, '/src/index.tsx'),
    output: {
        path: path.join(__dirname, '/build'),
        filename: 'bundle.[hash:8].min.js'
    },

    optimization: {
        minimizer: [new OptimizeCSSAssetsPlugin({})],
    },

    resolve: {
        extensions: [".ts", ".tsx", ".js", ".json"]
    },

    module: {
        rules: [
            { test: /\.tsx?$/, loader: "awesome-typescript-loader" },
            { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader, // creates style nodes from JS strings
                        options: { publicPath: () => path.join(__dirname, '/build') }
                    },
                    { loader: "css-loader" }, // translates CSS into CommonJS
                    { loader: "sass-loader" }, // compiles Sass to CSS, using Node Sass by default
                ]
            }
        ]
    },

    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, '/public/index.html')
        }),
        new MiniCssExtractPlugin({
            filename: 'main.[hash:8].min.css',
            chunkFilename: 'chunk.[hash.8].min.css',
        }),
    ]
};