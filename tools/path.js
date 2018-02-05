/**
 * @author zhangpeng
 * @date 16/11/17-下午5:56
 * @file util
 */

import path from 'path';

const PROJECT_ROOT = path.resolve(__dirname, '../');

export const resolve = (...arg) => path.resolve(PROJECT_ROOT, ...arg);
