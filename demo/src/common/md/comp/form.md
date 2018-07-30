%%Overview

表单组件（对应原生 `form` 元素），用于容纳一系列（符合表单一致性要求的）表单组件/元素，并提供表单行为

%%Basic

`b-form` 需要 props `options` 指定内部表单项；`options` 是一个对象，形如：

```javascript
{
    fieldDefs: [
        {field: 'keyword', label: '关键词'},
        {field: 'priority', label: '优先级', type: 'select', props: {
            map: {
                low: '低',
                middle: '中',
                high: '高'
            }
        }}
    ]
}
```

其中 `fieldDefs` 是一个数组，每项元素包含了表示表单项的信息：
* `label`: `form-group` 的标识
* `field`: 表单字段，对应表单 `data` 的属性，在该表单中 **唯一**
* `type`: 表单项类型，默认为 `text`，每个类型会对应一种组件或元素渲染，目前支持：
    * `text`: `b-input`
    * `select`: `b-select`
    * `select-array`: `b-select-array`
    * `select-cascader`: `b-select-cascader`
    * `date`: `b-date`
    * `date-string`: `b-date-string`
    * `switch`: `b-switch`
    * `br`: `<br>`，as expected，用于换行
* `props`: 透传到表单项组件的 `props`

这样，操作表单项将会向外部 emit `change` 事件并更新外部 `data` 对象

%%BasicCode

```html
<template>
    <b-form v-model="data" :options="options"></b-form>
</template>

<script>
    const options = {
        fieldDefs: [
            {label: '关键词', field: 'keyword'},
            {label: '优先级', field: 'priority', type: 'select', props: {
                map: {
                    low: '低',
                    middle: '中',
                    high: '高'
                }
            }}
        ]
    };

    export default {
        data() {
            return {
                data: {},
                options
            };
        }
    };
</script>
```

%%Event

改变表单项内容将会向外传递 `change` 事件，有时我们希望表单向外触发其他的行为，例如告诉外部提交表单，重置表单内容或执行搜索

此时可以在 `options` 中增加按钮并绑定一个 `event`，该 `event` 将被 emit 到 `b-form` 外层

```javascript
{
    ...
    btnDefs: [
        {text: 'Reset', event: 'reset', props: {class: 'normal'}} // reset for instance
    ]
    ...
}
```

%%EventCode

```html
<template>
    <b-form v-model="data"
            :options="options"
            @reset="reset"></b-form>
</template>

<script>
    const options = {
        fieldDefs: [
            fieldDefs: [
                {label: '日期', field: 'date', type: 'date'}
            ],
            btnDefs: [
                {text: 'Reset', event: 'reset', props: {class: 'normal'}}
            ]
        ]
    };

    export default {
        data() {
            return {
                data: {},
                options
            };
        },

        methods: {
            reset() {
                this.data = {};
            }
        }
    };
</script>
```

%%Fold

当表单项过长时可收起部分表单项，向用户展示主要的表单内容

设置 `options` 下的 `mainFieldCount` 可设定希望默认展示最大的表单项长度

%%FoldCode

```html
<template>
    <b-form v-model="data"
            :options="options"></b-form>
</template>

<script>
    const options = {
        mainFieldCount: 4,
        fieldDefs: [
            {label: '表单项 1', field: 'item1'},
            {label: '表单项 2', field: 'item2'},
            {label: '表单项 3', field: 'item3'},
            {label: '表单项 4', field: 'item4'},
            {label: '表单项 5', field: 'item5'},
            {label: '表单项 6', field: 'item6'},
            {label: '表单项 7', field: 'item7'}
        ]
    };

    export default {
        data() {
            return {
                data: {},
                options
            };
        }
    };
</script>
```

%%CustomizedElement

一些时候表单配置项存在没有覆盖的 `type` 或者表达力受限，我们可以使用表单项 `slot` 来自定义它们

注意到该 `slot name` 与配置项中的 `field` 需保持匹配

%%%%CustomizedElementCode

```html
<template>
    <b-form v-model="demo.custom"
            :options="CustomOptions">
        <div slot="myComp" slot-scope="scope">
            <b-form-group label="我的组件">
                <button @click="$toast.info(scope)">This is my component, let me check scope info</button>
            </b-form-group>
        </div>
    </b-form>
</template>

<script>
    const options = {
        fieldDefs: [
            {label: '我的组件', field: 'myComp'}
        ]
    };

    export default {
        data() {
            return {
                data: {},
                options
            };
        }
    };
</script>
```

%%Style

`b-form` 包含三种展示类型（实际上是 `form` 的展示类型）：
* `.form-inline`：默认，表单项横向排列，内部纵向排列（小屏幕 fallback 到 `.form-block`）
* `.form-block`：表单项纵向排列，内部纵向排列
* `.form-block-horizontal`：表单项纵向排列，内部横向排列（小屏幕 fallback 到 `.form-block`）

%%StyleCode

```html
<template>
    <p><code>.form-inline (Default)</code></p>
    <b-form v-model="data"
            :options="options"
            @reset="reset">
    </b-form>

    <p><code>.form-block</code></p>
    <b-form v-model="data"
            :options="options"
            class="form-block"
            @reset="reset">
    </b-form>

    <p><code>.form-block-horizontal</code></p>
    <b-form v-model="data"
            :options="options"
            class="form-block-horizontal"
            @reset="reset">
    </b-form>
</template>

<script>
    const options = {
        fieldDefs: [
            {label: '名称', field: 'name'},
            {label: '科目层级', field: 'level', type: 'select', props: {
                map: {
                    one: '一级',
                    two: '二级',
                    three: '三级'
                }
            }}
        ],
        btnDefs: [
            {text: 'Reset', event: 'reset', props: {class: 'normal'}}
        ]
    };

    export default {
        data() {
            return {
                data: {},
                options
            };
        },

        methods: {
            reset() {
                this.data = {};
            }
        }
    };
</script>
```

%%Consistent

如你所见，我们之所以能在配置项中以如此统一的方式配置表单内容，表单元素满足表单一致性是其必要条件。总结下来，表单一致性包含以下基本要求：

* 支持传递默认值
* `disbale`
* `name`
* `placeholder`
* `reset`

以及视觉统一性要求

* 组合 `b-form-group`

%%API

#### Props

|Name|Type|Desc|
|:-:|:-:|:-:|
|`data`|`Object`|model value|
|`options`|`Object`|表单配置项|

#### Events

|Name|Type|Desc|
|:-:|:-:|:-:|
|`change`|`(data: Object, field: String) => void`|model event, 改变表单内容时触发|