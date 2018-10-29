<template>
    <div
        v-b-click-outside="closeMenu"
        :class="{'disabled': disabled, 'b-resettable': canBeReset}"
        class="b-select">
        <b-input
            ref="input"
            :name="name"
            :value="searchText"
            :disabled="disabled"
            :type="type"
            :placeholder="placeholder"
            @input="input"
            @focus="openMenu"
            @keydown="handleKeyDown">
            <i
                slot="right"
                :class="{'b-select-icon-active': menuOpen}"
                class="b-right-icon b-icon-arrow-bottom"
                @click="reset"></i>
        </b-input>

        <b-popper :visible="menuOpen">
            <b-select-array-menu
                ref="menu"
                :list="list"
                :text-field="textField"
                :value-field="valueField"
                :map="map"
                :value="value"
                :search-text="searchText"
                @choose="choose"
                @close="closeMenu"/>
        </b-popper>
    </div>
</template>

<script type="text/babel">

    import KeyCodeMap from '../../util/keyCodeMap';

    import BInput from '../b-input';
    import BSelectArrayMenu from './b-select-array-menu.vue';

    export default {
        name: 'BSelectArray',

        components: {
            BInput,
            BSelectArrayMenu
        },

        model: {
            prop: 'value',
            event: 'change'
        },

        props: {
            name: {
                type: String,
                default: ''
            },
            value: {
                type: [String, Number],
                default: null
            },
            type: {
                type: String,
                default: 'text'
            },
            list: {
                type: Array,
                default: () => ([])
            },
            textField: {
                type: String,
                default: 'label'
            },
            valueField: {
                type: String,
                default: 'value'
            },
            disabled: {
                type: Boolean,
                default: false
            },
            placeholder: {
                type: String,
                default: ''
            },
            enableReset: {
                type: Boolean,
                default: true
            }
        },

        data() {
            const vm = this;
            const {list, value, valueField, textField} = vm;

            const valueItem = list.find(item => item[valueField] === value) || {};
            const trimText = valueItem[textField] ? valueItem[textField].trim() : '';

            return {
                menuOpen: false,
                searchText: valueItem.displayText ? valueItem.displayText : trimText
            };
        },

        computed: {
            map() {
                const vm = this;
                const {list, textField, valueField} = vm;

                return list.reduce((acc, item) => {
                    const key = item[valueField];
                    acc[key] = item[textField];
                    return acc;
                }, {});
            },

            canBeReset() {
                const vm = this;
                const {searchText, disabled, enableReset} = vm;

                return enableReset && searchText && !disabled;
            }
        },

        watch: {
            value(val) {
                const vm = this;

                vm.updateSearchText(val);
            },

            list() {
                const vm = this;

                vm.updateSearchText(vm.value);
            }
        },

        methods: {
            openMenu() {
                const vm = this;
                if (!vm.disabled) {
                    vm.searchText = '';
                    vm.menuOpen = true;
                }
            },

            updateSearchText(value) {
                const vm = this;
                const {list, valueField, map} = vm;
                const valueItem = list.find(item => item[valueField] === value) || {};

                if (valueItem.displayText) {
                    vm.searchText = valueItem.displayText;
                } else if (value && map[value]) {
                    vm.searchText = map[value].trim();
                } else {
                    vm.searchText = '';
                }
            },

            input(value) {
                const vm = this;
                vm.searchText = value;
                vm.menuOpen = true;
            },

            handleKeyDown(TargetValue, {keyCode}) {
                const vm = this;
                const {$refs: {menu}, menuOpen} = vm;

                switch (keyCode) {
                    case KeyCodeMap.up:
                    case KeyCodeMap.down: {
                        if (!menuOpen) {
                            return vm.openMenu();
                        }

                        menu.handleKeyDown(keyCode);
                        break;
                    }
                    case KeyCodeMap.esc:
                    case KeyCodeMap.tab: {
                        vm.closeMenu();
                        break;
                    }
                    case KeyCodeMap.enter: {
                        if (!menuOpen) {
                            vm.openMenu();
                        } else {
                            menu.handleKeyDown(keyCode);
                        }
                        break;
                    }
                    default: // ignore
                }

                return null;
            },

            closeMenu() {
                const vm = this;

                if (vm.menuOpen && vm.$refs.input) {
                    vm.updateSearchText(vm.value);
                    vm.$refs.input.blur();
                    vm.menuOpen = false;
                }
            },

            choose(value, item) {
                const vm = this;
                vm.updateSearchText(value);

                let changeValue = value;
                if (vm.type === 'number') {
                    changeValue = Number(value);
                }

                vm.$emit('change', changeValue, item);
                vm.menuOpen = false;
                vm.$refs.input.blur();
            },

            reset() {
                const vm = this;
                if (vm.canBeReset) {
                    vm.choose(null);
                }
            }
        }
    };

</script>
