%%Overview

一种用来展示表格的基础组件，它的基本作用是利用简单的配置项驱动数据渲染表格，通过对列的定制实现控制表格渲染的功能。

在打开配置项开关的条件下，`b-table` 可扩展若干功能，目前支持:

* 客户端 & 服务端分页
* 客户端（可对中文排序） & 服务端排序
* 行选择
* 固定列

下面的说明将进一步介绍 `b-table` 的用法。

%%Basic

基础的 `b-table` 需要传递 `options` 与 `records` 分别指定 table 的配置项和表格数据。

其中，`options` 是一个对象，形如

```
{
    ...
    colRefs: [
        ...
        {field: 'mobile', label: 'Mobile'}
    ]
}
```

其中 `colRefs` 是一个列配置项 `Array`，它的每一项指定了：

* `field`: 字段
* `label`: 表头显示名
* `map`: 接受一个 `Object`，可以将该 cell 的值映射为对应的 value
* `width`: 接受一个 `Number`，表示该列列宽,默认为 150
* `fixed`: ['left','right']`，表示该列是否固定,默认不固定

* `filter`: 接受一个 `String`，它的作用如同 Vue 的 filter 语义，目前内置包含
    * `b-date`: `YYYY-MM-DD` 格式的日期
    * `b-date-minute`: `YYYY-MM-DD HH:mm` 格式的日期 + 时分
    * `b-date-time`: `YYYY-MM-DD HH:mm:ss` 格式的日期 + 时分秒

如果同时指定 `filter`, `map`, 它们的解析顺序是：

```
valueOrigin -> valueMapped -> valueFiltered -> value
```

%%BasicCode

```html
<template>
    <b-table
        :options="options"
        :records="records"/>
</template>

<script>
    const GenderMap = {
        Male: '男',
        Female: '女'
    };

    export default {
        data() {
            return {
                options: {
                    colDefs: [
                        {field: 'mobile', label: '手机号',fixed:'left'},
                        {field: 'name', label: '姓名',fixed:'left'},
                        {field: 'gender', label: '性别', map: GenderMap},
                        {field: 'gender1', label: '性别1', map: GenderMap},
                        {field: 'gender2', label: '性别2', map: GenderMap},
                        {field: 'gender3', label: '性别3', map: GenderMap},
                        {field: 'gender4', label: '性别4', map: GenderMap},
                        {field: 'gender5', label: '性别5', map: GenderMap},
                        {field: 'gender6', label: '性别6', map: GenderMap},
                        {field: 'gender7', label: '性别7', map: GenderMap},
                        {field: 'gender8', label: '性别8', map: GenderMap},
                        {field: 'registerTime', label: '最近登录时间', filter: 'b-date-minute',fixed:'right'}
                    ]
                },
                records: [{
                            mobile: '239-517-9188',
                            name: 'hbrazur0',
                            gender: 'Male',
                            gender1: 'Male',
                            gender2: 'Male',
                            gender3: 'Male',
                            gender4: 'Male',
                            gender5: 'Male',
                            gender6: 'Male',
                            gender7: 'Male',
                            gender8: 'Male',
                            registerTime: 1539134672157
                        }, {
                            mobile: '850-671-4012',
                            name: 'ndoiley1',
                            gender: 'Female',
                            gender1: 'Female',
                            gender2: 'Female',
                            gender3: 'Female',
                            gender4: 'Female',
                            gender5: 'Male',
                            gender6: 'Male',
                            gender7: 'Male',
                            gender8: 'Male',
                            registerTime: 1539125528997
                        }, {
                            mobile: '357-993-0036',
                            name: 'hchitson2',
                            gender: 'Female',
                            gender1: 'Female',
                            gender2: 'Female',
                            gender3: 'Female',
                            gender4: 'Female',
                            gender5: 'Male',
                            gender6: 'Male',
                            gender7: 'Male',
                            gender8: 'Male',
                            registerTime: 1539121749439
                        }, {
                            mobile: '612-994-8930',
                            name: 'bwitchalls3',
                            gender: 'Male',
                            gender1: 'Male',
                            gender2: 'Male',
                            gender3: 'Male',
                            gender4: 'Male',
                            gender5: 'Male',
                            gender6: 'Male',
                            gender7: 'Male',
                            gender8: 'Male',
                            registerTime: 1539154789428
                        }]
            };
        }
    };
</script>
```

%%CustomizedCol

自定义元素（例如下面展示的操作列）可在 `slot` 中指定：

```html
<b-table...>
    <div slot="op" slot-scope="scope">
        <button @click="openCheckModal(scope.record)">查看</button>
    </div>
</b-table>
```

`slot` 对应 `colDefs` 中 `field` 的名称，该列的元素会按照这个 slot 渲染。

在 `slot-scope` 暴露了该 cell 所在环境的上下文对象：

* `line-index`: 行 index
* `field`: 列字段
* `colDef`: 列配置项
* `value`: cell 值
* `record`: 行对象


%%CustomizedColCode

```html
<template>
    <b-table
        :options="options"
        :records="records">
        <div slot="op" slot-scope="{record}">
            <button class="sm" @click="viewRecord(record)">查看</button>
        </div>
    </b-table...>
</template>

<script>
    const GenderMap = {
        Male: '男',
        Female: '女'
    };

    export default {
        data() {
            return {
                options: {
                    colDefs: [
                        {field: 'mobile', label: '手机号'},
                        {field: 'name', label: '姓名'},
                        {field: 'gender', label: '性别', map: GenderMap},
                        {field: 'registerTime', label: '最近登录时间', filter: 'b-date-minute'},
                        {field: 'op', label: '操作'}
                    ]
                },
                records: [{
                    mobile: '239-517-9188',
                    name: 'hbrazur0',
                    gender: 'Male',
                    registerTime: 1539134672157
                }, {
                    mobile: '850-671-4012',
                    name: 'ndoiley1',
                    gender: 'Female',
                    registerTime: 1539125528997
                }, {
                    mobile: '357-993-0036',
                    name: 'hchitson2',
                    gender: 'Female',
                    registerTime: 1539121749439
                }, {
                    mobile: '612-994-8930',
                    name: 'bwitchalls3',
                    gender: 'Male',
                    registerTime: 1539154789428
                }]
            };
        },

        methods: {
            viewRecord(record) {
                const vm = this;
                // open record view modal
            }
        }
    };
</script>
```

%%ClientPagination

如果在客户端有一列较长的数据数组，在 `options` 启用 `enableClientPagination` 即可自动处理客户端分页。

`b-table` 同样支持传入 props `pagination` 对象来自定义初始化当前页与每页条数。

```html
<b-table
    :options="options"
    :records="records"
    :pagination="{pageNo: 2, pageSize: 20}"
/>
```

%%ClientPaginationCode

```html
<template>
    <b-table
        :options="options"
        :records="records"/>
</template>

<script>
    export default {
        data() {
            return {
                options: {
                    enableClientPagination: true,
                    colDefs: [
                        {field: 'mobile', label: '手机号'},
                        {field: 'name', label: '姓名'},
                        {field: 'gender', label: '性别', map: GenderMap},
                        {field: 'registerTime', label: '最近登录时间', filter: 'b-date-minute'}
                    ]
                },
                records: [{
                    mobile: '498-943-7370',
                    name: 'fmapplebeck0',
                    gender: 'Male',
                    registerTime: 1539119543976
                }, {
                    mobile: '287-350-0593',
                    name: 'smeadus1',
                    gender: 'Male',
                    registerTime: 1539144100841
                }, {
                    mobile: '812-447-1382',
                    name: 'fmompesson2',
                    gender: 'Male',
                    registerTime: 1539131059695
                }, {
                    mobile: '323-576-8559',
                    name: 'ljeffes3',
                    gender: 'Male',
                    registerTime: 1539136336136
                }, {
                    mobile: '498-254-3326',
                    name: 'mblazewicz4',
                    gender: 'Female',
                    registerTime: 1539144941967
                }, {
                    mobile: '601-729-2374',
                    name: 'cfieldstone5',
                    gender: 'Male',
                    registerTime: 1539131869579
                }, {
                    mobile: '676-911-9489',
                    name: 'fmoriarty6',
                    gender: 'Male',
                    registerTime: 1539154266601
                }, {
                    mobile: '556-697-5912',
                    name: 'ijarrett7',
                    gender: 'Female',
                    registerTime: 1539134683608
                }, {
                    mobile: '467-591-0099',
                    name: 'sezzell8',
                    gender: 'Male',
                    registerTime: 1539135643095
                }, {
                    mobile: '848-266-9232',
                    name: 'rhattrick9',
                    gender: 'Male',
                    registerTime: 1539127460914
                }, {
                    mobile: '873-102-9849',
                    name: 'iveigheya',
                    gender: 'Male',
                    registerTime: 1539159679496
                }, {
                    mobile: '134-692-3251',
                    name: 'dbooelnb',
                    gender: 'Male',
                    registerTime: 1539142728055
                }, {
                    mobile: '113-189-0957',
                    name: 'rkleinerc',
                    gender: 'Male',
                    registerTime: 1539141286441
                }, {
                    mobile: '403-821-0126',
                    name: 'rculveyd',
                    gender: 'Male',
                    registerTime: 1539163834112
                }, {
                    mobile: '477-441-0349',
                    name: 'tcumberbatche',
                    gender: 'Female',
                    registerTime: 1539129155509
                }, {
                    mobile: '375-515-4348',
                    name: 'jromaf',
                    gender: 'Male',
                    registerTime: 1539114903753
                }, {
                    mobile: '722-116-8776',
                    name: 'ltatherg',
                    gender: 'Male',
                    registerTime: 1539117439926
                }, {
                    mobile: '181-620-1404',
                    name: 'cquadrih',
                    gender: 'Male',
                    registerTime: 1539155428183
                }, {
                    mobile: '914-418-5046',
                    name: 'rbottomorei',
                    gender: 'Female',
                    registerTime: 1539127722921
                }, {
                    mobile: '272-210-1016',
                    name: 'dbyerj',
                    gender: 'Female',
                    registerTime: 1539150561378
                }, {
                    mobile: '321-689-9025',
                    name: 'iedgerlyk',
                    gender: 'Female',
                    registerTime: 1539135988967
                }, {
                    mobile: '467-779-8785',
                    name: 'rpaddeleyl',
                    gender: 'Male',
                    registerTime: 1539134995416
                }, {
                    mobile: '869-857-5416',
                    name: 'acrillym',
                    gender: 'Female',
                    registerTime: 1539132249000
                }, {
                    mobile: '755-830-8956',
                    name: 'kgrebbinn',
                    gender: 'Female',
                    registerTime: 1539138331055
                }, {
                    mobile: '587-982-7343',
                    name: 'mdeveraleo',
                    gender: 'Male',
                    registerTime: 1539160317723
                }, {
                    mobile: '486-798-1711',
                    name: 'treijmersp',
                    gender: 'Female',
                    registerTime: 1539123504117
                }, {
                    mobile: '663-578-8684',
                    name: 'ldewanq',
                    gender: 'Male',
                    registerTime: 1539133336544
                }, {
                    mobile: '381-434-6009',
                    name: 'rbrittonr',
                    gender: 'Female',
                    registerTime: 1539155754333
                }, {
                    mobile: '104-963-6036',
                    name: 'ncarens',
                    gender: 'Male',
                    registerTime: 1539142786279
                }, {
                    mobile: '265-943-6962',
                    name: 'jdruettt',
                    gender: 'Female',
                    registerTime: 1539129595571
                }, {
                    mobile: '866-305-8592',
                    name: 'mstallybrassu',
                    gender: 'Female',
                    registerTime: 1539124833733
                }, {
                    mobile: '532-812-2961',
                    name: 'mspareyv',
                    gender: 'Female',
                    registerTime: 1539153749204
                }, {
                    mobile: '832-422-3364',
                    name: 'esimakovw',
                    gender: 'Male',
                    registerTime: 1539158143421
                }, {
                    mobile: '485-337-5104',
                    name: 'cbilsborrowx',
                    gender: 'Female',
                    registerTime: 1539146678999
                }, {
                    mobile: '785-632-7050',
                    name: 'fbrownsworthy',
                    gender: 'Female',
                    registerTime: 1539146339977
                }, {
                    mobile: '461-193-8501',
                    name: 'dgerrietzz',
                    gender: 'Male',
                    registerTime: 1539144828051
                }, {
                    mobile: '364-202-0983',
                    name: 'mhartrick10',
                    gender: 'Female',
                    registerTime: 1539150736087
                }, {
                    mobile: '101-191-3626',
                    name: 'khulmes11',
                    gender: 'Female',
                    registerTime: 1539150332450
                }, {
                    mobile: '637-974-9200',
                    name: 'lsandercroft12',
                    gender: 'Female',
                    registerTime: 1539125949579
                }, {
                    mobile: '323-561-1062',
                    name: 'akinchin13',
                    gender: 'Female',
                    registerTime: 1539145392805
                }, {
                    mobile: '340-928-8986',
                    name: 'elevett14',
                    gender: 'Male',
                    registerTime: 1539126954290
                }, {
                    mobile: '367-160-5739',
                    name: 'rbellow15',
                    gender: 'Male',
                    registerTime: 1539116541997
                }, {
                    mobile: '384-776-8995',
                    name: 'daronson16',
                    gender: 'Female',
                    registerTime: 1539154915556
                }, {
                    mobile: '857-422-9063',
                    name: 'bbiaggioni17',
                    gender: 'Male',
                    registerTime: 1539114322515
                }, {
                    mobile: '612-821-3582',
                    name: 'lklosterman18',
                    gender: 'Male',
                    registerTime: 1539127781165
                }, {
                    mobile: '609-110-5806',
                    name: 'mblazej19',
                    gender: 'Male',
                    registerTime: 1539119128431
                }, {
                    mobile: '896-894-5663',
                    name: 'cbohan1a',
                    gender: 'Male',
                    registerTime: 1539137193466
                }, {
                    mobile: '979-226-7647',
                    name: 'egartsyde1b',
                    gender: 'Male',
                    registerTime: 1539143225652
                }, {
                    mobile: '405-733-6897',
                    name: 'hsimic1c',
                    gender: 'Female',
                    registerTime: 1539143109970
                }, {
                    mobile: '958-860-9565',
                    name: 'iholtom1d',
                    gender: 'Female',
                    registerTime: 1539128342328
                }, {
                    mobile: '281-241-2141',
                    name: 'lmcshea1e',
                    gender: 'Female',
                    registerTime: 1539164126328
                }]
            };
        }
    };
</script>
```

%%ServerPagination

若数据主要存放在服务端，客户端每次仅取一小段 slice，可在 `options` 中启用 `enableServerPagination` 利用服务端完成分页。

此时客户端需知道当前 slice 与服务端总条数来完成分页器功能

```
<b-table
    :records="records"
    :options="options"
    :pagination="pagination"
    @on-paginate="list"
/>
...
// 渲染完毕后，若用户触发分页器变化，可通过 `on-paginate` 监听并通知服务端处理相应返回
list({pageNo, pageSize}) {
    fetchData({pageNo, pageSize}).then(({records, total}) => {
        this.records = records; // 更新 slice
        this.pagination = {pageNo, pageSize, total}; // 更新分页状态
    }).catch(x => x);
},
```

%%%%ServerPaginationCode

```html
<template>
    <b-table
        :options="options"
        :records="records"
        :pagination="pagination"
        @on-paginate="list"/>
</template>

<script>
    export default {
        data() {
            return {
                options: {
                    enableServerPagination: true,
                    colDefs: [
                        {field: 'mobile', label: '手机号'},
                        {field: 'name', label: '姓名'},
                        {field: 'registerTime', label: '最近登录时间', filter: 'b-date-minute'}
                    ]
                },
                records: []
            };
        },

        mounted() {
            vm.list({});
        },

        methods: {
            list({pageNo = 1, pageSize = 10}) {
                fetchData({pageNo, pageSize}).then(({records, total}) => {
                    this.records = records;
                    this.pagination = {pageNo, pageSize, total};
                }).catch(x => x);
            }
        }
    };
</script>
```

%%ClientSort

在 `options` 中启用 `enableClientSort` 完成客户端排序：

```
{
    enableClientSort: true,
    sortInfo: {
        field: 'registerTime',
        order: 'DESC'
    }
}
```

其中 `sortInfo` 为可选项，若需默认设定排序字段及方向可添加，方向有三种：`NONE`，`ASC`（升序） 和 `DESC`（降序）

%%ClientSortCode

```html
<template>
    <b-table
        :options="options"
        :records="records"/>
</template>

<script>
    export default {
        data() {
            return {
                options: {
                    enableClientPagination: true,
                    enableClientSort: true,
                    sortInfo: {
                        field: 'registerTime',
                        order: 'DESC'
                    },
                    colDefs: [
                        {field: 'mobile', label: '手机号'},
                        {field: 'name', label: '姓名'},
                        {field: 'age', label: '年龄'},
                        {field: 'registerTime', label: '最近登录时间', filter: 'b-date-minute'}
                    ]
                },
                records: [
                    ... // 同客户端分页数据
                ]
            };
        }
    };
</script>
```

%%ClientSortCode

```html
<template>
    <b-table
        :options="options"
        :records="records"/>
</template>

<script>
    export default {
        data() {
            return {
                options: {
                    enableClientPagination: true,
                    enableClientSort: true,
                    sortInfo: {
                        field: 'registerTime',
                        order: 'DESC'
                    },
                    colDefs: [
                        {field: 'mobile', label: '手机号'},
                        {field: 'name', label: '姓名'},
                        {field: 'age', label: '年龄'},
                        {field: 'registerTime', label: '最近登录时间', filter: 'b-date-minute'}
                    ]
                },
                records: [
                    ... // 同客户端分页数据
                ]
            };
        }
    };
</script>
```

%%ServerSort

在 `options` 中启用 `enableServerSort` 完成服务端排序，`sortInfo` 同客户端排序。

启用服务端排序后用户 toggle 排序方向触发 `on-sort` 事件，此时可接收排序字段及方向

```
<b-table
    :options="options"
    :records="records"
    @on-sort="list"/>
...
list({field, order}) {
    // handle sort
}
```

从而利用服务端处理排序。

%%ServerSortCode

```html
<template>
    <b-table
        :options="options"
        :records="records"
        @on-sort="list"/>
</template>

<script>
    export default {
        data() {
            return {
                options: {
                    enableServerSort: true,
                    colDefs: [
                        {field: 'mobile', label: '手机号'},
                        {field: 'name', label: '姓名'},
                        {field: 'age', label: '年龄'},
                        {field: 'registerTime', label: '最近登录时间', filter: 'b-date-minute'}
                    ]
                },
                records: []
            };
        },

        mounted() {
            this.list();
        },

        methods: {
            list({field, order}) {
                fetchData({field, order}).then(({records}) => {
                    this.records = records;
                }).catch(x => x);
            }
        }
    };
</script>
```

%%RowSelection

在一些场景中需要选中某些行进行处理，此时可开启行选择

```
{
    enableSelection: true,
    colDefs: {
        ...
    }
}
```

当 toggle 行首选择框时将触发 `on-select` 事件，暴露已选择的行数据与当前选择的行数据

```
<b-table
    ...
    @on-select="onSelect"
/>
...
onSelect({selectedRecords, selectedRecord}) {
    // selectedRecords: all selected records
    // selectedRecord: current record
}
```

Noted: 

* 若需默认选中某些 record，在该 record 上添加字段 `$$selected` 为 `true`
* 若一些行需要被标记不可选择，在该 record 上添加字段 `$$disableSelect` 为 `true`

%%RowSelectionCode

```html
<template>
    <b-table
        :options="options"
        :records="records"
        :on-select="onSelect"/>
</template>

<script>
    export default {
        data() {
            return {
                options: {
                    enableServerSort: true,
                    colDefs: [
                        {field: 'mobile', label: '手机号'},
                        {field: 'name', label: '姓名'},
                        {field: 'age', label: '年龄'},
                        {field: 'registerTime', label: '最近登录时间', filter: 'b-date-minute'}
                    ]
                },
                records: [{
                    mobile: '924-775-6201',
                    name: 'valexandrescu0',
                    gender: 'Male',
                    registerTime: 1539143742359,
                    age: 15
                }, {
                    mobile: '977-806-5096',
                    name: 'tzecchinii1',
                    gender: 'Female',
                    registerTime: 1539147656181,
                    age: 14,
                    $$selected: true,
                    $$disableSelect: true
                }, {
                    mobile: '220-336-3970',
                    name: 'jhenric2',
                    gender: 'Male',
                    registerTime: 1539154525334,
                    age: 40,
                    $$disableSelect: true
                }, {
                    mobile: '517-795-8486',
                    name: 'mrendell3',
                    gender: 'Female',
                    registerTime: 1539122554072,
                    age: 27
                }, {
                    mobile: '114-790-6864',
                    name: 'cvalde4',
                    gender: 'Male',
                    registerTime: 1539138341191,
                    age: 26
                }, {
                    mobile: '886-200-7799',
                    name: 'salejandre5',
                    gender: 'Male',
                    registerTime: 1539148223712,
                    age: 28
                }, {
                    mobile: '500-237-5160',
                    name: 'emcgilvary6',
                    gender: 'Male',
                    registerTime: 1539157098463,
                    age: 44
                }, {
                    mobile: '368-883-8625',
                    name: 'bnoirel7',
                    gender: 'Male',
                    registerTime: 1539159880984,
                    age: 37
                }, {
                    mobile: '989-205-2014',
                    name: 'ocolby8',
                    gender: 'Female',
                    registerTime: 1539139441200,
                    age: 14
                }, {
                    mobile: '981-767-8403',
                    name: 'jrasell9',
                    gender: 'Female',
                    registerTime: 1539114869984,
                    age: 22
                }, {
                    mobile: '539-455-5025',
                    name: 'cjackesa',
                    gender: 'Male',
                    registerTime: 1539150385201,
                    age: 10
                }, {
                    mobile: '233-519-3099',
                    name: 'skinmanb',
                    gender: 'Male',
                    registerTime: 1539154192970,
                    age: 38
                }],
                selectedNameList: [],
                togglingRecordName: null
            };
        },

        methods: {
            onSelect({selectedRecords, selectedRecord}) {
                this.selectedNameList = selectedRecords.map(({name}) => (name));
                this.togglingRecordName = selectedRecord && selectedRecord.name;
            }
        }
    };
</script>
```

%%API

#### Props

|Name|Type|Desc|Default|
|:-:|:-:|:-:|:-:|
|`options`|`Object`|配置项，使用方式见前文|`{}`|
|`records`|`Array`|数据数组|`[]`|
|`pagination`|`Object`|分页数据|`{}`|

#### Events

|Name|Type|Desc|
|:-:|:-:|:-:|
|`on-paginate`|`({pageNo: Number, pageSize: Number, total: Number}) => void`|翻页或切换每页行数时触发|
|`on-sort`|`({field: String, order: Enum {'NONE', 'ASC', 'DESC'}) => void`|服务端排序模式下切换排序时触发|
|`on-select`|`({selectedRecords: Array, selectedRecord: [Object, Null]) => void`|行选择模式下切换选择框触发|