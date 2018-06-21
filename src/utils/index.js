import moment from 'moment';

import { dateFormat } from '../constants';

export const formatDate = date => moment.unix(date).format(dateFormat);

export const reorderArray = (list, startIndex, endIndex) => {
    const result = [ ...list ];
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};
