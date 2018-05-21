<template>
    <div
        v-b-click-outside="closeDatePicker"
        :class="{disabled: disabled, 'b-has-value': value && !disabled}"
        class="b-date">
        <b-input
            :name="name"
            :value="timeDisplay"
            :disabled="disabled"
            :placeholder="placeholder"
            type="text"
            @focus="openDatePicker">
            <i
                slot="right"
                :class="{'b-date-icon-active': visible}"
                class="b-right-icon b-icon-arrow-bottom"
                @click="reset"></i>
        </b-input>

        <b-popper :visible="visible">
            <b-date-picker
                :time-stamp="timeStamp"
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

        timeStamp() {
            const vm = this;
            const {value} = vm;

            return value ? new Date(value).getTime() : null;
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
            const {value, disabled} = vm;

            if (value && !disabled) {
                vm.$emit('change', null);
                vm.closeDatePicker();
            }
        }
    }
};

</script>
