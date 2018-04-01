<template>
    <div
        :class="{
            'leaf': node.$$parent,
            'siblings-has-children': !siblingsNotHasChildren,
            'has-children': hasChildren,
            'is-last-child': isLastChild}"
        class="b-tree-node">
        <span
            v-if="hasChildren"
            class="change-fold"
            @click="changeFold">
            <i :class="{'is-unfold': !isFold}" class="b-icon-arrow-right"></i>
        </span>

        <div :class="{'siblings-not-has-children': siblingsNotHasChildren}" class="node-el">
            <slot name="content"></slot>
        </div>

        <div v-if="!isFold" class="child-tree-wrap">
            <slot name="children"></slot>
        </div>
    </div>
</template>

<script type="text/babel">

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

            hasChildren() {
                const vm = this;

                return vm.node.children.length > 0;
            },

            siblingsNotHasChildren() {
                const vm = this;
                const {$$parent} = vm;

                return $$parent && $$parent.children.every(node => node.children.length === 0);
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
            }
        }
    };

</script>
