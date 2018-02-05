<template>
    <div class="css-icon">
        <div class="container">
            <div class="card">
                <div class="icon-wrap">
                    <div class="icon-box"
                         v-b-clipboard="'b-icon-' + icon"
                         @v-b-clipboard-success="copySuccess"
                         v-for="icon in IconList">
                        <i class="icon" :class="'b-icon-' + icon"></i>
                        <div class="icon-name">{{ icon }}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script type="text/babel">
    const IconList = [
        'bold',
        'italic',
        'header',
        'code',
        'more',
        'compress',
        'setting',
        'expand',
        'link',
        'info',
        'underline',
        'ordered-list',
        'unordered-list',
        'image',
        'left',
        'right',
        'refresh',
        'quote',
        'download',
        'upload',
        'copy',
        'user',
        'trash',
        'adjust',
        'send',
        'love',
        'filter',
        'emotion',
        'equation',
        'bell',
        'power',
        'create',
        'phone',
        'qr-code',
        'split',
        'camera',
        'detail',
        'edit',
        'github',
        'globe',
        'not-love',
        'chart',
        'book',
        'package',
        'pagelines',
        'language',
        'share'
    ];

    export default {
        name: 'css-icon',

        data() {
            return {
                IconList
            };
        },

        methods: {
            copySuccess(data) {
                const vm = this;

                vm.$toast.info(`'${data}' saved to clipboard!`);
            }
        }
    };

</script>

<style lang="scss" rel="stylesheet/scss" scoped>
    .css-icon {
        .icon-wrap {
            display: flex;
            padding: 10px;
            justify-content: center;
            flex-wrap: wrap;

            .icon-box {
                display: inline-block;
                width: 110px;
                height: 70px;
                padding: 10px;
                margin-bottom: 5px;
                text-align: center;
                transition: .1s;
                cursor: pointer;

                &:hover {
                    background-color: #eee;

                    .icon {
                        color: #3f51b5;
                    }

                    .icon-name {
                        color: #666;
                    }
                }

                .icon {
                    display: inline-block;
                    margin: 10px;
                    font-size: 20px;
                }

                .icon-name {
                    font-size: 12px;
                    color: #999;
                }
            }
        }
    }
</style>
