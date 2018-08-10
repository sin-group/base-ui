%%Overview

用于选择日期和时间，默认输出对应日期和时间的 timestamp

%%Basic

基础的 `b-date-time` 无需依赖配置项，默认在日期 panel 中选中当前日期（轻点年月指示按钮可选择年月）

点击任意日期会 emit `change` 事件，并更新 value 至该日期零点零时零分的 timestmap 值，

点击时间选择器会 emit `change` 事件，并更新 value 至当前选择日期和时间的 timestamp 值

%%BasicCode

```html
<template>
    <b-date-time v-model="basic"></b-date-time>
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

`b-date-time` 满足以下表单组件一致性要求：
* 组合 `b-form-group`
* 默认值
* `disbale`
* `name`
* `reset`

%%API

#### Props

|Name|Type|Desc|
|:-:|:-:|:-:|
|`value`|`Number String`|model value|
|`name`|`String`|表单 name，默认为 `''`|
|`disabled`|`Boolean`|是否禁用，默认为 `false`|
|`enableReset`|`Boolean`|是否可重置，默认为 `true`|

#### Events

|Name|Type|Desc|
|:-:|:-:|:-:|
|`change`|`(value: any) => void`|model event, 选择日期或时间时触发，格式为 `Number` 类型的 Unix Timestamp|