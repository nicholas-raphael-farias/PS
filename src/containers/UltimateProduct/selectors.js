/**
 * ProductPage selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectProducts = state => state.products || initialState;

const makeSelectProducts = () =>
  createSelector(
    selectProducts,
    productsState => productsState.products,
  );

const makeSelectProduct = () =>
  createSelector(
    selectProducts,
    productsState => {
      return{
        name: productsState.product_name,
        has_price: productsState.product_has_price,
        price: productsState.product_price,
      };
    },
  );

const makeSelectNewProduct = () =>
  createSelector(
    selectProducts,
    productsState => {
      return {
        name: productsState.product_name,
        modifiers: [],
        type: 0,
        price: productsState.product_price,
      };
    },
  );

const makeSelectFormVisibility = () =>
  createSelector(
    selectProducts,
    productsState => {
      return({
        isVisibleCreateProd: productsState.isCreatePrdFormVisible,
      });
    },
  );

export { makeSelectProducts, makeSelectProduct, makeSelectFormVisibility, makeSelectNewProduct };