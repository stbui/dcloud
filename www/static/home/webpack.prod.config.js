var path = require('path');
var webpack = require('webpack');
var ignore = new webpack.IgnorePlugin(/\.svg$/);
var nodeModulesDir = path.resolve(__dirname, 'node_modules');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: {
        main: './scripts/main.js',
        vendor: [
            'react',
            'redux'
        ]
    },
    output: {
        publicPath: '/static/home/',
        filename: './dist/js/[name].js'
    },
    module: {
        loaders: [
            { test: /\.js$/, loader: 'babel?' + JSON.stringify({presets: ['react', 'es2015']}), exclude: [nodeModulesDir] },
            { test: /\.scss$/, loader: ExtractTextPlugin.extract('style', 'css!autoprefixer!sass') },
            {test: /\.(png|jpg)$/, loader: 'file-loader?limit=50000&name=./dist/img/[sha512:hash:base64:7].[ext]'}
        ]
    },
    plugins: [
        ignore,
        new ExtractTextPlugin('./dist/css/main.css'),
        new webpack.optimize.CommonsChunkPlugin('vendor', './dist/js/vendor.js'),
        new webpack.DefinePlugin({ "process.env": { NODE_ENV: JSON.stringify("production") } })
    ]
};
