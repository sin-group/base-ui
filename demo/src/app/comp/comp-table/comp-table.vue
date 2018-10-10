<template>
    <div class="comp-table">
        <div class="doc card">
            <div class="overview">
                <h2>
                    <span class="title">表格</span>
                    <code>b-table</code>
                </h2>
                <b-md-view :md-text="MD.CompTableOverview"/>
            </div>

            <div class="case">
                <h3>基本用法</h3>
                <b-md-view :md-text="MD.CompTableBasic"/>

                <demo-box>
                    <div slot="code"><b-md-view :md-text="MD.CompTableBasicCode"/></div>
                    <div slot="main">
                        <b-table
                            :options="BasicOptions"
                            :records="BasicRecords"/>
                    </div>
                </demo-box>
            </div>

            <div class="case">
                <h3>自定义列元素</h3>
                <b-md-view :md-text="MD.CompTableCustomizedCol"/>

                <demo-box>
                    <div slot="code"><b-md-view :md-text="MD.CompTableCustomizedColCode"/></div>
                    <div slot="main">
                        <b-table
                            :options="CustomizedColOptions"
                            :records="BasicRecords">
                            <div slot-scope="{record}" slot="op">
                                <button class="sm" @click="viewRecord(record)">查看</button>
                            </div>
                        </b-table>
                    </div>
                </demo-box>
            </div>

            <div class="case">
                <h3>客户端分页</h3>
                <b-md-view :md-text="MD.CompTableClientPagination"/>

                <demo-box>
                    <div slot="code"><b-md-view :md-text="MD.CompTableClientPaginationCode"/></div>
                    <div slot="main">
                        <b-table
                            :options="ClientPaginationOptions"
                            :records="FullRecords"/>
                    </div>
                </demo-box>
            </div>

            <div class="case">
                <h3>服务端分页</h3>
                <b-md-view :md-text="MD.CompTableServerPagination"/>

                <demo-box>
                    <div slot="code"><b-md-view :md-text="MD.CompTableServerPaginationCode"/></div>
                    <div slot="main">
                        <b-table
                            :options="ServerPaginationOptions"
                            :records="serverPaginatedRecords"
                            :pagination="serverPagination"
                            @on-paginate="onList"/>
                    </div>
                </demo-box>
            </div>

            <div class="case">
                <h3>客户端排序</h3>
                <b-md-view :md-text="MD.CompTableClientSort"/>

                <demo-box>
                    <div slot="code"><b-md-view :md-text="MD.CompTableClientSortCode"/></div>
                    <div slot="main">
                        <b-table
                            :options="ClientSortOptions"
                            :records="FullRecords"/>
                    </div>
                </demo-box>
            </div>

            <div class="case">
                <h3>服务端排序</h3>
                <b-md-view :md-text="MD.CompTableServerSort"/>

                <demo-box>
                    <div slot="code"><b-md-view :md-text="MD.CompTableServerSortCode"/></div>
                    <div slot="main">
                        <b-table
                            :options="ServerSortOptions"
                            :records="serverSortedRecords"
                            @on-sort="onSort"/>
                    </div>
                </demo-box>
            </div>

            <div class="case">
                <h3>行选择</h3>
                <b-md-view :md-text="MD.CompTableRowSelection"/>

                <demo-box>
                    <div slot="code"><b-md-view :md-text="MD.CompTableRowSelectionCode"/></div>
                    <div slot="main">
                        <b-table
                            :options="RowSelectionOptions"
                            :records="SelectRecords"
                            @on-select="onSelect"
                        />
                    </div>
                    <div slot="output">
                        Selected: {{ selectedRecordsNameList }}
                        <br>
                        Toggling: {{ currentToggleRecordName }}
                    </div>
                </demo-box>
            </div>

            <div class="case">
                <h3>API</h3>
                <b-md-view :md-text="MD.CompTableAPI"/>
            </div>
        </div>
    </div>
</template>

<script type="text/babel">
    import MD from '../../../common/md';
    import ViewRecordModal from './modal/view-record-modal';
    import {
        BasicRecords,
        FullRecords,
        SelectRecords
    } from './constant/records';

    import {
        BasicOptions,
        CustomizedColOptions,
        ClientPaginationOptions,
        ServerPaginationOptions,
        ClientSortOptions,
        ServerSortOptions,
        RowSelectionOptions
    } from './constant/options';

    const mockPaginationRequest = ({pageNo, pageSize}) => new Promise((resolve) => {
        setTimeout(() => {
            const slice = FullRecords.slice((pageNo - 1) * pageSize, pageNo * pageSize);
            resolve({records: slice, total: FullRecords.length});
        }, 200);
    });

    const compareAsc = (left, right) => (left < right ? -1 : 1);
    const compareDesc = (left, right) => (left < right ? 1 : -1);
    const mockSortRequest = ({field, order}) => new Promise((resolve) => {
        setTimeout(() => {
            const copy = [...FullRecords];
            const sorted = copy.sort((left, right) => {
                if (order === 'NONE') return 0;
                if (order === 'ASC') return compareAsc(left[field], right[field]);

                return compareDesc(left[field], right[field]);
            });
            resolve({records: sorted});
        }, 200);
    });

    export default {
        name: 'CompTable',

        data() {
            return {
                MD,
                BasicRecords,
                SelectRecords,
                FullRecords,

                BasicOptions,
                CustomizedColOptions,
                ClientPaginationOptions,
                ServerPaginationOptions,
                ClientSortOptions,
                ServerSortOptions,
                RowSelectionOptions,

                selectedInfo: {},
                serverPagination: {pageNo: 1, pageSize: 10, total: 100},
                serverPaginatedRecords: [],
                serverSortedRecords: FullRecords,
                selectedRecordsNameList: [],
                currentToggleRecordName: null
            };
        },

        mounted() {
            const vm = this;
            vm.onList({});
        },

        methods: {
            onList({pageNo = 1, pageSize = 10}) {
                mockPaginationRequest({pageNo, pageSize}).then(({records, total}) => {
                    this.serverPaginatedRecords = records;
                    this.serverPagination = {pageNo, pageSize, total};
                }).catch(x => x);
            },

            onSort({field, order}) {
                mockSortRequest({field, order}).then(({records}) => {
                    this.records = records;
                }).catch(x => x);
            },

            viewRecord(record) {
                const vm = this;
                vm.$modal
                    .open(ViewRecordModal, {
                        record
                    })
                    .catch(x => x);
            },

            onSelect({selectedRecords, selectedRecord}) {
                const vm = this;
                vm.selectedRecordsNameList = selectedRecords.map(({name}) => (name));
                vm.currentToggleRecordName = selectedRecord && selectedRecord.name;
            }
        }
    };

</script>

