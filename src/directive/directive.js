/**
 * @author lany44
 * @date 2017/11/27-下午1:11
 * @file directive.js
 */

import clickOutside from './click-outside';
import clipboard from './clipboard';

export default {

    install(Vue) {
        Vue.directive('b-click-outside', clickOutside);
        Vue.directive('b-clipboard', clipboard);
    }

};
