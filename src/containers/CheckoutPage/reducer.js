import produce from 'immer';
import {ADD_MONEY, CANCEL_INCOME} from './constants';

// The initial state of the App
export const initialState = {
  total: 500,
  payed: 0,
};

/* eslint-disable default-case, no-param-reassign */
const checkoutReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case ADD_MONEY:
        draft.payed = draft.payed + action.amount
        break;
      case CANCEL_INCOME:
        draft.payed = 0;
        break;
      default:
        break;
    }
  });

export default checkoutReducer;