<template>
    <div class="comp-output">
        <comp-input></comp-input>
        <comp-date></comp-date>
        <comp-switch></comp-switch>
    </div>
</template>

<script type="text/babel">
import CompDate from './comp-date';
import CompInput from './comp-input';
import CompSwitch from './comp-switch';

export default {
    name: 'comp-output',

    components: {
        CompDate,
        CompInput,
        CompSwitch
    }
};

</script>

<style lang="scss" rel="stylesheet/scss" scoped></style>
