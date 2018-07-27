<template>
    <div class="comp-md-view">
        <h4 class="heading">Markdown View</h4>

        <div class="card">
            <b-md-view :md-text="mdText"/>
        </div>
    </div>
</template>

<script type="text/babel">
    import mdSampleText from './sample.md';

    export default {
        name: 'CompMdView',

        data() {
            return {
                mdText: mdSampleText
            };
        }
    };

</script>
