<template>
    <div class="comp-in-out">
        <comp-select/>
        <comp-select-array/>
    </div>
</template>

<script type="text/babel">
import CompSelect from './comp-select';
import CompSelectArray from './comp-select-array';

export default {
    name: 'CompInOut',

    components: {
        CompSelect,
        CompSelectArray
    }
};

</script>
