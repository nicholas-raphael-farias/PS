import { getServerUrl } from './../../utils/serverURL';
import { call, put, select, takeLatest } from 'redux-saga/effects';
import { CREATE_PRODUCT } from './constants';
import { makeSelectNewProduct } from './selectors';
import { createdProduct } from './actions';
import request from './../../utils/request';
import produce from 'immer';

export function* sagaCreateProduct() {
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

    yield put(createdProduct(authResponse)); 
    
  } catch (err) {
    console.log("err")
    console.log(err)
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* sagaListener() {
  yield takeLatest(CREATE_PRODUCT, sagaCreateProduct);
}