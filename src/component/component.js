/**
 * @author KylesLight
 * @date 01/11/2017-1:10 PM
 * @file component
 */

import BDate from './b-date';
import BDialog from './b-dialog';
import BFormGroup from './b-form-group';
import BInput from './b-input';
import BMdView from './b-md-view';
import BPagination from './b-pagination';
import BPopper from './b-popper';
import BSelect from './b-select';
import BSwitch from './b-switch';
import BTable from './b-table';

export default {

    install(Vue) {
        Vue.component('b-date', BDate);
        Vue.component('b-dialog', BDialog);
        Vue.component('b-form-group', BFormGroup);
        Vue.component('b-input', BInput);
        Vue.component('b-md-view', BMdView);
        Vue.component('b-pagination', BPagination);
        Vue.component('b-popper', BPopper);
        Vue.component('b-select', BSelect);
        Vue.component('b-switch', BSwitch);
        Vue.component('b-table', BTable);
    }

};
