<template>
    <div class="comp-pagination">
        <h4 class="heading">Pagination</h4>

        <div class="card">
            <b-pagination
                v-model="pagination"
                @on-change="onChange"/>
        </div>
    </div>
</template>

<script type="text/babel">

    export default {
        name: 'CompPagination',

        data() {
            return {
                pagination: {
                    pageNo: 1,
                    pageSize: 10,
                    total: 101
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
