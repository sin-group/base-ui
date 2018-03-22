/**
 * @author KylesLight
 * @date 01/11/2017-1:11 PM
 * @file base-ui
 */

import component from './component';
import directive from './directive';
import filter from './filter';
import plugin from './plugin';
import './style/main.scss';
import './style/icon/icon.scss';

export default {

    install(Vue, options = {}) {
        Vue.use(component);
        Vue.use(directive);
        Vue.use(filter);
        Vue.use(plugin, options);
    }

};
