<template>
    <b-dialog :open="visible" title="View Record" @close="cancel">
        <div class="view-record-modal-body">
            <pre class="json-preview">{{ $j(record) }}</pre>
        </div>

        <button slot="actions" class="simple lg" @click="cancel()">取消</button>
        <button slot="actions" class="simple lg" @click="confirm()">确定</button>
    </b-dialog>
</template>

<script type="text/babel">
    export default {
        name: 'ViewRecordModal',

        props: {
            record: {
                type: Object,
                default: () => {}
            }
        },

        data() {
            return {
                visible: false
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
                vm.visible = false;
                vm.resolve();
            }
        }
    };
</script>
