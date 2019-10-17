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
        name: productsState.productName,
        hasPrice: productsState.productHasPrice,
        price: productsState.productPrice,
      };
    },
  );

const makeSelectNewProduct = () =>
  createSelector(
    selectProducts,
    productsState => {
      return {
        name: productsState.productName,
        modifiers: [],
        type: 0,
        price: productsState.productPrice,
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