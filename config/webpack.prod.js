const webpack = require('webpack');
const Merge = require('webpack-merge');
const MainConfig = require('./webpack.main.js');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = Merge(MainConfig, {
    mode: 'production',
    optimization:{
        minimize: true,
        minimizer: [
            new UglifyJsPlugin({
                sourceMap: false,
                uglifyOptions: {
                    ecma: 7,
                    warnings: false,
                    compress: true,
                    toplevel: false
                }
            })
        ]
    },
    plugins: [
        new webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: false
        }),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        })
    ]
});