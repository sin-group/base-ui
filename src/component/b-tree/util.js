/**
 * @author lany44
 * @date 2018/4/2-上午11:27
 * @file util
 */

const PreOrder = 'PreOrder';
const PostOrder = 'PostOrder';

const genTraverseTreeListFunc = order => (treeList, handle) => {
    const rec = (node) => {
        if (order === PreOrder) handle(node);

        if (node.children && node.children.length > 0) {
            node.children.forEach(element => rec(element));
        }

        if (order === PostOrder) handle(node);
    };

    treeList.forEach(node => rec(node));

    return treeList;
};

export const preOrderTreeList = genTraverseTreeListFunc(PreOrder);

export const postOrderTreeList = genTraverseTreeListFunc(PostOrder);

export const checkTreeListHasNode = (treeList, targetNode) => {
    let isTreeListHasNode = false;
    const rec = (node) => {
        if (node === targetNode) {
            isTreeListHasNode = true;
            return;
        }

        if (node.children && node.children.length > 0) {
            node.children.forEach(element => rec(element));
        }
    };

    treeList.forEach(node => rec(node));

    return isTreeListHasNode;
};
