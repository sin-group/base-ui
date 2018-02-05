<template>
    <div class="comp-pagination">
        <h4 class="heading-light">Pagination</h4>

        <div class="card">
            <b-pagination :pagination="pagination"
                          @on-change="onChange"></b-pagination>
        </div>
    </div>
</template>

<script type="text/babel">

    export default {
        name: 'comp-pagination',

        data() {
            return {
                pagination: {
                    pageNo: 1,
                    pageSize: 10,
                    total: 101
                }
            }
        },

        methods: {
            onChange(pagination) {
                const vm = this;

                vm.$toast.info(`Current Page is ${pagination.pageNo}`);
            }
        }
    };

</script>

<style lang="scss" rel="stylesheet/scss" scoped>
    .comp-pagination {
    }
</style>
