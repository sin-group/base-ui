<template>
    <div class="b-date" :class="{disabled: disabled}">
        <b-input type="text"
                 :name="name"
                 :value="displayTime"
                 :disabled="disabled"
                 @focus="openDatePicker"></b-input>

        <b-popper v-if="visible"
                  v-b-click-outside="closeDatePicker">
            <b-date-picker v-model="innerValue"
                           @choose="choose"></b-date-picker>
        </b-popper>
    </div>
</template>

<script type="text/babel">

import {getDate} from '../../util/time';

import BInput from '../b-input';
import BPopover from '../b-popper';
import BDatePicker from './b-date-picker.vue';

export default {
    name: 'b-date',

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
            required: true
        },
        name: {
            type: String
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
        }
    },

    computed: {
        displayTime() {
            const vm = this;
            const {innerValue} = vm;

            if (!innerValue && typeof innerValue !== typeof 0) return '';

            return getDate(innerValue);
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
            vm.innerValue = timeStamp;
            vm.$emit('change', timeStamp);
            vm.closeDatePicker();
        }
    },

    mounted() {
        const vm = this;
        const {value} = vm;
        if (value) vm.innerValue = value;
    }
};

</script>

<style lang="scss" rel="stylesheet/scss" scoped>
.b-date {
    display: inline-block;

    .b-input {
        input {
            cursor: pointer;
        }

        &.disabled {
            input {
                cursor: not-allowed;
            }
        }
    }
}
</style>
