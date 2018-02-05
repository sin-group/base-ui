<template>
    <div class="nav-menu-wrap container-wide">
        <div class="nav container-wide mat">
            <div class="nav-menu container level">
                <div class="nav-drop">
                    <a @click="toggleDropDownMenu()" class="drop-down-icon">
                        <span></span>
                        <span></span>
                        <span></span>
                    </a>
                </div>

                <div class="project" @click="closeDropDownMenu">
                    <slot name="project"></slot>
                </div>

                <div class="nav-root-wrap level-center">
                    <ul class="level-center">
                        <li v-for="route in routes.root">
                            <router-link :to="route"
                                         :class="{'active': route.name === currentRootName}">{{ route.name }}
                            </router-link>
                        </li>
                    </ul>
                </div>

                <div class="operation level-end">
                    <slot name="action"></slot>
                </div>
            </div>

            <div class="nav-drop-menu container-wide" v-if="isDropDownMenuOpen">
                <ul class="container b-col">
                    <li v-for="route in routes.root" :class="{'active': route.name === currentRootName}">
                        <div class="drop-menu-item" @click="dropMenuJump(route)">{{ route.name }}</div>
                    </li>
                </ul>
            </div>
        </div>

        <div class="sub-nav container-wide level-center" v-if="hasSubMenu">
            <ul class="level-center">
                <li v-for="route in currentSubMenu" :class="{'active': route.name === $route.name}">
                    <router-link :to="route">{{ route.name }}</router-link>
                </li>
            </ul>
        </div>
    </div>
</template>

<script type="text/babel">

    export default {
        name: 'nav-menu',

        props: {
            routerMap: {
                type: Object,
                default() {
                    return [];
                }
            }
        },

        data() {
            return {
                isDropDownMenuOpen: false
            };
        },

        computed: {
            routes() {
                let routes = {
                    all: [],
                    root: [],
                    children: [],
                    current: {},
                    isCurrentChild: false
                };
                let currentRoute;

                const vm = this;
                const {routerMap, $route} = vm;
                routes.root = Object.values(routerMap).filter(route => route.name); // check name for show
                routes.all = routes.all.concat(routes.root);

                const rec = (list) => {
                    list.forEach(item => {
                        if (Array.isArray(item.children)) {
                            const filterList = item.children.filter(child => {
                                child.parent = item;
                                return child.name
                            });
                            routes.all = routes.all.concat(filterList);
                            routes.children = routes.children.concat(filterList);

                            rec(item.children);
                        }
                    });
                };

                rec(routes.root);

                currentRoute = routes.children.find(item => item.name === $route.name);
                routes.isCurrentChild = Boolean(currentRoute);

                if (!currentRoute) {
                    currentRoute = routes.root.find(item => item.name === $route.name);
                }

                routes.current = currentRoute ? currentRoute : {};
                return routes;
            },

            currentRootName() {
                const vm = this;
                const {$route, routes: {current: {parent = {}}}} = vm;

                return parent.name || $route.name;
            },

            currentSubMenu() {
                const vm = this;
                const {routes: {current: {children, parent = {}}}} = vm;
                const currentSubMenu = parent.children || children || [];

                return currentSubMenu.filter(route => route.name);
            },

            hasSubMenu() {
                const vm = this;
                const {routes: {current: {children, parent}}} = vm;

                return Array.isArray(children) || Boolean(parent);
            }
        },

        methods: {
            toggleDropDownMenu() {
                const vm = this;

                vm.isDropDownMenuOpen = !vm.isDropDownMenuOpen;
            },

            closeDropDownMenu() {
                const vm = this;

                vm.isDropDownMenuOpen = false;
            },

            dropMenuJump(route) {
                const vm = this;

                vm.$router.replace(route);
                vm.isDropDownMenuOpen = false;
            }
        }
    };

</script>

<style lang="scss" rel="stylesheet/scss" scoped>
    @import '../../../../../src/style/variables.scss';

    .nav-menu-wrap {
        display: flex;
        flex-flow: column;
        align-items: center;

        li {
            margin: 8px 10px;
            flex-grow: 0;
            flex-shrink: 0;
        }

        a,
        .drop-menu-item {
            display: inline-block;
            color: $black;
            padding: 8px 0;
            border-bottom: 1px solid transparent;
        }
    }

    .nav {
        position: relative;
        background-color: rgba(63, 81, 181, 1);

        a {
            color: $white;
        }

        .nav-menu {
            display: flex;
            height: $mat-height;
            box-sizing: content-box;
            padding: 0 10px;

            li.active a {
                color: $white;
            }

            .nav-drop {
                flex: 1;
                display: none;
                cursor: pointer;

                .drop-down-icon {
                    position: relative;
                    top: 3px;

                    span {
                        display: block;
                        width: 16px;
                        height: 3px;
                        margin-bottom: 3px;
                        position: relative;

                        background: white;
                        border-radius: 1px;

                        z-index: 1;

                        transform-origin: 4px 0px;

                        transition: transform 0.5s cubic-bezier(0.77,0.2,0.05,1.0),
                        background 0.5s cubic-bezier(0.77,0.2,0.05,1.0),
                        opacity 0.55s ease;
                    }
                }
            }

            .project {
                flex: 1;

                a {
                    font-weight: 500;
                }
            }

            .nav-root-wrap {
                flex: 1;

                a {
                    color: $white;

                    &:hover {
                        color: $gray-light;
                    }

                    &.active {
                        color: $gray-light;
                    }
                }
            }

            .operation {
                flex: 1;
            }
        }

        .nav-drop-menu {
            position: absolute;
            top: 48px;
            display: none;
            background-color: rgba(63, 81, 181, .9);
            transition: 1s;

            .drop-menu-item {
                display: block;
                color: $white;
                cursor: pointer;

                &:hover {
                    border-bottom: 1px solid $white;
                }
            }

        }
    }

    .sub-nav {
        background-color: $white;

        ul {
            height: 50px;

            li:hover,
            li.active {
                border-bottom: 1px solid $blue-dark;

                a {
                    color: $blue-dark;
                }
            }
        }
    }

    @media screen and (max-width: 770px) {
        .nav {
            height: 48px;

            .nav-menu {
                .nav-drop {
                    display: block;
                }

                .project {
                    display: flex;
                    justify-content: center;
                }

                .nav-root-wrap,
                .operation .search {
                    display: none;
                }
            }

            .nav-drop-menu {
                display: block;
            }
        }
    }

</style>
