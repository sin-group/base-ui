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

<style lang="scss" scoped>
    @import "../../../../style/variables.scss";

    $TOAST_ALPHA: .9;

    .b-toast {
        position: fixed;
        left: 50%;
        top: 50%;
        padding: 10px 20px;
        max-width: 568px;
        transform: translate(-50%, -50%);
        z-index: $z-index-toast;
        line-height: 1.2em;
        text-align: center;
        border-radius: 4px;
        background-color: rgba($gray-dark, $TOAST_ALPHA);
        box-shadow: 0 2px 1px -1px rgba(0, 0, 0, .2), 0 1px 1px 0 rgba(0, 0, 0, .14), 0 1px 3px 0 rgba(0, 0, 0, .12);
        color: white;
    }

    .SUCCESS {
        background-color: rgba($green, $TOAST_ALPHA);
    }

    .ERROR {
        background-color: rgba($red-light, $TOAST_ALPHA);
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
            position: fixed;
            top: 5vh;
            right: 3vw;
            left: auto;
            bottom: auto;
            transform: none;
            min-width: 10vw;
            max-width: 20vw;
            text-align: center;
        }
    }
</style>
