/**
 * @author KylesLight
 * @date 28/04/2018-1:28 PM
 * @file prevent-scroll
 */
/* global document */

export default {
    inserted() {
        document.body.classList.add('b-modal-open');
    },

    unbind() {
        document.body.classList.remove('b-modal-open');
    }
};
