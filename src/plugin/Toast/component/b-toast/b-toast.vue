<template>
    <transition name="b-toast-fade">
        <div v-if="visible" :class="type" class="b-toast">{{ message }}</div>
    </transition>
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
