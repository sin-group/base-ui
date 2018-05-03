<template>
    <div
        :class="{
            'b-form-group-block': block,
            'b-form-group-label-horizontal': labelHorizontal
        }"
        class="b-form-group form-group">
        <div :class="labelWrapClass" class="b-form-group-label-wrap">
            <slot name="labelLeft"></slot>
            <label>
                {{ label }}
                <span v-if="hasStar" class="required-star">*</span>
            </label>
            <slot name="labelRight"></slot>
        </div>

        <div :class="inputWrapClass" class="b-form-group-input-wrap">
            <slot></slot>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'BFormGroup',

        props: {
            label: {
                type: String,
                required: true
            },
            block: {
                type: Boolean,
                default: false
            },

            labelHorizontal: {
                type: Boolean,
                default: false
            },

            labelWrapClass: {
                type: [String, Array, Object],
                default: ''
            },

            inputWrapClass: {
                type: [String, Array, Object],
                default: ''
            },

            hasStar: {
                type: Boolean,
                default: false
            }
        }
    };
</script>
