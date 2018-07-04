<template>
    <div class="comp-output">
        <comp-input/>
        <comp-date/>
        <comp-date-string/>
        <comp-image/>
        <comp-switch/>
        <comp-form/>
        <comp-md-editor/>
    </div>
</template>

<script type="text/babel">
import CompDate from './comp-date';
import CompDateString from './comp-date-string';
import CompInput from './comp-input';
import CompImage from './comp-image';
import CompSwitch from './comp-switch';
import CompForm from './comp-form';
import CompMdEditor from './comp-md-editor';

export default {
    name: 'CompOutput',

    components: {
        CompDate,
        CompDateString,
        CompInput,
        CompImage,
        CompSwitch,
        CompForm,
        CompMdEditor
    }
};

</script>
