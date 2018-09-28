<template>
    <div
        v-b-click-outside="closeDatePicker"
        :class="{disabled: disabled, 'b-resettable': canBeReset}"
        class="b-date">
        <b-input
            :class="{'b-date-input-active': visible}"
            :name="name"
            :value="displayTime"
            :placeholder="placeholder"
            type="text"
            disabled
            @click="openDatePicker">
            <i
                slot="right"
                :class="{'b-date-icon-active': visible}"
                class="b-right-icon b-icon-arrow-bottom"
                @click="reset"></i>
        </b-input>

        <b-popper :visible="visible">
            <b-date-picker
                :timestamp="timestamp"
                @choose="choose"/>
        </b-popper>
    </div>
</template>

<script type="text/babel">

import {getDate, roundTimestamp, RoundModeType} from '../../util/time';
import {isFunc} from '../../util/check';

import BInput from '../b-input';
import BPopover from '../b-popper';
import BDatePicker from './b-date-picker.vue';

const FORMAT_MAP = {
    ISO: timestamp => new Date(timestamp).toISOString()
};

export default {
    name: 'BDate',

    components: {
        BInput,
        BPopover,
        BDatePicker
    },

    model: {
        prop: 'value',
        event: 'change'
    },

    props: {
        value: {
            type: [Number, String],
            validator: value => isFinite(new Date(value)),
            default: null
        },
        name: {
            type: String,
            default: ''
        },
        disabled: {
            type: Boolean,
            default: false
        },
        placeholder: {
            type: String,
            default: ''
        },
        format: {
            type: [String, Function],
            default: null
        },
        enableReset: {
            type: Boolean,
            default: true
        },
        roundMode: {
            type: String,
            default: RoundModeType.Normal
        }
    },

    data() {
        return {
            visible: false
        };
    },

    computed: {
        displayTime() {
            const vm = this;
            const {value} = vm;

            if (!value && typeof value !== typeof 0) return '';

            return getDate(value);
        },

        timestamp() {
            const vm = this;
            const {value} = vm;

            return value ? new Date(value).getTime() : null;
        },

        canBeReset() {
            const vm = this;
            const {displayTime, disabled, enableReset} = vm;

            return enableReset && displayTime && !disabled;
        }
    },


    mounted() {
        const vm = this;
        const {roundMode, timestamp} = vm;

        if (roundMode !== RoundModeType.Normal && timestamp) {
            vm.choose(timestamp);
        }
    },

    methods: {
        openDatePicker() {
            const vm = this;
            const {disabled} = vm;

            if (disabled) return;

            vm.visible = true;
        },

        closeDatePicker() {
            const vm = this;
            vm.visible = false;
        },

        choose(timestamp) {
            const vm = this;
            let value = timestamp;
            const {format, roundMode} = vm;

            value = roundTimestamp(value, roundMode);

            if (isFunc(format)) {
                value = format(value);
            } else if (isFunc(FORMAT_MAP[format])) {
                value = FORMAT_MAP[format](value);
            }

            vm.$emit('change', value);
            vm.closeDatePicker();
        },

        reset() {
            const vm = this;

            if (vm.canBeReset) {
                vm.$emit('change', null);
                vm.closeDatePicker();
            }
        }
    }
};

</script>
