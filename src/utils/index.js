import moment from 'moment';

import { dateFormat } from '../constants';

export const formatDate = date => moment.unix(date).format(dateFormat);

export const sortByScoreField = (a, b) => {
    a = a.score;
    b = b.score;
    if (a > b) return -1;

    return a < b ? 1 : 0;
};

export const reorderArray = (list, startIndex, endIndex) => {
    const result = [ ...list ];
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};
