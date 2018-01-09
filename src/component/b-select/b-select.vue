<template>
    <div class="b-select" ref="ref">
        <b-input ref="input"
                 type="text"
                 :name="name"
                 :value="searchText"
                 @input="input"
                 @focus="openMenu"
                 @blur="closeMenu"
                 @keydown="handleKeyDown"></b-input>

        <b-popper ref="popper"
                  :ref-el="$refs.ref"
                  v-b-click-outside="closeMenu">
            <b-select-menu ref="menu"
                           :popper="$refs.popper"
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
            searchText: map[value]
        }
    },

    methods: {
        openMenu() {
            const vm = this;
            const {$refs: {popper}, disabled} = vm;
            if (!disabled) {
                vm.searchText = '';
                popper.open();
            }
        },

        closeMenu() {
            const vm = this;
            const {$refs: {popper}, map, value} = vm;
            vm.searchText = map[value];
            popper.close();
        },

        input(value) {
            const vm = this;
            const {$refs: {popper}} = vm;
            vm.searchText = value;
            popper.open();
        },

        handleKeyDown(TargetValue, {keyCode}) {
            const vm = this;
            const {$refs: {menu}} = vm;
            menu.handleKeyDown(keyCode);
        },

        choose(value) {
            const vm = this;
            vm.$emit('change', value);
            vm.closeMenu();
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

</style>
