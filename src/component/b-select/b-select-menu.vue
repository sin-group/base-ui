<template>
    <ul ref="list"
        class="b-select-menu"
        :style="{maxHeight: listHeight}">
        <li v-for="(item, index) in menuList"
            :class="{'b-select-menu-selected': index === signIndex}"
            @click="handleChoose(item)">{{ map[item] }}</li>
    </ul>
</template>

<script type="text/babel">

    import keyCodeMap from '../../util/keyCodeMap';

    export default {
        name: 'b-select-menu',

        props: {
            popper: {
                required: true
            },
            map: Object,
            value: String,
            searchText: String,
            itemHeight: {
                type: Number,
                default: 30
            },
            padding: {
                type: Number,
                default: 10
            },
            renderCount: {
                type: Number,
                default: 8
            }
        },

        data() {
            return {
                signIndex: null,
                menuListWhenPopperClose: null
            }
        },

        computed: {
            menuList() {
                const vm = this;
                const {map, searchText, menuListWhenPopperClose} = vm;
                return menuListWhenPopperClose || Object.keys(map).filter(value => map[value].match(searchText))
            },
            listHeight() {
                const vm = this;
                const {itemHeight, padding} = vm;
                return vm.renderCount * itemHeight + padding + 'px';
            },
            reservedCount() {
                const vm = this;
                return Math.floor(vm.renderCount / 2);
            },
            maxScrollTop () {
                const vm = this;
                const {renderCount, menuList, itemHeight, padding} = vm;
                return (menuList.length - renderCount) * itemHeight + padding;
            }
        },

        methods: {
            initScrollTop() {
                const vm = this;
                const {reservedCount, renderCount, menuList, value, padding, itemHeight} = vm;
                let initScrollTop;

                const signIndex = menuList.indexOf(value);
                if (signIndex > -1) {
                    if (signIndex < reservedCount) {
                        initScrollTop = 0;
                    } else if (signIndex > menuList.length - renderCount + reservedCount - 1) {
                        initScrollTop = vm.maxScrollTop;
                    } else {
                        initScrollTop = (signIndex - reservedCount) * itemHeight + padding;
                    }
                } else {
                    initScrollTop = 0;
                }

                vm.signIndex = signIndex;
                vm.$nextTick(() => {
                    vm.$refs.list.scrollTop = initScrollTop;
                })
            },

            changeSign(direction) {
                const vm = this;
                const {$refs: {list}, popper, signIndex, itemHeight, menuList, renderCount, maxScrollTop} = vm;

                if (!popper.visible) return popper.open();

                const scrollTop = list.scrollTop;
                const contentMin = Math.floor(scrollTop / itemHeight);
                const contentMax = contentMin + renderCount - 1;

                const isOutOfContent = Boolean(signIndex < contentMin || signIndex > contentMax);
                let nextScrollTop = scrollTop;
                let nextSignIndex = signIndex;

                if (direction === 'up') {
                    nextSignIndex = signIndex === 0 ? 0 : signIndex - 1;

                    if (signIndex === contentMin) {
                        nextScrollTop = scrollTop - itemHeight;
                        nextScrollTop = nextSignIndex === 0 ? 0 : nextScrollTop;
                    }
                    if (isOutOfContent) {
                        nextScrollTop = (nextSignIndex - renderCount + 1) * itemHeight;
                        nextScrollTop = nextScrollTop > maxScrollTop ? maxScrollTop : nextScrollTop;
                    }
                }

                if (direction === 'down') {
                    nextSignIndex = signIndex + 1 === menuList.length ? signIndex : signIndex + 1;

                    if (signIndex === contentMax) {
                        nextScrollTop = scrollTop + itemHeight;
                        nextScrollTop = nextSignIndex ===  menuList.length ? maxScrollTop : nextScrollTop;
                    }
                    if (isOutOfContent) {
                        nextScrollTop = nextSignIndex * itemHeight;
                        nextScrollTop = nextScrollTop < 0 ? 0 : nextScrollTop;
                    }
                }

                vm.signIndex = nextSignIndex;
                vm.$nextTick(() => {
                    vm.$refs.list.scrollTop = nextScrollTop;
                })
            },

            handleChoose(value) {
                this.$emit('choose', value)
            },

            handleKeyDown(keyCode) {
                const vm = this;
                const {signIndex, menuList} = vm;
                switch (keyCode) {
                    case keyCodeMap.up: {
                        vm.changeSign('up');
                        break;
                    }
                    case keyCodeMap.down: {
                        vm.changeSign('down');
                        break;
                    }
                    case keyCodeMap.enter: {
                        vm.handleChoose(menuList[signIndex]);
                        break;
                    }
                }
            }
        },

        mounted() {
            const vm = this;
            vm.$on('b-popper-open', () => {
                vm.menuListWhenPopperClose = null;
            });

            vm.$on('b-popper-close', () => {
                vm.menuListWhenPopperClose = vm.menuList;
            });

            vm.$on('b-popper-opened', () => {
                vm.initScrollTop();
            });
        }
    }

</script>

<style lang="scss" rel="stylesheet/scss">
    @import '../../style/variables.scss';

    .b-select-menu {
        padding: 10px 0;
        margin: 10px 0;
        background-color: $white;
        border-radius: 3px;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, .2);
        box-sizing: border-box;
        overflow-y: auto;

        li {
            display: flex;
            align-items: center;
            height: 30px;
            min-width: 200px;
            background-color: $white;
            padding: 0 10px;
            cursor: pointer;

            &:hover,
            &.b-select-menu-selected {
                background-color: $blue-lighter;
            }
        }
    }
</style>
