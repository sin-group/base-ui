<template>
    <div class="b-select-cascader-menu">
        <div class="card select-wrap">
            <div v-for="(selectingList, level) in selectingLists" :key="level" class="select-list">
                <div
                    v-for="selecting in selectingList"
                    :key="selecting.label"
                    :class="{selected: isItemSelected(selecting, level), disabled: selecting.disabled}"
                    class="select-item"
                    @click="choose(selecting, level)">
                    {{ selecting.label }}
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    export default {
        name: 'BSelectCascaderMenu',

        props: {
            value: {
                type: null,
                required: true
            },
            list: {
                type: Array,
                required: true
            },
            options: {
                type: Object,
                default: () => ({})
            },
            enableEmitList: {
                type: Boolean,
                default: false
            }
        },

        data() {
            return {
                selectedList: []
            };
        },

        computed: {
            selectingLists() {
                const {list, selectedList} = this;
                const selectingLists = [list];

                let curList = list;
                selectedList.forEach(({label}) => {
                    const next = curList.find(item => item.label === label);
                    if (next && next.children && next.children.length) {
                        curList = next.children;
                        selectingLists.push(curList);
                    }
                });

                return selectingLists;
            }
        },

        mounted() {
            const {value} = this;
            this.selectedList = [...value];
        },

        methods: {
            choose(selecting, level) {
                const vm = this;

                if (selecting.disabled) return;

                const {selectedList} = vm;
                const tailNum = selectedList.length - level;

                vm.selectedList[level] = selecting;
                vm.selectedList.splice(level + 1, tailNum);
                vm.$emit('choose', vm.selectedList);
            },

            isItemSelected({label}, level) {
                const {selectedList} = this;
                if (!selectedList[level]) return false;

                return selectedList[level].label === label;
            }
        }
    };

</script>

