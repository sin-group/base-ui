/**
 * @author lany44
 * @date 2017/11/21-下午7:13
 * @file dom
 */
/* global document */

export const getRect = (el) => {
    const rect = el.getBoundingClientRect();
    const bodyRect = document.body.getBoundingClientRect();

    return {
        left: rect.left,
        top: rect.top,
        right: rect.right,
        bottom: rect.bottom,
        width: rect.right - rect.left,
        height: rect.bottom - rect.top,
        offsetY: rect.top - bodyRect.top
    };
};

export const isDOM = el => el && el.tagName;

export const isChildrenDOM = (parent, el) => parent.contains(el);

export const on = (el, event, handler) => {
    if (el && event && handler) {
        el.addEventListener(event, handler, false);
    }
};

export const off = (el, event, handler) => {
    if (el && event && handler) {
        el.removeEventListener(event, handler, false);
    }
};

export const getWindowRect = () => {
    const {innerHeight, innerWidth, pageXOffset, pageYOffset} = window;
    return {
        innerHeight,
        innerWidth,
        top: pageYOffset,
        left: pageXOffset,
        bottom: pageYOffset + innerHeight,
        right: pageXOffset + innerWidth
    };
};
