/**
 * @author KylesLight
 * @date 05/01/2018-4:51 PM
 * @file filter.js
 */

import {
    getDate,
    getDateMinute,
    getDateTime
} from '../util/time';

export const filterFuncMap = {
    'b-date': getDate,
    'b-date-minute': getDateMinute,
    'b-date-time': getDateTime
};

export default {

    install(Vue) {
        Vue.filter('b-date', getDate);
        Vue.filter('b-date-minute', getDateMinute);
        Vue.filter('b-date-time', getDateTime);
    }

};
