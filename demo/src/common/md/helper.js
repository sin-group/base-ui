export const genMdTextMap = (mdText, prefix) => (
    mdText
        .split('%%')
        .filter(item => !!item.replace('\n', ''))
        .map((item) => {
            const match = item.match(/^([\w-]+)\n*([\s\S]*)$/);
            return {
                keyword: match && match[1],
                text: match && match[2]
            };
        })
        .reduce((acc, {keyword = '', text = ''}) => {
            const key = `${prefix}${keyword}`;
            return Object.assign(acc, {[key]: text});
        }, {})
);
