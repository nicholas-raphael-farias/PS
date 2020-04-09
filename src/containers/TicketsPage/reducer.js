/*
 * DiscountReducer
 *
 * The reducer takes care of our data. Using actions, we can
 * update our application state. To add a new action,
 * add it to the switch statement in the reducer function
 *
 */

import produce from 'immer';
import { 
  LOAD_TICKETS,
} from './constants';

// The initial state of the App
export const initialState = {
  tickets: [],
};

/* eslint-disable default-case, no-param-reassign */
const TicketsReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case LOAD_TICKETS:
        draft.tickets = action.tickets;
        break;
    }
  });

export default TicketsReducer;