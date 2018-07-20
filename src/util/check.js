/**
 * @author lany44
 * @date 2017/11/24-下午3:18
 * @file check
 */

export const isArray = value => (value ? Array.isArray(value) : false);

export const isString = value => (value ? typeof value === 'string' : false);

export const isFunc = value => (value ? typeof value === 'function' : false);

export const isNumber = value => (typeof value === typeof 0);
