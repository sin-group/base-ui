const isValueEqual = (left, right) => JSON.stringify(left) === JSON.stringify(right);
const getNodeChain = (node) => {
    const nodeChain = [];
    let curNode = node;
    while (curNode.$$parent) {
        nodeChain.unshift(curNode);
        curNode = curNode.$$parent;
    }

    return nodeChain;
};

export const getSelectedListFromSingleValue = (list, value) => {
    const addParent = (node) => {
        if (node.children && node.children.length) {
            node.children.forEach((item) => {
                item.$$parent = node;
                addParent(item);
            });
        }
    };
    const selectedList = [];

    // gen forest where nodes can access its parent
    list.forEach((item) => {
        item.$$parent = list;
        addParent(item);
    });

    const deep = (node) => {
        if (isValueEqual(node.value, value)) {
            let curNode = node;
            while (curNode.$$parent) {
                selectedList.unshift({label: curNode.label, value: curNode.value});
                curNode = curNode.$$parent;
            }
            return;
        }

        if (!node.children || !node.children.length) return;

        node.children.forEach((item) => {
            deep(item);
        });
    };

    list.forEach((item) => {
        deep(item);
    });

    return selectedList;
};

export const getSelectedListFromListValue = (list, value) => {
    if (!value) return [];

    const selectedList = [];
    let curNode = {children: list};
    let curLevel = 0;
    while (curNode.children && curNode.children.length) {
        const curValue = value[curLevel];
        curNode = curNode.children.find(item => isValueEqual(curValue, item.value)) || {};
        selectedList.push(curNode ? {label: curNode.label, value: curNode.value} : {});
        curLevel += 1;
    }

    return selectedList;
};

export const getValueFilterMap = (list = []) => {
    const filterMap = {};
    const rec = (node) => {
        const isLeaf = !node.children || !node.children.length;

        const nodeChain = getNodeChain(node);
        const key = JSON.stringify(nodeChain.map(({label, value}) => ({label, value})));
        const chainLabel = nodeChain.map(({label}) => label).join('/');
        filterMap[key] = chainLabel;
        if (isLeaf) return;

        node.children.forEach((item) => {
            rec(item);
        });
    };

    list.forEach((item) => {
        rec(item);
    });

    return filterMap;
};

