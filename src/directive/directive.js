/**
 * @author lany44
 * @date 2017/11/27-下午1:11
 * @file directive.js
 */

import clickOutside from './click-outside';
import clipboard from './clipboard';
import focus from './focus';
import hotkey from './hotkey';
import preventScroll from './prevent-scroll';
import tooltip from './tooltip';

export default {

    install(Vue) {
        Vue.directive('b-click-outside', clickOutside);
        Vue.directive('b-clipboard', clipboard);
        Vue.directive('b-focus', focus);
        Vue.directive('b-hotkey', hotkey);
        Vue.directive('b-prevent-scroll', preventScroll);
        Vue.directive('b-tooltip', tooltip);
    }

};
