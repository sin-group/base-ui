/**
 * @author lany44
 * @date 2018/4/16-下午3:31
 * @file Filed-types
 */

import BInput from '../../b-input';
import BSelect from '../../b-select';
import BDate from '../../b-date';
import BSwitch from '../../b-switch';

export const FieldTypes = {
    text: 'text', // default field type
    select: 'select',
    date: 'date',
    switch: 'switch'
};

export const FieldMap = {
    [FieldTypes.text]: BInput,
    [FieldTypes.select]: BSelect,
    [FieldTypes.date]: BDate,
    [FieldTypes.switch]: BSwitch
};
