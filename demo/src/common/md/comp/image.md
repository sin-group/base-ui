%%Overview

选择与预处理图片，产出可用于 `FormData` 上传的图片对象

%%Basic

基础的 `b-image` 无需依赖配置项

点击图片会 emit `change` 事件，并将图片对象更新至 `value`

%%BasicCode

```html
<template>
    <b-image v-model="basic"></b-image>
</template>

<script>
    export default {
        data() {
            return {
                basic: null
            };
        }
    };
</script>
```

%%Consistent

`b-date-string` 满足以下表单组件一致性要求：
* 组合 `b-form-group`
* 默认值
* `disbale`
* `name`
* `placeholder`
* `reset`

%%API

#### Props

|Name|Type|Desc|
|:-:|:-:|:-:|
|`value`|`String`|model value|
|`name`|`String`|表单 name，默认为 `''`|
|`disabled`|`Boolean`|是否禁用，默认为 `false`|
|`placeholder`|`String`|输入栏提示，默认为 `''`|
|`enableReset`|`Boolean`|是否可重置，默认为 `true`|

#### Events

|Name|Type|Desc|
|:-:|:-:|:-:|
|`change`|`(value: any) => void`|model value, 图片改变时触发|