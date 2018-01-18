<template>
    <div class="b-date">
        <b-input type="number"
                 :name="name"
                 :value="innerValue"
                 @focus="openDatePicker"></b-input>

        <b-popper v-if="visible"
                  v-b-click-outside="closeDatePicker">
            <b-date-picker :value="value"
                           :popper="$refs.popper"
                           @choose="choose"></b-date-picker>
        </b-popper>
    </div>
</template>

<script type="text/babel">

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
        }
    },

    mounted() {
        const vm = this;
        const {value} = vm;
        vm.innerValue = value;
    }
};

</script>

<style lang="scss" rel="stylesheet/scss" scoped>
.b-date {
    display: inline-block;
}
</style>
