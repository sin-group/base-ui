/**
 * @author KylesLight
 * @date 2/16/17-2:49 PM
 * @file Globals
 */

import {DEBUG, VUE_DEBUG, STAGE} from './BuildConf';

export default {
    'process.env.NODE_ENV': DEBUG ? '"development"' : '"production"',
    '__DEBUG__': DEBUG,
    '__VUE_DEBUG__': VUE_DEBUG,
    '__STAGE__': `'${STAGE}'`
};
