<template>
    <div class="comp-view">
        <comp-table/>
        <comp-pagination/>
        <comp-md-view/>
        <comp-tree/>
        <comp-tab/>
    </div>
</template>

<script type="text/babel">
    import CompMdView from './comp-md-view';
    import CompPagination from './comp-pagination';
    import CompTab from './comp-tab';
    import CompTable from './comp-table';
    import CompTree from './comp-tree';

    export default {
        name: 'CompView',

        components: {
            CompMdView,
            CompPagination,
            CompTab,
            CompTable,
            CompTree
        }
    };

</script>
