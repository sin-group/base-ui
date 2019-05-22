<template>
    <div class="select">
        <h4 class="heading">Select</h4>

        <div class="card">
            <form class="form-inline">
                <b-form-group label="Basic">
                    <b-select v-model="editing.basic" :map="SelectMap" placeholder="请选择"/>
                </b-form-group>

                <b-form-group label="Selected">
                    <b-select v-model="editing.selected" :map="SelectedMap"/>
                </b-form-group>

                <b-form-group label="Keyboard Control">
                    <b-select v-model="editing.upDown" :map="UpDownMap"/>
                </b-form-group>

                <b-form-group label="Multiple">
                    <b-select v-model="editing.multiple" :map="SelectMap" multiple/>
                </b-form-group>

                <b-form-group label="Disabled">
                    <b-select v-model="editing.disabled" :map="UpDownMap" disabled/>
                </b-form-group>
            </form>
            <pre class="json-preview">{{ $j(editing) }}</pre>
            <div class="case">
                <h3>API</h3>
                <b-md-view :md-text="MD.CompSelectAPI"/>
            </div>
        </div>
    </div>
</template>


<script type="text/babel">
    import MD from '../../../common/md';

    const SelectMap = {
        'バカ': {text: '混蛋', filter: 'hundan1'},
        '変態': {text: '变态', filter: 'biantai2'},
        'うるさい': {text: '吵死了', filter: 'chaosile3'},
        'バカ，変態，うるさい': {text: '但使龙城飞将在，八嘎变态无路赛！无路赛！无路赛！无路赛！无路赛！无路赛！无路赛！', filter: 'danshilongchengfeijiangzai4'}
    };

    const SelectedMap = {
        艾露西: '来选一个吧，保证没有空的',
        哈克娅: '来选一个吧，保证没有空的',
        鲇川天理: '点什么点，都不是你的',
        高原步美: '来选一个吧，保证没有空的',
        青山美生: '都不是你的',
        中川花音: '点什么点，都不是你的',
        汐宫栞: '来选一个吧，保证没有空的',
        九条月夜: '来选一个吧，保证没有空的',
        日永梨枝子: '来选一个吧，保证没有空的'
    };

    const UpDownMap = {
        1: '1',
        2: '2',
        3: '3',
        4: '4',
        5: '5',
        6: '6',
        7: '7',
        8: '8',
        9: '9',
        10: '10',
        11: '11',
        12: '12',
        13: '13',
        14: '14',
        15: '15',
        16: '16',
        17: '17',
        18: '18'
    };

    export default {
        name: 'CompSelect',

        data() {
            return {
                MD,
                SelectMap,
                SelectedMap,
                UpDownMap,

                editing: {
                    basic: '',
                    selected: '青山美生',
                    upDown: '',
                    disabled: '1',
                    multiple: null
                }
            };
        }
    };

</script>
