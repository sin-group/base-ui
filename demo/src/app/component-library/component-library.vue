<template>
    <div class="container">
        <router-view></router-view>
    </div>
</template>

<script>

export default {
    name: 'component-library'
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
