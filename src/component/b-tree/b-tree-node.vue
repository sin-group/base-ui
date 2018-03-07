<template>
    <div :class="{'leaf': parent}" class="b-tree-node">
        <div class="node-el">
            <span
                v-if="node.children.length > 0"
                :class="{'is-unfold': !isFold}"
                class="change-fold"
                @click="changeFold">
                <i class="b-icon-right"/>
            </span>
            <span>
                <slot name="content"/>
            </span>
        </div>

        <div v-if="!isFold" class="child-tree-wrap">
            <slot name="children"/>
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
            top: 15px;
            width: 20px;
            border-top: 1px dotted black;
        }

        &:after {
            position: absolute;
            content: "";
            height: 100%;
            top: -20px;
            left: -20px;
            border-left: 1px dotted black;
        }
    }

    .node-el {
        height: 35px;
        display: flex;
        align-items: center;

        .change-fold {
            cursor: pointer;

            &.is-unfold {
                transform: rotate(90deg);
            }
        }
    }

</style>
