<template>
    <div class="select">
        <h4 class="heading">Select Array</h4>

        <div class="card">
            <form class="form-inline">
                <b-form-group label="Basic">
                    <b-select-array
                        v-model="editing.basic"
                        :list="SelectList"
                        text-field="name"
                        value-field="value"
                        placeholder="请选择"/>
                </b-form-group>
            </form>
        </div>

        <pre class="json-preview">{{ $j(editing) }}</pre>
    </div>
</template>

<script type="text/babel">
    const SelectList = [
        {name: 'バカ', value: '八嘎'},
        {name: '変態', value: '变态'},
        {name: 'うるさい', value: '无路赛'},
        {name: 'バカ，変態，うるさい', value: '但使龙城飞将在，八嘎变态无路赛！'}
    ];

    export default {
        name: 'CompSelect',

        data() {
            return {
                SelectList,

                editing: {
                    basic: ''
                }
            };
        }
    };

</script>
