export const genArray = num => Array.from(new Array(num), (val, index) => index);

export const genMap = num => genArray(num).reduce((acc, cur) => {
    const normalizedNum = cur > 9 ? `${cur}` : `0${cur}`;
    return Object.assign(acc, {[cur]: normalizedNum});
}, {});

export const paddingSearchText = (searchText) => {
    if (searchText.length === 2 && searchText[0] === '0') {
        return searchText[1];
    }
    return searchText;
};
