
import keyCodeMap from '../../util/keyCodeMap';

import {createVueInstanceEle} from '../helper/helper';
import MessageModal from './component/message-modal';

let isBModalEscListened = false;
const modalInstanceList = [];

export default {

    install(Vue, {router, store, i18n}) {
        const $modal = {
            open(component, props = {}) {
                if (!component) {
                    throw new Error('Please pass component');
                }

                const ModalEleId = `modal${Date.now()}`;

                const Comp = Vue.extend(component);
                const modalInstance = new Comp({
                    router,
                    store,
                    i18n,

                    propsData: {
                        ...props
                    },

                    mounted() {
                        const vm = this;
                        vm.initEscReject();
                    },

                    methods: {
                        initEscReject() {
                            const vm = this;
                            modalInstanceList.push(vm);

                            if (!isBModalEscListened) {
                                document.addEventListener('keyup', ({keyCode}) => {
                                    if (keyCode === keyCodeMap.esc && modalInstanceList.length) {
                                        const modal = modalInstanceList.pop();
                                        modal.reject();
                                    }
                                });
                                isBModalEscListened = true;
                            }
                        }
                    }
                });

                createVueInstanceEle(ModalEleId);

                modalInstance.$mount(`#${ModalEleId}`);
                modalInstance.visible = true;

                return new Promise((resolve, reject) => {
                    Object.assign(modalInstance, {
                        resolve(data) {
                            modalInstance.visible = false;
                            resolve(data);
                        },

                        reject() {
                            modalInstance.visible = false;
                            reject();
                        }
                    });
                });
            },

            openMessageModal(message, title) {
                const self = this;
                return self.open(MessageModal, {message, title});
            }
        };

        Object.assign(Vue.prototype, {$modal});
    }

};
