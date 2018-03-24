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

<style lang="scss" scoped>

    .leaf {
        position: relative;

        &:before {
            position: absolute;
            content: "";
            left: -20px;
            top: 20px;
            width: 25px;
            border-top: 1px dotted black;
        }

        &:after {
            position: absolute;
            content: "";
            height: 100%;
            top: -15px;
            left: -20px;
            border-left: 1px dotted black;
        }
    }

    .is-last-child {
        &:after {
            height: 35px;
        }
    }

    .b-tree-node {
        .node-el {
            padding: 4px 0;
            display: flex;
            align-items: center;

            .content-wrap {
                margin: 0;
                height: 30px;
                line-height: 30px;
            }

            .change-fold {
                cursor: pointer;

                .b-icon-right:before {
                    position: relative;
                    bottom: -3px;
                    font-weight: 800;
                }

                &.is-unfold {
                    transform: rotate(90deg);

                    .b-icon-right:before {
                        bottom: 2px;
                        left: 3px;
                    }
                }
            }
        }
    }

</style>
