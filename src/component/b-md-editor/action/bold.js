/**
 * @author panezhang
 * @date 2018/7/28-16:03
 * @file bold
 */

export default {
    name: 'bold',

    icon: 'b-icon-bold',

    insert(selectionText = '') {
        if (!selectionText.trim()) return '** bold **';
        const matched = selectionText.match(/\*\* (.+) \*\*/);
        return matched ? selectionText.replace(matched[0], matched[1]) : `** ${selectionText} **`;
    }
};
