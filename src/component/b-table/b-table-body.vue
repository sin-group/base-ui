/*
 * @Author: pengmeng@yangqianguan.com
 * @Date: 2019-06-12 15:52:02
 * @Last Modified by: pengmeng@yangqianguan.com
 * @Last Modified time: 2019-06-14 17:29:17
 */

<template>
    <div class="b-table-body">
        <table :class="{'fixed-left':fixed==='left','fixed-right':fixed==='right'}" class="table">
            <colgroup>
                <col v-if="fixed!=='right'&&options.enableSelection">
                <col v-for="(colDef,key) in activeColDefs" :key="key" :name="colDef.field" :style="getColStyle(colDef)">
            </colgroup>
            <component :is="tbodyComponent" v-bind="tbodyProps" v-on="tbodyListeners">
                <tr
                    v-for="(record, index) in renderedRecords"
                    ref="rows"
                    :key="index"
                    :style="getRowStyle(index)"
                    :class="getRowClass(record, index)"
                    @mouseenter="handleMouseEnter(index)">
                    <td v-if="fixed!=='right'&&options.enableSelection" class="select-area">
                        <label>
                            <input
                                v-model="record.$$selected"
                                :disabled="record.$$disableSelect"
                                type="checkbox"
                                @change="onSelectChange(record)">
                        </label>
                    </td>

                    <td
                        v-for="colDef in activeColDefs"
                        :key="getCellKey(colDef)"
                        :style="getCellStyle(colDef)"
                    >
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
</template>

<script>

import {isFunc} from '../../util/check';
import {removeClass, addClass} from '../../util/dom';
import getValue from '../../util/get-value';
import {filterFuncMap} from '../../filter/filter';

import common from './mixin/common';

let uniqueCellKey = 1;

export default {
    name: 'BTableBody',
    mixins: [common],
    props: {
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
        },
        renderedRecords: {
            type: Array,
            default: () => []
        }
    },
    watch: {
        hoverIndex(newVal, oldVal) {
            let raf = window.requestAnimationFrame;
            if (!raf) {
                raf = fn => setTimeout(fn, 16);
            }
            raf(() => {
                const rows = this.$refs.rows;
                const oldRow = rows[oldVal];
                const newRow = rows[newVal];
                if (oldRow) {
                removeClass(oldRow, 'hover-row');
                }
                if (newRow) {
                addClass(newRow, 'hover-row');
                }
            });
        }
    },
    methods: {
        handleMouseEnter(index) {
            this.$emit('change-row', index);
        },

        onSelectChange(record) {
            const vm = this;
            vm.$emit('select-change', record);
        },

        getCellKey({field, enforceUpdateCell = false}) {
            uniqueCellKey += 1;
            return enforceUpdateCell ? `${field}${uniqueCellKey}` : field;
        },

        getCellValue(record, {field, filter, map = {}}) {
                const filterFunc = isFunc(filter) ? filter : filterFuncMap[filter];

                const valueRaw = getValue(record, field);
                const valueMapped = map[valueRaw] || valueRaw;
                const valueFiltered = filterFunc ? filterFunc(valueMapped) : valueMapped;
                const value = valueFiltered;

                return value;
        },
        getRowStyle(index) {
            const {rowsHeight} = this;
            return {...(rowsHeight.length > 0 ? {height: `${rowsHeight[index]}px`} : {})};
        },

        getRowClass(record, index) {
                const {renderedRecords, options: {genRowClass}} = this;
                return {
                    selected: record.$$selected,
                    ...(typeof genRowClass === 'function' ? genRowClass(record, index, renderedRecords) : {})
                };
            }

    }
};
</script>
