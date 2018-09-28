<template>
    <div
        v-b-click-outside="closeDatePicker"
        :class="{disabled: disabled, 'b-resettable': canBeReset}"
        class="b-date">
        <b-input
            :class="{'b-date-input-active': visible}"
            :name="name"
            :value="timeDisplay"
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

import {getDate, isValidDateString} from '../../util/time';

import BInput from '../b-input';
import BPopover from '../b-popper';
import BDatePicker from './b-date-string-picker.vue';

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
            type: String,
            validator: isValidDateString,
            default: getDate()
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
        enableReset: {
            type: Boolean,
            default: true
        }
    },

    data() {
        return {
            visible: false
        };
    },

    computed: {
        timeDisplay() {
            const {value} = this;
            return (!value || isValidDateString(value)) ? value : 'Invalid Date String';
        },

        timestamp() {
            const vm = this;
            const {value} = vm;

            return value ? new Date(value).getTime() : null;
        },

        canBeReset() {
            const vm = this;
            const {value, disabled, enableReset} = vm;

            return enableReset && value && !disabled;
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

        choose({year, month, date}) {
            const vm = this;
            const formattedMonth = month.toString().padStart(2, '0');
            const formattedDate = date.toString().padStart(2, '0');

            vm.$emit('change', `${year}-${formattedMonth}-${formattedDate}`);
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
