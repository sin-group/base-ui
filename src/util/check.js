/**
 * @author lany44
 * @date 2017/11/24-下午3:18
 * @file check
 */

export const isArray = value => Array.isArray(value);

export const isObject = value => value && value.toString() === '[object Object]';

export const isString = value => typeof value === 'string';

export const isFunc = value => typeof value === 'function';

export const isNumber = value => typeof value === typeof 0;

export const isValidNumber = value => isNumber(value) && !Number.isNaN(value);

// like this 2018-08-16T05:16:23.569Z
export const isDateISOString = (value = '') => /^\d{4}-\d{2}-\d{2}\w\d{2}:\d{2}:\d{2}\.\d{3}\w$/.test(value);

// check if is [], {}, '', undefined, null, NaN
export const isValueEmpty = value => (
    (isArray(value) && !value.length)
    || (isObject(value) && !Object.keys(value))
    || (!value && value !== 0)
);
