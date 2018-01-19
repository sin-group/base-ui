<template>
    <div class="b-select" :class="{disabled: disabled}">
        <b-input type="text"
                 :name="name"
                 :value="searchText"
                 :disabled="disabled"
                 @input="input"
                 @focus="openMenu"
                 @keydown="handleKeyDown"></b-input>

        <b-popper v-if="visible"
                  v-b-click-outside="closeMenu">
            <b-select-menu ref="menu"
                           :map="map"
                           :value="value"
                           :searchText="searchText"
                           @choose="choose"></b-select-menu>
        </b-popper>
    </div>
</template>

<script type="text/babel">

    import keyCodeMap from '../../util/keyCodeMap';

    import BInput from '../b-input';
    import BSelectMenu from './b-select-menu.vue';

    export default {
        name: 'b-select',

        components: {
            BInput,
            BSelectMenu
        },

        model: {
            prop: 'value',
            event: 'change'
        },

        props: {
            name: String,
            value: String,
            map: {
                type: Object,
                default: () => {},
                required: true
            },
            disabled: Boolean
        },

        data() {
            const vm = this;
            const {map, value} = vm;
            return {
                visible: false,
                searchText: map[value]
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
                }
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
        },

        watch: {
            value(val) {
                const vm = this;
                if (vm.map[val]) {
                    vm.searchText = vm.map[val];
                }
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
            b-input {
                input {
                    cursor: not-allowed;
                }
            }
        }
    }

</style>
