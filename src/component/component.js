/**
 * @author KylesLight
 * @date 01/11/2017-1:10 PM
 * @file component
 */

import BDate from './b-date';
import BDateString from './b-date-string';
import BDialog from './b-dialog';
import BForm from './b-form';
import BFormGroup from './b-form-group';
import BHeader from './b-header';
import BImage from './b-image';
import BInput from './b-input';
import BLayout from './b-layout';
import BNavSide from './b-nav-side';
import BMdEditor from './b-md-editor';
import BMdView from './b-md-view';
import BPagination from './b-pagination';
import BPopper from './b-popper';
import BSelect from './b-select';
import BSelectArray from './b-select-array';
import BSelectCascader from './b-select-cascader';
import BSwitch from './b-switch';
import BTable from './b-table';
import BTree from './b-tree';

export default {

    install(Vue) {
        Vue.component('b-date', BDate);
        Vue.component('b-date-string', BDateString);
        Vue.component('b-dialog', BDialog);
        Vue.component('b-form', BForm);
        Vue.component('b-form-group', BFormGroup);
        Vue.component('b-header', BHeader);
        Vue.component('b-image', BImage);
        Vue.component('b-input', BInput);
        Vue.component('b-layout', BLayout);
        Vue.component('b-nav-side', BNavSide);
        Vue.component('b-md-editor', BMdEditor);
        Vue.component('b-md-view', BMdView);
        Vue.component('b-pagination', BPagination);
        Vue.component('b-popper', BPopper);
        Vue.component('b-select', BSelect);
        Vue.component('b-select-array', BSelectArray);
        Vue.component('b-select-cascader', BSelectCascader);
        Vue.component('b-switch', BSwitch);
        Vue.component('b-table', BTable);
        Vue.component('b-tree', BTree);
    }

};
