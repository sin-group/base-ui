<template>
    <div class="b-switch" :class="{
        'b-switch-checked': checked,
        'b-switch-disabled': disabled
    }">
        <div class="b-switch-wrap" @click="handleClick">
            <span class="b-switch-inner"></span>
        </div>
    </div>
</template>

<script type="text/babel">

export default {
    name: 'b-switch',

    model: {
        prop: 'checked',
        event: 'change'
    },

    props: {
        disabled: {
            type: Boolean
        },

        checked: {
            type: Boolean,
            default: false
        }
    },

    methods: {
        handleClick(e) {
            const vm = this;

            if (!vm.disabled) {
                vm.$emit('change', !vm.checked, e);
            }
        }
    }
};

</script>

<style lang="scss" rel="stylesheet/scss" scoped>
    @import '../../style/variables';

    .b-switch {
        display: inline-block;
        margin-top: 5px;
        height: 30px;
        line-height: 30px;
        vertical-align: sub;

        .b-switch-wrap {
            display: inline-block;
            width: 40px;
            height: 20px;
            border: 1px solid transparent;
            border-radius: 20px;
            background-color: $gray;
            position: relative;
            transition: $all-transition;
            overflow: hidden;
            margin-top: 5px;

            &:active .b-switch-inner {
                width: 24px;
            }

            .b-switch-inner {
                display: inline-block;
                width: 18px;
                height: 18px;
                border-radius: 100%;
                background-color: $white;
                position: absolute;
                top: 1px;
                left: 1px;
                right: 1px;
                transition: $all-transition;
            }
        }

        &.b-switch-checked {
            .b-switch-wrap {
                background-color: $blue;

                &:active .b-switch-inner {
                    width: 22px;
                    margin-left: -23px;
                }

                .b-switch-inner {
                    left: 100%;
                    margin-left: -19px;
                }
            }
        }

        &.b-switch-disabled {
            .b-switch-wrap {
                background-color: $gray-light;

                .b-switch-inner {
                    background-color: $gray-dark;
                }
            }
        }
    }
</style>
