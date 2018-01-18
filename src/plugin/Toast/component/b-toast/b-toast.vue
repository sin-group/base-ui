<template>
    <transition name="b-toast-fade">
        <div class="b-toast" v-if="visible" :class="type">{{ message }}</div>
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

<style lang="scss" scoped>
    @import "../../../../style/variables.scss";

    .b-toast {
        z-index: $z-index-toast;
        height: 45px;
        line-height: 45px;
        padding: 0 24px;
        max-width: 568px;
        border-radius: 2px;
        background-color: $gray-dark;
        color: white;
        position: fixed;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
    }

    .SUCCESS {
        background-color: $green;
    }

    .ERROR {
        background-color: $red-light;
    }

    .b-toast-fade-enter-active,
    .b-toast-fade-leave-active {
        transition: opacity .36s cubic-bezier(.78, .14, .15, .86);
    }

    .b-toast-fade-enter,
    .b-toast-fade-leave-to {
        opacity: 0;
    }

    @media only screen and (min-width: 500px) {
        .b-toast {
            min-width: 10%;
            text-align: center;
            top: 13%;
            right: -3%;
            left: auto;
            bottom: auto;
        }
    }
</style>
