/**
 * @author KylesLight
 * @date 11/01/2018-1:58 PM
 * @file OrderConf
 */

const NONE = 'NONE';
const ASC = 'ASC';
const DESC = 'DESC';

export const OrderType = {
    NONE,
    ASC,
    DESC
};

export const NextOrderType = {
    [NONE]: DESC,
    [DESC]: ASC,
    [ASC]: NONE
};
