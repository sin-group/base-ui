<template>
    <b-dialog :open="visible" title="Test Modal" @close="cancel">
        <div class="test-gulp-modal-body">
            <form class="form-block">
                <b-form-group label="Name">
                    <b-select v-model="name" :map="SelectedMap"/>
                </b-form-group>

                <b-form-group label="Email">
                    <b-input v-model="email" type="email"/>
                </b-form-group>
            </form>
        </div>

        <button slot="actions" class="simple lg" @click="cancel()">Cancel</button>
        <button slot="actions" class="simple lg" @click="confirm()">Confirm</button>
    </b-dialog>
</template>

<script type="text/babel">
    const ValidOptions = [
        {
            name: 'Name',
            field: 'name',
            required: true
        },
        {
            name: 'E-Mail',
            field: 'email',
            required: true,
            rule: 'email',
            message: 'E-mail 格式不正确'
        }
    ];

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

    export default {
        name: 'TestGulpModal',

        data() {
            return {
                SelectedMap,

                visible: false,

                name: '',
                email: ''
            };
        },

        mounted() {
            const vm = this;
            vm.visible = true;
        },

        methods: {
            cancel() {
                const vm = this;
                vm.visible = false;
                vm.reject();
            },

            confirm() {
                const vm = this;
                if (!vm.$valid.checkOptions(vm, ValidOptions)) return;

                vm.resolve('来自星星的青青');
            }
        }
    };
</script>
