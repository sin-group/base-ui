%%Overview

一种用来分页的组件，推荐与表格结合使用。

%%Basic

基础的 `b-pagination` 需要传递  `pagination` 参数，

其中，`pagination` 是一个对象，包含 3 个 key ： `pageNo`、 `pageSize` 和 `total`，分别代表当前页数、每页展示的条数、总条数。  

一个 `pagination` 的例子：  

```
{
    pageNo: 1,
    pageSize: 10,
    total: 101
}
```

%%BasicCode

```html
<template>
    <b-pagination 
        v-model="pagination" 
        @on-change="onChange"/>
</template>

<script>
    export default {
        data() {
            return {
                pagination: {
                    pageNo: 1,
                    pageSize: 10,
                    total: 101
                }
            };
        },

        methods: {
            onChange(pagination) {
                const vm = this;

                vm.$toast.info(`Current Page is ${pagination.pageNo}`);
            }
        }
    };
</script>
```

%%Size

可以通过 `size` 参数来改变 `b-pagination` 的大小和样式，可选值有 `'sm'` 和 `'normal'`，默认为 `'normal'`。  

在屏幕较小时，会自动转变为 `'sm'` 的大小。

%%SizeCode

```html
<template>
    <div  class="pagination-line">
        <b-pagination v-model="pagination" @on-change="onChange"/>
    </div>
    <div  class="pagination-line">
        <b-pagination v-model="pagination" size="sm" @on-change="onChange"/>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                pagination: {
                    pageNo: 1,
                    pageSize: 10,
                    total: 101
                }
            };
        },

        methods: {
            onChange(pagination) {
                const vm = this;

                vm.$toast.info(`Current Page is ${pagination.pageNo}`);
            }
        }
    };
</script>
```

%%Mode

可以通过 `mode` 参数来改变 `b-pagination` 的页码展示模式，可选值有 `'infinite'` 和 `'finite'`，默认为 `'finite'`。  

在 `size` 为 `'sm'` 时， 自动展示为 `'finite'` 模式。

%%ModeCode

```html
<template>
    <div  class="pagination-line">
        <b-pagination v-model="pagination" @on-change="onChange"/>
    </div>
    <div  class="pagination-line">
        <b-pagination v-model="pagination" mode="infinite" @on-change="onChange"/>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                pagination: {
                    pageNo: 1,
                    pageSize: 10,
                    total: 101
                }
            };
        },

        methods: {
            onChange(pagination) {
                const vm = this;

                vm.$toast.info(`Current Page is ${pagination.pageNo}`);
            }
        }
    };
</script>
```

%%API

#### Props

|Name|Type|Desc|Default|
|:-:|:-:|:-:|:-:|
|`mode`|`String`|页码展示模式|`'finite'`|
|`pagination`|`Object`|分页数据|`{}`|
|`size`|`String`|大小|`'normal'`|

#### Events

|Name|Type|Desc|
|:-:|:-:|:-:|
|`on-change`|`({pageNo: Number, pageSize: Number, total: Number}) => void`|翻页或切换每页行数时触发|
