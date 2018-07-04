const isValueEqual = (left, right) => JSON.stringify(left) === JSON.stringify(right);

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

