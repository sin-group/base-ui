/**
 * @author lany44
 * @date 2018/3/26-下午4:51
 * @file tooltip.js
 */

import {initPosition} from './position';

let toolTipEle;

export default {
    bind() {
        if (!toolTipEle) {
            toolTipEle = document.createElement('span');

            toolTipEle.classList.add('b-tooltip');

            toolTipEle.addEventListener('mouseover', () => {
                Object.assign(toolTipEle.style, {
                    display: 'block'
                });
            });

            toolTipEle.addEventListener('mouseout', () => {
                Object.assign(toolTipEle.style, {
                    display: 'none'
                });
            });

            document.body.appendChild(toolTipEle);
        }
    },

    inserted(el, {value}) {
        el.dataset.tipText = value;

        el.$$tooltipMouseover = () => {
            toolTipEle.innerText = el.dataset.tipText;
            Object.assign(toolTipEle.style, {
                display: 'block'
            });

            initPosition({
                $refEl: el,
                $el: toolTipEle,
                place: 'top-center'
            });
        };

        el.$$tooltipMouseout = () => {
            Object.assign(toolTipEle.style, {
                display: 'none'
            });
        };

        el.addEventListener('mouseover', el.$$tooltipMouseover);
        el.addEventListener('mouseout', el.$$tooltipMouseout);
    },

    update(el, {value}) {
        el.dataset.tipText = value;
        if (el.$$tooltipMouseout && toolTipEle && toolTipEle.style.display === 'block') {
            el.$$tooltipMouseover();
        }
    },

    unbind(el) {
        if (el.$$tooltipMouseout) el.$$tooltipMouseout();

        el.removeEventListener('mouseover', el.$$tooltipMouseover);
        el.removeEventListener('mouseout', el.$$tooltipMouseout);
    }
};
