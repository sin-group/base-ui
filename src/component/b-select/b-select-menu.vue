<template>
    <ul ref="list" :style="{maxHeight: listHeight}" class="b-select-menu">
        <li
            v-for="(item, index) in menuList"
            :key="index"
            :class="{
                'b-select-menu-selected': isSelected(index),
                'b-select-menu-highlight': index === highlightIndex
            }"
            @click="handleChoose(item)">
            <span>{{ map[item] }}</span>
            <i v-if="multiple" class="b-icon-tick"></i>
        </li>

        <li v-if="menuList.length === 0" class="empty-list-item">无匹配选项</li>
    </ul>
</template>

<script type="text/babel">

    import KeyCodeMap from '../../util/keyCodeMap';

    export default {
        name: 'BSelectMenu',

        props: {
            map: {
                type: Object,
                default: () => ({})
            },
            value: {
                type: [String, Number, Array],
                default: null
            },
            multiple: {
                type: Boolean,
                default: false
            },
            searchText: {
                type: String,
                default: ''
            },
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
            };
        },

        computed: {
            valueList() {
                const {multiple, value} = this;

                return multiple ? (value || []) : (value ? [value] : []); // eslint-disable-line
            },
            menuList() {
                const vm = this;
                const {map, searchText} = vm;

                return searchText
                    ? Object.keys(map).filter(value => map[value].match(new RegExp(searchText, 'i')))
                    : Object.keys(map);
            },
            listHeight() {
                const vm = this;
                const {itemHeight, padding} = vm;
                return `${(vm.renderCount * itemHeight) + padding}px`;
            },
            reservedCount() {
                const vm = this;
                return Math.floor(vm.renderCount / 2);
            },
            maxScrollTop() {
                const vm = this;
                const {renderCount, menuList, itemHeight, padding} = vm;
                return ((menuList.length - renderCount) * itemHeight) + padding;
            },
            valueIndexList() {
                const vm = this;
                const {menuList, valueList} = vm;

                return menuList.reduce((acc, curValue, curIndex) => {
                    if (valueList.includes(curValue)) acc.push(curIndex);
                    return acc;
                }, []);
            }
        },

        watch: {
            searchText(text) {
                const vm = this;
                const {menuList, map, valueList} = vm;

                if (menuList.indexOf(map[text]) > -1) {
                    vm.initHighlight([map[text]]);
                } else {
                    vm.initHighlight(valueList);
                }
            }
        },

        mounted() {
            const vm = this;
            vm.initHighlight(vm.valueList);
        },

        methods: {
            initHighlight(valueList) {
                const vm = this;
                const {reservedCount, renderCount, menuList, padding, itemHeight} = vm;
                const curValueIndexList = menuList.reduce((acc, curValue, curIndex) => {
                    if (valueList.includes(curValue)) acc.push(curIndex);
                    return acc;
                }, []);
                const curFirstValueIndex = curValueIndexList.sort()[0];
                const highlightIndex = curFirstValueIndex > -1 ? curFirstValueIndex : 0;

                let initScrollTop = 0;
                if (highlightIndex > -1) {
                    if (highlightIndex < reservedCount) {
                        initScrollTop = 0;
                    } else if (highlightIndex > ((menuList.length - renderCount) + reservedCount) - 1) {
                        initScrollTop = vm.maxScrollTop;
                    } else {
                        initScrollTop = ((highlightIndex - reservedCount) * itemHeight) + padding;
                    }
                }

                vm.highlightIndex = highlightIndex;
                vm.$nextTick(() => {
                    vm.$refs.list.scrollTop = initScrollTop;
                });
            },

            changeHighlight(direction) {
                const vm = this;
                const {$refs: {list}, highlightIndex, itemHeight, menuList, renderCount, maxScrollTop} = vm;

                const {scrollTop} = list;
                const contentMin = Math.floor(scrollTop / itemHeight);
                const contentMax = (contentMin + renderCount) - 1;

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
                        nextScrollTop = ((nextHighlightIndex - renderCount) + 1) * itemHeight;
                        nextScrollTop = nextScrollTop > maxScrollTop ? maxScrollTop : nextScrollTop;
                    }
                }

                if (direction === 'down') {
                    nextHighlightIndex = highlightIndex + 1 === menuList.length ? highlightIndex : highlightIndex + 1;

                    if (highlightIndex === contentMax) {
                        nextScrollTop = scrollTop + itemHeight;
                        nextScrollTop = nextHighlightIndex === menuList.length ? maxScrollTop : nextScrollTop;
                    }
                    if (isOutOfContent) {
                        nextScrollTop = nextHighlightIndex * itemHeight;
                        nextScrollTop = nextScrollTop < 0 ? 0 : nextScrollTop;
                    }
                }

                vm.highlightIndex = nextHighlightIndex;
                vm.$nextTick(() => {
                    vm.$refs.list.scrollTop = nextScrollTop;
                });
            },

            handleChoose(value) {
                const vm = this;
                const {valueList} = vm;

                if (valueList.includes(value)) {
                    vm.$emit('choose-selected', value);
                } else {
                    vm.$emit('choose', value);
                }
            },

            handleKeyDown(keyCode) {
                const vm = this;
                const {highlightIndex, menuList} = vm;
                switch (keyCode) {
                    case KeyCodeMap.up: {
                        vm.changeHighlight('up');
                        break;
                    }
                    case KeyCodeMap.down: {
                        vm.changeHighlight('down');
                        break;
                    }
                    case KeyCodeMap.enter: {
                        if (highlightIndex > -1) {
                            vm.handleChoose(menuList[highlightIndex]);
                        } else {
                            vm.handleChoose();
                        }
                        break;
                    }
                    default: {
                        break;
                    }
                }
            },

            isSelected(valueIndex) {
                const {valueIndexList} = this;
                return valueIndexList.includes(valueIndex);
            }
        }
    };

</script>
