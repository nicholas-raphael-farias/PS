

import { call, put, select, takeLatest } from 'redux-saga/effects';
import { SAVE_PRODUCT } from './constants';
import { makeSelectNewProduct } from './selectors';
import { createProduct } from './actions';
import request from './../../utils/request';
import produce from 'immer';

export function* sagaSaveProduct() {
  // Select username from store
  const product = yield select(makeSelectNewProduct());
  const requestURL = `http://localhost:3030/products`;

  try {
    const token = localStorage.getItem("PointOfSaleToken")
    const authResponse = yield call(request, requestURL, {
      body: JSON.stringify(product),
      headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`},
      method: 'POST'
    });

    yield put(createProduct(authResponse)); 
    
  } catch (err) {
    console.log("err")
    console.log(err)
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* sagaListener() {
  yield takeLatest(SAVE_PRODUCT, sagaSaveProduct);
}