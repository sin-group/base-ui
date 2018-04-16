<template>
    <div class="comp-output">
        <comp-input/>
        <comp-date/>
        <comp-switch/>
        <comp-form/>
    </div>
</template>

<script type="text/babel">
import CompDate from './comp-date';
import CompInput from './comp-input';
import CompSwitch from './comp-switch';
import CompForm from './comp-form';

export default {
    name: 'CompOutput',

    components: {
        CompDate,
        CompInput,
        CompSwitch,
        CompForm
    }
};

</script>
