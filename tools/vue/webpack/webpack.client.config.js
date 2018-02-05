/**
 * @author KylesLight
 * @date 2/16/17-1:51 PM
 * @file webpack.client.config
 */

import webpack from 'webpack';
import merge from 'webpack-merge';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import HtmlPlugin from 'html-webpack-plugin';
import VersionHashPlugin from 'webpack-version-hash-plugin';

import {resolve} from '../../path';

import CommonConf from './constant/CommonConf';
import {DEBUG, HASH} from './constant/BuildConf';

export default ({project}) => {
    const resolvePath = (...arg) => resolve('./demo', ...arg);

    return merge(CommonConf, {
        target: 'web',
        name: project,
        entry: {
            main: './src/app/main.js',
            vendor: [
                'vue',
                'vue-resource',
                'vue-router',
                'vuex'
            ],
            polyfill: [
                'es5-shim',
                'es5-shim/es5-sham',
                'json3',
                'babel-polyfill'
            ]
        },
        output: {
            publicPath: '/',
            path: resolvePath('./build/public/'),
            filename: `[name].[${HASH}].js`
        },

        resolve: {
            alias: {
                vue$: 'vue/dist/vue.common.js'
            }
        },

        plugins: [
            new webpack.optimize.CommonsChunkPlugin({
                names: ['vendor', 'polyfill']
            }),
            new webpack.optimize.CommonsChunkPlugin({
                name: 'manifest',
                minChunks: Infinity
            }),

            new ExtractTextPlugin(`[name].[${HASH}].css`),
            new HtmlPlugin({
                template: resolvePath('./src/app/index.html'),
                favicon: resolvePath('./src/app/favicon.ico')
            }),

            new VersionHashPlugin(),
            ...(!DEBUG ? [
                new webpack.optimize.UglifyJsPlugin({
                    compress: {
                        /* eslint-disable camelcase */
                        screw_ie8: true,
                        /* eslint-enable camelcase */
                        warnings: false
                    },

                    mangle: {
                        except: ['$super', '$', 'exports', 'require']
                    },

                    comments: false
                }),
                new webpack.optimize.AggressiveMergingPlugin()
            ] : [])
        ]
    });
};
