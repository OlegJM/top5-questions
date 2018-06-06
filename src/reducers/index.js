import { combineReducers } from 'redux';

import questions from './questions';
import date from './date';

const reducers = {
    questions,
    date
};

export default combineReducers(reducers);
