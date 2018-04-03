/**
 * @author Kyles Light
 * @email kuilin@yangqianguan.com
 * @date 2017-12-28 16:28:40.980
 */

const path = require('path');

const PWD = process.cwd();
const resolvePwd = (...args) => path.resolve(PWD, ...args);

module.exports = {
    appName: 'BaseUiDemo',

    build: {
        framework: 'vue',
        packageJsonPath: '../package.json',

        copy: {
            'src/public': 'build/public'
        },

        htmlPlugin: {
            template: resolvePwd('./src/app/index.html'),
            favicon: resolvePwd('./src/app/favicon.ico')
        },

        clientEntry: './src/app/main.js',
        serverEntry: './src/start.js'
    },

    run: {
        debug: true,
        port: 62690,
        webHost: 'http://local.yangqianguan.com:62690'
    }
};
