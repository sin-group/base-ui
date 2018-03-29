/**
 * @author lany44
 * @date 2018/3/26-下午4:51
 * @file tooltip.js
 */

import {initPosition} from '../../component/b-popper/position';

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
        el.addEventListener('mouseover', () => {
            toolTipEle.innerText = value;
            Object.assign(toolTipEle.style, {
                display: 'block'
            });

            initPosition({
                $refEl: el,
                $el: toolTipEle,
                place: 'top-center'
            });
        });

        el.addEventListener('mouseout', () => {
            Object.assign(toolTipEle.style, {
                display: 'none'
            });
        });
    }
};
