<template>
    <ul class="b-tree">
        <li v-for="(item, index) in data" :key="index" class="tree-node" :class="{'leaf': parent}">
            <b-tree-node :node="item" :parent="parent">
                <template slot="content">
                    <slot :node="item" :parent="parent"/>
                </template>

                <renderChildTree slot="children" :parent="item" :data="item.children" :scoped-slots="$scopedSlots"/>
            </b-tree-node>
        </li>
    </ul>
</template>

<script type="text/babel">

    import BTreeNode from './b-tree-node.vue';

    const renderChildTree = {
        props: {
            parent: Object,
            data: Array,
            scopedSlots: Object
        },

        render(createEle) {
            const {parent, data, scopedSlots} = this;

            return createEle('b-tree', {
                props: {
                    parent,
                    data
                },
                scopedSlots
            });
        }
    };

    export default {
        name: 'BTree',

        components: {
            BTreeNode,
            renderChildTree
        },

        props: {
            data: {
                type: Array,
                default: () => []
            },

            parent: {
                type: Object,
                default: null
            }
        }
    };

</script>

<style lang="scss" scoped>

    .b-tree {
        margin-left: 30px;
    }

</style>
