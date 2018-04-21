/**
 * @author KylesLight
 * @date 21/04/2018-12:58 PM
 * @file focus
 */

const getInputEl = el => el.getElementsByTagName('input')[0] || el;

export default {
    inserted(el, binding) {
        const {value = true} = binding;
        if (!value) return;

        getInputEl(el).focus();
    },

    update(el, binding) {
        const {value = true, oldValue} = binding;
        if (value === oldValue) return;
        if (!value) {
            getInputEl(el).blur();
            return;
        }

        getInputEl(el).focus();
    },

    unbind(el) {
        getInputEl(el).blur();
    }
};
