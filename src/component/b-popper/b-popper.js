/**
 * @author lany44
 * @date 2017/11/21-下午7:13
 * @file popper
 */
/* eslint-disable */

import {initPosition} from './position';

import {on, off} from '../../util/dom';

export default {
    name: 'b-popper',

    render(createElement) {
        const vm = this;
        const {$slots} = vm;

        return createElement(
            'div',
            {
                class: 'b-popper-wrap',
                style: {
                    display: 'inline-block',
                    position: 'absolute',
                    top: 0
                }
            },
            $slots.default
        );
    },

    props: {
        place: {
            type: String,
            default: 'bottom-start'
        }
    },

    data() {
        return {
            refEl: null
        };
    },

    methods: {
        makePosition() {
            const vm = this;
            const {$el, refEl: $refEl, place} = vm;
            document.body.appendChild(vm.$el);
            initPosition({$refEl, $el, place});
        }
    },

    mounted() {
        const vm = this;
        const {$parent} = vm;
        vm.refEl = $parent.$el;

        vm.makePosition();
        on(window, 'resize', vm.makePosition);
    },

    destroyed() {
        const vm = this;
        off(window, 'resize', vm.makePosition);
        if (document.body.contains(vm.$el)) {
            document.body.removeChild(vm.$el);
        }
    }
};
