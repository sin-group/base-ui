/**
 * @author lany44
 * @date 2017/11/21-下午7:13
 * @file dom
 */
/* global navigator */

export const getRect = (el) => {
    const rect = el.getBoundingClientRect();

    // whether the IE version is lower than 11
    const isIE = navigator.userAgent.indexOf('MSIE') !== -1;

    // fix ie document bounding top always 0 bug
    const rectTop = isIE && el.tagName === 'HTML'
        ? -el.scrollTop
        : rect.top;

    return {
        left: rect.left,
        top: rectTop,
        right: rect.right,
        bottom: rect.bottom,
        width: rect.right - rect.left,
        height: rect.bottom - rectTop
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
        el.addEventListener(event, handler, false);
    }
};
