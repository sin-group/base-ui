/**
 * @author KylesLight
 * @date 2/16/17-3:01 PM
 * @file BuildConf
 */

import config from 'config';

const buildConf = config.get('build');

export const DEBUG = buildConf.debug;
export const VUE_DEBUG = buildConf.vueDebug;
export const VERBOSE = buildConf.verbose;
export const STAGE = process.env.NODE_ENV || 'dev';

export const HASH = DEBUG ? 'hash' : 'chunkhash';
