/**
 * @author lany44
 * @date 2017/9/23-下午4:28
 * @file webpack.config
 */

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const demoConf = {
    entry: path.resolve(__dirname, './demo.js'),
    output: {
        filename: '[name].app.js',
        path: path.resolve(__dirname, './dist')
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.js$/,
                loader: 'babel-loader'
            },
            {
                test: /\.css$/,
                loader: 'css-loader'
            }
        ]
    },
    resolve :{
        extensions: ['.js', '.vue'],
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './demo.html',
            inject: true
        }),
        new webpack.HotModuleReplacementPlugin(),
    ],
    devServer: {
        contentBase: path.resolve(__dirname, './dist'),
        compress: true,
        port: 9000
    }
};

module.exports = demoConf;