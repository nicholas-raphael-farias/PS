import { getServerUrl } from './../../utils/serverURL';
import { call, put, select, takeLatest } from 'redux-saga/effects';
import { SAVE_PRODUCT, SAVE_CATEGORY } from './constants';
import { makeSelectNewProduct, makeSelectNewCategory, makeSelectSelectedProduct } from './selectors';
import { createProduct, addModifierToProduct } from './actions';
import request from './../../utils/request';
import produce from 'immer';

export function* sagaSaveProduct() {
  // Select username from store
  const product = yield select(makeSelectNewProduct());
  const requestURL = `${getServerUrl()}/products`;

  try {
    const token = localStorage.getItem("PointOfSaleToken")
    const authResponse = yield call(request, requestURL, {
      body: JSON.stringify(product),
      headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`},
      method: 'POST'
    });

    yield put(createProduct(product)); 
    
  } catch (err) {
    console.log("err")
    console.log(err)
  }
}

export function* sagaSaveCategory() {
// Select username from store
const category = yield select(makeSelectNewCategory());
const product = yield select(makeSelectSelectedProduct());



const requestURL = `${getServerUrl()}/products/${product._id}`;
try {

  const token = localStorage.getItem("PointOfSaleToken")
  product.modifiers = product.modifiers.concat([category]);
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

/**
 * Root saga manages watcher lifecycle
 */
export default function* sagaListener() {
  yield takeLatest(SAVE_PRODUCT, sagaSaveProduct);
  yield takeLatest(SAVE_CATEGORY, sagaSaveCategory);
}