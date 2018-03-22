<template>
    <b-dialog :open="visible" :title="title" @close="close">
        <div class="message-modal-body">
            <p>{{ message }}</p>
        </div>

        <button slot="actions" class="simple lg" @click="close">取消</button>
        <button slot="actions" class="simple lg" @click="confirm">确认</button>
    </b-dialog>
</template>

<script>
    import BDialog from '../../../../component/b-dialog';

    export default {
        name: 'InfoModal',

        components: {
            BDialog
        },

        props: {
            message: {
                type: String,
                required: true
            },
            title: {
                type: String,
                default: () => ''
            }
        },

        data() {
            return {
                visible: false
            };
        },

        methods: {
            close() {
                const vm = this;
                vm.visible = false;
                vm.reject();
            },

            confirm() {
                const vm = this;
                vm.visible = false;
                vm.resolve();
            }
        }
    };

</script>
