const webpack    = require('webpack');
const path       = require('path');
const Merge      = require('webpack-merge');
const MainConfig = require('./webpack.main.js');

module.exports = Merge(MainConfig, {
    mode: 'development',
    plugins:   [
        new webpack.HotModuleReplacementPlugin()
    ],
    devtool: 'source-map',
    devServer: {
        publicPath:         '/',
        port:               9000,
        contentBase:        path.join(process.cwd(), 'build'),
        host:               'localhost',
        historyApiFallback: true,
        noInfo:             false,
        stats:              'minimal',
        hot:                true,
        open:               true
    }
});