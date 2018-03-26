<template>
    <div :class="{disabled: disabled}" class="b-date">
        <b-input
            :name="name"
            :value="displayTime"
            :disabled="disabled"
            type="text"
            @focus="openDatePicker"/>

        <b-popper
            v-b-click-outside="closeDatePicker"
            v-if="visible">
            <b-date-picker
                v-model="innerValue"
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
            required: true
        },
        name: {
            type: String,
            default: ''
        },
        disabled: {
            type: Boolean,
            default: false
        }
    },

    data() {
        return {
            innerValue: null,
            visible: false
        };
    },

    computed: {
        displayTime() {
            const vm = this;
            const {innerValue} = vm;

            if (!innerValue && typeof innerValue !== typeof 0) return '';

            return getDate(innerValue);
        }
    },

    mounted() {
        const vm = this;
        const {value} = vm;
        if (value) vm.innerValue = value;
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
            vm.innerValue = timeStamp;
            vm.$emit('change', timeStamp);
            vm.closeDatePicker();
        }
    }
};

</script>
