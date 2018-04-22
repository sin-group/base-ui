<template>
    <div class="b-md-view" v-html="mdHtml"></div>
</template>

<script type="text/babel">
    import Prism from '../../util/prism';
    import marked from '../../util/marked';

    marked.setOptions({
        highlight: (code, lang) => {
            const langGrammar = Prism.languages[lang] || Prism.languages.javascript;

            return Prism.highlight(code, langGrammar, lang);
        }
    });

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
