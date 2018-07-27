<template>
    <div>
        <transition name="slide-fade" mode="out-in">
            <router-view class="view"/>
        </transition>
    </div>
</template>

<script>
    export default {
        name: 'CssFramework'
    };
</script>
