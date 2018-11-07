/**
 * @author KylesLight
 * @date 01/11/2017-1:10 PM
 * @file component
 */

import BButton from './b-button';
import BCard from './b-card';
import BCardActions from './b-card/b-card-footer';
import BCardContent from './b-card/b-card-body';
import BCardHeader from './b-card/b-card-header';
import BCardMedia from './b-card/b-card-media';
import BDate from './b-date';
import BDateString from './b-date-string';
import BDateTime from './b-date-time';
import BDialog from './b-dialog';
import BForm from './b-form';
import BFormGroup from './b-form-group';
import BHeader from './b-header';
import BImage from './b-image';
import BImageGallery from './b-image-gallery';
import BInput from './b-input';
import BLayout from './b-layout';
import BNavSide from './b-nav-side';
import BNavTop from './b-nav-top';
import BMdEditor from './b-md-editor';
import BMdView from './b-md-view';
import BPagination from './b-pagination';
import BPopper from './b-popper';
import BSelect from './b-select';
import BSelectArray from './b-select-array';
import BSelectCascader from './b-select-cascader';
import BSwitch from './b-switch';
import BTab from './b-tab';
import BTable from './b-table';
import BTagInput from './b-tag-input';
import BTree from './b-tree';

export default {

    install(Vue) {
        Vue.component('b-button', BButton);
        Vue.component('b-card', BCard);
        Vue.component('b-card-footer', BCardActions);
        Vue.component('b-card-body', BCardContent);
        Vue.component('b-card-header', BCardHeader);
        Vue.component('b-card-media', BCardMedia);
        Vue.component('b-date', BDate);
        Vue.component('b-date-string', BDateString);
        Vue.component('b-date-time', BDateTime);
        Vue.component('b-dialog', BDialog);
        Vue.component('b-form', BForm);
        Vue.component('b-form-group', BFormGroup);
        Vue.component('b-header', BHeader);
        Vue.component('b-image', BImage);
        Vue.component('b-image-gallery', BImageGallery);
        Vue.component('b-input', BInput);
        Vue.component('b-layout', BLayout);
        Vue.component('b-nav-side', BNavSide);
        Vue.component('b-nav-top', BNavTop);
        Vue.component('b-md-editor', BMdEditor);
        Vue.component('b-md-view', BMdView);
        Vue.component('b-pagination', BPagination);
        Vue.component('b-popper', BPopper);
        Vue.component('b-select', BSelect);
        Vue.component('b-select-array', BSelectArray);
        Vue.component('b-select-cascader', BSelectCascader);
        Vue.component('b-switch', BSwitch);
        Vue.component('b-tab', BTab);
        Vue.component('b-table', BTable);
        Vue.component('b-tag-input', BTagInput);
        Vue.component('b-tree', BTree);
    }

};
