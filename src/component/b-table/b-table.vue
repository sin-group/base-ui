<template>
    <div class="b-table">
        <table class="table">
            <thead>
                <tr>
                    <th v-for="colDef in options.colDefs">
                        <div class="filter-area"></div>

                        <span class="sort-click-area"
                              :class="{'enabled-click': options.enableClientSort}"
                              @click="toggleSort(colDef.field)">
                            {{ colDef.name }}

                            <div class="sort-area">
                                <div v-if="options.enableClientSort"
                                     class="sort-icon"
                                     :class="{
                                        'sort-icon-up': sortInfo.field === colDef.field && sortInfo.order === OrderType.ASC,
                                        'sort-icon-down': sortInfo.field === colDef.field && sortInfo.order === OrderType.DESC
                                     }"></div>
                            </div>
                        </span>
                    </th>
                </tr>
            </thead>

            <tbody>
                <tr v-for="record in renderedRecords">
                    <td v-for="colDef in options.colDefs">
                        {{ getCellValue(record, colDef) }}
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script type="text/babel">

import {OrderType, NextOrderType} from '../../constant/OrderConf';
import {filterFuncMap} from '../../filter/filter';
import {genSortedRecords} from './helper/helper';

export default {
    name: 'b-table',

    props: {
        options: {
            type: Object,
            default: {}
        },
        records: {
            type: Array,
            default: []
        }
    },

    data() {
        return {
            OrderType,

            sortInfo: {
                field: '',
                order: OrderType.NONE
            }
        }
    },

    computed: {
        sortedRecords() {
            const vm = this;
            const {records, options: {enableClientSort = false}, sortInfo: {field, order}} = vm;

            if (!enableClientSort) return records;

            return genSortedRecords(records, field, order);
        },

        renderedRecords() {
            const vm = this;
            const {sortedRecords} = vm;

            return sortedRecords;
        }
    },

    methods: {
        getCellValue(record, {field, filter: filterName, map = {}}) {
            const filterFunc = filterFuncMap[filterName];

            const valueRaw = record[field];
            const valueMapped = map[valueRaw] || valueRaw;
            const valueFiltered = !!filterFunc ? filterFunc(valueMapped) : valueMapped;
            const value = valueFiltered;

            return value;
        },

        toggleSort(field) {
            const vm = this;
            const {options: {enableClientSort}, sortInfo: {order, field: originFiled}} = vm;

            if (!enableClientSort) return;

            vm.sortInfo.field = field;
            vm.sortInfo.order = originFiled === field ? NextOrderType[order] : OrderType.DESC;
        }
    },

    mounted() {
        const vm = this;
        const {options: {
            enableClientSort = false,

            sortInfo
        }} = vm;

        if (enableClientSort && sortInfo) vm.sortInfo = sortInfo;
    }
};

</script>

<style lang="scss" rel="stylesheet/scss" scoped>
.b-table {
    box-shadow: 0 2px 1px -1px rgba(0,0,0,.2),0 1px 1px 0 rgba(0,0,0,.14),0 1px 3px 0 rgba(0,0,0,.12);
}
</style>
