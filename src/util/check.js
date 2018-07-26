/**
 * @author lany44
 * @date 2017/11/24-下午3:18
 * @file check
 */

export const isArray = value => Array.isArray(value);

export const isString = value => typeof value === 'string';

export const isFunc = value => typeof value === 'function';

export const isNumber = value => typeof value === typeof 0;
