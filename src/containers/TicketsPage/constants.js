/*
 * Tickets Constants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

export const LOAD_TICKETS = 'ps/TicketsPage/LOAD_TICKETS';
export const SELECT_TICKET = 'ps/TicketsPage/SELECT_TICKET';
export const REQUEST_TCK_CANCEL = 'ps/TicketsPage/REQUEST_TCK_CANCEL';
export const CANCEL_TICKET = 'ps/TicketsPage/CANCEL_TICKET';