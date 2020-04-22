/*
 * Discount Actions
 *
 * Actions change things in your application
 * Since this boilerplate uses a uni-directional data flow, specifically redux,
 * we have these actions which are the only way your application interacts with
 * your application state. This guarantees that your state is up to date and nobody
 * messes it up weirdly somewhere.
 *
 * To add a new Action:
 * 1) Import your constant
 * 2) Add a function like this:
 *    export function yourAction(var) {
 *        return { type: YOUR_ACTION_CONSTANT, var: var }
 *    }
 */

import { 
  LOAD_TICKETS,
  SELECT_TICKET,
  REQUEST_TCK_CANCEL,
  CANCEL_TICKET,
} from './constants';


export function loadTickets(tickets) {
    return {
      type: LOAD_TICKETS,
      tickets,
    };
}

export function selectTicket(ticket_id) {
  return {
    type: SELECT_TICKET,
    ticket_id
  };
}

export function requestTcktCancel() {
  return {
    type: REQUEST_TCK_CANCEL,
  };
}


export function cancelTicket(ticket_id) {
  return {
    type: CANCEL_TICKET,
    ticket_id,
  };
}