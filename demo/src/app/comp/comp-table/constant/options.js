export default {
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
