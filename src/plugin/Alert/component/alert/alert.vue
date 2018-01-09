<template>
    <b-dialog :open="visible" :title="title" @close="close">
        {{ message }}
        <button slot="actions" class="simple" @click="close">确定</button>
    </b-dialog>
</template>

<script>
    import BDialog from '../../../../component/b-dialog';
    import AlertType from '../../constant/AlertType';

    export default {
        components: {
            BDialog
        },

        data() {
            return {
                visible: false,
                type: AlertType.INFO,
                message: '',
                title: ''
            };
        },

        methods: {
            close() {
                const vm = this;
                vm.visible = false;
            }
        }
    }
</script>

<style>
</style>
