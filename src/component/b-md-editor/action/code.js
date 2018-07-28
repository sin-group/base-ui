/**
 * @author panezhang
 * @date 2018/7/28-16:03
 * @file code
 */

export default {
    name: 'code',

    icon: 'b-icon-code',

    insert(selectionText = '') {
        if (!selectionText.trim()) return '\n```\ncode\n```\n';
        const matched = selectionText.match(/\n```\n(.+)\n```\n/);
        return matched ? selectionText.replace(matched[0], matched[1]) : `\n\`\`\`\n${selectionText}\n\`\`\`\n`;
    }
};
