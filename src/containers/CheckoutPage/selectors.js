import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectBuy = state => state.checkoutPage || initialState;

const makeSelectPayed = () =>
  createSelector(
    selectBuy,
    empState => empState.payed,
  );

const makeSelectTotal = () =>
  createSelector(
    selectBuy,
    empState => empState.total,
  );

const makeSelectChange = () =>
  createSelector(
    selectBuy,
    empState => empState.payed - empState.total < 0 ? '' : `${empState.payed - empState.total}`,
  );

const makeSelectPaymentMethod = () =>
  createSelector(
    selectBuy,
    empState => empState.payment_method,
  );

export { makeSelectPayed, makeSelectTotal, makeSelectChange, makeSelectPaymentMethod };