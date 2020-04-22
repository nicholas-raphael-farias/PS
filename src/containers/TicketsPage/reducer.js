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
  SELECT_TICKET,
  REQUEST_TCK_CANCEL,
  CANCEL_TICKET,
} from './constants';

// The initial state of the App
export const initialState = {
  tickets: [],
  selected_tck_id: 0,
};

/* eslint-disable default-case, no-param-reassign */
const TicketsReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case LOAD_TICKETS:
        draft.tickets = action.tickets;
        break;
      case SELECT_TICKET:
        draft.selected_tck_id = action.ticket_id;
        break;
      case REQUEST_TCK_CANCEL:
        break;
      case CANCEL_TICKET:
        const updated_tickets = draft.tickets.map(t => {
          if (t._id === action.ticket_id){
            t.status = 'cancelled'
          }
          return t;
        });

        draft.tickets = updated_tickets;
        break;
    }
  });

export default TicketsReducer;