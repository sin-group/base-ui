/**
 * @author KylesLight
 * @date 2018/1/10-上午12:57
 * @file rollup.config.js
 */

import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import sass from 'rollup-plugin-sass';
import vue from 'rollup-plugin-vue';
import uglify from 'rollup-plugin-uglify';

export default {
    input: 'src/base-ui.js',
    output: {
        file: 'dist/base-ui.min.js',
        format: 'iife',
        name: 'BaseUI'
    },
    plugins: [
        sass({
            output: './dist/base-ui.css'
        }),
        vue(),
        babel({
            exclude: 'node_modules/**'
        }),
        commonjs(),
        resolve({
            extensions: [ '.js', '.json'],
            jsnext: true,
            main: true,
            browser: true
        }),
        uglify()
    ]
};