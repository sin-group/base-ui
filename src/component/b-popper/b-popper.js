/**
 * @author lany44
 * @date 2017/11/21-下午7:13
 * @file popper
 */
/* eslint-disable */

import BDialog from '../b-dialog';

import {initPosition} from './position';

import {on, off} from '../../util/dom';

// b-dialog's z-index: 9999
const Z_INDEX_POPPER_IN_DIALOG = 10000;

export default {
    name: 'b-popper',

    render(createElement) {
        const vm = this;
        const {$slots, isInBDialog} = vm;

        return createElement(
            'div',
            {
                class: 'b-popper-wrap',
                style: {
                    display: 'inline-block',
                    position: 'absolute',
                    top: 0,
                    zIndex: isInBDialog ? Z_INDEX_POPPER_IN_DIALOG : 10
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

    computed: {
        isInBDialog() {
            const vm = this;

            let isInDialog = false;
            const rec = ({$parent}) => {
                if (!$parent) return;

                if ($parent.$options.name === BDialog.name) {
                    isInDialog = true;
                    return;
                }

                rec($parent);
            };

            rec(vm);

            return isInDialog;
        }
    },

    methods: {
        makePosition() {
            const vm = this;
            const {$el, place, refEl: $refEl} = vm;

            document.body.appendChild($el);
            initPosition({$refEl, $el, place});
        }
    },

    mounted() {
        const vm = this;
        vm.refEl = vm.$el.parentNode;

        vm.makePosition();
        on(window, 'resize', vm.makePosition);
    },

    destroyed() {
        const vm = this;
        off(window, 'resize', vm.makePosition);
        if (vm.$el && vm.$el.parentNode) {
            vm.$el.parentNode.removeChild(vm.$el);
        }
    }
};
