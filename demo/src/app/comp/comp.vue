<template>
    <div class="container">
        <transition name="slide-fade" mode="out-in">
            <router-view/>
        </transition>
    </div>
</template>

<script>

export default {
    name: 'Comp'
};

</script>

<style lang="scss">
    .json-preview {
        margin: 20px 0 10px;
        padding: 10px;
        background-color: #eee;
        border: 1px solid #ccc;
        border-radius: 4px;
    }
</style>
