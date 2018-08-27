<template>
    <div
        :class="{
            'is-root': !node.$$parent,
            'is-last-child': isLastChild
        }"
        class="b-tree-node">
        <div
            :class="{
                'is-root': !node.$$parent,
                'is-first-child': isFirstChild,
                'extended-horizontal': !hasChildren
            }"
            class="node-el">
            <div class="change-fold">
                <i
                    v-if="hasChildren"
                    :class="{'is-unfold': !isFold}"
                    class="b-icon-arrow-right"
                    @click="changeFold"></i>
            </div>

            <div
                :draggable="options.enableDrag"
                :class="{
                    'is-dragging': node.$$isDragging,
                    'is-dragging-over': node.$$isDraggingOver
                }"
                @dragstart="onDragStart(node)"
                @dragend="onDragEnd(node)"
                @dragenter.prevent="onDragOver(node)"
                @dragover.prevent="onDragOver(node)"
                @dragleave="onDragLeave(node)"
                @drop="onDrop(node)"
            >
                <slot name="content"></slot>
            </div>
        </div>

        <div v-if="!isFold" class="child-tree-wrap">
            <slot name="children"></slot>
        </div>
    </div>
</template>

<script type="text/babel">

    import {preOrderTreeList} from './util';

    export default {
        name: 'BTreeNode',

        props: {
            node: {
                type: Object,
                required: true
            },

            options: {
                type: Object,
                default: () => {}
            }
        },

        computed: {
            isLastChild() {
                const vm = this;
                const {node: {$$parent}, node} = vm;

                return $$parent && $$parent.children[$$parent.children.length - 1] === node;
            },

            isFirstChild() {
                const vm = this;
                const {node: {$$parent}, node} = vm;

                return $$parent && $$parent.children[0] === node;
            },

            hasChildren() {
                const vm = this;

                return vm.node.children.length > 0;
            },

            isFold() {
                const vm = this;

                return vm.node.$$isFold;
            }
        },

        methods: {
            changeFold() {
                const vm = this;
                vm.node.$$isFold = !vm.node.$$isFold;
            },

            onDragStart(node) {
                const vm = this;

                preOrderTreeList([node], nodeItem => (nodeItem.$$isDragging = true));
                vm.$emit('drag', node);
            },

            onDragEnd(node) {
                preOrderTreeList([node], nodeItem => (nodeItem.$$isDragging = false));
            },

            onDragOver(node) {
                if (!node.$$isDragging) {
                    node.$$isDraggingOver = true;
                }
            },

            onDragLeave(node) {
                node.$$isDraggingOver = false;
            },

            onDrop(node) {
                const vm = this;

                node.$$isDraggingOver = false;
                vm.$emit('drop', node);
            }
        }
    };

</script>
