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
    @import "../../../../style/variables.scss";

    .b-toast {
        z-index: $z-index-toast;
        height: 45px;
        line-height: 45px;
        padding: 0 24px;
        max-width: 568px;
        border-radius: 2px;
        background-color: rgba(0, 0, 0, .9);
        color: white;
        position: fixed;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
    }

    .INFO {
        background-color: green;
    }

    .ERROR {
        background-color: red;
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
