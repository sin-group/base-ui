<template>
    <transition name="b-dialog-slide">
        <div v-if="open" class="b-dialog-wrapper">
            <div class="b-dialog-mask" @click="close"></div>

            <div :class="dialogClass" class="b-dialog">
                <h3 v-if="showTitle" class="b-dialog-title">
                    <slot name="title">{{ title }}</slot>
                </h3>

                <div class="b-dialog-body">
                    <slot></slot>
                </div>

                <div v-if="$slots.actions" class="b-dialog-actions">
                    <slot name="actions"></slot>
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
