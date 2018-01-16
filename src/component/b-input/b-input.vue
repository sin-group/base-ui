<template>
    <div class="b-input">
        <div v-if="$slots.left">
            <slot name="leftIcon"></slot>
        </div>

        <div class="content">
            <input v-if="!multiLine"
                   :name="name"
                   :type="type"
                   :placeholder="placeholder"
                   :disabled="disabled"
                   :value="value"
                   :pattern="pattern"
                   :required="required"
                   @keyup="handleKeyUp"
                   @keydown="handleKeyDwon"
                   @change="handleChange"
                   @input="handleInput"
                   @focus="handleFocus"
                   @blur="handleBlur">

            <b-textarea v-else
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
                        @blur="handleBlur"></b-textarea>
        </div>

        <div v-if="$slots.right">
            <slot name="right"></slot>
        </div>
    </div>
</template>

<script>

import BTextarea from './b-textarea.vue'

export default {
    name: 'b-input',

    components: {
        BTextarea
    },

    props: {
        type: {
            type: String,
            default: 'text'
        },

        name: {
            type: String
        },

        value: {
            type: String
        },

        placeholder: {
            type: String
        },

        disabled: {
            type: Boolean
        },

        pattern: {
            type: String
        },

        required: {
            type: Boolean
        },

        multiLine: {
            type: Boolean
        },

        rows: {
            type: Number,
            default: 1
        },

        rowsMax: {
            type: Number
        },

        multiLineHeight: {
            type: Number
        },

        multiPaddingTop: {
            type: Number
        },

        multiPaddingBottom: {
            type: Number
        }
    },

    data() {
        return {
            isFocus: false
        }
    },

    methods: {
        handleFocus (e) {
            const vm = this;
            vm.isFocus = true;
            vm.$emit('focus', e.target.value, e);
        },

        handleBlur (e) {
            const vm = this;
            vm.isFocus = false;
            vm.$emit('blur', e.target.value, e);
        },

        handleInput (e) {
            const vm = this;
            const value = e.target ? e.target.value : e;
            vm.$emit('input', value, e);
        },

        handleChange (e) {
            const vm = this;
            vm.$emit('change', e.target.value, e);
        },

        handleKeyUp(e) {
            const vm = this;
            vm.$emit('keyup', e.target.value, e);
        },

        handleKeyDwon(e) {
            const vm = this;
            vm.$emit('keydown', e.target.value, e);
        }
    }
};

</script>

<style lang="scss" scoped>

    .b-input {
        display: inline-flex;
        align-items: center;
        justify-content: space-between;

        .content {
            flex: 1;
        }
    }

</style>
