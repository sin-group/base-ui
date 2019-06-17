/*
 * @Author: pengmeng@yangqianguan.com
 * @Date: 2019-06-12 11:39:53
 * @Last Modified by: pengmeng@yangqianguan.com
 * @Last Modified time: 2019-06-14 17:18:57
 */

export default {
    props: {
        options: {
            type: Object,
            default: () => {}
        },

        fixed: {
            type: [String, Boolean],
            default: false
        },

        hoverIndex: {
            type: Number,
            default: null
        },
        rowsHeight: {
            type: Array,
            default: () => []
        }
    },

    computed: {
        enableSort() {
            const {options: {enableClientSort, enableServerSort}} = this;
            return enableClientSort || enableServerSort;
        },

        activeColDefs() {
            const vm = this;
            const {options: {colDefs}} = vm;
            if (!vm.fixed) return colDefs;
            return colDefs.filter(item => vm.fixed === item.fixed);
        }
    },
    methods: {

        isShowSortIcon(field) {
            const {enableSort, sortInfo: {supportFields = []}} = this;
            if (!enableSort) return false;
            if (!supportFields.length) return true;

            return supportFields.includes(field);
        },

        getColStyle({minWidth, maxWidth, width}) {
            return {
                ...(minWidth ? {minWidth: `${minWidth}px`} : {}),
                ...(maxWidth ? {maxWidth: `${maxWidth}px`} : {}),
                ...(width ? {width: `${width}px`} : {width: '150px'})
            };
        },

        getCellStyle({minWidth, maxWidth}) {
            return {
                ...(minWidth ? {minWidth: `${minWidth}px`} : {}),
                ...(maxWidth ? {maxWidth: `${maxWidth}px`} : {})
            };
        }

    }
};
