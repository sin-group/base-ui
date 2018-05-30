/**
 * @author Kyles Light
 * @email kuilin@yangqianguan.com
 * @date 2017-12-28 16:28:40.980
 */

import Intro from '../../app/intro';
import IntroOverview from '../../app/intro/overview';
import IntroConcepts from '../../app/intro/concepts';

import CSSFramework from '../../app/css-framework';
import CssElement from '../../app/css-framework/component/css-element';
import CssForm from '../../app/css-framework/component/css-form';
import CssIcon from '../../app/css-framework/component/css-icon';
import CssLayout from '../../app/css-framework/component/css-layout';
import CssTypography from '../../app/css-framework/component/css-typography';

import componentLibrary from '../../app/component-library';
import CompInOut from '../../app/component-library/component/comp-in-out';
import CompOutput from '../../app/component-library/component/comp-output';
import CompPlugin from '../../app/component-library/component/comp-plugin';
import CompView from '../../app/component-library/component/comp-view';

import Index from '../../app/index';

export default [
    {
        name: 'NotFound',
        path: '*',
        redirect: Index
    },
    {
        name: 'Root',
        path: '/',
        component: Index
    },
    {
        name: 'Index',
        path: '/index',
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
        path: '/css-framework',
        component: CSSFramework,
        redirect: '/css-framework/typography',
        meta: {
            navTitle: 'Style'
        },
        children: [
            {
                name: 'Typography',
                path: '/css-framework/typography',
                component: CssTypography,
                meta: {
                    navTitle: 'Typography'
                }
            },
            {
                name: 'Form',
                path: '/css-framework/form',
                component: CssForm,
                meta: {
                    navTitle: 'Form'
                }
            },
            {
                name: 'Layout',
                path: '/css-framework/layout',
                component: CssLayout,
                meta: {
                    navTitle: 'Layout'
                }
            },
            {
                name: 'Element',
                path: '/css-framework/element',
                component: CssElement,
                meta: {
                    navTitle: 'Element'
                }
            },
            {
                name: 'Icon',
                path: '/css-framework/icon',
                component: CssIcon,
                meta: {
                    navTitle: 'Icon'
                }
            }
        ]
    },
    {
        name: 'Component',
        path: '/component-library',
        component: componentLibrary,
        redirect: '/component-library/output',
        meta: {
            navTitle: 'Component'
        },
        children: [
            {
                name: 'Out',
                path: '/component-library/output',
                component: CompOutput,
                meta: {
                    navTitle: 'Output'
                }
            },
            {
                name: 'InView',
                path: '/component-library/view',
                component: CompView,
                meta: {
                    navTitle: 'Input to View'
                }
            },
            {
                name: 'InOut',
                path: '/component-library/in-out',
                component: CompInOut,
                meta: {
                    navTitle: 'Input to Output'
                }
            },
            {
                name: 'Plugin',
                path: '/component-library/plugin',
                component: CompPlugin,
                meta: {
                    navTitle: 'Plugin'
                }
            }
        ]
    }
];
