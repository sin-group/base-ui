/*
 * @Author: pengmeng@yangqianguan.com
 * @Date: 2019-06-12 15:53:10
 * @Last Modified by: pengmeng@yangqianguan.com
 * @Last Modified time: 2019-06-14 17:29:30
 */
<template>
    <div class="b-table-header">
        <table :class="{'fixed-left':fixed==='left','fixed-right':fixed==='right'}" class="table">
            <colgroup>
                <col v-if="fixed!=='right'&&options.enableSelection">
                <col v-for="(colDef,key) in activeColDefs" :key="key" :name="colDef.field" :style="getColStyle(colDef)">
            </colgroup>
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
                    <th v-if="fixed!=='right'&&options.enableSelection" class="select-area">
                        <label>
                            <input
                                v-model="isSelected"
                                type="checkbox"
                                @change="onSelect">
                        </label>
                    </th>

                    <th
                        v-for="colDef in activeColDefs"
                        :key="colDef.field"
                        :style="getCellStyle(colDef)"
                    >
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
        </table>
    </div>
</template>

<script>
import common from './mixin/common';
import {OrderType, NextOrderType} from '../../constant/OrderConf';

export default {
    name: 'BTableHeader',
    mixins: [common],
    props: {
        isAllSelected: {
            type: Boolean,
            default: false
        },
        sortInfo: {
            type: Object,
            default: () => ({
                field: '',
                order: OrderType.NONE
            })
        }

    },
    data() {
        return {
            isSelected: false
        };
    },
    watch: {
        isAllSelected(val) {
            const vm = this;
            vm.isSelected = val;
        }
    },
    methods: {
        onSelect() {
            const vm = this;
            vm.$emit('select-all-change', vm.isSelected);
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
                sortInfo: {order: originOrder, field: originFiled}
            } = vm;

            if (vm.isShowSortIcon(field)) {
                const order = originFiled === field ? NextOrderType[originOrder] : OrderType.DESC;
                vm.$emit('toogle-sort', {field, order});
            }
        }


    }
};
</script>
