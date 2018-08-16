<template>
    <transition name="b-dialog-slide">
        <div
            v-b-prevent-scroll
            v-if="open"
            :class="[dialogClass, {'enable-scroll': !bodyScroll}]"
            class="b-dialog-wrapper"
            @click.self="onClickOutside">
            <div class="b-dialog-content-wrapper" @click.self="onClickOutside">
                <div class="b-dialog">
                    <h3 v-if="showTitle" class="b-dialog-title">
                        <slot name="title">{{ title }}</slot>
                    </h3>

                    <div :class="{'enable-scroll': bodyScroll}" class="b-dialog-body">
                        <slot></slot>
                    </div>

                    <div v-if="$slots.actions" class="b-dialog-actions">
                        <slot name="actions"></slot>
                    </div>
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

            bodyScroll: {
                type: Boolean,
                default: false
            },

            dialogClass: {
                type: [String, Array, Object],
                default: null
            },

            closeOnClickOutside: {
                type: Boolean,
                default: true
            }
        },

        computed: {
            showTitle() {
                return this.title || (this.$slots && this.$slots.title && this.$slots.title.length > 0);
            }
        },

        methods: {
            onClickOutside() {
                if (this.closeOnClickOutside) {
                    this.close();
                }
            },

            close() {
                const vm = this;
                vm.$emit('close');
            }
        }
    };
</script>
