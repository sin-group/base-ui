%%Overview

用于输入文本

%%Basic

可以通过 `type` 参数来控制输入框的类型，默认为 `text`

%%BasicCode

```html
<template>
    <b-form-group label="Text (Default)">
        <b-input v-model="text"/>
    </b-form-group>

    <b-form-group label="Password">
        <b-input v-model="password" type="password"/>
    </b-form-group>

    <b-form-group label="Number">
        <b-input v-model="number" type="number"/>
    </b-form-group>

    <b-form-group label="E-mail">
        <b-input v-model="email" type="email"/>
    </b-form-group>

    <b-form-group label="Disabled">
        <b-input v-model="disabled" disabled/>
    </b-form-group>
</template>

<script>
    export default {
        data() {
            return {
                text: '',
                password: '',
                number: '',
                email: '',
                disabled: 'disabled text'
            };
        }
    };
</script>
```

%%MultiLine

参数 `multiLine` 默认为 `false`，此时的输入框为单行模式； 

若 props `multiLine` 为 `true`， 则输入框为多行模式，可以通过设置 props `rows` 和 `rowsMax` 来设置输入框的行数和最大行数；

%%MultiLineCode

```html
<template>
    <b-form-group label="Day Start">
        <b-input
            v-model="multiLineText"
            :rows="3"
            :rows-max="6"
            multi-line/>
    </b-form-group>
</template>

<script>
    export default {
        data() {
            return {
                multiLineText: ''
            };
        }
    };
</script>
```

%%Consistent

`b-input` 满足以下表单组件一致性要求：
* 组合 `b-form-group`
* 默认值
* `disbale`
* `name`
* `placeholder`

%%API

#### Props

|Name|Type|Desc|
|:-:|:-:|:-:|
|`disabled`|`Boolean`|是否禁用，默认为 `false`|
|`multi-line`|`Boolean`|是否为多行模式，默认为 `false`|
|`multi-line-height`|`Number`|props `multi-line` 为 `true` 时，输入框的行高，默认为 `22.5`|
|`multi-padding-bottom`|`Number`|props `multi-line` 为 `true` 时，输入框的 `padding-bottom`，默认为 `4`|
|`multi-padding-top`|`Number`|props `multi-line` 为 `true` 时，输入框的 `padding-top`，默认为 `4`|
|`name`|`String`|表单 name，默认为 `''`|
|`pattern`|`String`|验证输入字段的模式，默认为 `''`|
|`placeholder`|`String`|输入栏提示，默认为 `''`|
|`required`|`Boolean`|提交表单时是否必填，默认为 `false`|
|`rows`|`Number`|props `multi-line` 为 `true` 时，输入框的初始行数，默认为 `6`|
|`rows-max`|`Number`|props `multi-line` 为 `true` 时，输入框的最大行数，默认为 `10`|
|`trim`|`Boolean`|是否删除输入框两端的空白字符，默认为 `false`|
|`type`|`String`|输入框类型，默认为 `'text'`|
|`value`|`[String, Number]`|model value|


#### Events

|Name|Type|Desc|
|:-:|:-:|:-:|
|`blur`|`(value: any) => void`|model value, 获得键盘焦点时触发|
|`change`|`(value: any) => void`|model value, value 改变时触发|
|`click`|`(value: any) => void`|model value, 点击输入框时触发|
|`focus`|`(value: any) => void`|model value, 获得焦点时触发|
|`input`|`(value: any) => void`|model value, 输入内容时触发|
|`keyup`|`(value: any) => void`|model value, 按下 `up` 键时触发|
|`keydown`|`(value: any) => void`|model value, 按下 `down` 键时触发|
