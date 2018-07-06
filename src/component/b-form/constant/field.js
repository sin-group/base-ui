/**
 * @author lany44
 * @date 2018/4/16-下午3:31
 * @file Filed-types
 */

import BInput from '../../b-input';
import BSelect from '../../b-select';
import BSelectArray from '../../b-select-array';
import BSelectCascader from '../../b-select-cascader';
import BDate from '../../b-date';
import BDateString from '../../b-date-string';
import BSwitch from '../../b-switch';

export const FieldTypes = {
    text: 'text', // default field type
    select: 'select',
    selectArray: 'select-array',
    selectCascader: 'select-cascader',
    date: 'date',
    dateString: 'dateString',
    switch: 'switch'
};

export const FieldMap = {
    [FieldTypes.text]: BInput,
    [FieldTypes.select]: BSelect,
    [FieldTypes.selectArray]: BSelectArray,
    [FieldTypes.selectCascader]: BSelectCascader,
    [FieldTypes.date]: BDate,
    [FieldTypes.dateString]: BDateString,
    [FieldTypes.switch]: BSwitch
};
