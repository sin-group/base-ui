<template>
    <div
        v-b-click-outside="closeMenu"
        :class="{'disabled': disabled, 'b-resettable': canBeReset}"
        class="b-select">
        <div :class="{'b-select-input-area-focus': menuOpen}" class="b-select-input-wrap">
            <div class="b-select-input-area">
                <span ref="shadowSpan" class="b-select-shadow-span"></span>

                <ul ref="wrap" @click="changeOpen">
                    <template v-if="multiple">
                        <li v-for="choice in value" :key="choice" class="b-select-choice">
                            <span class="b-select-badge">{{ getValueText(choice) }}</span>
                            <i class="b-icon-cross b-select-icon-remove-choice" @click="removeChoice(choice)"></i>
                        </li>
                    </template>

                    <li
                        v-else-if="!searchText && isValueValid(value)"
                        :class="{'b-select-value-grey': menuOpen || disabled}"
                        class="b-select-selected-value">{{ getValueText(value) }}</li>

                    <li v-if="showPlaceholder" class="b-select-placeholder">{{ placeholder }}</li>

                    <li class="b-select-search">
                        <input
                            ref="input"
                            :value="searchText"
                            type="text"
                            autocomplete="false"
                            class="b-select-search-input"
                            @input="input"
                            @keydown="handleKeyDown">
                    </li>
                </ul>
                <div ref="reset" class="b-select-reset">
                    <i
                        :class="{ 'b-select-icon-active': menuOpen, 'b-select-icon-disabled': disabled}"
                        class="b-right-icon b-icon-arrow-bottom"
                        @click.stop="reset"></i>
                </div>
            </div>
        </div>

        <b-popper :visible="menuOpen">
            <b-select-menu
                ref="menu"
                :map="map"
                :value="value"
                :multiple="multiple"
                :search-text="searchText"
                @choose="choose"
                @close="closeMenu"
                @choose-selected="handleSelectedChoice"/>
        </b-popper>
    </div>
</template>

<script type="text/babel">

    import KeyCodeMap from '../../util/keyCodeMap';
    import {isString, isArray, isNumber, isValueEmpty} from '../../util/check';

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
                type: [String, Number, Array],
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
            },
            multiple: {
                type: Boolean,
                default: false
            }
        },

        data() {
            return {
                menuOpen: false,
                searchText: null
            };
        },

        computed: {
            canBeReset() {
                const vm = this;
                const {disabled, enableReset} = vm;

                return enableReset && !disabled;
            },

            showPlaceholder() {
                const vm = this;
                return vm.isValueEmpty(vm.value) && !vm.searchText;
            }
        },

        methods: {
            isValueEmpty,

            isValueValid(value) {
                const {multiple} = this;

                return multiple
                    ? (isArray(value) && value.length)
                    : (isString(value) || isNumber(value));
            },

            getValueText(value) {
                const vm = this;
                const {map} = vm;
                return map[value] ? map[value].trim() : value;
            },

            changeOpen() {
                const vm = this;
                return vm.menuOpen ? vm.closeMenu() : vm.openMenu();
            },

            openMenu() {
                const vm = this;
                if (!vm.disabled) {
                    vm.searchText = '';
                    vm.menuOpen = true;
                    vm.$nextTick(() => vm.$refs.input.focus());
                }
            },

            closeMenu() {
                const vm = this;

                if (vm.menuOpen && vm.$refs.input) {
                    vm.menuOpen = false;
                    vm.$refs.input.blur();
                    vm.updateInputElement();
                }
            },

            handleKeyDown({keyCode}) {
                const vm = this;
                const {$refs: {menu}, menuOpen, value, multiple, searchText} = vm;

                switch (keyCode) {
                    case KeyCodeMap.up:
                    case KeyCodeMap.down: {
                        if (!menuOpen) {
                            return vm.openMenu();
                        }

                        menu.handleKeyDown(keyCode);
                        break;
                    }
                    case KeyCodeMap.tab: {
                        vm.$emit('tab', searchText);
                        vm.closeMenu();
                        break;
                    }
                    case KeyCodeMap.esc: {
                        vm.closeMenu();
                        break;
                    }
                    case KeyCodeMap.enter: {
                        if (!menuOpen) {
                            vm.openMenu();
                        } else {
                            menu.handleKeyDown(keyCode);
                            vm.searchText = null;
                        }
                        break;
                    }
                    case KeyCodeMap.backSpace: {
                        if (multiple && !vm.searchText) vm.removeChoice(value[value.length - 1]);
                        break;
                    }
                    default: // ignore
                }

                return null;
            },

            choose(value) {
                const vm = this;
                const {multiple} = vm;

                return multiple ? vm.chooseMultiple(value) : vm.chooseValue(value);
            },

            chooseValue(value) {
                const vm = this;

                let changeValue = value;
                if (vm.type === 'number') {
                    changeValue = Number(value);
                }

                vm.$emit('change', changeValue);
                vm.closeMenu();
            },

            chooseMultiple(choice) {
                const vm = this;
                const value = vm.value || [];

                if (!value.includes(choice)) {
                    vm.$emit('change', [...value, choice]);
                    vm.searchText = null;
                }
                vm.$nextTick(() => vm.$refs.input.focus());
            },

            reset() {
                const vm = this;

                if (vm.canBeReset) {
                    vm.$emit('change', vm.multiple ? [] : null);
                    vm.closeMenu();
                }
            },

            handleSelectedChoice(choice) {
                const vm = this;
                const {multiple} = vm;

                if (multiple) {
                    vm.removeChoice(choice);
                    return;
                }

                vm.chooseValue(choice);
            },

            removeChoice(choice) {
                const vm = this;
                const {menuOpen: menuOpenBefore, disabled} = vm;
                if (disabled) return;

                const valueCopy = JSON.parse(JSON.stringify(vm.value));
                valueCopy.splice(vm.value.indexOf(choice), 1);

                vm.$emit('change', valueCopy);
                vm.updateInputElement();
                vm.$nextTick(() => {
                    vm.menuOpen = menuOpenBefore;
                    vm.$refs.input.focus();
                });
            },

            input(event) {
                const vm = this;

                vm.updateInputElement(event.target.value);
                vm.menuOpen = true;
            },

            updateInputElement(text = '') {
                const vm = this;
                vm.$refs.shadowSpan.innerHTML = text;

                const shadowSpanWidth = vm.$refs.shadowSpan.clientWidth + 1;
                const wrapWidth = vm.$refs.wrap.clientWidth;
                const resetWidth = vm.$refs.reset.clientWidth;
                const maxWidth = wrapWidth - resetWidth;

                vm.$refs.input.style.width = `${shadowSpanWidth <= maxWidth ? (shadowSpanWidth || 1) : maxWidth}px`;
                vm.searchText = text;
            }
        }
    };

</script>
