<template>
    <div class="b-input" @click="handleClick">
        <slot v-if="$slots.left" name="left"></slot>

        <div class="content">
            <input
                v-if="!multiLine"
                ref="b-input"
                v-model="filterValue"
                :name="name"
                :type="type"
                :placeholder="placeholder"
                :disabled="disabled"
                :pattern="pattern"
                :readonly="disabled"
                :required="required"
                @keyup="emitEvent('keyup', $event)"
                @keydown="emitEvent('keydown', $event)"
                @focus="emitEvent('focus', $event)"
                @blur="emitEvent('blur', $event)"
                @change="handleChange">

            <b-textarea
                v-else
                ref="b-textarea"
                v-model="filterValue"
                :placeholder="placeholder"
                :disabled="disabled"
                :pattern="pattern"
                :required="required"
                :rows="rows"
                :rows-max="rowsMax"
                :multi-line-height="multiLineHeight"
                :multi-padding-top="multiPaddingTop"
                :multi-padding-bottom="multiPaddingBottom"
                @focus="emitEvent('focus', $event)"
                @blur="emitEvent('blur', $event)"
                @change="handleChange"/>
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
                validator: () => true,
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
            },

            filter: {
                type: Object,
                default: () => ({})
            }
        },

        computed: {
            filterValue: {
                get() {
                    return this.filter.filter ? this.filter.filter(this.value) : this.value;
                },

                set(value) {
                    this.$emit('input', this.getValueReversed(value));
                }
            }
        },

        methods: {
            trimValue(value) {
                const vm = this;
                const {trim} = vm;

                return trim && isString(value) ? value.trim() : value;
            },

            getValueReversed(value) {
                const vm = this;
                const {trimValue, type, filter} = vm;
                const valueTrimmed = (type === 'number' && value !== '') ? Number(value) : trimValue(value);

                return (filter.reverseFilter && filter.reverseFilter(valueTrimmed)) || valueTrimmed;
            },

            emitEvent(name, event) {
                const {trimValue} = this;
                const {target: {value}} = event;

                this.$emit(name, trimValue(value), event);
            },

            handleChange(event) {
                const {filterValue} = this;

                this.$emit('change', this.getValueReversed(filterValue), event);
            },

            handleClick(event) {
                const vm = this;

                vm.$emit('click', event);
                vm.$emit('touchstart', event);
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
