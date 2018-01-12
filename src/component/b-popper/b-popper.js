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
        const {$slots, needRender, visible} = vm;

        return needRender ? createElement(
            'div',
            {
                class: 'b-popper-wrap',
                style: {
                    display: visible ? 'inline-block' : 'none',
                    position: 'absolute',
                    top: 0
                }
            },
            $slots.default
        ) : null;
    },

    props: {
        refEl: {},
        place: {
            type: String,
            default: 'bottom-start'
        }
    },

    data() {
        return {
            visible: false
        };
    },

    computed: {
        needRender() {
            const vm = this;
            const {visible, $$isRendered = false} = vm;

            return $$isRendered || (vm.$$isRendered = visible);
        }
    },

    methods: {
        open() {
            const vm = this;
            vm.visible = true;

            vm.$nextTick(() => {
                vm.makePosition();
            });
        },

        close() {
            const vm = this;
            vm.visible = false;
        },

        makePosition() {
            const vm = this;
            const {visible, $el, refEl: $refEl, place} = vm;

            if (visible) {
                document.body.appendChild(vm.$el);
                initPosition({$refEl, $el, place});
            }
        }
    },

    mounted() {
        const vm = this;
        on(window, 'resize', vm.makePosition);
    },

    destroyed() {
        const vm = this;
        off(window, 'resize', vm.makePosition);
        if (vm.needRender) {
            document.body.removeChild(vm.$el);
        }
    }
};
