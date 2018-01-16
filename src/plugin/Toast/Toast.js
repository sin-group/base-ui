import {createVueInstanceEle} from '../helper/helper';
import BToast from './component/b-toast';
import ToastType from './constant/ToastType';

const ToastEleId = 'toast';

export const Toast = class Toast {

    constructor(Vue) {
        const self = this;
        createVueInstanceEle(ToastEleId);
        self.toastInstance = new Vue(BToast);

        self.toastInstance.$mount(`#${ToastEleId}`);
    }

    toast(type, message = '', duration = 2000) {
        const self = this;
        self.toastInstance.visible = true;
        self.toastInstance.message = message;
        self.toastInstance.type = type;

        if (self.toastTimer) clearTimeout(self.toastTimer);
        self.toastTimer = setTimeout(() => {
            self.toastInstance.visible = false;
        }, duration);
    }

    info(...arg) {
        const self = this;
        self.toast(ToastType.INFO, ...arg);
    }

    success(...arg) {
        const self = this;
        self.toast(ToastType.SUCCESS, ...arg);
    }

    error(...arg) {
        const self = this;
        self.toast(ToastType.ERROR, ...arg);
    }

};

export default {

    install(Vue) {
        const $toast = new Toast(Vue);

        Object.assign(Vue.prototype, {$toast});
    }

};
