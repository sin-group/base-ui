/**
 * @author KylesLight
 * @date 05/01/2018-4:51 PM
 * @file filter.js
 */

import {
    getDate,
    getDateTime
} from './filter-util';

export const filterFuncMap = {
    'b-date': getDate,
    'b-date-time': getDateTime
};

export default {

    install(Vue) {
        Vue.filter('b-date', getDate);
        Vue.filter('b-date-time', getDateTime);
    }

};
