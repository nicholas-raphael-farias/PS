import produce from 'immer';
import {
  ADD_MONEY, 
  CANCEL_INCOME, 
  CHOOSE_PAYMENT_METHOD, 
  LOAD_TICKET, 
  PAY_TICKET,
  CHANGE_PAD_TYPE,
} from './constants';

// The initial state of the App
export const initialState = {
  total: 500,
  payed: 0,
  payment_method: null,
  ticket: {
    _id: undefined,
    total: 0,
  },
  is_ticket_payed: false,
  is_active_coin_pad: true,
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
      case CHOOSE_PAYMENT_METHOD:
        draft.payment_method = action.payment_method
        break;
      case LOAD_TICKET:
        if (action.ticket !== undefined) {
          draft.ticket = action.ticket
        }
        break;
      case PAY_TICKET:
        draft.is_ticket_payed = true;
        break;
      case CHANGE_PAD_TYPE:
        draft.is_active_coin_pad = !draft.is_active_coin_pad;
        break;
      default:
        break;
    }
  });

export default checkoutReducer;