<template>
    <div class="app">
        <b-layout
            :default-open="true"
            :is-nav-open="isNavOpen"
            @nav-open-change="navOpenChange">
            <div slot="header">
                <b-header @on-nav-toggle="toggleNav">
                    <div slot="center">
                        <h3>{{ $route.meta.navTitle }}</h3>
                    </div>

                    <div slot="right">
                        <a class="github-icon" href="https://github.com/sin-group/base-ui" target="_blank">
                            <i class="b-icon-github"></i>
                        </a>
                    </div>
                </b-header>
            </div>

            <div slot="side-left">
                <b-nav-side :routes="routes" @toggle="toggleNav">
                    <div slot="nav-top">
                        <router-link :to="{name: 'Index'}" class="logo">BaseUI</router-link>
                    </div>
                </b-nav-side>
            </div>

            <div slot="content">
                <transition name="slide-fade" mode="out-in">
                    <router-view/>
                </transition>

                <footer class="three">
                    <p>
                        <a href="/">BaseUI Site</a>
                        is based on
                        <a href="https://github.com/sin-group/base-ui" target="_blank">BaseUI</a>,
                        released under the <a href="https://opensource.org/licenses/MIT">MIT License</a>
                    </p>
                    <p>Copyright © 2018 <a href="https://github.com/sin-group" target="_blank">Sin Group</a></p>
                </footer>
            </div>
        </b-layout>
    </div>
</template>

<script>
// our modules
import BaseUI from '../../../src/base-ui';
import Vue from '../../common/vue';
import router from '../common/router';
import routes from '../common/router/routes';
import Component from '../common/component';
import BaseUIOptions from '../common/constant/BaseUIOptions';
import '../common/style/main.scss';

Vue.use(BaseUI, BaseUIOptions);
Vue.use(Component);

// assign function on Vue instance
Object.assign(Vue.prototype, {
  $j: data => JSON.stringify(data, null, 4)
});

export default {
  name: 'App',

  router,

  data() {
    return {
      routes,
      isNavOpen: true
    };
  },

  methods: {
    navOpenChange(isNavOpen) {
      this.isNavOpen = isNavOpen;
    },

    toggleNav() {
      this.isNavOpen = !this.isNavOpen;
    }
  }
};
</script>

<style lang="scss">
.logo {
    font-weight: 500;
}

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
