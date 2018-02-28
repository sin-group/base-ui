/**
 * @author Kyles Light
 * @email kuilin@yangqianguan.com
 * @date 2017-12-28 16:28:40.980
 */

import Intro from '../../app/intro';
import IntroOverview from '../../app/intro/overview';
import IntroConceptions from '../../app/intro/conceptions';

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

export default {
    notFound: {
        path: '*',
        redirect: Index
    },

    root: {
        path: '/',
        redirect: '/index'
    },

    index: {
        path: '/index',
        component: Index
    },

    intro: {
        name: 'Intro',
        path: '/intro',
        component: Intro,
        redirect: '/intro/overview',
        children: [
            {
                name: 'Overview',
                path: '/intro/overview',
                component: IntroOverview
            },
            {
                name: 'Conceptions',
                path: '/intro/conceptions',
                component: IntroConceptions
            }
        ]
    },

    cssFramework: {
        name: 'Style',
        path: '/css-framework',
        component: CSSFramework,
        redirect: '/css-framework/typography',
        children: [
            {
                name: 'Typography',
                path: '/css-framework/typography',
                component: CssTypography
            },
            {
                name: 'Form',
                path: '/css-framework/form',
                component: CssForm
            },
            {
                name: 'Layout',
                path: '/css-framework/layout',
                component: CssLayout
            },
            {
                name: 'Element',
                path: '/css-framework/element',
                component: CssElement
            },
            {
                name: 'Icon',
                path: '/css-framework/icon',
                component: CssIcon
            }
        ]
    },

    componentLibrary: {
        name: 'Component',
        path: '/component-library',
        component: componentLibrary,
        redirect: '/component-library/output',
        children: [
            {
                name: 'Out',
                path: '/component-library/output',
                component: CompOutput
            },
            {
                name: 'In-View',
                path: '/component-library/view',
                component: CompView
            },
            {
                name: 'In-Out',
                path: '/component-library/in-out',
                component: CompInOut
            },
            {
                name: 'Plugin',
                path: '/component-library/plugin',
                component: CompPlugin
            }
        ]
    }
};
