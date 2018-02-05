/**
 * @author KylesLight
 * @date 2/16/17-1:51 PM
 * @file webpack.server.config
 */

import webpack from 'webpack';

import Package from '../../../package.json';
import {resolve} from '../../path';

import {DEBUG} from './constant/BuildConf';
import CommonConf from './constant/CommonConf';
import GLOBALS from './constant/Globals';

const {module: {rules}} = CommonConf;

export default ({project}) => {
    const resolvePath = (...arg) => resolve('./demo', ...arg);

    return {
        name: project,
        target: 'node',
        node: {
            console: false,
            global: false,
            process: false,
            Buffer: false,
            __filename: false,
            __dirname: false
        },

        entry: './src/start.js',
        output: {
            publicPath: '/',
            path: resolvePath('./build'),
            filename: 'server.js',
            libraryTarget: 'commonjs2'
        },

        cache: DEBUG,
        module: {rules},

        externals: [
            ...Object.keys(Package.dependencies),
            ...Object.keys(Package.devDependencies)
        ],

        plugins: [
            new webpack.DefinePlugin({
                ...GLOBALS,
                __BROWSER__: false
            }),
            new webpack.optimize.OccurrenceOrderPlugin()
        ]
    };
};
