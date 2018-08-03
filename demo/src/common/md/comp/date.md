%%Overview

用于选择日期，默认输出对应日期的 timestamp

%%Basic

基础的 `b-date` 无需依赖配置项，默认在日期 panel 中选中当前日期（轻点年月指示按钮可选择年月）

点击任意日期会 emit `change` 事件，并更新 value 至该日期 timestmap 值

%%BasicCode

```html
<template>
    <b-date v-model="basic"></b-date>
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

%%Round

参数 `roundMode` 默认为 `'normal'`，输出 timestamp 值； 

若 props `roundMode` 为 `'dayStart'`， 输出该日期当地时区第一秒（00:00:00）的 timestamp 值； 

若 props `roundMode` 为 `'dayEnd'`， 则输出该日期当地时区最后一秒（23:59:59）timestmap 值

%%RoundCode

```html
<template>
    <b-form-group label="Normal (Default)">
        <b-date v-model="normal"/>
    </b-form-group>

    <b-form-group label="Day Start">
        <b-date v-model="dayStart" round-mode="dayStart"/>
    </b-form-group>

    <b-form-group label="Day End">
        <b-date v-model="dayEnd" round-mode="dayEnd"/>
    </b-form-group>
</template>

<script>
    export default {
        data() {
            return {
                normal: null,
                dayStart: null,
                dayEnd: null
            };
        }
    };
</script>
```

%%Format

`format` 决定输出时间格式；默认为标准 Unix timestamp；若 `format` 为 `Function`，输出值将为 `Format Function` 的返回值（注意，该函数的返回值需为合适的 `Date` 构造函数参数）

若为 `String`，则返回该 `String` 对应规则函数的返回值，目前 `String` 的值支持：`ISO`

%%FormatCode

```html
<template>
    <b-form-group label="Function Format">
        <b-date v-model="formatFunction" :format="getDate"></b-date>
    </b-form-group>

    <b-form-group label="String Format">
        <b-date v-model="formatString" format="ISO"></b-date>
    </b-form-group>
</template>

<script>
    const getDate = (timestamp) => (new Date(timestamp)).toJSON().slice(0, 10);

    export default {
        data() {
            return {
                getDate,
                formatFunction: null,
                formatString: null
            };
        }
    };
</script>
```

%%Consistent

`b-date` 满足以下表单组件一致性要求：
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
|`value`|`Number String`|model value|
|`name`|`String`|表单 name，默认为 `''`|
|`disabled`|`Boolean`|是否禁用，默认为 `false`|
|`placeholder`|`String`|表单项提示，默认为 `''`|
|`format`|`String Function`|输出格式|
|`enableReset`|`Boolean`|是否可重置，默认为 `true`|
|`roundMode`|`String`|Round 模式，默认为 `'normal'`|

#### Events

|Name|Type|Desc|
|:-:|:-:|:-:|
|`change`|`(value: any) => void`|model event, 点击时间面板时触发，格式可随 format 定制，默认为 `Number` 类型的 Unix Timestamp|