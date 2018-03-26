<template>
    <div
        :class="{
            'leaf': parent,
            'is-last-child': isLastChild
        }"
        class="b-tree-node">
        <div class="node-el">
            <span
                v-if="node.children.length > 0"
                :class="{'is-unfold': !isFold}"
                class="change-fold"
                @click="changeFold">
                <i class="b-icon-right"></i>
            </span>

            <div class="content-wrap">
                <slot name="content"></slot>
            </div>
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

            parent: {
                type: Object,
                default: null
            }
        },

        data() {
            return {
                isFold: false
            };
        },

        computed: {
            isLastChild() {
                const vm = this;
                const {parent, node} = vm;

                return parent && parent.children[parent.children.length - 1] === node;
            }
        },

        created() {
            const vm = this;
            vm.node.parent = vm.parent;
        },

        methods: {
            changeFold() {
                const vm = this;
                vm.isFold = !vm.isFold;
            }
        }
    };

</script>
