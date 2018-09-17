/**
 * @author Kyles Light
 * @email kuilin@yangqianguan.com
 * @date 2017-12-28 16:28:40.980
 */

import Intro from '../../app/intro';
import IntroOverview from '../../app/intro/overview';
import IntroConcepts from '../../app/intro/concepts';

import Style from '../../app/style';
import StyleElement from '../../app/style/style-element';
import StyleForm from '../../app/style/style-form';
import StyleIcon from '../../app/style/style-icon';
import StyleLayout from '../../app/style/style-layout';
import StyleTypography from '../../app/style/style-typography';

import Comp from '../../app/comp';
import CompDate from '../../app/comp/comp-date';
import CompDateString from '../../app/comp/comp-date-string';
import CompDateTime from '../../app/comp/comp-date-time';
import CompForm from '../../app/comp/comp-form';
import CompImage from '../../app/comp/comp-image';
import CompInput from '../../app/comp/comp-input';
import CompMdEditor from '../../app/comp/comp-md-editor';
import CompMdView from '../../app/comp/comp-md-view';
import CompPagination from '../../app/comp/comp-pagination';
import CompSelect from '../../app/comp/comp-select';
import CompSelectArray from '../../app/comp/comp-select-array';
import CompSelectCascader from '../../app/comp/comp-select-cascader';
import CompSwitch from '../../app/comp/comp-switch';
import CompTab from '../../app/comp/comp-tab';
import CompTable from '../../app/comp/comp-table';
import CompTree from '../../app/comp/comp-tree';

import Plugin from '../../app/plugin';
import PluginToast from '../../app/plugin/plugin-toast';
import PluginAlert from '../../app/plugin/plugin-alert';
import PluginModal from '../../app/plugin/plugin-modal';

import Index from '../../app/index';

export default [
    {
        name: 'NotFound',
        path: '*',
        redirect: '/'
    },
    {
        name: 'Index',
        path: '/',
        component: Index
    },
    {
        name: 'Intro',
        path: '/intro',
        component: Intro,
        meta: {
            navTitle: 'Intro'
        },
        redirect: '/intro/overview',
        children: [
            {
                name: 'Overview',
                path: '/intro/overview',
                component: IntroOverview,
                meta: {
                    navTitle: 'Overview'
                }
            },
            {
                name: 'Concepts',
                path: '/intro/concepts',
                component: IntroConcepts,
                meta: {
                    navTitle: 'Concepts'
                }
            }
        ]
    },
    {
        name: 'Style',
        path: '/style',
        component: Style,
        redirect: '/style/typography',
        meta: {
            navTitle: 'Style'
        },
        children: [
            {
                name: 'Typography',
                path: '/style/typography',
                component: StyleTypography,
                meta: {
                    navTitle: 'Typography'
                }
            },
            {
                name: 'Form',
                path: '/style/form',
                component: StyleForm,
                meta: {
                    navTitle: 'Form'
                }
            },
            {
                name: 'Layout',
                path: '/style/layout',
                component: StyleLayout,
                meta: {
                    navTitle: 'Layout'
                }
            },
            {
                name: 'Element',
                path: '/style/element',
                component: StyleElement,
                meta: {
                    navTitle: 'Element'
                }
            },
            {
                name: 'Icon',
                path: '/style/icon',
                component: StyleIcon,
                meta: {
                    navTitle: 'Icon'
                }
            }
        ]
    },
    {
        name: 'Component',
        path: '/component',
        component: Comp,
        redirect: '/component/date',
        meta: {
            navTitle: 'Component'
        },
        children: [
            {
                name: 'CompDate',
                path: '/component/date',
                component: CompDate,
                meta: {
                    navTitle: 'Date'
                }
            },
            {
                name: 'CompDateString',
                path: '/component/date-string',
                component: CompDateString,
                meta: {
                    navTitle: 'Date String'
                }
            },
            {
                name: 'CompDateTime',
                path: '/component/date-time',
                component: CompDateTime,
                meta: {
                    navTitle: 'Date Time'
                }
            },
            {
                name: 'CompForm',
                path: '/component/form',
                component: CompForm,
                meta: {
                    navTitle: 'Form'
                }
            },
            {
                name: 'CompImage',
                path: '/component/image',
                component: CompImage,
                meta: {
                    navTitle: 'Image'
                }
            },
            {
                name: 'CompInput',
                path: '/component/input',
                component: CompInput,
                meta: {
                    navTitle: 'Input'
                }
            },
            {
                name: 'CompMdEditor',
                path: '/component/md-editor',
                component: CompMdEditor,
                meta: {
                    navTitle: 'Markdown Editor'
                }
            },
            {
                name: 'CompMdView',
                path: '/component/md-view',
                component: CompMdView,
                meta: {
                    navTitle: 'Markdown View'
                }
            },
            {
                name: 'CompPagination',
                path: '/component/pagination',
                component: CompPagination,
                meta: {
                    navTitle: 'Pagination'
                }
            },
            {
                name: 'CompSelect',
                path: '/component/select',
                component: CompSelect,
                meta: {
                    navTitle: 'Select'
                }
            },
            {
                name: 'CompSelectArray',
                path: '/component/select-array',
                component: CompSelectArray,
                meta: {
                    navTitle: 'Array Select'
                }
            },
            {
                name: 'CompSelectCascader',
                path: '/component/select-cascader',
                component: CompSelectCascader,
                meta: {
                    navTitle: 'Cascader Select'
                }
            },
            {
                name: 'CompSwitch',
                path: '/component/switch',
                component: CompSwitch,
                meta: {
                    navTitle: 'Switch'
                }
            },
            {
                name: 'CompTab',
                path: '/component/tab',
                component: CompTab,
                meta: {
                    navTitle: 'Tab'
                }
            },
            {
                name: 'CompTable',
                path: '/component/table',
                component: CompTable,
                meta: {
                    navTitle: 'Table'
                }
            },
            {
                name: 'CompTree',
                path: '/component/tree',
                component: CompTree,
                meta: {
                    navTitle: 'Tree'
                }
            }
        ]
    },
    {
        name: 'Plugin',
        path: '/plgin',
        component: Plugin,
        redirect: '/plugin/toast',
        meta: {
            navTitle: 'Plugin'
        },
        children: [
            {
                name: 'PluginToast',
                path: '/plugin/toast',
                component: PluginToast,
                meta: {
                    navTitle: 'Toast'
                }
            },
            {
                name: 'PluginAlert',
                path: '/plugin/alert',
                component: PluginAlert,
                meta: {
                    navTitle: 'Alert'
                }
            },
            {
                name: 'PluginModal',
                path: '/plugin/modal',
                component: PluginModal,
                meta: {
                    navTitle: 'Modal'
                }
            }
        ]
    }
];
