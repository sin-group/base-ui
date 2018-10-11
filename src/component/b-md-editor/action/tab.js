/**
 * @author yutiangan
 * @date 2018/10/10-13:32
 * @file tab
 */

const TabString = '    ';

export default {
    name: 'tab',

    modify({text, selectionStart, selectionEnd}) {
        const lineFirstCharIndex = text.lastIndexOf('\n', selectionStart - 1) + 1;

        const preText = text.slice(0, lineFirstCharIndex);
        const selectionFirstLineText = text.slice(lineFirstCharIndex, selectionStart);
        const selectionText = text.slice(selectionStart, selectionEnd);
        const postText = text.slice(selectionEnd);

        let newSelectionFirstLineText = selectionFirstLineText;
        let newSelectionText = selectionText;

        if (selectionStart === selectionEnd) {
            newSelectionText = TabString;
        } else {
            newSelectionFirstLineText = `${TabString}${selectionFirstLineText}`;
            newSelectionText = selectionText.replace(/\n/g, `\n${TabString}`);
            if (selectionText[selectionText.length - 1] === '\n') {
                newSelectionText = newSelectionText.slice(0, newSelectionText.length - TabString.length);
            }
        }

        const newText = `${preText}${newSelectionFirstLineText}${newSelectionText}${postText}`;

        const lengthRevise = newText.length - text.length;
        return {
            text: newText,
            selectionStart: selectionStart + TabString.length,
            selectionEnd: selectionEnd + lengthRevise
        };
    }
};
