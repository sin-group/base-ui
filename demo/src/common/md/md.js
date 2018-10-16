/**
 * @author KylesLight
 * @date 28/02/2018-7:33 PM
 * @file md
 */

import IntroOverview from './intro-overview.md';
import IntroConcepts from './intro-concepts.md';

import CompButton from './comp/button.md';
import CompCard from './comp/card.md';
import CompDate from './comp/date.md';
import CompDateString from './comp/date-string.md';
import CompDateTime from './comp/date-time.md';
import CompForm from './comp/form.md';
import CompImage from './comp/image.md';
import CompImageGallery from './comp/image-gallery.md';
import CompInput from './comp/input.md';
import CompLayout from './comp/layout.md';
import CompPopper from './comp/popper.md';
import CompTable from './comp/table.md';

import {genMdTextMap} from './helper';

export default {
    IntroOverview,
    IntroConcepts,

    ...genMdTextMap(CompButton, 'CompButton'),
    ...genMdTextMap(CompCard, 'CompCard'),
    ...genMdTextMap(CompDate, 'CompDate'),
    ...genMdTextMap(CompDateString, 'CompDateString'),
    ...genMdTextMap(CompDateTime, 'CompDateTime'),
    ...genMdTextMap(CompForm, 'CompForm'),
    ...genMdTextMap(CompImage, 'CompImage'),
    ...genMdTextMap(CompImageGallery, 'CompImageGallery'),
    ...genMdTextMap(CompInput, 'CompInput'),
    ...genMdTextMap(CompLayout, 'CompLayout'),
    ...genMdTextMap(CompPopper, 'CompPopper'),
    ...genMdTextMap(CompTable, 'CompTable')
};
