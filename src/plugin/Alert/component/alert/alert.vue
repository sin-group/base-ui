<template>
    <b-dialog :open="visible" :title="title" @close="close">
        {{ message }}
        <button slot="actions" class="simple" @click="close">确定</button>
    </b-dialog>
</template>

<script>
    import AlertType from '../../constant/AlertType';

    export default {
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
