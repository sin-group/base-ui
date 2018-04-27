/**
 * @author lany44
 * @date 2017/11/27-下午1:06
 * @file directive
 */
/* eslint-disable */

import {on, off, isChildrenDOM} from '../../util/dom';

const isBindingFunction = (binding) => {
    if (typeof binding.value !== 'function') {
        console.warn('[Vue-click-outside:] provided expression', binding.expression, 'is not a function.');
        return false;
    }

    return true;
};

const genDocumentHandler = (el, hook, vnode) => (e) => {
    const {target} = e;

    if (el === target
        || isChildrenDOM(el, target)) return;

    hook();
};

export default {
    bind(el, binding, vnode) {
        if (!isBindingFunction(binding)) return;

        vnode['@@b-click-outside'] = genDocumentHandler(el, binding.value, vnode);
        on(document, 'click', vnode['@@b-click-outside']);
    },

    unbind(el, binding, vnode) {
        off(document, 'click', vnode['@@b-click-outside']);
    }
};
