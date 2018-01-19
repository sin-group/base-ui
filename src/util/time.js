/**
 * @author KylesLight
 * @date 05/01/2018-4:52 PM
 * @file filter-util
 */

const DatePresentationReg = /(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}).(\d{3})/;
const DateFormat = 'YYYY-MM-DD';
const DateTimeFormat = 'YYYY-MM-DD HH:mm:ss';
const MillisecondInMinute = 60 * 1e3;
export const DailyMillisecond = 24 * 60 * MillisecondInMinute;

export const getTimeComponent = (timeStamp) => {
    if (typeof timeStamp !== typeof 0) return {};

    const offset = (new Date()).getTimezoneOffset() * MillisecondInMinute;
    const day = (new Date(timeStamp - offset)).getDay();
    const timePresentation = new Date(timeStamp - offset).toJSON();
    const [
        entity, // eslint-disable-line no-unused-vars
        year,
        month,
        date,
        hour,
        minute,
        second,
        millisecond
    ] = timePresentation.match(DatePresentationReg);

    return {
        year,
        month,
        date,
        hour,
        minute,
        second,
        millisecond,
        day
    };
};

export const getTimeDigitalComponent = (timeStamp) => {
    const {
        year,
        month,
        date,
        hour,
        minute,
        second,
        millisecond,
        day
    } = getTimeComponent(timeStamp);

    return {
        year: +year,
        month: +month,
        date: +date,
        hour: +hour,
        minute: +minute,
        second: +second,
        millisecond: +millisecond,
        day: +day
    };
};

export const genDateStringWithFormat = (timeStamp, format) => {
    const {year, month, date, hour, minute, second, millisecond} = getTimeComponent(timeStamp);

    return format
        .replace(/YYYY/g, () => year)
        .replace(/MM/g, () => month)
        .replace(/DD/g, () => date)
        .replace(/HH/g, () => hour)
        .replace(/mm/g, () => minute)
        .replace(/ss/g, () => second)
        .replace(/SSS/g, () => millisecond); // TODO: 增加 format 支持
};

export const getDate = (timeStamp) => {
    if (typeof timeStamp !== typeof 0) return timeStamp;

    return genDateStringWithFormat(timeStamp, DateFormat);
};

export const getDateTime = (timeStamp) => {
    if (typeof timeStamp !== typeof 0) return timeStamp;

    return genDateStringWithFormat(timeStamp, DateTimeFormat);
};
