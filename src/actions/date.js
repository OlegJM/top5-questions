import { SET_CURRENT_DATE } from '../constants/actionTypes';

const setCurrentDate = date => ({
    type: SET_CURRENT_DATE,
    date
});

export default setCurrentDate;
