<template>
    <b-dialog :open="visible" title="Test Modal" @close="cancel">
        <div class="test-gulp-modal-body">
            <form class="form-block">
                <b-form-group label="Name">
                    <b-input v-model="name"></b-input>
                </b-form-group>

                <b-form-group label="Email">
                    <b-input type="email" v-model="email"></b-input>
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

    export default {
        name: 'test-gulp-modal',

        data() {
            return {
                visible: false,

                name: '',
                email: ''
            }
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

                vm.visible = false;
                vm.resolve('来自星星的青青');
            }
        },

        mounted() {
            const vm = this;
            vm.visible = true;
        }
    }
</script>
