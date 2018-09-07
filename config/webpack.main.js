const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {

    context: path.join(process.cwd(), 'src'),

    devtool: 'source-map',

    entry: ['babel-polyfill', './scripts/app.js'],

    output: {
        path: path.join(process.cwd(), 'public'),
        filename: 'app.js',
        publicPath: './',
        sourceMapFilename: '[name].map'
    },

    resolve: {
        extensions: ['.js', '.json'],
        modules: [path.join(process.cwd(), 'src'), 'node_modules']
    },

    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: "vendors",
                    chunks: "all"
                }
            }
        },
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                use: ['style-loader', 'css-loader', { loader: 'sass-loader', options: { importLoaders: 1 } }]
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            }
        ]
    },

    plugins: [
        new webpack.optimize.ModuleConcatenationPlugin(),
        new CleanWebpackPlugin(['public'], { root: process.cwd() }),
        new HtmlWebpackPlugin({
            template: 'index.html',
            inject: true
        })
    ]
};