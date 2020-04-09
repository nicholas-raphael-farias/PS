/**
 * DiscountsPage selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';

const  selectTickets = state => state.tickets || initialState;

const makeSelectParam = (param) =>
  createSelector(
    selectTickets,
    selectTickets => selectTickets[param],
  )

  export { makeSelectParam };