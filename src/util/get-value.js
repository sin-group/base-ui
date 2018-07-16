/**
 * @author lany44
 * @date 2018/7/16-下午2:59
 * @file getValue
 */

export default (value = {}, field = '') => {
    if (typeof value !== 'object') {
        return value;
    }

    const fields = field.split('.');
    return fields.reduce((preVal, currVal) => {
        if (!preVal) return null;
        return preVal[currVal];
    }, value);
};
