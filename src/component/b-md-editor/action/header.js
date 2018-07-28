/**
 * @author panezhang
 * @date 2018/7/28-16:02
 * @file header
 */

export default {
    name: 'header',

    icon: 'b-icon-header',

    modify({text, selectionStart, selectionEnd}) {
        const lineFirstCharIndex = text.lastIndexOf('\n', selectionStart - 1) + 1;
        const headText = text.slice(0, lineFirstCharIndex);
        const remainText = text.slice(lineFirstCharIndex).trimStart();

        let newText;
        const matched = remainText.match(/^#+/);
        if (matched) {
            newText = matched && matched[0].length > 5
                ? `${headText}${remainText.replace(/^#+\s*/, '')}` // remove
                : `${headText}#${remainText}`; // add
        } else { // add
            newText = `${headText}# ${remainText}`;
        }

        const lengthRevise = newText.length - text.length;
        return {
            text: newText,
            selectionStart: selectionStart + lengthRevise,
            selectionEnd: selectionEnd + lengthRevise
        };
    }
};
