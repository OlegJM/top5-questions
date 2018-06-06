import * as actionTypes from '../constants/actionTypes';
import { sortByScoreField } from '../utils';
import { INCREMENT_RATING } from '../constants';

let initialState = {
    items: [],
    isFetching: false
};

export default function questionsReducer(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case actionTypes.GET_QUESTIONS_REQUEST: {
            return { ...state, isFetching: true };
        }

        case actionTypes.GET_QUESTIONS_SUCCESS: {
            const filteredQuestions = payload.items.filter(item => /react-redux/i.test(item.title));
            const items = filteredQuestions.sort(sortByScoreField).slice(0, 5);

            return {
                isFetching: false,
                items
            };
        }

        case actionTypes.GET_QUESTIONS_FAILURE: {
            return { ...state, isFetching: false };
        }

        case actionTypes.REORDER_QUESTIONS: {
            return {
                isFetching: false,
                items: payload.items
            };
        }

        case actionTypes.CHANGE_RATING: {
            const updatedQuestions = state.items.map((item) => {
                const { score, question_id: questionId } = item;
                const newScore = payload.actionType === INCREMENT_RATING ? score + 1 : score - 1;
                return questionId === payload.questionId
                    ? { ...item, score: newScore }
                    : item;
            });
            return { ...state, items: updatedQuestions };
        }

        default:
            return state;
    }
}
