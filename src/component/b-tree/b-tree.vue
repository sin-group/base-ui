<template>
    <div class="b-tree-wrap">
        <div v-if="needFilter" class="filter-wrap form-inline">
            <b-form-group v-for="item in options.filterDefs" :key="item.field" :label="item.name">
                <b-select v-model="filter[item.field]" :map="genFilterMap(item)"/>
            </b-form-group>

            <div class="btn-group">
                <button type="button" @click="reset">重置</button>
            </div>
        </div>

        <p v-if="hasNoFilteredData">暂无符合条件的节点</p>

        <ul :class="{'root': isRoot}" class="b-tree">
            <li v-for="(item, index) in renderData" :key="index" class="tree-node">
                <b-tree-node :node="item" :options="options">
                    <template slot="content">
                        <slot :node="item" :parent="item.$$parent"></slot>
                    </template>

                    <renderChildTree
                        v-if="hasChildren(item)"
                        slot="children"
                        :scoped-slots="$scopedSlots"
                        :data="item.children"
                        :options="options"/>
                </b-tree-node>
            </li>
        </ul>
    </div>
</template>

<script type="text/babel">

    import BTreeNode from './b-tree-node.vue';
    import {preOrderTreeList, checkTreeListHasNode} from './util';

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
                    foldDeep: null,
                    filterDefs: []
                })
            }
        },

        data() {
            return {
                filter: {}
            };
        },

        computed: {
            isRoot() {
                const vm = this;

                return vm.data.length > 0 && vm.data.every(node => !node.$$parent);
            },

            needFilter() {
                const vm = this;

                return vm.isRoot && vm.options.filterDefs && vm.options.filterDefs.length > 0;
            },

            renderData() {
                const vm = this;
                const {isRoot, data = [], options: {foldDeep = null}, filter, checkFilter} = vm;
                const filterKeys = Object.keys(filter).filter(key => filter[key]);
                let renderData = data;

                if (isRoot && filterKeys.length > 0) {
                    const filteredData = [];
                    preOrderTreeList(renderData, (node) => {
                        vm.$set(node, '$$isFiltered', filterKeys.every(key => checkFilter(node, key)));

                        if (node.$$isFiltered && !checkTreeListHasNode(filteredData, node)) {
                            filteredData.push(node);
                        }
                    });

                    renderData = filteredData;
                }

                if (isRoot) {
                    const rec = (node, deep, parent) => {
                        vm.$set(node, '$$deep', deep);
                        vm.$set(node, '$$parent', parent);
                        vm.$set(node, '$$isFold', foldDeep ? Boolean(node.$$deep >= foldDeep) : false);

                        if (node.children.length === 0) return;

                        node.children.forEach(child => rec(child, deep + 1, node));
                    };

                    renderData.forEach(node => rec(node, 1, null));
                }

                return renderData;
            },

            hasNoFilteredData() {
                const vm = this;

                return vm.needFilter && vm.renderData.length === 0;
            }
        },

        methods: {
            genFilterMap(filterItem) {
                const vm = this;
                const {field, map} = filterItem;
                const {data} = vm;

                if (map) return map;

                const filterMap = {};
                preOrderTreeList(data, (node) => {
                    if (!node[field]) return;

                    const value = node[field];

                    filterMap[value] = value;
                });

                return filterMap;
            },

            checkFilter(node, field) {
                const vm = this;
                const {filter, options: {filterDefs}} = vm;
                const filterDef = filterDefs.find(item => item.field === field);

                if (filterDef.filterMethod) return filterDef.filterMethod(filter[field], node);

                return node[field] === filter[field];
            },

            hasChildren(node) {
                return node.children && node.children.length > 0;
            },

            reset() {
                const vm = this;

                Object.keys(vm.filter).forEach(key => (vm.filter[key] = ''));
                preOrderTreeList(vm.data, node => (node.$$isFiltered = false));
            }
        }
    };

</script>
