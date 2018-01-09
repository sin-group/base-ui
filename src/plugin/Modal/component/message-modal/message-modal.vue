<template>
    <div class="modal" v-if="visible">
        <b-dialog :open="visible" :title="title">
            <div class="message-modal-body">
                <p>{{ message }}</p>
            </div>

            <button slot="actions" class="simple" @click="close">{{ confirmText }}</button>
        </b-dialog>
    </div>
</template>

<script>
    import BDialog from '../../../../component/b-dialog';

    export default {
        name: 'info-modal',

        components: {
            BDialog
        },

        data() {
            return {
                confirmText: '',
                visible: false,
                message: '',
                title: ''
            };
        },

        methods: {
            close() {
                const vm = this;
                vm.visible = false;
                vm.resolve();
            }
        }
    };

</script>
