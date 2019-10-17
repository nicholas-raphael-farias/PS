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

const makeSelectNewCategory = () =>
  createSelector(
    selectProducts,
    productsState => ({
      name: productsState.catName,
      type: productsState.catType,
    }),
  );

const makeSelectSelectedProduct = () =>
  createSelector(
    selectProducts,
    productsState => 
    productsState.products.find(
      product => product._id === productsState.selectedProduct
    ),
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


const makeSelectNewMod = () =>
  createSelector(
    selectProducts,
    productsState => {
      return {
        name: productsState.modName,
        price: productsState.modPrice,
      };
    },
  );

const makeSelectFormVisibility = () =>
  createSelector(
    selectProducts,
    productsState => {
      return({
        isVisibleCreateProd: productsState.isCreatePrdFormVisible,
        isVisibleCreateMod: productsState.isCreateModFormVisible,
        isVisibleCreateModBtn: productsState.isCreateModBtnVisible,
        isVisibleCreateCat: productsState.isCreateCatFormVisible,
      });
    },
  );

export { makeSelectProducts, makeSelectFormVisibility, makeSelectNewProduct, makeSelectNewMod, makeSelectNewCategory, makeSelectSelectedProduct };