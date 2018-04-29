/**
 * @author KylesLight
 * @date 28/04/2018-1:28 PM
 * @file prevent-scroll
 */
/* global document */

let modalNum = 0;

export default {
    inserted() {
        if (modalNum <= 0) { // only happens from 0 to 1
            document.body.classList.add('b-modal-open');
        }

        modalNum += 1;
    },

    unbind() {
        modalNum -= 1;

        if (modalNum <= 0) { // only happens from 1 to 0
            document.body.classList.remove('b-modal-open');
        }
    }
};
