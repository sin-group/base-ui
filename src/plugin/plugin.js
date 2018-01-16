
import plugToast from './Toast/Toast';
import plugAlert from './Alert/Alert';
import plugModal from './Modal/Modal';
import plugValid from './Valid/Valid';

export default {
    install(Vue, options) {
        Vue.use(plugToast);
        Vue.use(plugAlert);
        Vue.use(plugModal);
        Vue.use(plugValid, options);
    }
};
