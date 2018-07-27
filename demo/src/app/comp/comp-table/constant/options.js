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
        {field: 'ruleSetResult.Advance', label: '风控 Advance'},
        {field: 'loanCreditsStatus', label: 'Status', map: LoanCreditsStatusMap},
        {field: 'timeCompletedAuthFlow', label: 'Time', filter: 'b-date-time'},
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
