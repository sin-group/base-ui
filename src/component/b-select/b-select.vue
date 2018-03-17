<template>
    <div :class="{disabled: disabled}" class="b-select">
        <b-input
            :name="name"
            :value="searchText"
            :disabled="disabled"
            type="text"
            @input="input"
            @focus="openMenu"
            @keydown="handleKeyDown"/>

        <b-popper
            v-b-click-outside="closeMenu"
            v-if="visible"
        >
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
                default: null
            },
            value: {
                type: String,
                default: null
            },
            map: {
                type: Object,
                default: () => {},
                required: true
            },
            disabled: {
                type: Boolean,
                default: false
            }
        },

        data() {
            const vm = this;
            const {map, value} = vm;
            return {
                visible: false,
                searchText: map[value]
            };
        },

        watch: {
            value(val) {
                const vm = this;
                if (vm.map[val]) {
                    vm.searchText = vm.map[val];
                }
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
                const {map, value} = vm;
                vm.searchText = map[value];
                vm.visible = false;
            },

            choose(value) {
                const vm = this;
                vm.searchText = vm.map[value];
                vm.$emit('change', value);
                vm.visible = false;
            }
        }
    };

</script>

<style lang="scss" rel="stylesheet/scss">

    .b-select {
        .b-input {
            input {
                cursor: pointer;
            }
        }

        &:disabled {
            .b-input {
                input {
                    cursor: not-allowed;
                }
            }
        }
    }

</style>
