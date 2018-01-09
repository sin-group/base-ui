
import Toast from './Toast/Toast';
import Alert from './Alert/Alert';
import Modal from './Modal/Modal';

export default {
    install(Vue) {
        const $toast = new Toast();
        const $alert = new Alert();
        const $modal = new Modal();

        Object.assign(Vue.prototype, {
            $toast,
            $alert,
            $modal
        });
    }
};
