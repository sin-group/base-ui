/**
 * @author Kyles Light
 * @email kuilin@yangqianguan.com
 * @date 2017-12-28 16:28:40.980
 */

// node modules
import 'es5-shim';
import 'es5-shim/es5-sham';
import 'json3';
import 'babel-polyfill';

import Vue from '../../common/vue';
import App from './app.vue';

const app = new Vue(App);
app.$mount('#app');
