/**
 * @author KylesLight
 * @date 19/10/2017-12:45 AM
 * @file start
 */
/* eslint-disable consistent-return */

// system modules
import path from 'path';

// node modules
import config from 'config';
import Browsersync from 'browser-sync';
import webpack from 'webpack';
import webpackMiddleware from 'webpack-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import historyApiFallback from 'connect-history-api-fallback';

// our modules
import stats from './webpack/constant/Stats';
import generateWebpackConfig from './webpack/webpack.config';

import run from '../run.function';
import clean from './clean';
import copy from './copy';
import runServer from './start.runServer';

const DEBUG = config.get('run.debug');
const BrowserSyncConfig = config.get('BrowserSync');

/**
 * Launches a development web server with "live reload" functionality -
 * synchronizing URLs, interactions and code changes across multiple devices.
 */
async function start(opts) {
    const webpackConfig = generateWebpackConfig(opts);

    await run(clean);
    await run(copy.bind(undefined, {development: true}));
    await new Promise((resolve) => {
        // Patch the client-side bundle configurations to enable Hot Module Replacement (HMR)
        const [clientConfig] = webpackConfig;
        clientConfig.plugins.push(new webpack.HotModuleReplacementPlugin());
        clientConfig.plugins.push(new webpack.NoEmitOnErrorsPlugin());

        const clientWebpackHMREntry = 'webpack-hot-middleware/client?reload=true';
        clientConfig.entry = {
            ...clientConfig.entry,
            main: [
                clientWebpackHMREntry,
                clientConfig.entry.main
            ]
        };

        const bundler = webpack(webpackConfig);
        const wpMiddleware = webpackMiddleware(bundler, {
            publicPath: clientConfig.output.publicPath,
            stats
        });

        const hotMiddleware = bundler.compilers
            .filter(compiler => compiler.options.target !== 'node')
            .map(compiler => webpackHotMiddleware(compiler));

        const fallbackMiddleware = historyApiFallback({verbose: true}); // fall back to index.html

        const {output} = webpackConfig.find(x => x.target === 'node');
        const serverPath = path.join(output.path, output.filename);
        let bsInit = false;
        bundler.plugin('done', async () => {
            const host = await runServer(serverPath);
            if (bsInit) {
                return Promise.resolve();
            }

            bsInit = true;
            const bs = Browsersync.create();
            bs.init({
                ...BrowserSyncConfig,
                ...(DEBUG ? {} : {notify: false, ui: false}),

                open: 'external',
                host: 'local.yangqianguan.com',
                proxy: {
                    target: host,
                    middleware: [fallbackMiddleware, wpMiddleware, ...hotMiddleware]
                },

                // no need to watch '*.js' here, webpack will take care of it for us,
                // including full page reloads if HMR won't work
                files: ['build/public/**/*']
            }, resolve);
        });
    });
}

export default start;
