<template>
    <div class="b-input">
        <slot v-if="$slots.left" name="left"></slot>

        <div class="content">
            <input
                v-if="!multiLine"
                ref="b-input"
                :name="name"
                :type="type"
                :placeholder="placeholder"
                :disabled="disabled"
                :value="value"
                :pattern="pattern"
                :readonly="disabled"
                :required="required"
                @keyup="handleKeyUp"
                @keydown="handleKeyDwon"
                @change="handleChange"
                @input="handleInput"
                @focus="handleFocus"
                @blur="handleBlur">

            <b-textarea
                v-else
                ref="b-textarea"
                :placeholder="placeholder"
                :disabled="disabled"
                :value="value"
                :pattern="pattern"
                :required="required"
                :rows="rows"
                :rows-max="rowsMax"
                :multi-line-height="multiLineHeight"
                :multi-padding-top="multiPaddingTop"
                :multi-padding-bottom="multiPaddingBottom"
                @change="handleChange"
                @input="handleInput"
                @focus="handleFocus"
                @blur="handleBlur"/>
        </div>

        <slot v-if="$slots.right" name="right"></slot>
    </div>
</template>

<script>

    import {isString} from '../../util/check';

    import BTextarea from './b-textarea.vue';

    export default {
        name: 'BInput',

        components: {
            BTextarea
        },

        props: {
            type: {
                type: String,
                default: 'text'
            },

            name: {
                type: String,
                default: null
            },

            value: {
                type: [String, Number],
                default: null
            },

            placeholder: {
                type: String,
                default: null
            },

            disabled: {
                type: Boolean,
                default: false
            },

            pattern: {
                type: String,
                default: null
            },

            required: {
                type: Boolean,
                default: false
            },

            multiLine: {
                type: Boolean,
                default: false
            },

            rows: {
                type: Number,
                default: 6
            },

            rowsMax: {
                type: Number,
                default: 10
            },

            // font-size: 15px line-height: 1.5, so we got 22.5 by default
            multiLineHeight: {
                type: Number,
                default: 22.5
            },

            multiPaddingTop: {
                type: Number,
                default: 4
            },

            multiPaddingBottom: {
                type: Number,
                default: 4
            },

            trim: {
                type: Boolean,
                default: false
            }
        },

        methods: {
            handleFocus(event) {
                const vm = this;
                const {trimValue} = vm;

                vm.$emit('focus', trimValue(event.target.value), event);
            },

            handleBlur(event) {
                const vm = this;
                const {trimValue} = vm;

                vm.$emit('blur', trimValue(event.target.value), event);
            },

            handleInput(event) {
                const vm = this;
                const {trimValue} = vm;
                const value = event.target ? event.target.value : event;

                if (vm.type === 'number') {
                    vm.$emit('input', Number(value), event);
                    return;
                }

                vm.$emit('input', trimValue(value), event);
            },

            handleChange(event) {
                const vm = this;
                const {trimValue} = vm;

                vm.$emit('change', trimValue(event.target.value), event);
            },

            handleKeyUp(event) {
                const vm = this;
                const {trimValue} = vm;

                vm.$emit('keyup', trimValue(event.target.value), event);
            },

            handleKeyDwon(event) {
                const vm = this;
                const {trimValue} = vm;

                vm.$emit('keydown', trimValue(event.target.value), event);
            },

            trimValue(value) {
                const vm = this;
                const {trim} = vm;

                return trim && isString(value) ? value.trim() : value;
            },

            blur() {
                const vm = this;
                const {multiLine, $refs} = vm;
                const input = multiLine ? $refs['b-textarea'] : $refs['b-input'];
                input.blur();
            }
        }
    };

</script>
