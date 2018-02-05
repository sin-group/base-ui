<template>
    <div class="comp-view">
        <comp-table></comp-table>
        <comp-pagination></comp-pagination>
        <comp-md-view></comp-md-view>
    </div>
</template>

<script type="text/babel">
    import CompMdView from './comp-md-view';
    import CompPagination from './comp-pagination';
    import CompTable from './comp-table';

    export default {
        name: 'comp-view',

        components: {
            CompMdView,
            CompPagination,
            CompTable
        }
    };

</script>
