/**
 * DiscountsPage selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';

const  selectTicketDetail = state => state.ticket_detail || initialState;

const makeSelectParam = (param) =>
  createSelector(
    selectTicketDetail,
    selectTicketDetail => selectTicketDetail[param],
  )

  export { makeSelectParam };