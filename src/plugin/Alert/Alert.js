import Vue from 'vue';
import {createVueInstanceEle} from '../helper/helper';
import BAlert from './component/b-alert';
import AlertType from './constant/AlertType';

const AlertEleId = 'alert';

class Alert {

    constructor() {
        const self = this;

        createVueInstanceEle(AlertEleId);
        self.alertInstance = new Vue(BAlert);
        self.alertInstance.$mount(`#${AlertEleId}`);
    }

    alert(type, message = '', title = '') {
        const self = this;
        Object.assign(self.alertInstance, {
            type,
            message,
            title,
            visible: true
        });
    }

    info(...arg) {
        const self = this;
        self.alert(AlertType.INFO, ...arg);
    }

    success(...arg) {
        const self = this;
        self.alert(AlertType.SUCCESS, ...arg);
    }

    error(...arg) {
        const self = this;
        self.alert(AlertType.ERROR, ...arg);
    }

}

export default Alert;
