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
                :class="{'b-select-icon-active': visible}"
                class="b-right-icon b-icon-arrow-bottom"
                @click="reset"></i>
        </b-input>

        <b-popper :visible="visible">
            <b-select-menu
                ref="menu"
                :map="map"
                :value="value"
                :search-text="searchText"
                @choose="choose"/>
        </b-popper>
    </div>
</template>

<script type="text/babel">

    import keyCodeMap from '../../util/keyCodeMap';

    import BInput from '../b-input';
    import BSelectMenu from './b-select-menu.vue';

    export default {
        name: 'BSelect',

        components: {
            BInput,
            BSelectMenu
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
            map: {
                type: Object,
                default: () => ({})
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
            const {map, value} = vm;

            return {
                visible: false,
                searchText: (value && map[value]) ? map[value].trim() : ''
            };
        },

        computed: {
            canBeReset() {
                const vm = this;
                const {searchText, disabled, enableReset} = vm;

                return enableReset && searchText && !disabled;
            }
        },

        watch: {
            value(val) {
                const vm = this;

                vm.updateSearchText(vm.map, val);
            },

            map(val) {
                const vm = this;
                const {value} = vm;

                vm.updateSearchText(val, value);
            }
        },

        methods: {
            openMenu() {
                const vm = this;
                if (!vm.disabled) {
                    vm.searchText = '';
                    vm.visible = true;
                }
            },

            updateSearchText(map, value) {
                const vm = this;

                if (value && map[value]) {
                    vm.searchText = map[value].trim();
                } else {
                    vm.searchText = '';
                }
            },

            input(value) {
                const vm = this;
                vm.searchText = value;
                vm.visible = true;
            },

            handleKeyDown(TargetValue, {keyCode}) {
                const vm = this;
                const {$refs: {menu}, visible} = vm;

                switch (keyCode) {
                    case keyCodeMap.up:
                    case keyCodeMap.down: {
                        if (!visible) {
                            return vm.openMenu();
                        }

                        menu.handleKeyDown(keyCode);
                        break;
                    }
                    case keyCodeMap.tab: {
                        vm.closeMenu();
                        break;
                    }
                    case keyCodeMap.enter: {
                        if (!visible) {
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
                vm.updateSearchText(vm.map, vm.value);
                vm.visible = false;
            },

            choose(value) {
                const vm = this;
                vm.updateSearchText(vm.map, value);

                let changeValue = value;
                if (vm.type === 'number') {
                    changeValue = Number(value);
                }

                vm.$emit('change', changeValue);
                vm.visible = false;
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
