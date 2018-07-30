%%Overview

用于选择日期，默认输出对应日期的字符串字面量（eg: `'1993-09-17'`）；区别于 `b-date`，该选择器与时区无关（用户看到的年月日信息与模型相同），可用于选择生日，记账等场景

%%Basic

基础的 `b-date-string` 无需依赖配置项，交互同 `b-date`

点击任意日期会 emit `change` 事件，并将 `YYYY-MM-DD` 格式的字符串更新至 `value`

%%BasicCode

```html
<template>
    <b-date-string v-model="basic"></b-date>
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
|`placeholder`|`String`|表单项提示，默认为 `''`|
|`enableReset`|`Boolean`|是否可重置，默认为 `true`|

#### Events

|Name|Type|Desc|
|:-:|:-:|:-:|
|`change`|`(value: String) => void`|model event, 点击时间面板时触发，产出 `YYYY-MM-DD` 型字符串|