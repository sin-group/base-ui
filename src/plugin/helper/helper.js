/* globals document */

export const createVueInstanceEle = (id) => {
    if (typeof document === 'undefined') return;

    const ele = document.createElement('div');
    ele.id = id;
    document.body.appendChild(ele);
};

export const pickValue = (obj, keyString = '') => {
    const keys = keyString.split('.');
    let value = obj;
    keys.forEach((key) => {
        value = value[key];
    });

    return value;
};
