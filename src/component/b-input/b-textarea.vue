<template>
    <div class="b-textarea">
        <textarea
            ref="shadowTextarea"
            :rows="rows"
            :value="value"
            class="b-input-shadow-textarea"></textarea>

        <textarea
            ref="textarea"
            :name="name"
            :value="value"
            :placeholder="placeholder"
            :disabled="disabled"
            :required="required"
            class="b-input-textarea"
            @change="handleChange"
            @input="handleInput"
            @focus="handleFocus"
            @blur="handleBlur"></textarea>
    </div>
</template>

<script>
    export default {
        name: 'BTextarea',

        props: {
            name: {
                type: String,
                default: null
            },

            value: {
                type: String,
                default: null
            },

            placeholder: {
                type: String,
                default: null
            },

            required: {
                type: Boolean,
                default: false
            },

            rows: {
                type: Number,
                default: 1
            },

            rowsMax: {
                type: Number,
                default: 0
            },

            disabled: {
                type: Boolean,
                default: false
            },

            autofocus: {
                type: Boolean,
                default: false
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

        watch: {
            value(val, oldVal) {
                const vm = this;

                if (val === oldVal) return;
                vm.$nextTick(() => {
                    vm.resetMultiHeight();
                });
            }
        },

        mounted() {
            const vm = this;
            const {$refs: {textarea}} = vm;
            const currentWidth = window.getComputedStyle(textarea, null).getPropertyValue('width');

            textarea.style.cssText = `min-width: ${currentWidth}; max-width: ${currentWidth};`;
            vm.resetMultiHeight();
        },

        methods: {
            resetMultiHeight() {
                const vm = this;
                const {
                    $refs: {textarea, shadowTextarea},
                    multiPaddingBottom: pb,
                    multiPaddingTop: pt,
                    multiLineHeight: lh,
                    rows,
                    rowsMax
                } = vm;

                if (!textarea) return;
                const minHeight = pb + pt + (lh * rows);
                const maxHeight = pb + pt + (lh * rowsMax);
                const height = shadowTextarea.scrollHeight;

                let styleHeight;

                if (height < minHeight) {
                    styleHeight = minHeight;
                } else if (height > maxHeight && maxHeight > 0) {
                    styleHeight = maxHeight;
                } else {
                    styleHeight = height;
                }

                textarea.style.height = `${styleHeight}px`;
            },

            handleInput(event) {
                this.$emit('input', event.target.value, event);
            },
            handleChange(event) {
                this.$emit('change', event);
            },
            handleFocus(event) {
                this.$emit('focus', event);
            },
            handleBlur(event) {
                this.$emit('blur', event);
            }
        }

    };
</script>
