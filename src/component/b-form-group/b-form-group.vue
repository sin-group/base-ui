<template>
    <div :class="{
        'b-form-group-block': block,
        'b-form-group-label-horizontal': labelHorizontal
    }" class="b-form-group form-group">
        <div class="b-form-group-label-wrap" :class="labelWrapClass">
            <slot name="labelLeft"></slot>
            <label>{{ label }}</label>
            <slot name="labelRight"></slot>
        </div>

        <div class="b-form-group-input-wrap" :class="inputWrapClass">
            <slot></slot>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'b-form-group',

        props: {
            label: {
                type: String,
                required: true
            },
            block: {
                type: Boolean
            },

            labelHorizontal: {
                type: Boolean
            },

            labelWrapClass: {
                type: [String, Array, Object],
            },

            inputWrapClass: {
                type: [String, Array, Object]
            },
        }
    }
</script>

<style lang="scss">
    @import '../../style/variables.scss';

    .b-form-group {
        &.b-form-group-block {
            display: block;

            input,
            textarea {
                width: 100%;
            }
        }

        &.b-form-group-label-horizontal {
            display: flex;
            align-items: center;
            justify-content: flex-start;

            label {
                padding-top: 8px;
            }

            input,
            textarea {
                width: 100%;
            }

            .b-form-group-label-wrap {
                flex: 1;
            }

            .b-form-group-input-wrap {
                flex: 4;
            }

            @media screen and (max-width: $tablet-min) {
                display: block;
            }
        }
    }
</style>
