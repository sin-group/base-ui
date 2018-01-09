<template>
    <div class="b-table">
        <table class="table">
            <thead>
                <tr>
                    <th v-for="colDef in options.colDefs">
                        {{ colDef.name }}
                    </th>
                </tr>
            </thead>

            <tbody>
                <tr v-for="record in records">
                    <td v-for="colDef in options.colDefs">
                        {{ getCellValue(record, colDef) }}
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script type="text/babel">

import {filterFuncMap} from '../../filter/filter';

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

    methods: {
        getCellValue(record, {field, filter: filterName, map = {}}) {
            const filterFunc = filterFuncMap[filterName];

            const valueRaw = record[field];
            const valueMapped = map[valueRaw] || valueRaw;
            const valueFiltered = !!filterFunc ? filterFunc(valueMapped) : valueMapped;
            const value = valueFiltered;

            return value;
        }
    }
};

</script>

<style lang="scss" rel="stylesheet/scss" scoped>
.b-table {
    box-shadow: 0 2px 1px -1px rgba(0,0,0,.2),0 1px 1px 0 rgba(0,0,0,.14),0 1px 3px 0 rgba(0,0,0,.12);
}
</style>
