<template>
    <div class="b-pagination">
        <div v-if="size === SIZE_TYPE.NORMAL" class="size-normal">
            <button
                :class="{disabled: pageInfo.previousDisabled}"
                @click="previous">上一页
            </button>

            <span v-for="({value, type}, index) in pageNoList" :key="index">
                <button
                    :class="{active: value === pagination.pageNo}"
                    @click="changePageNo(value, type)">{{ value }}</button>
            </span>

            <button
                :class="{disabled: pageInfo.nextDisabled}"
                @click="next">下一页
            </button>

            <span class="page-size">
                <b-select
                    :value="stringPageSize"
                    :map="pageSizeMap"
                    :enable-reset="false"
                    @change="onPageSizeChange"/>
                行每页
            </span>

            <span class="page-info">
                {{ pageInfo.start }} - {{ pageInfo.end }} 行，
                共 {{ pageInfo.total }} 行
            </span>
        </div>

        <div :class="{active: size === SIZE_TYPE.SMALL}" class="size-mini" b-pagination-size-normal>
            <button :class="{disabled: pageInfo.previousDisabled}" @click="previous">
                上一页
            </button>

            <span class="page-info">
                <span class="page-current">{{ pagination.pageNo }}</span>
                / {{ totalPageNo }}
            </span>

            <button :class="{disabled: pageInfo.nextDisabled}" @click="next">
                下一页
            </button>
        </div>
    </div>
</template>

<script type="text/babel">

    import BSelect from '../b-select';

    const EventTypes = {
        ON_CHANGE: 'on-change'
    };

    const genList = (start, end) => {
        if (!start || !end || end < start) return [];

        const length = (end - start) + 1;
        return [...Array(length).keys()].map(num => ({value: num + start}));
    };

    const PAGE_NO_OFFSET = 1;
    const MIN_BOUNDARY = 2 + (2 * PAGE_NO_OFFSET);
    const WHOLE_DISPLAY_NUM = 3 + (2 * PAGE_NO_OFFSET);
    const SKIP_SYMBOL = '...';
    const DEFAULT_PAGE_SIZE_LIST = [10, 20, 50, 100, 200];
    const PAGE_TYPE = {
        LEFT: 'LEFT',
        RIGHT: 'RIGHT',
        FRONT_RIGHT: 'FRONT_RIGHT',
        TAIL_LEFT: 'TAIL_LEFT'
    };
    const SIZE_TYPE = {
        NORMAL: 'normal',
        SMALL: 'sm'
    };
    const genPaginationWithOffset = ({pageNo, pageSize, total}) => ({
        pageNo,
        pageSize,
        total,
        offset: (pageNo - 1) * pageSize
    });

    export default {
        name: 'BPagination',

        components: {
            BSelect
        },

        model: {
            prop: 'pagination',
            event: EventTypes.ON_CHANGE
        },

        props: {
            pagination: {
                type: Object,
                required: true,
                validator: (value) => {
                    if (typeof value != typeof {}) return false;

                    return value.pageNo && value.pageSize && (value.total !== undefined);
                }
            },

            defaultPageSizeList: {
                type: Array,
                default: () => []
            },

            size: {
                type: String,
                default: SIZE_TYPE.NORMAL
            }
        },

        data() {
            return {
                SIZE_TYPE
            };
        },

        computed: {
            pageNoList() {
                const vm = this;
                const {pagination: {pageNo}, totalPageNo} = vm;

                // When total page num is not greater than whole display boundary
                if (totalPageNo <= WHOLE_DISPLAY_NUM + 1) {
                    return genList(1, totalPageNo);
                }

                // When total page num is greater than whole display boundary
                // Front side
                if (pageNo <= MIN_BOUNDARY) {
                    return [
                        ...genList(1, MIN_BOUNDARY + 1),
                        {value: SKIP_SYMBOL, type: PAGE_TYPE.FRONT_RIGHT},
                        {value: totalPageNo}
                    ];
                }

                // Tail side
                if (pageNo >= totalPageNo - 1 - PAGE_NO_OFFSET) {
                    return [
                        {value: 1},
                        {value: SKIP_SYMBOL, type: PAGE_TYPE.TAIL_LEFT},
                        ...genList(totalPageNo - MIN_BOUNDARY, totalPageNo)
                    ];
                }

                // Center side
                return [
                    {value: 1},
                    {value: SKIP_SYMBOL, type: PAGE_TYPE.LEFT},
                    ...genList(pageNo - PAGE_NO_OFFSET, pageNo + PAGE_NO_OFFSET),
                    {value: SKIP_SYMBOL, type: PAGE_TYPE.RIGHT},
                    {value: totalPageNo}
                ];
            },

            totalPageNo() {
                const vm = this;
                const {pagination: {pageSize, total}} = vm;
                return Math.ceil(total / pageSize) || 1;
            },

            pageSizeMap() {
                const vm = this;
                const {defaultPageSizeList} = vm;
                const pageSizeList = defaultPageSizeList.length ? defaultPageSizeList : DEFAULT_PAGE_SIZE_LIST;

                return pageSizeList.reduce((acc, cur) => {
                    acc[cur] = cur.toString();
                    return acc;
                }, {});
            },

            pageInfo() {
                const vm = this;
                const {pagination: {pageNo, pageSize, total}, totalPageNo} = vm;

                return {
                    start: ((pageNo - 1) * pageSize) + 1,
                    end: Math.min(pageNo * pageSize, total),
                    total,
                    previousDisabled: pageNo <= 1,
                    nextDisabled: pageNo >= totalPageNo
                };
            },

            stringPageSize() {
                return `${this.pagination.pageSize}`;
            }
        },

        methods: {
            previous() {
                const vm = this;
                const {pagination: {pageNo}} = vm;

                if (pageNo <= 1) return;

                vm.$emit(EventTypes.ON_CHANGE, genPaginationWithOffset({
                    ...vm.pagination,
                    pageNo: pageNo - 1
                }));
            },

            next() {
                const vm = this;
                const {pagination: {pageNo}, totalPageNo} = vm;

                if (pageNo >= totalPageNo) return;

                vm.$emit(EventTypes.ON_CHANGE, genPaginationWithOffset({
                    ...vm.pagination,
                    pageNo: pageNo + 1
                }));
            },

            onPageSizeChange(pageSize) {
                const vm = this;
                const {pagination} = vm;
                if (pagination.pageSize === +pageSize) return;

                vm.$emit(EventTypes.ON_CHANGE, genPaginationWithOffset({
                    ...vm.pagination,
                    pageNo: 1,
                    pageSize: +pageSize
                }));
            },

            changePageNo(targetPageNo, type) {
                const vm = this;
                const {pagination: {pageNo}, totalPageNo} = vm;

                if (targetPageNo === pageNo) return;

                // Handle for skip symbol
                const SKIP_SYMBOL_JUMP_MAP = {
                    [PAGE_TYPE.FRONT_RIGHT]: MIN_BOUNDARY + 2,
                    [PAGE_TYPE.TAIL_LEFT]: totalPageNo - MIN_BOUNDARY - 1,
                    [PAGE_TYPE.LEFT]: pageNo - PAGE_NO_OFFSET - 1,
                    [PAGE_TYPE.RIGHT]: pageNo + PAGE_NO_OFFSET + 1
                };

                vm.$emit(EventTypes.ON_CHANGE, genPaginationWithOffset({
                    ...vm.pagination,
                    pageNo: targetPageNo === SKIP_SYMBOL ? SKIP_SYMBOL_JUMP_MAP[type] : targetPageNo
                }));
            }
        }
    };

</script>
