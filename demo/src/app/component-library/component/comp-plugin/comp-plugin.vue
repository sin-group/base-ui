<template>
    <div class="plugin">
        <h4 class="heading">Toast</h4>
        <div class="card">
            <button @click="toastError">Error</button>
            <button @click="toastSuccess">Success</button>
            <button @click="toastInfo">Info</button>
        </div>

        <h4 class="heading">Alert</h4>
        <div class="card">
            <button @click="alert">Alert</button>
        </div>

        <h4 class="heading">Modal</h4>
        <div class="card">
            <button @click="modal">Customized Modal</button>
            <button @click="messageModal">Message Modal</button>
        </div>

        <h4 class="heading">Tooltip</h4>
        <div class="card">
            <button v-b-tooltip="'i`m tooltip!'">Hover Me</button>
        </div>
    </div>
</template>

<script type="text/babel">
    import TestGulpModal from './modal/test-gulp-modal';

    export default {
        name: 'CompPlugin',

        data() {
            return {
                value1: true
            };
        },

        methods: {
            toastInfo() {
                const vm = this;
                vm.$toast.info('Please stand firm and hold the handrail.');
            },

            toastSuccess() {
                const vm = this;
                vm.$toast.success('Success!');
            },

            toastError() {
                const vm = this;
                vm.$toast.error('You shall not pass');
            },

            alert() {
                const vm = this;
                vm.$alert.success('Dialog Content', 'Title');
            },

            modal() {
                const vm = this;
                vm.$modal.open(TestGulpModal).then((resolve) => {
                    vm.$toast.info(resolve);
                }).catch(x => x);
            },

            messageModal() {
                const vm = this;
                vm.$modal.openMessageModal('You are reading the message', 'Notice').catch(x => x);
            }
        }
    };
</script>
