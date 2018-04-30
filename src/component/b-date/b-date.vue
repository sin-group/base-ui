<template>
    <div v-b-click-outside="closeDatePicker" :class="{disabled: disabled}" class="b-date">
        <b-input
            :name="name"
            :value="displayTime"
            :disabled="disabled"
            :placeholder="placeholder"
            type="text"
            @focus="openDatePicker">
            <i
                slot="right"
                :class="{'b-date-icon-active': visible}"
                class="b-date-icon b-icon-arrow-bottom"></i>
        </b-input>

        <b-popper :visible="visible">
            <b-date-picker
                :time-stamp="value"
                @choose="choose"/>
        </b-popper>
    </div>
</template>

<script type="text/babel">

import {getDate} from '../../util/time';

import BInput from '../b-input';
import BPopover from '../b-popper';
import BDatePicker from './b-date-picker.vue';

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
            type: Number,
            default: Date.now()
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
        displayTime() {
            const vm = this;
            const {value} = vm;

            if (!value && typeof value !== typeof 0) return '';

            return getDate(value);
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

        choose(timeStamp) {
            const vm = this;
            vm.$emit('change', timeStamp);
            vm.closeDatePicker();
        }
    }
};

</script>
