<template>
    <div class="toast" v-if="visible">
        <transition name="b-toast">
            <div class="b-toast" :class="type">{{ message }}</div>
        </transition>
    </div>
</template>

<script>
    import ToastType from '../../constant/ToastType';

    export default {
        data() {
            return {
                visible: false,
                message: '',
                type: ToastType.INFO
            };
        }
    };

</script>

<style>
</style>
