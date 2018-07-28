/**
 * @author panezhang
 * @date 2018/7/28-16:03
 * @file italic
 */

export default {
    name: 'italic',

    icon: 'b-icon-italic',

    insert(selectionText = '') {
        if (!selectionText.trim()) return ' _ italic _ ';
        const matched = selectionText.match(/ _ (.+) _ /);
        return matched ? selectionText.replace(matched[0], matched[1]) : ` _ ${selectionText} _ `;
    }
};
