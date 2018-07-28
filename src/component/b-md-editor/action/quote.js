/**
 * @author panezhang
 * @date 2018/7/28-16:03
 * @file quote
 */

export default {
    name: 'quote',

    icon: 'b-icon-quote',

    modify({text, selectionStart, selectionEnd}) {
        const lineFirstCharIndex = text.lastIndexOf('\n', selectionStart - 1) + 1;
        const headText = text.slice(0, lineFirstCharIndex);
        const remainText = text.slice(lineFirstCharIndex).trimStart();
        const newText = remainText.startsWith('> ')
            ? `${headText}${remainText.slice(2)}` // remove
            : `${headText}> ${remainText}`; // add
        const lengthRevise = newText.length - text.length;
        return {
            text: newText,
            selectionStart: selectionStart + lengthRevise,
            selectionEnd: selectionEnd + lengthRevise
        };
    }
};
