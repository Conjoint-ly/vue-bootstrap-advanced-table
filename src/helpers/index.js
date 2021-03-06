import moment from 'moment';

export const isNull = val => val === null;

export const isUndefined = val => val === undefined;

export const isEmptyString = val => val === '';

export const isUndefinedOrNull = val => isUndefined(val) || isNull(val);

export const isUndefinedOrNullOrEmpty = val => isUndefinedOrNull(val) || isEmptyString(val);

export const isObject = obj => obj !== null && typeof obj === 'object';

export const isFunction = val => typeof val === 'function';

export const isBoolean = val => typeof val === 'boolean';

export const isString = val => typeof val === 'string';

export const isNumber = val => (!isNaN(parseFloat(val)) && !isNaN(val - 0));

export const isPrimitive = val => isBoolean(val) || isString(val) || isNumber(val);

export const isDate = val => val instanceof Date;

export const isCorrectUrl = val => {
    if (!isString(val)) return false;

    // from https://mathiasbynens.be/demo/url-regex URL check comparsion
    var expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;

    const regex = new RegExp(expression);
    return (val.match(regex) !== null);
};

export const formatFloat = value => {
    if (isUndefinedOrNullOrEmpty(value)) return '';
    let formatValue = new Intl.NumberFormat('en-EN').format(value, {
        useGrouping: true,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });

    formatValue = formatValue.includes('.') ? formatValue : `${formatValue}.00`;
    formatValue = formatValue.slice(0, formatValue.lastIndexOf('.') + 3);

    return formatValue;
};

export const formatPercents = value => (isUndefinedOrNullOrEmpty(value) ? '' : `${Math.round(value * 100)}%`);

export const unFormatFloat = value => Number(String(value).replace(/[\ ,%]/g, ''));

export const generateId = () => Math.random().toString(36).substr(2, 10);

export const validateType = (type, value) => {
    switch (type) {
        case 'text':
            return isString(value);
        case 'number':
            return isNumber(value);
        case 'url':
            return isCorrectUrl(value);
        case 'date':
            return moment(value).isValid();
        default:
            return true;
    }
};

export const getValueToType = (type) => {
    switch (type) {
        case 'text':
        case 'url':
            return '';
        case 'number':
            return 0;
        default:
            return '';
    }
};

export const sort = (a, b) => {
    if (a === b) return 0;
    return a > b ? 1 : -1;
};

export const sliceWithEllipsis = (string, length) =>
    (string.length <= length
        ? string
        : string.slice(0, length) + '…');

export const csvToArray = csv => (csv || '')
    .split('\n')
    .filter(row => row.length)
    .map(row => row.split('\t'));

export const capitalize = str => {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
};
