<template>
    <div class="b-md-view" v-html="mdHtml"/>
</template>

<script type="text/babel">
    import marked from '../../util/marked';

    export default {
        name: 'BMdView',

        props: {
            mdText: {
                type: String,
                required: true
            }
        },

        computed: {
            mdHtml() {
                const vm = this;
                const {mdText} = vm;

                if (!mdText) return '';

                return marked(mdText);
            }
        }
    };
</script>

<style lang="scss" rel="stylesheet/scss">
    @import '../../style/variables.scss';

    .b-md-view {
        padding: 10px 20px;
        color: $gray-dark;

        h1:first-child {
            margin-top: 0.5em;
        }

        ul,
        ol {
            padding-left: 20px;
            margin-bottom: 20px;
            list-style-position: outside;

            li {
                list-style: inherit;
                line-height: 1.3em;
                margin-bottom: 5px;
            }
        }

        hr {
            margin-bottom: 20px;
        }
    }
</style>
