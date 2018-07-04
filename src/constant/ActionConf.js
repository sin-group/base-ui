export const ActionTypes = {
    Header: 'onHeader',
    Bold: 'onBold',
    Italic: 'onItalic',
    Link: 'onLink',
    Quote: 'onQuote',
    Code: 'onCode'
};

export const ActionList = [{
        name: 'header',
        description: 'header',
        methodName: ActionTypes.Header
    }, {
        name: 'bold',
        description: 'bold',
        methodName: ActionTypes.Bold
    }, {
        name: 'italic',
        description: 'italic',
        methodName: ActionTypes.Italic
    }, {
        name: 'link',
        description: 'link',
        methodName: ActionTypes.Link
    }, {
        name: 'quote',
        description: 'quote',
        methodName: ActionTypes.Quote
    }, {
        name: 'code',
        description: 'code',
        methodName: ActionTypes.Code
    }
];
