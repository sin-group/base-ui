%%Overview

轻巧的图片预览组件，用来方便查看一系列图片

%%Basic

`props` 接收一个图片数组 `image-list`，数组每个元素形如：

```
{
    uri // 可以是 base64 编码的 String 或远端图片资源 url
}
```

`b-image-gallery` 即可帮你 handle 该列图片的预览。

%%BasicCode

```html
<template>
    <b-image-gallery :image-list="imageList"/>
</template>

<script>
    export default {
        data() {
            return {
                imageList: [
                    {uri: 'https://ws1.sinaimg.cn/large/a51018d9ly1fwa3f021xij21hc0u0b29.jpg'},
                    {uri: 'https://ws1.sinaimg.cn/large/a51018d9ly1fwa3eyikq6j20g00a0q3g.jpg'},
                    {uri: 'https://ws1.sinaimg.cn/large/a51018d9ly1fwa3f380luj24yd20kqva.jpg'},
                    {uri: 'https://ws1.sinaimg.cn/large/a51018d9ly1fwa3eyits8j20dw09qmxy.jpg'},
                    {uri: 'https://ws1.sinaimg.cn/large/a51018d9ly1fwa3ezmol1j218a0q9b1y.jpg'},
                    {uri: 'https://ws1.sinaimg.cn/large/a51018d9ly1fwa3f1b3mdj218g0p0b2a.jpg'},
                    {uri: 'https://ws1.sinaimg.cn/large/a51018d9ly1fwa3f00ck4j20zk0k07qs.jpg'},
                    {uri: 'https://ws1.sinaimg.cn/large/a51018d9ly1fwa3f1fyukj21z4140b2a.jpg'},
                    {uri: 'https://ws1.sinaimg.cn/large/a51018d9ly1fwa3ezzci0j215o0tjtsa.jpg'},
                    {uri: 'https://ws1.sinaimg.cn/large/a51018d9ly1fwa3ezx5vej20k00rs1d8.jpg'},
                    {uri: 'https://ws1.sinaimg.cn/large/a51018d9ly1fwa3eyqr8mj218g0p013b.jpg'},
                    {uri: 'https://ws1.sinaimg.cn/large/a51018d9ly1fwa3ez1u4cj20xc0j0167.jpg'}
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
|`image-list`|`Array`|图片数组，必填|