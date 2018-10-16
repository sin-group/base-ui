/**
 * @author KylesLight
 * @date 16/10/2018-12:58 PM
 * @file hotkey
 */
/* global document */

const Keycode = {
    8: 'backspace',
    9: 'tab',
    13: 'enter',
    16: 'shift',
    17: 'ctrl',
    18: 'alt',
    27: 'esc',
    32: 'space',
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down',
    91: 'command'
};

export default {
    inserted(el, binding) {
        if (!document) return;
        const keyMap = binding.value;

        el.$$hotkeyHandler = (event) => {
            const inputAlias = Keycode[event.keyCode];

            if (!inputAlias) return;
            const trigger = keyMap[inputAlias];

            if (trigger) trigger();
        };

        document.addEventListener('keydown', el.$$hotkeyHandler);
    },

    unbind(el) {
        if (!document) return;
        document.removeEventListener('keydown', el.$$hotkeyHandler);
    }
};
