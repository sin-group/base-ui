/**
 * @author yutiangan
 * @date 2018/10/10-13:32
 * @file tab
 */

export default {
    name: 'tab',

    modify({text, selectionStart, selectionEnd}) {
        const lineFirstCharIndex = text.lastIndexOf('\n', selectionStart - 1) + 1;
        const selectionText = text.slice(selectionStart, selectionEnd);

        let newText;
        if (selectionStart === selectionEnd) {
            newText = `${text.slice(0, selectionStart)}    ${text.slice(selectionStart)}`;
        } else {
            newText = `${text.slice(0, lineFirstCharIndex)
                }    ${text.slice(lineFirstCharIndex, selectionStart)
                }${selectionText.replace(/\n/g, '\n    ')}${text.slice(selectionEnd)}`;
        }

        const lengthRevise = newText.length - text.length;
        return {
            text: newText,
            selectionStart: selectionStart + 4,
            selectionEnd: selectionEnd + lengthRevise
        };
    }
};
