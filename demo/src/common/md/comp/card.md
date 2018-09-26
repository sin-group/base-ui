%%Overview

卡片可以包含各种图片、文字、链接、按钮等元素和信息，它的宽度固定，高度由内部元素的高度决定

%%Basic

基础的 `b-card` 一般分成 `b-card-header`、`b-card-body`、`b-card-footer` 三个部分。

其中, 可以在 `b-card-header` 中自定义 `header-action`。

%%BasicCode

```html
<template>
    <b-card>
        <b-card-header title="孔乙己" sub-title="鲁迅">
            <div slot="header-action">
                <div v-b-click-outside="closePopper">
                    <b-button shape="icon" @click="openPopper">
                        <i class="b-icon-more"></i>
                    </b-button>
                    <b-popper :visible="isPopperVisible">
                        <div class="action-card">
                            <div class="action-group">
                                <button class="action-bar">
                                    编辑 <i class="b-icon-edit"></i>
                                </button>
                                <button class="action-bar">
                                    删除 <i class="b-icon-trash"></i>
                                </button>
                            </div>
                        </div>
                    </b-popper>
                </div>
            </div>
        </b-card-header>
        <b-card-body>{{ sample }}</b-card-body>
        <b-card-footer>
            <b-button shape="icon" size="sm">
                <i class="b-icon-love"></i>
            </b-button>
            <b-button shape="icon" size="sm">
                <i class="b-icon-share"></i>
            </b-button>
            <b-button shape="icon" size="sm">
                <i class="b-icon-info"></i>
            </b-button>
        </b-card-footer>
    </b-card>
</template>

<script>
    export default {
        data() {
            return {
                isPopperVisiable: false,
                sample: `孔乙己睁大眼睛说，“你怎么这样凭空污人清白……”“什么清白？我前天亲眼见
                        你偷了何家的书，吊着打。”孔乙己便涨红了脸，额上的青筋条条绽出，争辩
                        道，“窃书不能算偷……窃书！……读书人的事，能算偷么？”接连便是难懂的话，
                        什么“君子固穷”，什么“者乎”之类，引得众人都哄笑起来。`
            }
        },

        methods: {
            closePopper() {
                this.isPopperVisible = false;
            },

            openPopper() {
                this.isPopperVisible = true;
            }
        }
    };
</script>
```

%%Media

在使用 `b-card` 组件时，我们经常有展示图片的需求，可以通过在组件 `b-card-media` 中放入图片来实现。

%%MediaCode

```html
<template>
    <b-card>
        <b-card-header title="Card Title" sub-title="Sub Title"/>
        <b-card-body>
            <b-card-media title="数码宝贝" sub-title="八神太一">
                <img src="./constant/img/childhood.jpg"/>
            </b-card-media>
        </b-card-body>
        <b-card-footer>
            <b-button shape="icon">
                <i class="b-icon-love"></i>
            </b-button>
            <b-button shape="icon">
                <i class="b-icon-share"></i>
            </b-button>
            <b-button shape="icon">
                <i class="b-icon-info"></i>
            </b-button>
        </b-card-footer>
    </b-card>
</template>
```

%%Clickable

在使用 `b-card` 组件时，我们可以通过设置其 `clickable` 属性为 `true` 来使:

- 卡片可点击，可以绑定 `click` 事件
- 可以绑定 `mouseover` 、 `mouseout` 、`mouseenter` 、 `mouseleave`  事件
- 在 `hover` 时有样式变化。

%%ClickableCode

```html
<template>
    <b-card clickable @click="handleClick">
        <b-card-header title="Card Title" sub-title="Sub Title"/>
        <b-card-body>
            <b-card-media title="数码宝贝" sub-title="八神太一">
                <img src="./constant/img/childhood.jpg"/>
            </b-card-media>
        </b-card-body>
        <b-card-footer>
            <b-button shape="icon">
                <i class="b-icon-love"></i>
            </b-button>
            <b-button shape="icon">
                <i class="b-icon-share"></i>
            </b-button>
            <b-button shape="icon">
                <i class="b-icon-info"></i>
            </b-button>
        </b-card-footer>
    </b-card>
</template>
<script>
    export default {
        methods: {
            handleClick() {
                const vm = this;
                vm.$toast.info('卡片被点击');
            }
        }
    };
</script>
```

%%Size

可以通过设置 `b-card` 的 `size` 属性来改变卡片的宽度，可选值为 `'sm'`、`'md'`、`'lg'`，默认为 `'md'`。

%%SizeCode

```html
<template>
     <div>
        <b-card size="sm">
            <b-card-header title="孔乙己" sub-title="鲁迅"/>
            <b-card-body>{{ sample }}</b-card-body>
            <b-card-footer>
                <b-button shape="icon">
                    <i class="b-icon-love"></i>
                </b-button>
                <b-button shape="icon">
                    <i class="b-icon-share"></i>
                </b-button>
                <b-button shape="icon">
                    <i class="b-icon-info"></i>
                </b-button>
            </b-card-footer>
        </b-card>
    </div>
    <div>
        <b-card>
            <b-card-header title="孔乙己" sub-title="鲁迅"/>
            <b-card-body>{{ sample }}</b-card-body>
            <b-card-footer>
                <b-button shape="icon">
                    <i class="b-icon-love"></i>
                </b-button>
                <b-button shape="icon">
                    <i class="b-icon-share"></i>
                </b-button>
                <b-button shape="icon">
                    <i class="b-icon-info"></i>
                </b-button>
            </b-card-footer>
        </b-card>
    </div>
    <div>
        <b-card size="lg">
            <b-card-header title="孔乙己" sub-title="鲁迅"/>
            <b-card-body>{{ sample }}</b-card-body>
            <b-card-footer>
                <b-button shape="icon">
                    <i class="b-icon-love"></i>
                </b-button>
                <b-button shape="icon">
                    <i class="b-icon-share"></i>
                </b-button>
                <b-button shape="icon">
                    <i class="b-icon-info"></i>
                </b-button>
            </b-card-footer>
        </b-card>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                sample: `孔乙己睁大眼睛说，“你怎么这样凭空污人清白……”“什么清白？我前天亲眼见
                        你偷了何家的书，吊着打。”孔乙己便涨红了脸，额上的青筋条条绽出，争辩
                        道，“窃书不能算偷……窃书！……读书人的事，能算偷么？”接连便是难懂的话，
                        什么“君子固穷”，什么“者乎”之类，引得众人都哄笑起来。`
            }
        }
    };
</script>
```

%%Consistent

`b-card` 满足以下表单组件一致性要求：
* 组合 `b-form-group`
* `name`

%%API

#### Props - b-card

|Name|Type|Desc|
|:-:|:-:|:-:|
|`clickable`|`Boolean`|是否可点击，默认为 `false`|
|`name`|`String`|button name，默认为 `null`|
|`size`|`String`|卡片的大小，可选值为 `'sm'`、`'md'`、`'lg'`，默认为 `'md'`|

#### Props - b-card-header

|Name|Type|Desc|
|:-:|:-:|:-:|
|`title`|`String`|标题，默认为 `''`|
|`sub-title`|`String`|标题，默认为 `''`|

#### Props - b-card-media

|Name|Type|Desc|
|:-:|:-:|:-:|
|`title`|`String`|标题，默认为 `''`|
|`sub-title`|`String`|标题，默认为 `''`|

#### Events

|Name|Type|Desc|
|:-:|:-:|:-:|
|`click`|`(value: any) => void`|model event, 点击按钮时触发|
|`mouseenter`|`(value: any) => void`|model event, 鼠标移入时触发|
|`mouseleave`|`(value: any) => void`|model event, 鼠标移出时触发|
|`mouseout`|`(value: any) => void`|model event, 鼠标移出时触发, 冒泡模式|
|`mouseover`|`(value: any) => void`|model event, 鼠标移入时触发, 冒泡模式|
