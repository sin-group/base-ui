%%Overview

可以用于弹出并展示某些内容。

%%Basic

基础的 `b-popper` 用法非常简单，只需要把需要展示的内容放在其中，并设置其 `visible` 属性即可。

%%BasicCode

```html
<template>
    <div class="main">
        <div v-b-click-outside="closePopper" class="popper-group">
            <b-button @click="openPopper">Open Popper</b-button>
            <b-popper :visible="isPopperVisible">
                <div class="action-card">
                    这是一个 Popper
                </div>
            </b-popper>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                isPopperVisible: false
            };
        },

        methods: {
            closePopper() {
                this.isPopperVisible = false;
            },

            openPopper() {
                this.isPopperVisible = true;
            }
        }
    };
</script>
```

%%Placement

在使用 `b-popper` 组件时，我们可以改变 props `placement` 的值来改变 `b-popper` 相对于其父组件的位置关系。  
- 可选值为 `'top-start'`、`'top'`、`'top-end'`、`'right-start'`、`'right'`、`'right-end'`、`'bottom-start'`、`'bottom'`、`'bottom-end'`、`'left-start'`、`'left'`、`'left-end'`
- 默认为 `'bottom-start'`。

%%PlacementCode

```html
<template>
    <div class="main">
        <div v-b-click-outside="() => {closePopper(1)}" class="popper-group">
            <b-button @click="openPopper(1)">Top Start</b-button>
            <b-popper :visible="isPopperVisible1" placement="top-start">
                <div class="action-card">
                    Top Start Popper
                </div>
            </b-popper>
        </div>
        <div v-b-click-outside="() => {closePopper(2)}" class="popper-group">
            <b-button @click="openPopper(2)">Top</b-button>
            <b-popper :visible="isPopperVisible2" placement="top">
                <div class="action-card">
                    Top Popper
                </div>
            </b-popper>
        </div>
        <div v-b-click-outside="() => {closePopper(3)}" class="popper-group">
            <b-button @click="openPopper(3)">Top End</b-button>
            <b-popper :visible="isPopperVisible3" placement="top-end">
                <div class="action-card">
                    Top End Popper
                </div>
            </b-popper>
        </div>
    </div>
    <div class="main">
        <div v-b-click-outside="() => {closePopper(4)}" class="popper-group">
            <b-button @click="openPopper(4)">Left Start</b-button>
            <b-popper :visible="isPopperVisible4" placement="left-start">
                <div class="action-card">
                    Left Start Popper
                </div>
            </b-popper>
        </div>
        <div v-b-click-outside="() => {closePopper(5)}" class="popper-group">
            <b-button @click="openPopper(5)">Right Start</b-button>
            <b-popper :visible="isPopperVisible5" placement="right-start">
                <div class="action-card">
                    Right Start Popper
                </div>
            </b-popper>
        </div>
    </div>
    <div class="main">
        <div v-b-click-outside="() => {closePopper(6)}" class="popper-group">
            <b-button @click="openPopper(6)">Left</b-button>
            <b-popper :visible="isPopperVisible6" placement="left">
                <div class="action-card">
                    Left Popper
                </div>
            </b-popper>
        </div>
        <div v-b-click-outside="() => {closePopper(7)}" class="popper-group">
            <b-button @click="openPopper(7)">Right</b-button>
            <b-popper :visible="isPopperVisible7" placement="right">
                <div class="action-card">
                    Right Popper
                </div>
            </b-popper>
        </div>
    </div>
    <div class="main">
        <div v-b-click-outside="() => {closePopper(8)}" class="popper-group">
            <b-button @click="openPopper(8)">Left End</b-button>
            <b-popper :visible="isPopperVisible8" placement="left-end">
                <div class="action-card">
                    Left End Popper
                </div>
            </b-popper>
        </div>
        <div v-b-click-outside="() => {closePopper(9)}" class="popper-group">
            <b-button @click="openPopper(9)">Right End</b-button>
            <b-popper :visible="isPopperVisible9" placement="right-end">
                <div class="action-card">
                    Right End Popper
                </div>
            </b-popper>
        </div>
    </div>
    <div class="main">
        <div v-b-click-outside="() => {closePopper(10)}" class="popper-group">
            <b-button @click="openPopper(10)">Bottom Start</b-button>
            <b-popper :visible="isPopperVisible10" placement="bottom-start">
                <div class="action-card">
                    Bottom Start Popper
                </div>
            </b-popper>
        </div>
        <div v-b-click-outside="() => {closePopper(11)}" class="popper-group">
            <b-button @click="openPopper(11)">Bottom</b-button>
            <b-popper :visible="isPopperVisible11" placement="bottom">
                <div class="action-card">
                    Bottom Popper
                </div>
            </b-popper>
        </div>
        <div v-b-click-outside="() => {closePopper(12)}" class="popper-group">
            <b-button @click="openPopper(12)">Bottom End</b-button>
            <b-popper :visible="isPopperVisible12" placement="bottom-end">
                <div class="action-card">
                    Bottom End Popper
                </div>
            </b-popper>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {,
                isPopperVisible1: false
                isPopperVisible2: false,
                isPopperVisible3: false,
                isPopperVisible4: false,
                isPopperVisible5: false,
                isPopperVisible6: false,
                isPopperVisible7: false,
                isPopperVisible8: false,
                isPopperVisible9: false,
                isPopperVisible10: false,
                isPopperVisible11: false,
                isPopperVisible12: false
            };
        },

        methods: {
            closePopper(keyIndex) {
                const key = `isPopperVisible${keyIndex}`;
                this[key] = false;
            },

            openPopper(keyIndex) {
                const key = `isPopperVisible${keyIndex}`;
                this[key] = true;
            }
        }
    };
</script>
```

%%Consistent

`b-popper` 满足以下表单组件一致性要求：
* `name`

%%API

#### Props

|Name|Type|Desc|
|:-:|:-:|:-:|
|`name`|`String`|name，默认为 `null`|
|`visible`|`Boolean`|是否展示，默认为 `false`|
|`placement`|`String`|弹出框相对于父组件的方位，可选值为 `'top-start'`、`'top'`、`'top-end'`、`'right-start'`、`'right'`、`'right-end'`、`'bottom-start'`、`'bottom'`、`'bottom-end'`、`'left-start'`、`'left'`、`'left-end'`，默认为 `'bottom-start'`|
