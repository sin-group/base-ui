/**
 * @author KylesLight
 * @date 25/01/2018-4:04 PM
 * @file clipboard
 */
/* global document */

import {on} from '../../util/dom';

const emit = (vnode, name, data) => {
    const handlers = (vnode.data && vnode.data.on) || (vnode.componentOptions && vnode.componentOptions.listeners);

    if (handlers && handlers[name]) {
        handlers[name].fns(data);
    }
};

const EventType = {
    SUCCESS: 'v-b-clipboard-success',
    ERROR: 'v-b-clipboard-error'
};

const clipboard = {
    fakeElem: null,

    init() {
        const self = this;

        if (!self.fakeElem) {
            self.fakeElem = document.createElement('textarea');

            // magic process to make clipboard happen
            // ref: https://stackoverflow.com/questions/400212/how-do-i-copy-to-the-clipboard-in-javascript
            self.fakeElem.style.position = 'fixed';
            self.fakeElem.style.top = 0;
            self.fakeElem.style.left = 0;
            self.fakeElem.style.width = '1px';
            self.fakeElem.style.height = '1px';
            self.fakeElem.style.padding = 0;
            self.fakeElem.style.border = 'none';
            self.fakeElem.style.outline = 'none';
            self.fakeElem.style.boxShadow = 'none';
            self.fakeElem.style.background = 'transparent';
            self.fakeElem.setAttribute('readonly', true);

            document.body.appendChild(self.fakeElem);
        }
    },

    update(el, binding, vnode) {
        const self = this;
        self.removeEle();
        self.init();
        const message = binding.value;
        on(el, 'click', () => {
            clipboard.select(message, vnode);
        });
    },

    select(message, vnode) {
        const self = this;

        try {
            self.fakeElem.value = message;
            self.fakeElem.select();
            document.execCommand('copy');
            emit(vnode, EventType.SUCCESS, message);
        } catch (err) {
            emit(vnode, EventType.ERROR, message);
        }
    },

    removeEle() {
        const self = this;
        if (self.fakeElem) {
            document.body.removeChild(self.fakeElem);
            self.fakeElem = null;
        }
    }
};

export default {
    params: Object.values(EventType),
    bind(...args) {
        clipboard.update(...args);
    },

    update(...args) {
        clipboard.update(...args);
    },

    unbind() {
        clipboard.removeEle();
    }
};
