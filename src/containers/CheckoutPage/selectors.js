import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectBuy = state => state.checkoutPage || initialState;

const makeSelectPayed = () =>
  createSelector(
    selectBuy,
    empState => empState.payed,
  );

const makeSelectTicket = (param) =>
  createSelector(
    selectBuy,
    empState => empState.ticket[param],
  );

const makeSelectChange = () =>
  createSelector(
    selectBuy,
    empState => empState.payed - empState.ticket.total < 0 ? '' : `${empState.payed - empState.ticket.total}`,
  );

const makeSelectPaymentMethod = () =>
  createSelector(
    selectBuy,
    empState => empState.payment_method,
  );

const makeSelectParam = (param) => 
  createSelector(
    selectBuy,
    empState => empState[param],
  );

export { makeSelectPayed, makeSelectTicket, makeSelectChange, makeSelectPaymentMethod, makeSelectParam };