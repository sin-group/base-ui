
import Toast from './Toast/Toast';
import Alert from './Alert/Alert';
import Modal from './Modal/Modal';

export default {
    install(Vue) {
        Vue.use(Toast);
        Vue.use(Alert);
        Vue.use(Modal);
    }
};
