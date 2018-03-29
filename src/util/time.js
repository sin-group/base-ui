/**
 * @author KylesLight
 * @date 05/01/2018-4:52 PM
 * @file filter-util
 */

const DatePresentationReg = /(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}).(\d{3})/;
const DateFormat = 'YYYY-MM-DD';
const DateMinuteFormat = 'YYYY-MM-DD HH:mm';
const DateTimeFormat = 'YYYY-MM-DD HH:mm:ss';
const MillisecondInMinute = 60 * 1e3;
export const DailyMillisecond = 24 * 60 * MillisecondInMinute;

const getTimestamp = (time) => {
    if (typeof time === typeof 0) return time;

    return (new Date(time)).getTime();
};

export const getTimeComponent = (time) => {
    const timeStamp = getTimestamp(time);

    if (Number.isNaN(timeStamp)) return {};

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

export const getDate = (time) => {
    const timeStamp = getTimestamp(time);
    if (Number.isNaN(timeStamp)) return time;

    return genDateStringWithFormat(timeStamp, DateFormat);
};

export const getDateMinute = (time) => {
    const timeStamp = getTimestamp(time);
    if (Number.isNaN(timeStamp)) return time;

    return genDateStringWithFormat(timeStamp, DateMinuteFormat);
};

export const getDateTime = (time) => {
    const timeStamp = getTimestamp(time);
    if (Number.isNaN(timeStamp)) return time;

    return genDateStringWithFormat(timeStamp, DateTimeFormat);
};
