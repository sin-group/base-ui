/**
 * @author KylesLight
 * @date 16/01/2018-7:06 PM
 * @file BaseUIOptions
 */

export default {
    ruleMap: {
        email: (str = '') => /\S+@\S+\.\S+/.test(str)
    }
};
