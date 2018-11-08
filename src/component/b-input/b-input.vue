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
                @keyup="emitEvent('keyup' ,$event)"
                @keydown="emitEvent('keydown' ,$event)"
                @focus="emitEvent('focus' ,$event)"
                @blur="emitEvent('blur' ,$event)"
                @input="handleInput" >

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
                @focus="emitEvent('focus' ,$event)"
                @blur="emitEvent('blur' ,$event)"
                @input="handleInput"/>
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
            },

            filter: {
                type: Object,
                default: () => ({})
            }
        },

        computed: {
            filterValue: {
                get() {
                    return (this.filter.filter && this.filter.filter(this.value)) || this.value;
                },

                set(value) {
                    const {trimValue} = this;
                    const reverseValue = (this.filter.reverseFilter && this.filter.reverseFilter(value)) || value;

                    vm.$emit('change', trimValue(event.target.value));
                }
            }
        },

        methods: {
            trimValue(value) {
                const vm = this;
                const {trim} = vm;

                return trim && isString(value) ? value.trim() : value;
            },

            emitEvent(name, event) {
                const {trimValue, $emit} = this;
                const {target: {value}} = event;

                emit(name, trimValue(value), event);
            },

            handleClick(event) {
                const vm = this;

                vm.$emit('click', event);
                vm.$emit('touchstart', event);
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

            blur() {
                const vm = this;
                const {multiLine, $refs} = vm;
                const input = multiLine ? $refs['b-textarea'] : $refs['b-input'];
                input.blur();
            }
        }
    };

</script>
