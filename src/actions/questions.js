import moment from 'moment';

import request from '../lib/request';

import {
    GET_QUESTIONS_REQUEST,
    GET_QUESTIONS_SUCCESS,
    GET_QUESTIONS_FAILURE,
    REORDER_QUESTIONS,
    CHANGE_RATING
} from '../constants';

export const getQuestions = date => (dispatch) => {
    dispatch({ type: GET_QUESTIONS_REQUEST });
    const dateInMs = moment(date).unix();
    const apiUrl = 'https://api.stackexchange.com/2.2/search';
    const searchParams = 'pagesize=5&order=desc&sort=votes&intitle=react-redux&site=stackoverflow';
    const advSearchParam = `fromdate=${dateInMs}`;
    const searchUrl = `${apiUrl}?${searchParams}&${advSearchParam}`;

    request
        .get(searchUrl)
        .accept('json')
        .then(res => {
            dispatch({ type: GET_QUESTIONS_SUCCESS, payload: res.body });
        })
        .catch(() => {
            dispatch({ type: GET_QUESTIONS_FAILURE });
        });
};

export const reorderQuestions = (sourceIndex, destinationIndex) => ({
    type: REORDER_QUESTIONS,
    payload: {
        sourceIndex,
        destinationIndex
    }
});

export const changeRating = (actionType, questionId) => ({
    type: CHANGE_RATING,
    payload: {
        actionType,
        questionId
    }
});
