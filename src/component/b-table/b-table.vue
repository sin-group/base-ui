<script type="text/babel">
    import BPagination from '../b-pagination';
    import BTableBody from './b-table-body.vue';
    import BTableHeader from './b-table-header.vue';

    import {OrderType} from '../../constant/OrderConf';
    import {genSortedRecords} from './helper/helper';


    const EventTypes = {
        ON_SELECT: 'on-select',
        ON_PAGINATE: 'on-paginate',
        ON_SORT: 'on-sort'
    };

    let uniqueCellKey = 1;

    export default {
        name: 'BTable',

        components: {
            BPagination,
            BTableHeader,
            BTableBody
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

                isAllSelected: false,
                hoverIndex: null,
                scrollValue: 0,
                leftScroll: 0,
                rowsHeight: []
            };
        },

        computed: {
            leftFixedColumns() {
                const vm = this;
                const {options: {colDefs}} = vm;
                return colDefs.filter(item => item.fixed === 'left');
            },

            rigthFixedColumns() {
                const vm = this;
                const {options: {colDefs}} = vm;
                return colDefs.filter(item => item.fixed === 'right');
            },

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
            },


            hasRightShadow() {
                const vm = this;
                const {scrollValue} = vm;
                return scrollValue < vm.leftScroll;
            },


            hasLeftShadow() {
                const vm = this;
                const {scrollValue} = vm;
                return scrollValue > 0;
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
            if (vm.$refs.mainTable) {
                vm.leftScroll = vm.$refs.mainTable.scrollWidth - vm.$refs.mainTable.clientWidth;
                const rows = vm.$refs.mainTableBody.$refs.rows;
                vm.rowsHeight = rows.map(item => item.offsetHeight);
            }
        },

        methods: {
            handleBodyScroll() {
                const vm = this;
                vm.scrollValue = vm.$refs.mainTable.scrollLeft;
            },

            handleChangeRow(index) {
                const vm = this;
                vm.hoverIndex = index;
            },

            handleMouseLeave() {
                const vm = this;
                vm.hoverIndex = null;
            },

            isShowSortIcon(field) {
                const {enableSort, sortInfo: {supportFields = []}} = this;
                if (!enableSort) return false;
                if (!supportFields.length) return true;

                return supportFields.includes(field);
            },

            toggleSort(sortInfo) {
                const vm = this;
                const {
                    options: {enableServerSort}
                } = vm;

                if (vm.isShowSortIcon(sortInfo.field)) {
                    vm.sortInfo = sortInfo;
                    if (enableServerSort) {
                        vm.$emit(EventTypes.ON_SORT, sortInfo);
                    }
                }
            },

            onInnerPaginationChange(pagination) {
                const vm = this;

                Object.assign(vm.innerPagination, {...pagination});
                vm.$emit(EventTypes.ON_PAGINATE, {...vm.innerPagination});
            },

            onSelectAllChange(isSelected) {
                const vm = this;
                const {renderedRecords, records} = vm;

                renderedRecords.forEach((record) => {
                    if (record.$$disableSelect) return;
                    vm.$set(record, '$$selected', isSelected);
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
        },

        render() {
            const vm = this;
            const {options,
                    sortInfo,
                    records,
                    tbodyComponent,
                    tbodyProps,
                    tbodyListeners,
                    renderedRecords,
                    isAllSelected,
                    onSelectAllChange,
                    toggleSort,
                    $scopedSlots,
                    onSelectChange,
                    innerPagination,
                    onInnerPaginationChange,
                    leftFixedColumns,
                    rigthFixedColumns,
                    handleMouseLeave,
                    hoverIndex,
                    handleChangeRow,
                    handleBodyScroll,
                    hasLeftShadow,
                    hasRightShadow,
                    rowsHeight} = vm;
            return (
                <div class={[{'b-table-with-extra-th': options.extraThDefsList}, 'b-table']}
                    onMouseleave={handleMouseLeave} >
                    {
                        records.length > 0 ? (
                            <div class="table-area " ref="mainTable" onScroll={handleBodyScroll}>
                                <b-table-header
                                    options={options}
                                    isAllSelected={isAllSelected}
                                    sortInfo={sortInfo}
                                    onSelect-all-change={onSelectAllChange}
                                    onToogle-sort={toggleSort}
                                    >
                                </b-table-header>
                                <b-table-body
                                    ref="mainTableBody"
                                    options={options}
                                    tbodyComponent={tbodyComponent}
                                    tbodyProps={tbodyProps}
                                    tbodyListeners={tbodyListeners}
                                    renderedRecords={renderedRecords}
                                    hoverIndex={hoverIndex}
                                    scopedSlots={$scopedSlots}
                                    onSelect-change={onSelectChange}
                                    onChange-row={handleChangeRow}
                                    >
                                </b-table-body>
                                </div>) : (<p class="no-record-remind">暂无数据</p>)
                    }
                    {records.length && (options.enableClientPagination || options.enableServerPagination) ? (
                        <div
                            class="foot-area">
                            <b-pagination
                                size={options.size}
                                pagination={innerPagination}
                                {...options.paginationProps}

                                onOn-change={onInnerPaginationChange}/>
                        </div>
                    ) : ''}
                    {leftFixedColumns.length > 0 ? (
                         <div class={[{'table-fixed-left-scroll': hasLeftShadow},
                                        'table-area layout-fixed-left']}>
                            <b-table-header
                                    options={options}
                                    isAllSelected={isAllSelected}
                                    sortInfo={sortInfo}
                                    onSelect-all-change={onSelectAllChange}
                                    onToogle-sort={toggleSort}
                                    fixed="left"
                                    >
                            </b-table-header>
                            <b-table-body
                                    options={options}
                                    tbodyComponent={tbodyComponent}
                                    tbodyProps={tbodyProps}
                                    tbodyListeners={tbodyListeners}
                                    renderedRecords={renderedRecords}
                                    hoverIndex={hoverIndex}
                                    rowsHeight={rowsHeight}
                                    scopedSlots={$scopedSlots}
                                    onSelect-change={onSelectChange}
                                    onChange-row={handleChangeRow}
                                    fixed="left"
                                    >
                            </b-table-body>
                        </div>) : ''}
                        {rigthFixedColumns.length > 0 ? (
                            <div class={[{'table-fixed-right-scroll': hasRightShadow},
                                        'table-area layout-fixed-right']}>
                                <b-table-header
                                        options={options}
                                        isAllSelected={isAllSelected}
                                        sortInfo={sortInfo}
                                        onSelect-all-change={onSelectAllChange}
                                        onToogle-sort={toggleSort}
                                        fixed="right"
                                        >
                                </b-table-header>
                                <b-table-body
                                        options={options}
                                        tbodyComponent={tbodyComponent}
                                        tbodyProps={tbodyProps}
                                        tbodyListeners={tbodyListeners}
                                        renderedRecords={renderedRecords}
                                        hoverIndex={hoverIndex}
                                        rowsHeight={rowsHeight}
                                        scopedSlots={$scopedSlots}
                                        onSelect-change={onSelectChange}
                                        onChange-row={handleChangeRow}
                                        fixed="right"
                                        >
                                </b-table-body>
                            </div>) : ''}
                </div>);
            }
    };

</script>
