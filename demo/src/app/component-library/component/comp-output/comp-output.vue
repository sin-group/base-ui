<template>
    <div class="comp-output">
        <comp-input/>
        <comp-date/>
        <comp-date-string/>
        <comp-image/>
        <comp-switch/>
        <comp-form/>
    </div>
</template>

<script type="text/babel">
import CompDate from './comp-date';
import CompDateString from './comp-date-string';
import CompInput from './comp-input';
import CompImage from './comp-image';
import CompSwitch from './comp-switch';
import CompForm from './comp-form';

export default {
    name: 'CompOutput',

    components: {
        CompDate,
        CompDateString,
        CompInput,
        CompImage,
        CompSwitch,
        CompForm
    }
};

</script>
