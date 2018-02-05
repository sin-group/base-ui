/**
 * @author KylesLight
 * @date 17/10/21-下午2:26
 * @file Stats
 */

import {DEBUG, VERBOSE} from './BuildConf';

export default {
    colors: true,
    reasons: DEBUG,
    hash: VERBOSE,
    version: VERBOSE,
    timings: true,
    chunks: VERBOSE,
    chunkModules: VERBOSE,
    cached: VERBOSE,
    cachedAssets: VERBOSE
};
