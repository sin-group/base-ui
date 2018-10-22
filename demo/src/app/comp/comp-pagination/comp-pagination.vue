<template>
    <div class="comp-pagination">
        <div class="doc card">
            <div class="overview">
                <h2>
                    <span class="title">分页</span>
                    <code>b-pagination</code>
                </h2>
                <b-md-view :md-text="MD.CompPaginationOverview"/>
            </div>

            <div class="case">
                <h3>基本用法</h3>
                <b-md-view :md-text="MD.CompPaginationBasic"/>

                <demo-box>
                    <div slot="code">
                        <b-md-view :md-text="MD.CompPaginationBasicCode"/>
                    </div>
                    <div slot="main">
                        <b-pagination v-model="editing.basic" @on-change="onChange"/>
                    </div>
                </demo-box>
            </div>

            <div class="case">
                <h3>大小</h3>
                <b-md-view :md-text="MD.CompPaginationSize"/>

                <demo-box>
                    <div slot="code">
                        <b-md-view :md-text="MD.CompPaginationSizeCode"/>
                    </div>
                    <div slot="main">
                        <b-form-group label="Normal" class="pagination-line">
                            <b-pagination v-model="editing.size" @on-change="onChange"/>
                        </b-form-group>
                        <b-form-group label="Small" class="pagination-line">
                            <b-pagination v-model="editing.size" size="sm" @on-change="onChange"/>
                        </b-form-group>
                    </div>
                </demo-box>
            </div>

            <div class="case">
                <h3>展示模式</h3>
                <b-md-view :md-text="MD.CompPaginationMode"/>

                <demo-box>
                    <div slot="code">
                        <b-md-view :md-text="MD.CompPaginationModeCode"/>
                    </div>
                    <div slot="main">
                        <b-form-group label="Finite" class="pagination-line">
                            <b-pagination v-model="editing.size" @on-change="onChange"/>
                        </b-form-group>
                        <b-form-group label="Infinite" class="pagination-line">
                            <b-pagination v-model="editing.size" mode="infinite" @on-change="onChange"/>
                        </b-form-group>
                    </div>
                </demo-box>
            </div>

            <div class="case">
                <h3>API</h3>
                <b-md-view :md-text="MD.CompPaginationAPI"/>
            </div>
        </div>
    </div>
</template>

<script type="text/babel">
    import MD from '../../../common/md';

    export default {
        name: 'CompPagination',

        data() {
            return {
                MD,
                editing: {
                    basic: {
                        pageNo: 1,
                        pageSize: 10,
                        total: 101
                    },
                    size: {
                        pageNo: 1,
                        pageSize: 10,
                        total: 101
                    }
                }
            };
        },

        methods: {
            onChange(pagination) {
                const vm = this;

                vm.$toast.info(`Current Page is ${pagination.pageNo}`);
            }
        }
    };

</script>
<style lang="scss" scoped>
.pagination-line {
    display: block;
    margin: 10px 0;
}
</style>

