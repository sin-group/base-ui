import LoanCreditsStatusMap from './loan-credit-status-map';

export default {
    enableSelection: true,
    enableClientSort: true,
    enableClientPagination: true,
    // enableServerSort: true,
    sortInfo: {
        field: 'name',
        order: 'DESC'
    },
    colDefs: [
        {field: 'loanAccountId', label: 'Account Id'},
        {field: 'mobileNumber', label: 'Mobile'},
        {field: 'name', label: 'Name'},
        {field: 'loanCreditsStatus', label: 'Status', map: LoanCreditsStatusMap},
        {field: 'timeCompletedAuthFlow', label: 'Time', filter: 'b-date-time'},
        {field: 'op', label: 'Operation'}
    ],

    extraThDefsList: [
        [
            {label: 'SUPER TH', colspan: 7}
        ],
        [
            {label: 'INFO', colspan: 4},
            {label: 'OTHERS', colspan: 2},
            {label: 'OP', colspan: 1}
        ]
    ]
};
