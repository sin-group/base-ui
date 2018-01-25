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
        background-color: $gray-dark;
        color: white;
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
            position: absolute;
            top: 10vh;
            right: -3vw;
            left: auto;
            bottom: auto;
            min-width: 10%;
            text-align: center;
        }
    }
</style>
