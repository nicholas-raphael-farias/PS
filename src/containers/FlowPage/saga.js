

import { call, put, select, takeLatest } from 'redux-saga/effects';
import { SAVE_MODIFIERS, UNASSIGN_MODIFIER } from './constants';
import { makeSelectChosenProduct, makeSelectModToUnassign } from './selectors';
import { updateProduct } from './actions';
import request from './../../utils/request';
import produce from 'immer';

export function* sagaSaveModifiers() {
  // Select username from store
  const selectedProduct = yield select(makeSelectChosenProduct());
  const requestURL = `http://localhost:3030/products/${selectedProduct._id}`;

  try {

    const token = localStorage.getItem("PointOfSaleToken");
    const authResponse = yield call(request, requestURL, {
      body: JSON.stringify(selectedProduct),
      headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`},
      method: 'PATCH'
    });
  } catch (err) {
    console.log("err")
    console.log(err)
  }
}

export function* sagaUnassignModifier() {
  // Select username from store
  const selectedProduct = yield select(makeSelectChosenProduct());
  const selectedToUnassign = yield select(makeSelectModToUnassign());
  const requestURL = `http://localhost:3030/products/${selectedProduct._id}`;

  let toRemove = selectedProduct.modifiers.find(mod => mod.order === selectedToUnassign.order); 
  let toRemoveIndex = selectedProduct.modifiers.findIndex(mod => mod.order === selectedToUnassign.order); 
  
  toRemove.order = -1;
  toRemove.is_assigned = false;
  selectedProduct.modifiers.splice(toRemoveIndex, 1, toRemove);
  selectedProduct.modifiers = selectedProduct.modifiers.map(mod => {
    if(mod.order > selectedToUnassign.order && mod.is_assigned){
      mod.order = mod.order - 1;
    }
    return mod;
  });

  try {

    const token = localStorage.getItem("PointOfSaleToken");
    const authResponse = yield call(request, requestURL, {
      body: JSON.stringify(selectedProduct),
      headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`},
      method: 'PATCH'
    });

    yield put(updateProduct(authResponse)); 


  } catch (err) {
    console.log("err")
    console.log(err)
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* sagaListener() {
  yield takeLatest(SAVE_MODIFIERS, sagaSaveModifiers);
  yield takeLatest(UNASSIGN_MODIFIER, sagaUnassignModifier);
}