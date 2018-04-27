/**
 * @author KylesLight
 * @date 21/04/2018-12:58 PM
 * @file focus
 */

const getInputEl = el => el.getElementsByTagName('input')[0] || el;

export default {
    inserted(el) {
        getInputEl(el).focus();
    },

    update(el, binding) {
        if (binding.modifiers.stay) {
            getInputEl(el).focus();
        }
    },

    unbind(el) {
        getInputEl(el).blur();
    }
};
