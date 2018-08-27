<template>
    <div class="comp-tree">
        <h4 class="heading">
            Tree
        </h4>

        <div class="card">
            <b-tree :data="treeData" :options="options" @drag="onDrag">
                <div slot-scope="scope" class="tree-node">
                    <span class="node-name">{{ scope.node.name }}</span>
                    <button class="sm" @click="viewNode(scope.node)">view node</button>
                </div>
            </b-tree>
        </div>
    </div>
</template>

<script type="text/babel">

    import ViewRecordModal from '../comp-table/modal/view-record-modal';

    const treeData = [
        {
            id: 1,
            name: 'node-1',
            children: [
                {
                    id: 3,
                    name: 'node-1-1',
                    children: [
                        {
                            id: 7,
                            name: 'node-1-1-1',
                            children: []
                        },
                        {
                            id: 8,
                            name: 'node-1-1-2',
                            children: []
                        }
                    ]
                },
                {
                    id: 4,
                    name: 'node-1-2',
                    children: [
                        {
                            id: 9,
                            name: 'node-1-2-1',
                            children: []
                        },
                        {
                            id: 10,
                            name: 'node-1-2-2',
                            children: []
                        }
                    ]
                }
            ]
        },
        {
            id: 2,
            name: 'node-2',
            children: [
                {id: 5, name: 'node-2-1', children: []},
                {id: 6, name: 'node-2-2', children: []}
            ]
        }
    ];

    export default {
        name: 'CompTree',

        data() {
            return {
                treeData,

                options: {
                    enableDrag: true,
                    filterDefs: [
                        {name: '名称', field: 'name'},
                        {
                            name: 'id',
                            field: 'id',
                            map: {
                                3: '帅气的 ID = 3',
                                7: '帅气的 ID = 7'
                            },
                            filterMethod: (value, node) => (node.id.toString() === value)
                        }
                    ]
                }
            };
        },

        methods: {
            viewNode({id, name}) {
                const vm = this;
                vm.$modal
                    .open(ViewRecordModal, {
                        record: {id, name}
                    })
                    .catch(x => x);
            },

            onDrag({dragNode, dropNode, afterData}) { // eslint-disable-line
                const vm = this;

                setTimeout(() => { // fake async
                    vm.treeData = afterData;
                }, 1000);
            }
        }
    };

</script>

<style lang="scss" rel="stylesheet/scss" scoped>

    .tree-node {
        height: 30px;
        line-height: 30px;

        .node-name {
            font-size: 15px;
            margin: 0 10px 0 5px;
        }
    }

</style>
