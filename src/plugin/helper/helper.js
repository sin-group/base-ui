/* globals document */

export const createVueInstanceEle = (id) => {
    const ele = document.createElement('div');
    ele.id = id;
    document.body.appendChild(ele);
};
