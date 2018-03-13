<template>
    <b-dialog :open="visible" title="" @close="close">
        <div class="message-modal-body">
            <p>{{ message }}</p>
        </div>

        <button slot="actions" class="simple lg" @click="confirm">{{ confirmText }}</button>
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
            confirmText: {
                type: String,
                required: true
            },
            options: {
                type: Object,
                default: () => {}
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
