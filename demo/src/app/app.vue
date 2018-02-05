<template>
    <div class="app">
        <yqg-nav-menu :routerMap="$RouterMap">
            <div slot="project">
                <router-link :to="$RouterMap.index">BaseUI</router-link>
            </div>

            <div slot="action">
                <a class="github-icon" href="https://github.com/sin-group/base-ui" target="_blank">
                    <i class="b-icon-github"></i>
                </a>
            </div>
        </yqg-nav-menu>

        <router-view></router-view>

        <footer>
            <p>
                <a href="/">BaseUI Site</a> is based on <a href="https://github.com/sin-group/base-ui" target="_blank">BaseUI</a>,
                released under the <a href="https://opensource.org/licenses/MIT">MIT License</a>
            </p>
            <p>Copyright © 2018 <a href="https://github.com/sin-group" target="_blank">Sin Group</a></p>
        </footer>
    </div>
</template>

<script>
    // our modules
    import BaseUI from '../../../src/base-ui';
    import Vue from '../../common/vue';
    import router from '../common/router';
    import BaseUIOptions from '../common/constant/BaseUIOptions';

    Vue.use(BaseUI, BaseUIOptions);

    // assign function on Vue instance
    Object.assign(Vue.prototype, {
        $j: (data) => JSON.stringify(data, null, 4)
    });

    export default {
        name: 'app',

        router
    };

</script>

<style lang="scss">
    .github-icon {
        margin-top: 5px;
        font-size: 20px;
    }

    footer {
        margin: 50px 30px;
        text-align: center;
        line-height: 1.4em;
        color: #999;
    }
</style>
