/**
 * @author lany44
 * @date 2017/11/21-下午7:13
 * @file popper
 */
/* eslint-disable */

import Position from './position';

import {on, off} from '../../util/dom';
import emitter from '../../mixin/emitter';

export default {
    name: 'b-popper',

    mixins: [emitter],

    render(createElement) {
        const vm = this;
        const {$slots, needRender} = vm;

        return needRender ? createElement(
            'div',
            {
                class: 'b-popper-wrap',
                style: {
                    display: 'inline-block',
                    opacity: 0,
                    transform: 'scaleY(0)',
                    transition: `transform .36s cubic-bezier(.78, .14, .15, .86),
                                 opacity .36s cubic-bezier(.78, .14, .15, .86)`,
                    transformOrigin: 'center top'
                }
            },
            $slots.default
        ) : null;
    },

    props: {
        wrapClass: {
            type: [Array, String]
        },
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
            vm.broadcastAll('b-popper-open');
            vm.visible = true;
            vm.$nextTick(() => {
                vm.makePosition();
                vm.addTransition();
                vm.broadcastAll('b-popper-opened');
            });
        },

        close() {
            const vm = this;
            vm.broadcastAll('b-popper-close');
            vm.visible = false;
            vm.$nextTick(() => {
                vm.addTransition();
                vm.broadcastAll('b-popper-closed');
            });
        },

        makePosition() {
            const vm = this;
            const {needRender, $el, refEl, place, $$Positon} = vm;

            if (needRender) {
                document.body.appendChild(vm.$el);

                if (!$$Positon) {
                    vm.$$Positon = new Position(refEl, $el, {place});
                } else {
                    vm.$$Positon.reset();
                }
            }
        },

        addTransition() {
            const vm = this;
            const {needRender, visible, $el} = vm;

            if (!needRender) return;

            if (visible) {
                Object.assign($el.style, {opacity: 1, transform: 'scaleY(1)'});
            } else {
                Object.assign($el.style, {opacity: 0, transform: 'scaleY(0)'});
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
