/**
 * FlowPage selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';
import { isUndefined } from 'util';

const selectFlow = state => state.flow || initialState;

const makeSelectProducts = () =>
  createSelector(
    selectFlow,
    flowState => flowState.products,
  );

const makeSelectChosenProduct = () =>
  createSelector(
    selectFlow,
    flowState => {
      const product = flowState.products.find(product => product._id === flowState.chosenProductId);
      if(isUndefined(product)){
        return { name:'', modifiers: [], price:0, type: 0, _id:"xxxxxxxx" };
      } else 
      return product;
    },
  );

const makeSelectModToUnassign = () =>
  createSelector(
    selectFlow,
    flowState => {
      return { 
        name:flowState.modToUnassign, 
        order: flowState.orderToUnassign
      };
    },
  );


export { makeSelectProducts, makeSelectChosenProduct, makeSelectModToUnassign };