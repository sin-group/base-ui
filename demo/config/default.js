/**
 * @author Kyles Light
 * @email kuilin@yangqianguan.com
 * @date 2017-12-28 16:28:40.980
 */

module.exports = {
    appName: 'BaseUiDemo',

    build: {
        framework: 'vue',
        packageJsonPath: '../package.json',

        copy: {
            paths: {
                'src/public': 'build/public'
            }
        },

        htmlPlugin: {
            template: './src/app/index.html',
            favicon: './src/app/favicon.ico'
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
