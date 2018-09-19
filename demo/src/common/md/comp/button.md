%%Overview

适用于不同场景，可以定制不同样式的按钮

%%Basic

`b-button` 在被点击时会 emit `click` 事件。

%%BasicCode

```html
<template>
    <b-button @click="handleClick">来点我呀</button>
</template>

<script>
    export default {
        methods: {
            handleClick() {
                this.$toast.info('按钮被点击!');
            }
        }
    };
</script>
```

%%Style

可以通过设置 `b-button` 的 `class` 来适用于不同的用途，可选值有 `'normal'`、`'normal'`、`'danger'`。  
也可以通过设置 `btn-style` 来自定义按钮的样式。

%%StyleCode

```html
<template>
    <b-button @click="handleClick">Primary</b-button>
    <b-button class="normal" @click="handleClick">Normal</b-button>
    <b-button class="danger" @click="handleClick">Danger</b-button>
    <b-button @click="handleClick" diabled>Disabled</b-button>
    <b-button :btn-style="btnStyle" @click="handleClick">Customized</b-button>
</template>

<script>
    export default {
        data() {
            return {
                btnStyle: {
                    color: 'white',
                    backgroundColor: '#00bcd4',
                    border: 'none'
                }
            }
        },

        methods: {
            handleClick() {
                this.$toast.info('按钮被点击!');
            }
        }
    };
</script>
```

%%Size

可以通过设置 `b-button` 的 `size` 属性来改变按钮的大小，可选值为 `'sm'`、`'md'`、`'lg'`，默认为 `'md'`。

%%SizeCode

```html
<template>
     <div class="button-line">
        <b-button size="sm" @click="handleClick">Primary</b-button>
        <b-button class="normal" size="sm" @click="handleClick">Normal</b-button>
        <b-button class="danger" size="sm" @click="handleClick">Danger</b-button>
        <b-button size="sm" @click="handleClick" diabled>Disabled</b-button>
    </div>

    <div class="button-line">
        <b-button size="sm" @click="handleClick">Primary</b-button>
        <b-button class="normal" size="sm" @click="handleClick">Normal</b-button>
        <b-button class="danger" size="sm" @click="handleClick">Danger</b-button>
        <b-button size="sm" @click="handleClick" diabled>Disabled</b-button>
    </div>

    <div class="button-line">
        <b-button size="lg" @click="handleClick">Primary</b-button>
        <b-button class="normal" size="lg" @click="handleClick">Normal</b-button>
        <b-button class="danger" size="lg" @click="handleClick">Danger</b-button>
        <b-button size="lg" @click="handleClick" diabled>Disabled</b-button>
    </div>
</template>

<script>
    export default {
        methods: {
            handleClick() {
                this.$toast.info('按钮被点击!');
            }
        }
    };
</script>
```

%%Shape

可以通过设置 `b-button` 的 `shaple` 属性来改变按钮的形状，可选值为 `'round'`、`'icon'`、`'simple'`、`'link'`。

%%ShapeCode

```html
<template>
     <div class="button-line">
        <b-button size="sm" @click="handleClick">Default</b-button>
        <b-button shape="round" size="sm" @click="handleClick">Round</b-button>
        <b-button shape="icon" size="sm" @click="handleClick">
            <i class="b-icon-love"></i>
        </b-button>
        <b-button shape="simple" size="sm" @click="handleClick">Simple</b-button>
        <b-button shape="link" size="sm" @click="handleClick">Link</b-button>
    </div>
    <div class="button-line">
        <b-button @click="handleClick">Default</b-button>
        <b-button shape="round" @click="handleClick">Round</b-button>
        <b-button shape="icon" @click="handleClick">
            <i class="b-icon-love"></i>
        </b-button>
        <b-button shape="simple" @click="handleClick">Simple</b-button>
        <b-button shape="link" @click="handleClick">Link</b-button>
    </div>
    <div class="button-line">
        <b-button size="lg" @click="handleClick">Default</b-button>
        <b-button shape="round" size="lg" @click="handleClick">Round</b-button>
        <b-button shape="icon" size="lg" @click="handleClick">
            <i class="b-icon-love"></i>
        </b-button>
        <b-button shape="simple" size="lg" @click="handleClick">Simple</b-button>
        <b-button shape="link" size="lg" @click="handleClick">Link</b-button>
    </div>
</template>

<script>
    export default {
        methods: {
            handleClick() {
                this.$toast.info('按钮被点击!');
            }
        }
    };
</script>
```

%%Consistent

`b-button` 满足以下表单组件一致性要求：
* 组合 `b-form-group`
* `disbale`
* `name`

%%API

#### Props

|Name|Type|Desc|
|:-:|:-:|:-:|
|`autofocus`|`Boolean`|是否自动地获得焦点， 默认为 `false`|
|`btn-style`|`Object`|自定义按钮的样式|
|`disabled`|`Boolean`|是否禁用，默认为 `false`|
|`shape`|`String`|按钮的形状，可选值为 `'icon'`、`'link'`、`'round'`、`'simple'`|
|`size`|`String`|按钮的大小，可选值为 `'sm'`、`'md'`、`'lg'`，默认为 `'md'`|
|`name`|`String`|button name，默认为 `null`|
|`type`|`String`|按钮的类型，可选值为 `'button'`、`'reset'`、`'submit'`|

#### Events

|Name|Type|Desc|
|:-:|:-:|:-:|
|`click`|`(value: any) => void`|model event, 点击按钮时触发|
