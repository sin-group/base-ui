<template>
    <div class="b-input">
        <div v-if="$slots.left">
            <slot name="left"></slot>
        </div>

        <div class="content">
            <input
                v-if="!multiLine"
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

        <div v-if="$slots.right">
            <slot name="right"></slot>
        </div>
    </div>
</template>

<script>

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
            default: 1
        },

        rowsMax: {
            type: Number,
            default: null
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
        }
    },

    data() {
        return {
            isFocus: false
        };
    },

    methods: {
        handleFocus(event) {
            const vm = this;
            vm.isFocus = true;
            vm.$emit('focus', event.target.value, event);
        },

        handleBlur(event) {
            const vm = this;
            vm.isFocus = false;
            vm.$emit('blur', event.target.value, event);
        },

        handleInput(event) {
            const vm = this;
            const value = event.target ? event.target.value : event;
            vm.$emit('input', value, event);
        },

        handleChange(event) {
            const vm = this;
            vm.$emit('change', event.target.value, event);
        },

        handleKeyUp(event) {
            const vm = this;
            vm.$emit('keyup', event.target.value, event);
        },

        handleKeyDwon(event) {
            const vm = this;
            vm.$emit('keydown', event.target.value, event);
        }
    }
};

</script>
