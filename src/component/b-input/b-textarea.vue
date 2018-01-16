<template>
    <div class="b-textarea">
        <textarea ref="shadowTextarea"
                  rows="1"
                  :value="value"
                  class="b-input-shadow-textarea"></textarea>

        <textarea ref="textarea"
                  class="b-input-textarea"
                  :name="name"
                  :value="value"
                  :placeholder="placeholder"
                  :disabled="disabled"
                  :required="required"
                  @change="handleChange"
                  @input="handleInput"
                  @focus="handleFocus"
                  @blur="handleBlur"></textarea>
    </div>
</template>

<script>
    export default {
        name: 'b-textarea',

        props: {
            name: {
                type: String
            },

            value: {
                type: String
            },

            placeholder: {
                type: String
            },

            required: {
                type: Boolean
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
                type: Boolean
            },

            autofocus: {
                type: Boolean
            },

            multiLineHeight: {
                type: Number,
                // font-size: 15px line-height: 1.5, so we got 22.5 by default
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
            value (val, oldVal) {
                const vm = this;

                if (val === oldVal) return;
                vm.$nextTick(() => {
                    vm.resetMultiHeight()
                })
            }
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
                let minHeight = pb + pt + lh * rows;
                let maxHeight = pb + pt + lh * rowsMax;
                let height = shadowTextarea.scrollHeight;
                textarea.style.height = (height < minHeight ? minHeight : height > maxHeight && maxHeight > 0 ? maxHeight : height) + 'px';
            },

            handleInput (e) {
                this.$emit('input', e);
            },
            handleChange (e) {
                this.$emit('change', e);
            },
            handleFocus (e) {
                this.$emit('focus', e);
            },
            handleBlur (e) {
                this.$emit('blur', e);
            }
        },

        mounted() {
            const vm = this;
            const {$refs: {textarea}} = vm;
            const currentWidth = window.getComputedStyle(textarea, null).getPropertyValue('width');
            textarea.style.cssText = `min-width: ${currentWidth}; max-width: ${currentWidth};`;
            vm.resetMultiHeight();
        }
    }
</script>

<style lang="scss" scoped>
    textarea {
        line-height: 1.5;
        overflow: auto;
        background-color: transparent;
    }

    .b-input-shadow-textarea {
        overflow: hidden;
        position: absolute;
        width: 100px !important;
        height: initial;
        visibility: hidden;
    }

</style>
