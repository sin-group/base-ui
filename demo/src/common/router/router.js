/**
 * @author Kyles Light
 * @email kuilin@yangqianguan.com
 * @date 2017-12-28 16:28:40.980
 */

import Router from 'vue-router';

import Vue from '../../../common/vue';
import routes from './routes';

Vue.use(Router);

const router = new Router({
    mode: 'history',
    fallback: false,
    scrollBehavior: () => ({y: 0}),
    routes
});

export default router;
