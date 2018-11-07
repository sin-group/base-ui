%%Overview

简单封装版本的可以在输入后回车生成多个标签的输入框

%%Basic

`v-model` 接收一个字符串数组

%%BasicCode

```html
<template>
    <b-tag-input v-model"tags"/>
</template>

<script>
    export default {
        data() {
            return {
                tags: [
                    '标签1', '标签2', '标签3'
                ]
            };
        }
    };
</script>
```

%%API

#### Props

|Name|Type|Desc|
|:-:|:-:|:-:|
|`v-model`|`Array`|字符串数组|