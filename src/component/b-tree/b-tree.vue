<template>
    <ul :class="{'root': isRoot}" class="b-tree">
        <li v-for="(item, index) in renderData" :key="index" class="tree-node">
            <b-tree-node :node="item" :options="options">
                <template slot="content">
                    <slot :node="item" :parent="item.$$parent"></slot>
                </template>

                <renderChildTree
                    slot="children"
                    :scoped-slots="$scopedSlots"
                    :data="item.children"
                    :options="options"/>
            </b-tree-node>
        </li>
    </ul>
</template>

<script type="text/babel">

    import BTreeNode from './b-tree-node.vue';

    const renderChildTree = {
        props: {
            data: Array,
            options: Object,
            scopedSlots: Object
        },

        render(createEle) {
            const {data, options, scopedSlots} = this;

            return createEle('b-tree', {
                props: {
                    data,
                    options
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

            options: {
                type: Object,
                default: () => ({
                    foldDeep: null
                })
            }
        },

        computed: {
            isRoot() {
                const vm = this;

                return vm.data.every(node => !node.$$parent);
            },

            renderData() {
                const vm = this;
                const {isRoot, data = []} = vm;

                if (isRoot) {
                    const rec = (node, deep, parent) => {
                        vm.$set(node, '$$deep', deep);
                        vm.$set(node, '$$parent', parent);

                        if (node.children.length === 0) return;

                        node.children.forEach(child => rec(child, deep + 1, node));
                    };

                    data.forEach(node => rec(node, 1, null));
                }

                return data;
            }
        }
    };

</script>
