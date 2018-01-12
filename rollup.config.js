/**
 * @author KylesLight
 * @date 2018/1/10-上午12:57
 * @file rollup.config.js
 */

import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import scss from 'rollup-plugin-scss';
import vue from 'rollup-plugin-vue';
import uglify from 'rollup-plugin-uglify';

export default {
    input: 'src/base-ui.js',
    output: {
        file: 'dist/base-ui.min.js',
        format: 'cjs',
        name: 'BaseUI'
    },
    plugins: [
        vue({
            autoStyles: false,
            styleToImports: true
        }),
        scss({
            output: 'dist/base-ui.css'
        }),
        babel({
            exclude: 'node_modules/**',
            plugins: ['external-helpers']
        }),
        commonjs(),
        resolve({
            extensions: ['.js', '.json'],
            jsnext: true,
            main: true,
            browser: true
        }),
        uglify()
    ]
};
