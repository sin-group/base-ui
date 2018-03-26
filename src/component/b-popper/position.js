/**
 * @author lany44
 * @date 2017/11/24-下午7:00
 * @file position
 */
/* eslint-disable */

import {getRect, isDOM} from '../../util/dom';

export const initPosition = ({$refEl, $el, place = 'bottom-start'}) => {
    if (!isDOM($refEl) || !isDOM($el)) throw `init Popper position invalid DOM Object: $refEl: ${$refEl.tagName}, $el: ${$el.tagName}`;

    const refElRect = getRect($refEl);
    const ElRect = getRect($el);

    const {innerHeight, innerWidth, pageXOffset, pageYOffset} = window;
    const windowRect = {
        innerHeight,
        innerWidth,
        top: pageYOffset,
        left: pageXOffset,
        bottom: pageYOffset + innerHeight,
        right: pageXOffset + innerWidth
    };

    let x = 0;
    let y = 0;
    switch (place) {
        case 'bottom-start': {
            x = refElRect.left;
            y = refElRect.offsetY + refElRect.height;

            if ((x + ElRect.width) > windowRect.right) x = x - ElRect.width;
            if ((y + ElRect.height) > windowRect.bottom) y = refElRect.offsetY - ElRect.height;
            break;
        }
        case 'top-center': {
            x = refElRect.left + refElRect.width / 2 - ElRect.width / 2;
            y = refElRect.offsetY - ElRect.height;
            break;
        }
    }

    Object.assign($el.style, {top: `${y}px`, left: `${x}px`});
};
