<template>
    <ul ref="list"
        class="b-select-menu"
        :style="{maxHeight: listHeight}">
        <li v-for="(item, index) in menuList"
            :class="{'b-select-menu-selected': index === highlightIndex}"
            @click="handleChoose(item)">{{ map[item] }}</li>

        <li v-if="menuList.length === 0" class="empty-list-item">无匹配选项</li>
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
                highlightIndex: null
            }
        },

        computed: {
            menuList() {
                const vm = this;
                const {map, searchText} = vm;
                const searchTexter = new RegExp(searchText, 'i');

                return Object.keys(map).filter(value => map[value].match(searchTexter))
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
            initHighlight(value) {
                const vm = this;
                const {reservedCount, renderCount, menuList, padding, itemHeight} = vm;

                const highlightIndex = menuList.indexOf(value);

                let initScrollTop = 0;
                if (highlightIndex > -1) {
                    if (highlightIndex < reservedCount) {
                        initScrollTop = 0;
                    } else if (highlightIndex > menuList.length - renderCount + reservedCount - 1) {
                        initScrollTop = vm.maxScrollTop;
                    } else {
                        initScrollTop = (highlightIndex - reservedCount) * itemHeight + padding;
                    }
                }

                vm.highlightIndex = highlightIndex;

                vm.$nextTick(() => {
                    vm.$refs.list.scrollTop = initScrollTop;
                })
            },

            changeHighlight(direction) {
                const vm = this;
                const {$refs: {list}, popper, highlightIndex, itemHeight, menuList, renderCount, maxScrollTop} = vm;

                if (!popper.visible) return popper.open();

                const scrollTop = list.scrollTop;
                const contentMin = Math.floor(scrollTop / itemHeight);
                const contentMax = contentMin + renderCount - 1;

                const isOutOfContent = Boolean(highlightIndex < contentMin || highlightIndex > contentMax);
                let nextScrollTop = scrollTop;
                let nextHighlightIndex = highlightIndex;

                if (direction === 'up') {
                    nextHighlightIndex = highlightIndex === 0 ? 0 : highlightIndex - 1;

                    if (highlightIndex === contentMin) {
                        nextScrollTop = scrollTop - itemHeight;
                        nextScrollTop = nextHighlightIndex === 0 ? 0 : nextScrollTop;
                    }
                    if (isOutOfContent) {
                        nextScrollTop = (nextHighlightIndex - renderCount + 1) * itemHeight;
                        nextScrollTop = nextScrollTop > maxScrollTop ? maxScrollTop : nextScrollTop;
                    }
                }

                if (direction === 'down') {
                    nextHighlightIndex = highlightIndex + 1 === menuList.length ? highlightIndex : highlightIndex + 1;

                    if (highlightIndex === contentMax) {
                        nextScrollTop = scrollTop + itemHeight;
                        nextScrollTop = nextHighlightIndex ===  menuList.length ? maxScrollTop : nextScrollTop;
                    }
                    if (isOutOfContent) {
                        nextScrollTop = nextHighlightIndex * itemHeight;
                        nextScrollTop = nextScrollTop < 0 ? 0 : nextScrollTop;
                    }
                }

                vm.highlightIndex = nextHighlightIndex;
                vm.$nextTick(() => {
                    vm.$refs.list.scrollTop = nextScrollTop;
                })
            },

            handleChoose(value) {
                this.$emit('choose', value)
            },

            handleKeyDown(keyCode) {
                const vm = this;
                const {highlightIndex, menuList, popper, value} = vm;
                switch (keyCode) {
                    case keyCodeMap.up: {
                        vm.changeHighlight('up');
                        break;
                    }
                    case keyCodeMap.down: {
                        vm.changeHighlight('down');
                        break;
                    }
                    case keyCodeMap.tab: {
                        if (popper.visible) {
                            vm.handleChoose(value);
                        }
                        break;
                    }
                    case keyCodeMap.enter: {
                        if (!popper.visible) {
                            popper.open();
                            break;
                        }

                        if (highlightIndex > -1) {
                            vm.handleChoose(menuList[highlightIndex]);
                        } else {
                            vm.handleChoose(value);
                        }
                        break;
                    }
                }
            }
        },

        mounted() {
            const vm = this;
            vm.initHighlight(vm.value);
        },

        watch: {
            searchText(text) {
                const vm = this;
                const {menuList, map, value} = vm;
                if (menuList.indexOf(map[text]) > -1) {
                    vm.initHighlight(map[text])
                } else {
                    vm.initHighlight(value)
                }
            }
        }
    }

</script>

<style lang="scss" rel="stylesheet/scss">
    @import '../../style/variables.scss';

    .b-select-menu {
        padding: 10px 0;
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

        .empty-list-item {
            justify-content: center;
            color: #666;
        }
    }
</style>
