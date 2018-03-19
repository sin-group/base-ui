<template>
    <div class="b-table">
        <div v-if="records.length" class="table-area">
            <table class="table">
                <thead>
                    <tr>
                        <th v-if="options.enableSelection" class="select-area">
                            <label>
                                <input
                                    v-model="isAllSelected"
                                    type="checkbox"
                                    @change="onSelectAllChange">
                            </label>
                        </th>

                        <th v-for="colDef in options.colDefs" :key="colDef.field">
                            <div class="filter-area"/>

                            <span
                                :class="{'enabled-click': options.enableClientSort}"
                                class="sort-click-area"
                                @click="toggleSort(colDef.field)">
                                {{ colDef.name }}

                                <div class="sort-area">
                                    <div
                                        v-if="options.enableClientSort"
                                        :class="{
                                            'sort-icon-up': isSortIconUp(colDef.field),
                                            'sort-icon-down': isSortIconDown(colDef.field)
                                        }"
                                        class="sort-icon"
                                    />
                                </div>
                            </span>
                        </th>
                    </tr>
                </thead>

                <tbody>
                    <tr v-for="(record, index) in renderedRecords" :key="index">
                        <td v-if="options.enableSelection" class="select-area">
                            <label>
                                <input
                                    v-model="record.$$selected"
                                    type="checkbox"
                                    @change="onSelectChange(record)">
                            </label>
                        </td>

                        <td v-for="colDef in options.colDefs" :key="colDef.field">
                            <span>
                                <slot
                                    :name="colDef.field"
                                    :field="colDef.field"
                                    :colDef="colDef"
                                    :record="record"
                                    :value="getCellValue(record, colDef)">
                                    {{ getCellValue(record, colDef) }}
                                </slot>
                            </span>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div v-if="options.enableClientPagination && innerPagination" class="foot-area">
            <b-pagination
                :size="options.size"
                :pagination="innerPagination"
                @on-change="onInnerPaginationChange"/>
        </div>
    </div>
</template>

<script type="text/babel">

    import BPagination from '../../component/b-pagination';

    import {OrderType, NextOrderType} from '../../constant/OrderConf';
    import {filterFuncMap} from '../../filter/filter';
    import {genSortedRecords} from './helper/helper';

    const EventTypes = {
        ON_SELECT: 'on-select'
    };

    export default {
        name: 'BTable',

        components: {
            BPagination
        },

        props: {
            options: {
                type: Object,
                default: () => {}
            },
            records: {
                type: Array,
                default: () => []
            },
            pagination: {
                type: Object,
                default: () => {}
            }
        },

        data() {
            return {
                OrderType,

                sortInfo: {
                    field: '',
                    order: OrderType.NONE
                },

                innerPagination: {
                    pageNo: 1,
                    pageSize: 10,
                    total: 10
                },

                isAllSelected: false
            };
        },

        computed: {
            sortedRecords() {
                const vm = this;
                const {records, options: {enableClientSort = false}, sortInfo: {field, order}} = vm;

                if (!enableClientSort) return records;

                return genSortedRecords(records, field, order);
            },

            paginatedRecords() {
                const vm = this;
                const {
                    sortedRecords,
                    options: {enableClientPagination = false},
                    innerPagination: {
                        pageNo,
                        pageSize
                    }
                } = vm;

                if (!enableClientPagination) return sortedRecords;

                return sortedRecords.slice((pageNo - 1) * pageSize, pageNo * pageSize);
            },

            renderedRecords() {
                const vm = this;
                const {paginatedRecords: renderedRecords} = vm;

                vm.isAllSelected = renderedRecords.every(record => !!record.$$selected);
                return renderedRecords;
            }
        },

        mounted() {
            const vm = this;
            vm.updateInnerState();
        },

        methods: {
            getCellValue(record, {field, filter: filterName, map = {}}) {
                const filterFunc = filterFuncMap[filterName];

                const valueRaw = record[field];
                const valueMapped = map[valueRaw] || valueRaw;
                const valueFiltered = filterFunc ? filterFunc(valueMapped) : valueMapped;
                const value = valueFiltered;

                return value;
            },

            isSortIconUp(field) {
                const {sortInfo} = this;
                return sortInfo.field === field && sortInfo.order === OrderType.ASC;
            },

            isSortIconDown(field) {
                const {sortInfo} = this;
                return sortInfo.field === field && sortInfo.order === OrderType.DESC;
            },

            toggleSort(field) {
                const vm = this;
                const {options: {enableClientSort}, sortInfo: {order, field: originFiled}} = vm;

                if (!enableClientSort) return;

                vm.sortInfo.field = field;
                vm.sortInfo.order = originFiled === field ? NextOrderType[order] : OrderType.DESC;
            },

            onInnerPaginationChange(pagination) {
                const vm = this;

                Object.assign(vm.innerPagination, {...pagination});
            },

            onSelectAllChange() {
                const vm = this;
                const {isAllSelected, renderedRecords, records} = vm;

                renderedRecords.forEach((record) => {
                    record.$$selected = isAllSelected;
                });

                vm.$emit(EventTypes.ON_SELECT, {
                    selectedRecords: records.filter(record => !!record.$$selected),
                    selectedRecord: null
                });
            },

            onSelectChange(selectRecord) {
                const vm = this;
                const {renderedRecords, records} = this;

                vm.isAllSelected = renderedRecords.every(record => !!record.$$selected);
                vm.$emit(EventTypes.ON_SELECT, {
                    selectedRecords: records.filter(record => !!record.$$selected),
                    selectedRecord: selectRecord
                });
            },

            updateInnerState() {
                const vm = this;
                const {
                    options: {
                        enableClientSort = false,
                        enableClientPagination = false,

                        sortInfo
                    },
                    records = [],
                    pagination = {}
                } = vm;

                if (enableClientSort && sortInfo) vm.sortInfo = sortInfo;
                if (enableClientPagination) {
                    Object.assign(
                        vm.innerPagination,
                        {
                            pageNo: 1,
                            pageSize: 10,
                            total: records.length
                        },
                        pagination
                    );
                }
            }
        }
    };

</script>

<style lang="scss" rel="stylesheet/scss" scoped>
    .b-table {
        .table-area {
            overflow-x: auto;
            overflow-y: hidden;
        }

        .foot-area {
            .b-pagination {
                padding: 10px;
            }
        }
    }
</style>
