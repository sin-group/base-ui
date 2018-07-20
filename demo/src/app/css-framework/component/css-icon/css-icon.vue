<template>
    <div class="css-icon">
        <div class="container">
            <div class="card">
                <div class="icon-wrap">
                    <div
                        v-b-clipboard="'b-icon-' + icon"
                        v-for="icon in IconList"
                        :key="icon"
                        class="icon-box"
                        @v-b-clipboard-success="copySuccess">
                        <i :class="'b-icon-' + icon" class="icon"></i>
                        <div class="icon-name">{{ icon }}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script type="text/babel">
    const IconList = [
        'reset',
        'chat',
        'search',
        'folder',
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
        'ban',
        'arrow-left',
        'arrow-right',
        'arrow-top',
        'arrow-bottom',
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
        'globe',
        'not-love',
        'chart',
        'book',
        'package',
        'pagelines',
        'language',
        'share',
        'eye',
        'user-manage',
        'user-search',
        'user-edit',
        'apple',
        'google',
        'google-plus',
        'facebook',
        'twitter',
        'linkedin',
        'github',
        'wechat',
        'qq',
        'weibo',
        'customer-service',
        'collapse-down',
        'collapse-up'
    ];

    export default {
        name: 'CssIcon',

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

                .icon {
                    display: inline-block;
                    margin: 10px;
                    font-size: 20px;
                }

                .icon-name {
                    font-size: 12px;
                    color: #999;
                }

                &:hover {
                    background-color: #eee;

                    .icon {
                        color: #3f51b5;
                    }

                    .icon-name {
                        color: #666;
                    }
                }
            }
        }
    }
</style>
