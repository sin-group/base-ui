<template>
    <div class="comp-in-out">
        <comp-select></comp-select>
    </div>
</template>

<script type="text/babel">
import CompSelect from './comp-select';

export default {
    name: 'comp-in-out',

    components: {
        CompSelect
    }
};

</script>

<style lang="scss" rel="stylesheet/scss" scoped>
.comp-in-out {
}
</style>
