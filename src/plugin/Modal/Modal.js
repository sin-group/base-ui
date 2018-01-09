/* global window, document */

import Vue from 'vue';
import {createVueInstanceEle} from '../helper/helper';
import MessageModal from './component/message-modal';

class Modal {

    open(component, resolved = {}) {
        if (!component) {
            throw new Error('Please pass component');
        }

        const ModalEleId = `modal${Date.now()}`;

        const modalInstance = new Vue({
            ...component
        });

        createVueInstanceEle(ModalEleId);
        modalInstance.$mount(`#${ModalEleId}`);

        Object.assign(modalInstance, resolved);
        modalInstance.visible = true;

        const destroy = () => {
            if (!document.body.contains(modalInstance.$el)) return;
            modalInstance.visible = false;
            document.body.removeChild(modalInstance.$el);
        };

        window.onpopstate = () => {
            destroy();
        };

        return new Promise((resolve, reject) => {
            Object.assign(modalInstance, {
                resolve(data) {
                    destroy();
                    resolve(data);
                },

                reject() {
                    destroy();
                    reject();
                }
            });
        });
    }

    openMessageModal(message, confirmText, options = {}) {
        const self = this;
        return self.open(MessageModal, {message, confirmText, options});
    }

}

export default Modal;
