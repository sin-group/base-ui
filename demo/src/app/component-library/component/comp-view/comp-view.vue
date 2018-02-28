<template>
    <div class="comp-view">
        <comp-table/>
        <comp-pagination/>
        <comp-md-view/>
        <comp-tree/>
    </div>
</template>

<script type="text/babel">
    import CompMdView from './comp-md-view';
    import CompPagination from './comp-pagination';
    import CompTable from './comp-table';
    import CompTree from './comp-tree';

    export default {
        name: 'CompView',

        components: {
            CompMdView,
            CompPagination,
            CompTable,
            CompTree
        }
    };

</script>
