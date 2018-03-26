<template>
    <div
        :class="{
            'b-switch-checked': checked,
            'b-switch-disabled': disabled
        }"
        class="b-switch">
        <div class="b-switch-wrap" @click="handleClick">
            <span class="b-switch-inner"></span>
        </div>
    </div>
</template>

<script type="text/babel">

export default {
    name: 'BSwitch',

    model: {
        prop: 'checked',
        event: 'change'
    },

    props: {
        disabled: {
            type: Boolean,
            default: () => false
        },

        checked: {
            type: Boolean,
            default: false
        }
    },

    methods: {
        handleClick(event) {
            const vm = this;

            if (!vm.disabled) {
                vm.$emit('change', !vm.checked, event);
            }
        }
    }
};

</script>
