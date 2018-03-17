<template>
    <transition name="b-dialog-slide">
        <div v-if="open" class="b-dialog-wrapper">
            <div class="b-dialog-mask" @click="close"/>

            <div :class="dialogClass" class="b-dialog">
                <h3 v-if="showTitle" class="b-dialog-title">
                    <slot name="title">{{ title }}</slot>
                </h3>

                <div class="b-dialog-body">
                    <slot/>
                </div>

                <div v-if="$slots.actions" class="b-dialog-actions">
                    <slot name="actions"/>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
    export default {
        name: 'BDialog',

        props: {
            title: {
                type: String,
                default: null
            },

            open: {
                type: Boolean,
                default: false
            },

            dialogClass: {
                type: [String, Array, Object],
                default: null
            }
        },

        data() {
            const vm = this;
            return {
                visible: vm.open
            };
        },

        computed: {
            showTitle() {
                return this.title || (this.$slots && this.$slots.title && this.$slots.title.length > 0);
            }
        },

        methods: {
            close() {
                const vm = this;
                vm.$emit('close');
            }
        }
    };
</script>

<style lang="scss" scoped>
    @import "../../style/variables.scss";

    .b-dialog-wrapper {
        position: fixed;
        top: 0;
        height: 100vh;
        width: 100vw;
        background-color: rgba(0, 0, 0, .4);
        z-index: $z-index-dialog-wrapper;
    }

    .b-dialog-mask {
        position: absolute;
        height: 100vh;
        width: 100vw;
        background-color: rgba(0, 0, 0, .4);
    }

    .b-dialog {
        position: relative;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        width: 75%;
        max-width: 768px;
        padding: 20px 20px 10px;
        border-radius: 2px;
        background-color: #fff;
        box-shadow: 0 19px 60px rgba(0, 0, 0, .298039), 0 15px 20px rgba(0, 0, 0, .219608);
    }

    .b-dialog-title {
        margin: 0 0 20px;
    }

    .b-dialog-body {
        max-height: 75vh;
        padding-bottom: 30px;
        overflow-y: auto;
        color: rgba(0, 0, 0, .6);
    }

    .b-dialog-actions {
        min-height: 40px;
        display: flex;
        align-items: center;
        justify-content: flex-end;
    }

    .b-dialog-slide-enter-active,
    .b-dialog-slide-leave-active {
        transition: opacity .36s cubic-bezier(.78, .14, .15, .86);

        .b-dialog {
            transition: transform .36s cubic-bezier(.78, .14, .15, .86);
        }
    }

    .b-dialog-slide-enter,
    .b-dialog-slide-leave-to {
        opacity: 0;

        .b-dialog {
            transform: translate(-50%, -40%);
        }
    }

</style>
