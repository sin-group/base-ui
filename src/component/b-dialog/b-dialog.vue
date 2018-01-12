<template>
    <transition name="b-dialog-slide">
        <div class="b-dialog-wrapper" v-if="open" @click="close">
            <div class="b-dialog" ref="ref" @click.stop.prevent.self>
                <h3 class="b-dialog-title" v-if="showTitle">
                    <slot name="title">{{ title }}</slot>
                </h3>

                <div class=b-dialog-body>
                    <slot></slot>
                </div>

                <div class="b-dialog-actions">
                    <slot name="actions"></slot>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
    export default {
        name: 'b-dialog',

        data() {
            const vm = this;
            return {
                visible: vm.open
            };
        },

        props: {
            title: {
                type: String
            },

            open: {
                type: Boolean,
                default: false
            }
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

<style>
    @import "../../style/variables.scss";

    .b-dialog-wrapper {
        position: fixed;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .b-dialog {
        width: 75%;
        max-width: 768px;
        background-color: #fff;
        box-shadow: 0 19px 60px rgba(0, 0, 0, .298039), 0 15px 20px rgba(0, 0, 0, .219608);
    }

    .b-dialog-title {
        padding: 5px 24px 0;
    }

    .b-dialog-body {
        padding: 20px 24px 10px;
        color: rgba(0, 0, 0, .6);
    }

    .b-dialog-actions {
        min-height: 40px;
        padding: 0 15px 4px;
        display: flex;
        align-items: center;
        justify-content: flex-end;
    }
</style>
