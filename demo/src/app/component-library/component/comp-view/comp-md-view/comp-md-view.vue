<template>
    <div class="comp-md-view">
        <h4 class="heading-light">Markdown View</h4>

        <div class="card">
            <b-md-view :md-text="mdText"></b-md-view>
        </div>
    </div>
</template>

<script type="text/babel">
    import mdSampleText from './sample.md';

    export default {
        name: 'comp-md-view',

        data() {
            return {
                mdText: mdSampleText
            };
        }
    };

</script>

<style lang="scss" rel="stylesheet/scss" scoped>
    .comp-md-view {
    }
</style>
