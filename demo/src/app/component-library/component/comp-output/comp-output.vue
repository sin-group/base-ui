<template>
    <div class="comp-output">
        <comp-input/>
        <comp-date/>
        <comp-image/>
        <comp-switch/>
        <comp-form/>
    </div>
</template>

<script type="text/babel">
import CompDate from './comp-date';
import CompInput from './comp-input';
import CompImage from './comp-image';
import CompSwitch from './comp-switch';
import CompForm from './comp-form';

export default {
    name: 'CompOutput',

    components: {
        CompDate,
        CompInput,
        CompImage,
        CompSwitch,
        CompForm
    }
};

</script>
