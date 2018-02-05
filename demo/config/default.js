/**
 * @author Kyles Light
 * @email kuilin@yangqianguan.com
 * @date 2017-12-28 16:28:40.980
 */

module.exports = {
    name: 'default',
    appName: 'BaseUiDemo',

    build: {
        debug: true
    },

    run: {
        debug: true,
        port: 62690,
        webHost: 'http://local.yangqianguan.com:62690'
    },

    BrowserSync: {
        port: 62691,
        ui: {
            port: 62692
        }
    }
};
