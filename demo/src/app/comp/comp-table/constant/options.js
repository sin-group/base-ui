import {GenderMap} from './conf';

export const BasicOptions = {
    colDefs: [
        {field: 'mobile', label: '手机号'},
        {field: 'name', label: '姓名'},
        {field: 'gender', label: '性别', map: GenderMap},
        {field: 'registerTime', label: '最近登录时间', filter: 'b-date-minute'}
    ]
};

export const CustomizedColOptions = {
    colDefs: [
        {field: 'mobile', label: '手机号'},
        {field: 'name', label: '姓名'},
        {field: 'gender', label: '性别', map: GenderMap},
        {field: 'registerTime', label: '最近登录时间', filter: 'b-date-minute'},
        {field: 'op', label: '操作'}
    ]
};

export const ClientPaginationOptions = {
    enableClientPagination: true,
    colDefs: [
        {field: 'mobile', label: '手机号'},
        {field: 'name', label: '姓名'},
        {field: 'registerTime', label: '最近登录时间', filter: 'b-date-minute'}
    ]
};

export const ServerPaginationOptions = {
    enableServerPagination: true,
    colDefs: [
        {field: 'mobile', label: '手机号'},
        {field: 'name', label: '姓名'},
        {field: 'registerTime', label: '最近登录时间', filter: 'b-date-minute'}
    ]
};

export const ClientSortOptions = {
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
};

export const ServerSortOptions = {
    enableClientPagination: true,
    enableServerSort: true,
    colDefs: [
        {field: 'mobile', label: '手机号'},
        {field: 'name', label: '姓名'},
        {field: 'age', label: '年龄'},
        {field: 'registerTime', label: '最近登录时间', filter: 'b-date-minute'}
    ]
};

export const RowSelectionOptions = {
    enableClientPagination: true,
    enableSelection: true,
    colDefs: [
        {field: 'mobile', label: '手机号'},
        {field: 'name', label: '姓名'},
        {field: 'age', label: '年龄'},
        {field: 'registerTime', label: '最近登录时间', filter: 'b-date-minute'}
    ]
};

export const FullOptions = {
    enableSelection: true,
    enableClientSort: true,
    enableClientPagination: true,

    sortInfo: {
        field: 'name',
        order: 'DESC'
    },
    colDefs: [
        {field: 'id', label: 'Id'},
        {field: 'mobile', label: 'Mobile'},
        {field: 'name', label: 'Name'},
        {field: 'age', label: 'Age'},
        {field: 'status', label: 'Status'},
        {field: 'lastLoginTime', label: 'Time', filter: 'b-date-time'},
        {field: 'op', label: 'Operation'}
    ],

    extraThDefsList: [
        [
            {label: 'SUPER TH', colspan: 8}
        ],
        [
            {label: 'INFO', colspan: 5},
            {label: 'OTHERS', colspan: 2},
            {label: 'OP', colspan: 1}
        ]
    ]
};
