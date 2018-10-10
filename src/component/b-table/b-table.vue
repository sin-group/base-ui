<template>
    <div :class="{'b-table-with-extra-th': options.extraThDefsList}" class="b-table">
        <div v-if="records.length" class="table-area">
            <table class="table">
                <thead>
                    <template v-if="options.extraThDefsList">
                        <tr v-for="(extraThDefs, index) in options.extraThDefsList" :key="index">
                            <th
                                v-for="(extraTh, index) in extraThDefs"
                                :key="index"
                                :colspan="extraTh.colspan">{{ extraTh.label }}
                            </th>
                        </tr>
                    </template>

                    <tr>
                        <th v-if="options.enableSelection" class="select-area">
                            <label>
                                <input
                                    v-model="isAllSelected"
                                    type="checkbox"
                                    @change="onSelectAllChange">
                            </label>
                        </th>

                        <th
                            v-for="colDef in options.colDefs"
                            :key="colDef.field"
                            :style="getThStyle(colDef)">
                            <div class="filter-area"></div>

                            <span
                                :class="{'enabled-click': isShowSortIcon(colDef.field)}"
                                class="sort-click-area"
                                @click="toggleSort(colDef.field)">
                                {{ colDef.label || colDef.name }}

                                <div class="sort-area">
                                    <div
                                        v-if="isShowSortIcon(colDef.field)"
                                        :class="{
                                            'sort-icon-up': isSortIconUp(colDef.field),
                                            'sort-icon-down': isSortIconDown(colDef.field)
                                        }"
                                        class="sort-icon"
                                    ></div>
                                </div>
                            </span>
                        </th>
                    </tr>
                </thead>

                <component :is="tbodyComponent" v-bind="tbodyProps" v-on="tbodyListeners">
                    <tr
                        v-for="(record, index) in renderedRecords"
                        ref="rows"
                        :key="index"
                        :class="getRowClass(record, index)">
                        <td v-if="options.enableSelection" class="select-area">
                            <label>
                                <input
                                    v-model="record.$$selected"
                                    :disabled="record.$$disableSelect"
                                    type="checkbox"
                                    @change="onSelectChange(record)">
                            </label>
                        </td>

                        <td
                            v-for="colDef in options.colDefs"
                            :key="getCellKey(colDef)"
                            :style="getTdStyle(colDef)">
                            <slot
                                :name="colDef.field"
                                :field="colDef.field"
                                :colDef="colDef"
                                :record="record"
                                :line-index="index"
                                :value="getCellValue(record, colDef)">
                                {{ getCellValue(record, colDef) }}
                            </slot>
                        </td>
                    </tr>
                </component>
            </table>
        </div>

        <p v-else-if="records" class="no-record-remind">暂无数据</p>

        <div
            v-if="records.length && (options.enableClientPagination || options.enableServerPagination)"
            class="foot-area">
            <b-pagination
                :size="options.size"
                v-model="innerPagination"
                v-bind="options.paginationProps"
                @on-change="onInnerPaginationChange"/>
        </div>
    </div>
</template>

<script type="text/babel">

    import BPagination from '../b-pagination';
    import getValue from '../../util/get-value';

    import {OrderType, NextOrderType} from '../../constant/OrderConf';
    import {filterFuncMap} from '../../filter/filter';
    import {genSortedRecords} from './helper/helper';
    import {isFunc} from '../../util/check';

    const EventTypes = {
        ON_SELECT: 'on-select',
        ON_PAGINATE: 'on-paginate',
        ON_SORT: 'on-sort'
    };

    let uniqueCellKey = 1;

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
            },

            tbodyComponent: {
                type: [String, Object],
                default: 'tbody'
            },

            tbodyProps: {
                type: Object,
                default: null
            },

            tbodyListeners: {
                type: Object,
                default: null
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

                vm.isAllSelected = renderedRecords.every(
                    ({$$selected, $$disableSelect}) => ($$selected || $$disableSelect)
                );
                return renderedRecords;
            },

            enableSort() {
                const {options: {enableClientSort, enableServerSort}} = this;
                return enableClientSort || enableServerSort;
            }
        },

        watch: {
            records(newVal, oldVal) {
                if (newVal === oldVal) return;

                const vm = this;
                vm.updateInnerState();
            },

            pagination(newVal) {
                const vm = this;

                Object.assign(
                    vm.innerPagination,
                    newVal
                );
            }
        },

        mounted() {
            const vm = this;
            vm.updateInnerState();
        },

        methods: {
            getCellValue(record, {field, filter, map = {}}) {
                const filterFunc = isFunc(filter) ? filter : filterFuncMap[filter];

                const valueRaw = getValue(record, field);
                const valueMapped = map[valueRaw] || valueRaw;
                const valueFiltered = filterFunc ? filterFunc(valueMapped) : valueMapped;
                const value = valueFiltered;

                return value;
            },

            getRowClass(record, index) {
                const {records, options: {genRowClass}} = this;

                return {
                    selected: record.$$selected,
                    ...(typeof genRowClass === 'function' ? genRowClass(record, index, records) : {})
                };
            },

            getThStyle({minWidth, maxWidth}) {
                return {
                    ...(minWidth ? {minWidth: `${minWidth}px`} : {}),
                    ...(maxWidth ? {maxWidth: `${maxWidth}px`} : {})
                };
            },

            getTdStyle({minWidth, maxWidth}) {
                return {
                    ...(minWidth ? {minWidth: `${minWidth}px`} : {}),
                    ...(maxWidth ? {maxWidth: `${maxWidth}px`} : {})
                };
            },

            isSortIconUp(field) {
                const {sortInfo} = this;
                return sortInfo.field === field && sortInfo.order === OrderType.ASC;
            },

            isSortIconDown(field) {
                const {sortInfo} = this;
                return sortInfo.field === field && sortInfo.order === OrderType.DESC;
            },

            isShowSortIcon(field) {
                const {enableSort, sortInfo: {supportFields = []}} = this;
                if (!enableSort) return false;
                if (!supportFields.length) return true;

                return supportFields.includes(field);
            },

            toggleSort(field) {
                const vm = this;
                const {
                    options: {enableServerSort},
                    sortInfo: {order: originOrder, field: originFiled}
                } = vm;

                if (vm.isShowSortIcon(field)) {
                    const order = originFiled === field ? NextOrderType[originOrder] : OrderType.DESC;
                    vm.sortInfo.field = field;
                    vm.sortInfo.order = order;

                    if (enableServerSort) {
                        vm.$emit(EventTypes.ON_SORT, {field, order});
                    }
                }
            },

            onInnerPaginationChange(pagination) {
                const vm = this;

                Object.assign(vm.innerPagination, {...pagination});
                vm.$emit(EventTypes.ON_PAGINATE, {...vm.innerPagination});
            },

            onSelectAllChange() {
                const vm = this;
                const {isAllSelected, renderedRecords, records} = vm;

                renderedRecords.forEach((record) => {
                    if (record.$$disableSelect) return;
                    vm.$set(record, '$$selected', isAllSelected);
                });

                vm.$emit(EventTypes.ON_SELECT, {
                    selectedRecords: records.filter(record => record.$$selected),
                    selectedRecord: null
                });
            },

            onSelectChange(selectRecord) {
                const vm = this;
                const {renderedRecords, records} = this;

                vm.isAllSelected = renderedRecords.every(
                    ({$$selected, $$disableSelect}) => ($$selected || $$disableSelect)
                );
                vm.$emit(EventTypes.ON_SELECT, {
                    selectedRecords: records.filter(record => record.$$selected),
                    selectedRecord: selectRecord
                });
            },

            updateInnerState() {
                const vm = this;
                const {
                    options: {
                        enableClientSort = false,
                        enableServerSort = false,
                        enableClientPagination = false,
                        enableServerPagination = false,

                        sortInfo
                    },
                    records = [],
                    pagination = {}
                } = vm;

                if (sortInfo && (enableServerSort || enableClientSort)) Object.assign(vm.sortInfo, sortInfo);
                if (enableClientPagination || enableServerPagination) {
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
            },

            getCellKey({field, enforceUpdateCell = false}) {
                uniqueCellKey += 1;
                return enforceUpdateCell ? `${field}${uniqueCellKey}` : field;
            }
        }
    };

</script>
