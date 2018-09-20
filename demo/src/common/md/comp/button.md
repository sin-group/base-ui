%%Overview

适用于不同场景，可以定制不同样式的按钮

%%Basic

`b-button` 在被点击时会 emit `click` 事件。

%%BasicCode

```html
<template>
    <b-button @click="handleClick">来点我呀</button>
    <b-button @click="handleClick" diabled>Disabled</b-button>
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

%%Theme

可以通过设置 `b-button` 的 `theme` 属性来适用于不同的用途，可选值有 `'normal'`、`'primary'`、`'danger'`，默认为 `'normal'`。  

%%ThemeCode

```html
<template>
    <b-button @click="handleClick">Normal</b-button>
    <b-button theme="primary" @click="handleClick">Primary</b-button>
    <b-button theme="danger" @click="handleClick">Danger</b-button>
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

%%Size

可以通过设置 `b-button` 的 `size` 属性来改变按钮的大小，可选值为 `'sm'`、`'md'`、`'lg'`，默认为 `'md'`。

%%SizeCode

```html
<template>
     <div class="button-line">
        <b-button size="sm" @click="handleClick">Normal</b-button>
        <b-button theme="primary" size="sm" @click="handleClick">Primary</b-button>
        <b-button theme="danger" size="sm" @click="handleClick">Danger</b-button>
        <b-button size="sm" @click="handleClick" diabled>Disabled</b-button>
    </div>

    <div class="button-line">
        <b-button size="sm" @click="handleClick">Normal</b-button>
        <b-button theme="primary" size="sm" @click="handleClick">Primary</b-button>
        <b-button theme="danger" size="sm" @click="handleClick">Danger</b-button>
        <b-button size="sm" @click="handleClick" diabled>Disabled</b-button>
    </div>

    <div class="button-line">
        <b-button size="lg" @click="handleClick">Normal</b-button>
        <b-button theme="primary" size="lg" @click="handleClick">Primary</b-button>
        <b-button theme="danger" size="lg" @click="handleClick">Danger</b-button>
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

可以通过设置 `b-button` 的 `shape` 属性来改变按钮的形状，可选值为 `'block'`、`'normal'`、`'round'`、`'icon'`、`'simple'`、`'link'`，默认为 `'normal'`。

%%ShapeCode

```html
<template>
     <div class="button-line">
        <b-button size="sm" @click="handleClick">Normal</b-button>
        <b-button shape="round" size="sm" @click="handleClick">Round</b-button>
        <b-button shape="icon" size="sm" @click="handleClick">
            <i class="b-icon-love"></i>
        </b-button>
        <b-button shape="simple" size="sm" @click="handleClick">Simple</b-button>
        <b-button shape="link" size="sm" @click="handleClick">Link</b-button>
    </div>
    <div class="button-line">
        <b-button @click="handleClick">Normal</b-button>
        <b-button shape="round" @click="handleClick">Round</b-button>
        <b-button shape="icon" @click="handleClick">
            <i class="b-icon-love"></i>
        </b-button>
        <b-button shape="simple" @click="handleClick">Simple</b-button>
        <b-button shape="link" @click="handleClick">Link</b-button>
    </div>
    <div class="button-line">
        <b-button size="lg" @click="handleClick">Normal</b-button>
        <b-button shape="round" size="lg" @click="handleClick">Round</b-button>
        <b-button shape="icon" size="lg" @click="handleClick">
            <i class="b-icon-love"></i>
        </b-button>
        <b-button shape="simple" size="lg" @click="handleClick">Simple</b-button>
        <b-button shape="link" size="lg" @click="handleClick">Link</b-button>
    </div>
    <div class="button-line">
        <b-button shape="block" size="sm" @click="handleClick">Block</b-button>
    </div>
    <div class="button-line">
        <b-button shape="block" @click="handleClick">Block</b-button>
    </div>
    <div class="button-line">
        <b-button shape="block" size="lg" @click="handleClick">Block</b-button>
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

%%Style

可以通过设置 `btn-style` 来自定义按钮的样式。

%%StyleCode

```html
<template>
    <b-button @click="handleClick">Normal</b-button>
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
|`name`|`String`|button name，默认为 `null`|
|`shape`|`String`|按钮的形状，可选值为 `'block'`、`'normal'`、`'icon'`、`'link'`、`'round'`、`'simple'`，默认为 `'normal'`|
|`size`|`String`|按钮的大小，可选值为 `'sm'`、`'md'`、`'lg'`，默认为 `'md'`|
|`theme`|`String`|按钮的主题，可选值为 `'normal'`、`'danger'`、`'primary'`，默认为 `'normal'`|
|`type`|`String`|按钮的类型，可选值为 `'button'`、`'reset'`、`'submit'`，默认为 `'submit'`|

#### Events

|Name|Type|Desc|
|:-:|:-:|:-:|
|`click`|`(value: any) => void`|model event, 点击按钮时触发|
