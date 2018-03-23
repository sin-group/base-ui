
import plugToast from './Toast/Toast';
import plugAlert from './Alert/Alert';
import plugModal from './Modal/Modal';
import plugValid from './Valid/Valid';

export default {
    install(Vue, options) {
        Vue.use(plugToast, options);
        Vue.use(plugAlert, options);
        Vue.use(plugModal, options);
        Vue.use(plugValid, options);
    }
};
