/**
 * @author lany44
 * @date 2017/11/24-下午7:00
 * @file position
 */
/* eslint-disable */

import {getRect, isDOM} from '../../util/dom';

export default class Position {
    constructor($refEl, $el, config) {
        if (!isDOM($refEl) || !isDOM($el)) throw `init Popper position invalid DOM Object: $refEl: ${$refEl.tagName}, $el: ${$el.tagName}`;

        this.$refEl = $refEl;
        this.$el = $el;
        this.config = config;

        this.reset();
    }

    reset() {
        const {$refEl, $el, config: {place}} = this;
        const firstPlace = place.split('-')[0];
        const lastPlace = place.split('-')[1];
        const refElRect = getRect($refEl);

        let x = 0;
        let y = 0;
        switch (firstPlace) {
            case 'bottom': {
                y = refElRect.bottom;
            }
        }

        switch (lastPlace) {
            case 'start': {
                x = refElRect.left;
            }
        }

        Object.assign($el.style, {position: 'absolute', top: `${y}px`, left: `${x}px`});
    }
}
