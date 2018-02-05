/**
 * @author wsm
 * @date 2017/8/8-下午12:15
 * @file CommonConf.js
 */

import webpack from 'webpack';
import autoprefixer from 'autoprefixer';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

import AUTOPREFIXER_BROWSERS from './AutoprefixerBrowsers';
import {DEBUG} from './BuildConf';
import GLOBALS from './Globals';

const postcss = {
    plugins: [
        autoprefixer({browsers: AUTOPREFIXER_BROWSERS})
    ]
};

export default {
    cache: DEBUG,
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules|app-v1/
            },
            {
                test: /\.json$/,
                loader: 'json-loader'
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract('css-loader')
            },
            {
                test: /\.scss$/i,
                loader: ExtractTextPlugin.extract([
                    'css-loader',
                    'postcss-loader',
                    'sass-loader'
                ])
            },
            {
                test: /\.less$/,
                loader: ExtractTextPlugin.extract([
                    'css-loader',
                    'less-loader'
                ])
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {postcss},
                exclude: /node_modules/
            },
            {
                test: /\.html$/,
                loader: 'html-loader'
            },
            {
                test: /\.(md)$/,
                loader: 'raw-loader'
            },
            {
                test: /\.(png|jpg|jpeg|gif|svg|woff|woff2)$/,
                loader: 'url-loader',
                options: {
                    limit: 10000
                }
            },
            {
                test: /\.(eot|ttf|wav|mp3)$/,
                loader: 'file-loader'
            }
        ]
    },

    resolve: {
        extensions: ['.js', '.vue', '.json']
    },

    plugins: [
        new webpack.DefinePlugin({
            ...GLOBALS
        }),
        new webpack.LoaderOptionsPlugin({
            options: {postcss},
            minimize: !DEBUG
        }),
        new webpack.optimize.OccurrenceOrderPlugin()
    ]
};
