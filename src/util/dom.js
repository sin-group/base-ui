/**
 * @author lany44
 * @date 2017/11/21-下午7:13
 * @file dom
 */
/* global document, window */

const ultraBookMin = 760;

export const isMobile = () => {
    const width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    return width < ultraBookMin;
};

const trim = function (string) {
  return (string || '').replace(/^[\s\uFEFF]+|[\s\uFEFF]+$/g, '');
};

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
/* eslint-disable */
export function hasClass(el, cls) {
  if (!el || !cls) return false;
  if (cls.indexOf(' ') !== -1) throw new Error('className should not contain space.');
  if (el.classList) {
    return el.classList.contains(cls);
  } else {
    return (' ' + el.className + ' ').indexOf(' ' + cls + ' ') > -1;
  }
};

export function addClass(el, cls) {
    if (!el) return;
    let curClass = el.className;
    const classes = (cls || '').split(' ');

    for (let i = 0, j = classes.length; i < j; i++) {
      const clsName = classes[i];
      if (!clsName) continue;

      if (el.classList) {
        el.classList.add(clsName);
      } else if (!hasClass(el, clsName)) {
        curClass += ` ${clsName}`;
      }
    }
    if (!el.classList) {
      el.className = curClass;
    }
  }

export function removeClass(el, cls) {
    if (!el || !cls) return;
    const classes = cls.split(' ');
    let curClass = ` ${el.className} `;

    for (let i = 0, j = classes.length; i < j; i++) {
      const clsName = classes[i];
      if (!clsName) continue;

      if (el.classList) {
        el.classList.remove(clsName);
      } else if (hasClass(el, clsName)) {
        curClass = curClass.replace(` ${clsName} `, ' ');
      }
    }
    if (!el.classList) {
      el.className = trim(curClass);
    }
  }
