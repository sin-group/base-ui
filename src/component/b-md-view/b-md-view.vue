<template>
    <div class="b-md-view" v-html="mdHtml"></div>
</template>

<script type="text/babel">
    import marked from '../../util/marked';

    export default {
        name: 'b-md-view',

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

<style lang="scss" rel="stylesheet/scss" scoped>
    @import '../../style/variables.scss';

    .b-md-view {
        h1:first-child {
            margin-top: 0.5em;
        }

        ul,
        ol {
            padding-left: 20px;
            list-style-position: outside;

            li {
                list-style: inherit;
                margin-bottom: 5px;
            }
        }
    }
</style>
