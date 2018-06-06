import moment from 'moment';

import * as actionTypes from '../constants/actionTypes';

let initialState = {
    currentDate: moment('2018-01-01')
};

export default function dateReducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.SET_CURRENT_DATE: {
            return { ...state, currentDate: action.date };
        }

        default:
            return state;
    }
}
