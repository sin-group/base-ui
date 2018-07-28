/**
 * @author panezhang
 * @date 2018/7/28-16:03
 * @file link
 */

export default {
    name: 'link',

    icon: 'b-icon-link',

    insert(selectionText = '') {
        if (!selectionText) return '[description](url)';
        const matched = selectionText.match(/\[(.+)]\(.+\)/);
        return matched ? selectionText.replace(matched[0], matched[1]) : `[${selectionText}](url)`;
    }
};
