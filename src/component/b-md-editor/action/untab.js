/**
 * @author yutiangan
 * @date 2018/10/10-15:03
 * @file untab
 */

const TabReg = new RegExp(/(\n( {4})*( {1,3})+)|(\n( {4})+)|(\n( {1,3}))/g);

const TabSpaceReg = new RegExp(/\n(\s)+/);

export default {
    name: 'untab',

    modify({text, selectionStart, selectionEnd}) {
        const lineFirstCharIndex = text.lastIndexOf('\n', selectionStart - 1) + 1;

        let preText = text.slice(0, lineFirstCharIndex - 1);
        let selectionFirstLineText = text.slice(lineFirstCharIndex - 1, selectionStart);
        if (!lineFirstCharIndex) {
            preText = '';
            selectionFirstLineText = `\n${text.slice(0, selectionStart)}`;
        }
        const selectionText = text.slice(selectionStart, selectionEnd);
        const postText = text.slice(selectionEnd);

        let newSelectionStart = selectionStart;
        let newSelectionFirstLineText = selectionFirstLineText;
        let newSelectionText = selectionText;

        if (selectionFirstLineText.match(TabReg)) {
            const spaceNum = selectionFirstLineText.match(TabReg)[0].length - 1;
            const length = spaceNum % 4 ? spaceNum % 4 : 4;
            newSelectionFirstLineText = `\n${selectionFirstLineText.slice(length + 1)}`;
            newSelectionStart -= length;
        }
        if (selectionText.match(TabReg)) {
            const selectionRestTextArray = selectionText.split('\n');
            newSelectionText = selectionRestTextArray[0];
            for (let i = 1; i < selectionRestTextArray.length; i += 1) {
                let length = 0;
                const spaces = `\n${selectionRestTextArray[i]}`.match(TabSpaceReg);
                if (spaces) {
                    length = (spaces[0].length - 1) % 4 ? (spaces[0].length - 1) % 4 : 4;
                }
                newSelectionText += `\n${selectionRestTextArray[i].slice(length)}`;
            }
        }
        if (!lineFirstCharIndex) {
            newSelectionFirstLineText = newSelectionFirstLineText.slice(1);
        }

        const newText = `${preText}${newSelectionFirstLineText}${newSelectionText}${postText}`;

        const lengthRevise = newText.length - text.length;
        return {
            text: newText,
            selectionStart: newSelectionStart,
            selectionEnd: selectionEnd + lengthRevise
        };
    }
};
