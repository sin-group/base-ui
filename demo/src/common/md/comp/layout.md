%%Overview

`b-layout` 通常放置于根组件，用于方便提供页面外层框架结构与功能。其内部可使用 `slot` 组合导航栏，页面 header、content 与 footer。

Noted：`b-layout` 尽可能提供足够通用的布局，但它不是必要的；当你的自定义需求超越了 `b-layout` 能提供的功能时，你应该自己实现最外层布局。

%%NavTop

一种通用的布局是 header-body 结构，将导航放在页面顶端，用户可以最大限度利用屏幕宽度，同时也可在最醒目的位置找到导航项；这种布局适用于功能项较少且明确的场景。

`b-layout` 通过组合 `b-nav-top` 可实现顶部导航布局：

```html
<b-layout>
    <div slot="header">
        <b-nav-top :routes="routes">
            <div slot="left">My App</div>
            <div slot="right"><i class="b-icon-github"></i></div>
        </b-nav-top>
    </div>

    <div slot="content">
        <div class="center-block">
            main content
        </div>
    </div>
</b-layout>
```

其中 `routes` 是标准的 Vue-Router 接收的 [routes](https://router.vuejs.org/api/#routes) 数组。如果需要展示 route，需设置该 route 的 `meta.navTitle`，形如:

```
[
    {
        name: 'Component',
        meta: {
            navTitle: 'Component'
        },
        children: [
            {
                name: 'CompLayout',
                meta: {
                    navTitle: 'Layout'
                }
            },
            {
                name: 'CompMdEditor',
                meta: {
                    navTitle: 'Markdown Editor'
                }
            }
        ]
    }
]
```

`b-nav-top` 将为你自动 handle 导航栏的渲染。

%%NavTopCode

```html
<template>
    <b-layout>
        <div slot="header">
            <b-nav-top :routes="routes">
                <div slot="left">My App</div>
                <div slot="right"><i class="b-icon-github"></i></div>
            </b-nav-top>
        </div>

        <div slot="content">
            <div class="center-block top-demo">
                main content
            </div>
        </div>
    </b-layout>
</template>

<script>
    const routes = [
        {
            name: 'Component',
            meta: {
                navTitle: 'Component'
            },
            children: [
                {
                    name: 'CompLayout',
                    meta: {
                        navTitle: 'Layout'
                    }
                },
                {
                    name: 'CompMdEditor',
                    meta: {
                        navTitle: 'Markdown Editor'
                    }
                }
            ]
        }
    ];

    export default {
        data() {
            return {
                routes
            };
        }
    };
</script>
```

%%HeaderNavSide

通常一些中后台功能项可能随时扩展，这时候我们需要一种扩展性更强的布局方式，这就是侧边栏布局（也是 BaseUI 站点所采用的布局方式）。

`b-layout` 通过如下方式组合 `b-header` 与 `b-nav-side` 来实现侧边栏布局：

```html
<b-layout
    :is-nav-open="isNavOpen"
    @nav-open-change="setNavOpen">
    <div slot="header">
        <b-header/> // header go here
    </div>

    <div slot="side-left">
        <b-nav-side/> // nav side go here
    </div>

    <div slot="content">
        // main content go here
    </div>
</b-layout>
```

其中，`b-header` 形如

```html
<b-header @on-nav-toggle="toggleNavOpen">
    <div slot="center">
        <h4>Page Title</h4>
    </div>

    <div slot="right">
        <i class="b-icon-github"></i>
    </div>
</b-header>
```

可根据需求放置中部及右侧元素。

`b-nav-side` 形如

```javascript
<b-nav-side :routes="routes" @toggle="toggleNavOpen">
    <div slot="nav-top">My App</div>
</b-nav-side>
...
data() {
    return {
        routes // 标准 Vue-Router 接收的 routes 数组；用法同顶部导航
    };
}
```

可根据需求定制侧边栏顶部元素。

出于灵活性（例如用户是否登录）与状态一致性考虑，`b-layout` 唯一接收 props `is-nav-open` 决定是否展示侧边栏；此时 `b-layout`，`b-header` 与 `b-nav-side` 都会 emit 事件提醒外层处理侧边栏状态

* **切换** `is-nav-open`:
    * `b-header` 触发 `on-nav-toggle`
    * `b-nav-side` 触发 `toggle`
* **设置** `is-nav-open`:
    * `b-layout` 触发 `nav-open-change`

所以我们可能会像下面的方式处理这些事件：

```
...
setNavOpen(isOpen) {
    // get login state for instance
    this.isNavOpen = isLogin && isOpen;
}
...
toggleNavOpen() {
    // get login state for instance
    this.isNavOpen = isLogin && !this.isNavOpen;
}
```

%%HeaderNavSideCode

```html
<template>
    <b-layout
        :is-nav-open="isNavOpen"
        @nav-open-change="setNavOpen">
        <div slot="header">
            <b-header @on-nav-toggle="toggleNavOpen">
                <div slot="center">
                    <h4>Page Title</h4>
                </div>

                <div slot="right">
                    <i class="b-icon-github"></i>
                </div>
            </b-header>
        </div>

        <div slot="side-left">
            <b-nav-side :routes="routes" @toggle="toggleNavOpen">
                <div slot="nav-top">My App</div>
            </b-nav-side>
        </div>

        <div slot="content">
            <div class="center-block">
                main content
            </div>
        </div>
    </b-layout>
</template>

<script>
    const routes = [
        {
            name: 'Component',
            meta: {
                navTitle: 'Component'
            },
            children: [
                {
                    name: 'CompLayout',
                    meta: {
                        navTitle: 'Layout'
                    }
                },
                {
                    name: 'CompMdEditor',
                    meta: {
                        navTitle: 'Markdown Editor'
                    }
                }
            ]
        }
    ];

    export default {
        data() {
            return {
                routes,
                isNavOpen: true
            };
        },

        methods: {
            setSideNavOpen(isOpen) {
                this.sideNavIsNavOpen = isOpen;
            },

            toggleSideNavOpen() {
                this.sideNavIsNavOpen = !this.sideNavIsNavOpen;
            }
        }
    };
</script>
```

%%API

#### `b-layout` Props

|Name|Type|Desc|Default|
|:-:|:-:|:-:|:-:|
|`defaultOpen`|`Boolean`|是否默认展开侧边栏|`true`|
|`isNavOpen`|`Boolean`|是否展开侧边栏|`true`|

#### `b-layout` Slots

|Name|Desc|
|:-:|:-:|
|`header`|顶部|
|`side-left`|左侧边栏|
|`content`|主要区域|
|`side-right`|右侧边栏|
|`footer`|尾部|

#### `b-layout` Events

|Name|Type|Desc|
|:-:|:-:|:-:|
|`nav-open-change`|`(value: Boolean) => void`|在初始化与移动端点击 mask 时触发|

<br>

---

<br>

#### `b-nav-top` Props

|Name|Type|Desc|
|:-:|:-:|:-:|
|`routes`|`Array`|标准 Vue-Router 路由数组|

#### `b-nav-top` Slots

|Name|Desc|
|:-:|:-:|
|`left`|左侧|
|`center`|中部|
|`right`|右侧|

#### `b-nav-top` Events

|Name|Type|Desc|
|:-:|:-:|:-:|
|`routes`|`Array`|标准 Vue-Router 路由数组|

<br>

---

<br>

#### `b-nav-side` Slots

|Name|Desc|
|:-:|:-:|
|`toggle`|切换按钮|
|`nav-top`|顶部|

#### `b-nav-side` Events

|Name|Type|Desc|
|:-:|:-:|:-:|
|`toggle`|`void => void`|在用户点击侧边栏顶部 toggle icon 时触发|

<br>

---

<br>

#### `b-header` Props

|Name|Type|Desc|
|:-:|:-:|:-:|
|`routes`|`Array`|标准 Vue-Router 路由数组|

#### `b-header` Slots

|Name|Desc|
|:-:|:-:|
|`toggle`|切换按钮|
|`logo`|Logo 区域|
|`center`|中部|
|`right`|右侧区域|

#### `b-header` Events

|Name|Type|Desc|
|:-:|:-:|:-:|
|`on-nav-toggle`|`void => void`|在用户点击左侧 toggle icon 时触发|
