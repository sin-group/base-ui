import {GenderMap} from './conf';

export const BasicOptions = {
    colDefs: [
        {field: 'mobile', label: '手机号', fixed: 'left'},
        {field: 'name', label: '姓名', fixed: 'left'},
        {field: 'gender', label: '性别', map: GenderMap},
        {field: 'gender1', label: '性别1', map: GenderMap},
        {field: 'gender2', label: '性别2', map: GenderMap},
        {field: 'gender3', label: '性别3', map: GenderMap},
        {field: 'gender4', label: '性别4', map: GenderMap},
        {field: 'gender5', label: '性别5', map: GenderMap},
        {field: 'gender6', label: '性别6', map: GenderMap},
        {field: 'gender7', label: '性别7', map: GenderMap},
        {field: 'gender8', label: '性别8', map: GenderMap},
        {field: 'registerTime', label: '最近登录时间', filter: 'b-date-minute', fixed: 'right'}
    ]
};

export const CustomizedColOptions = {
    colDefs: [
        {field: 'mobile', label: '手机号', fixed: 'left'},
        {field: 'name', label: '姓名'},
        {field: 'gender', label: '性别', map: GenderMap},
        {field: 'gender1', label: '性别1', map: GenderMap},
        {field: 'gender2', label: '性别2', map: GenderMap},
        {field: 'gender3', label: '性别3', map: GenderMap},
        {field: 'gender4', label: '性别4', map: GenderMap},
        {field: 'gender5', label: '性别5', map: GenderMap},
        {field: 'gender6', label: '性别6', map: GenderMap},
        {field: 'gender7', label: '性别7', map: GenderMap},
        {field: 'gender8', label: '性别8', map: GenderMap},
        {field: 'registerTime', label: '最近登录时间', filter: 'b-date-minute', fixed: 'right'},
        {field: 'op', label: '操作', fixed: 'right'}
    ]
};

export const ClientPaginationOptions = {
    enableClientPagination: true,
    colDefs: [
        {field: 'mobile', label: '手机号', fixed: 'left'},
        {field: 'name', label: '姓名'},
        {field: 'gender1', label: '性别1', map: GenderMap},
        {field: 'gender2', label: '性别2', map: GenderMap},
        {field: 'gender3', label: '性别3', map: GenderMap},
        {field: 'gender4', label: '性别4', map: GenderMap},
        {field: 'gender5', label: '性别5', map: GenderMap},
        {field: 'gender6', label: '性别6', map: GenderMap},
        {field: 'gender7', label: '性别7', map: GenderMap},
        {field: 'gender8', label: '性别8', map: GenderMap},
        {field: 'registerTime', label: '最近登录时间', filter: 'b-date-minute', fixed: 'right'}
    ]
};

export const ServerPaginationOptions = {
    enableServerPagination: true,
    colDefs: [
        {field: 'mobile', label: '手机号', fixed: 'left'},
        {field: 'name', label: '姓名'},
        {field: 'gender1', label: '性别1', map: GenderMap},
        {field: 'gender2', label: '性别2', map: GenderMap},
        {field: 'gender3', label: '性别3', map: GenderMap},
        {field: 'gender4', label: '性别4', map: GenderMap},
        {field: 'gender5', label: '性别5', map: GenderMap},
        {field: 'gender6', label: '性别6', map: GenderMap},
        {field: 'gender7', label: '性别7', map: GenderMap},
        {field: 'gender8', label: '性别8', map: GenderMap},
        {field: 'registerTime', label: '最近登录时间', filter: 'b-date-minute', fixed: 'right'}
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
        {field: 'mobile', label: '手机号', fixed: 'left'},
        {field: 'name', label: '姓名'},
        {field: 'age', label: '年龄'},
        {field: 'gender1', label: '性别1', map: GenderMap},
        {field: 'gender2', label: '性别2', map: GenderMap},
        {field: 'gender3', label: '性别3', map: GenderMap},
        {field: 'gender4', label: '性别4', map: GenderMap},
        {field: 'gender5', label: '性别5', map: GenderMap},
        {field: 'gender6', label: '性别6', map: GenderMap},
        {field: 'gender7', label: '性别7', map: GenderMap},
        {field: 'gender8', label: '性别8', map: GenderMap},
        {field: 'registerTime', label: '最近登录时间', filter: 'b-date-minute', fixed: 'right'}
    ]
};

export const ServerSortOptions = {
    enableClientPagination: true,
    enableServerSort: true,
    colDefs: [
        {field: 'mobile', label: '手机号', fixed: 'left'},
        {field: 'name', label: '姓名'},
        {field: 'age', label: '年龄'},
        {field: 'gender1', label: '性别1', map: GenderMap},
        {field: 'gender2', label: '性别2', map: GenderMap},
        {field: 'gender3', label: '性别3', map: GenderMap},
        {field: 'gender4', label: '性别4', map: GenderMap},
        {field: 'gender5', label: '性别5', map: GenderMap},
        {field: 'gender6', label: '性别6', map: GenderMap},
        {field: 'gender7', label: '性别7', map: GenderMap},
        {field: 'gender8', label: '性别8', map: GenderMap},
        {field: 'registerTime', label: '最近登录时间', filter: 'b-date-minute', fixed: 'right'}
    ]
};

export const RowSelectionOptions = {
    enableClientPagination: true,
    enableSelection: true,
    colDefs: [
        {field: 'mobile', label: '手机号', fixed: 'left'},
        {field: 'name', label: '姓名'},
        {field: 'age', label: '年龄'},
        {field: 'gender1', label: '性别1', map: GenderMap},
        {field: 'gender2', label: '性别2', map: GenderMap},
        {field: 'gender3', label: '性别3', map: GenderMap},
        {field: 'gender4', label: '性别4', map: GenderMap},
        {field: 'gender5', label: '性别5', map: GenderMap},
        {field: 'gender6', label: '性别6', map: GenderMap},
        {field: 'gender7', label: '性别7', map: GenderMap},
        {field: 'gender8', label: '性别8', map: GenderMap},
        {field: 'registerTime', label: '最近登录时间', filter: 'b-date-minute', fixed: 'right'}
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
        {field: 'gender1', label: '性别1', map: GenderMap},
        {field: 'gender2', label: '性别2', map: GenderMap},
        {field: 'gender3', label: '性别3', map: GenderMap},
        {field: 'gender4', label: '性别4', map: GenderMap},
        {field: 'gender5', label: '性别5', map: GenderMap},
        {field: 'gender6', label: '性别6', map: GenderMap},
        {field: 'gender7', label: '性别7', map: GenderMap},
        {field: 'gender8', label: '性别8', map: GenderMap},
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
