<template>
    <div class="b-pagination">
        <button
            :class="{disabled: pageInfo.previousDisabled}"
            @click="previous">上一页</button>

        <span v-for="{value, type} in pageNoList" :key="value">
            <button
                :class="{active: value === innerPagination.pageNo}"
                @click="changePageNo(value, type)">{{ value }}</button>
        </span>

        <button
            :class="{disabled: pageInfo.nextDisabled}"
            @click="next">下一页</button>

        <span class="page-size">
            <b-select
                v-model="stringPageSize"
                :map="pageSizeMap"
                @change="onPageSizeChange(stringPageSize)"/>
            行每页
        </span>

        <span class="page-info">
            {{ pageInfo.start }} - {{ pageInfo.end }} 行，
            共 {{ pageInfo.total }} 行
        </span>
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

export default {
    name: 'BPagination',

    components: {
        BSelect
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
        }
    },

    data() {
        return {
            innerPagination: null,
            stringPageSize: null
        };
    },

    computed: {
        pageNoList() {
            const vm = this;
            const {innerPagination: {pageNo}, totalPageNo} = vm;

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
            const {innerPagination: {pageSize, total}} = vm;
            return Math.ceil(total / pageSize) || 1;
        },

        pageSizeMap() {
            const vm = this;
            const {defaultPageSizeList} = vm;
            const pageSizeList = defaultPageSizeList || DEFAULT_PAGE_SIZE_LIST;

            return pageSizeList.reduce((acc, cur) => {
                acc[cur] = cur.toString();
                return acc;
            }, {});
        },

        pageInfo() {
            const vm = this;
            const {innerPagination: {pageNo, pageSize, total}, totalPageNo} = vm;

            return {
                start: ((pageNo - 1) * pageSize) + 1,
                end: Math.min(pageNo * pageSize, total),
                total,
                previousDisabled: pageNo <= 1,
                nextDisabled: pageNo >= totalPageNo
            };
        }
    },

    created() {
        const vm = this;

        vm.updateInnerPagination(vm.pagination);
        vm.$watch('pagination', (newPagination) => {
            vm.updateInnerPagination(newPagination);
        }, {
            deep: true
        });
    },

    methods: {
        previous() {
            const vm = this;
            const {innerPagination: {pageNo}} = vm;

            if (pageNo <= 1) return;

            vm.innerPagination.pageNo -= 1;
            vm.$emit(EventTypes.ON_CHANGE, vm.innerPagination);
        },

        next() {
            const vm = this;
            const {innerPagination: {pageNo}, totalPageNo} = vm;

            if (pageNo >= totalPageNo) return;

            vm.innerPagination.pageNo += 1;
            vm.$emit(EventTypes.ON_CHANGE, vm.innerPagination);
        },

        onPageSizeChange(pageSize) {
            const vm = this;
            if (vm.innerPagination.pageSize === +pageSize) return;

            vm.innerPagination.pageSize = +pageSize;
            vm.innerPagination.pageNo = 1; // When pageSize change, reset pageNo
            vm.$emit(EventTypes.ON_CHANGE, vm.innerPagination);
        },

        changePageNo(targetPageNo, type) {
            const vm = this;
            const {innerPagination: {pageNo}, totalPageNo} = vm;

            if (targetPageNo === pageNo) return;

            // Handle for skip symbol
            const SKIP_SYMBOL_JUMP_MAP = {
                [PAGE_TYPE.FRONT_RIGHT]: MIN_BOUNDARY + 2,
                [PAGE_TYPE.TAIL_LEFT]: totalPageNo - MIN_BOUNDARY - 1,
                [PAGE_TYPE.LEFT]: pageNo - PAGE_NO_OFFSET - 1,
                [PAGE_TYPE.RIGHT]: pageNo + PAGE_NO_OFFSET + 1
            };
            vm.innerPagination.pageNo = targetPageNo === SKIP_SYMBOL ? SKIP_SYMBOL_JUMP_MAP[type] : targetPageNo;

            vm.$emit(EventTypes.ON_CHANGE, vm.innerPagination);
        },

        updateInnerPagination(pagination) {
            const vm = this;

            vm.innerPagination = {...pagination};
            vm.stringPageSize = `${pagination.pageSize}`;
        }
    }
};

</script>

<style lang="scss" rel="stylesheet/scss">
@import "../../style/variables.scss";

.b-pagination {
    button {
        padding: 0 10px;
        color: black;
        background-color: transparent;
        border-color: transparent;
        transition: none;

        &.disabled {
            color: $gray;
        }

        &:hover {
            color: $white;
            background-color: $blue-light;

            &.disabled {
                color: $white;
                background-color: $blue-lighter;
            }
        }

        &.active {
            color: $white;
            background-color: $blue;
        }
    }

    .page-info,
    .page-size {
        margin-left: 15px;
        font-size: 11px;
        color: $gray-dark;

        .b-select {
            display: inline;

            input {
                width: 60px;
                font-size: 11px;
                text-align: center;
            }
        }
    }
}
</style>
