/**
 * @author KylesLight
 * @date 19/10/2017-12:44 AM
 * @file bundle
 */

// node modules
import webpack from 'webpack';

// our modules
import genWebpackConfig from './webpack/webpack.config';

/**
 * Creates application bundles from the source files.
 */

function bundle(opt) {
    return new Promise((resolve, reject) => {
        const webpackConfig = genWebpackConfig(opt);

        webpack(webpackConfig).run((err, stats) => {
            if (err) {
                return reject(err);
            }

            console.log(stats.toString({
                colors: true,
                reasons: true,
                hash: false,
                version: false,
                timings: true,
                chunks: false,
                chunkModules: false,
                cached: false,
                cachedAssets: false
            }));

            return resolve();
        });
    });
}

export default bundle;
