

import { call, put, select, takeLatest } from 'redux-saga/effects';
import { SAVE_MOD, SAVE_OPT } from './constants';
import { makeSelectModifier, makeSelectProduct, makeSelectOption, makeSelectChosenModifier } from './selectors';
import { createProduct, addModifierToProduct, addOptToModifier} from './actions';
import request from './../../utils/request';
import produce from 'immer';

export function* sagaSaveModifier() {
  // Select username from store
  const modifier = yield select(makeSelectModifier());
  const product = yield select(makeSelectProduct());
  const requestURL = `http://localhost:3030/products/${product._id}`;

  try {

    const token = localStorage.getItem("PointOfSaleToken")
    product.modifiers = product.modifiers.concat([modifier]);
    const authResponse = yield call(request, requestURL, {
      body: JSON.stringify(product),
      headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`},
      method: 'PATCH'
    });

    console.log("saga")
    console.log(authResponse)

  yield put(addModifierToProduct(authResponse)); 
    
  } catch (err) {
    console.log("err")
    console.log(err)
  }
}

export function* sagaSaveOpt() {
  // Select username from store
  const opt = yield select(makeSelectOption());
  const chosenModifier = yield select(makeSelectChosenModifier());
  const product = yield select(makeSelectProduct());
  const requestURL = `http://localhost:3030/products/${product._id}`;

  try {

    const token = localStorage.getItem("PointOfSaleToken");
    let modifier = product.modifiers.find(mod => mod.name === chosenModifier);
    let modifierIndex = product.modifiers.findIndex(mod => mod.name === chosenModifier);
    modifier.options.push(opt);
    product.modifiers[modifierIndex] = modifier;

    const authResponse = yield call(request, requestURL, {
      body: JSON.stringify(product),
      headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`},
      method: 'PATCH'
    });

    console.log("saga")
    console.log(authResponse)

  yield put(addOptToModifier(authResponse)); 
    
  } catch (err) {
    console.log("err")
    console.log(err)
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* sagaListener() {
  yield takeLatest(SAVE_MOD, sagaSaveModifier);
  yield takeLatest(SAVE_OPT, sagaSaveOpt);
}