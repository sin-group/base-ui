/**
 * @author lany44
 * @date 2017/11/27-下午1:11
 * @file directive.js
 */

import clickOutside from './click-outside';

export default {

    install(Vue) {
        Vue.directive('b-click-outside', clickOutside);
    }

};
