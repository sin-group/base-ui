/**
 * @author KylesLight
 * @date 11/01/2018-3:14 PM
 * @file helper
 */

import {OrderType} from '../../../constant/OrderConf';

const compareAsc = (left, right) => (left < right ? -1 : 1);
const compareDesc = (left, right) => (left < right ? 1 : -1);
const compareStringsAsc = (left, right) => left.localeCompare(right);
const compareStringsDesc = (left, right) => right.localeCompare(left);
const compareNullAsc = (left, right) => {
    if (left === right) return 0;
    if (left == null) return -1;
    if (right == null) return 1;

    throw new Error();
};
const compareNullDesc = (left, right) => -compareNullAsc(left, right);

export const genSortedRecords = (records = [], field, order) => {
    if (!field || order === OrderType.NONE) return records;

    const compare = order === OrderType.ASC ? compareAsc : compareDesc;
    const compareStrings = order === OrderType.ASC ? compareStringsAsc : compareStringsDesc;
    const compareNull = order === OrderType.ASC ? compareNullAsc : compareNullDesc;
    let compareComposed = compare;
    if (String.prototype.localeCompare) {
        compareComposed = (left, right) => {
            if (left == null || right == null) return compareNull(left, right);

            if (typeof left === typeof right && typeof left === typeof 'string') {
                return compareStrings(left, right);
            }

            return compare(left, right);
        };
    }

    return [...records].sort((left, right) => compareComposed(left[field], right[field]));
};
