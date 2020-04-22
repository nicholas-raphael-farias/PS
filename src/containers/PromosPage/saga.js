/**
 * Gets the repositories of the user from Github
 */
import { getServerUrl } from './../../utils/serverURL';
import { call, put, select, takeLatest } from 'redux-saga/effects';
import { SAVE_PROMO, DELETE_PROMO } from './constants';
import { makeSelectNewPromo, makeSelectParam } from './selectors';
import { resetCreatePromoForm, createPromo, removePromo } from './actions';
import request from './../../utils/request';
/**
 * 
 */
export function* sagaSavePromo() {
  const new_promo = yield select(makeSelectNewPromo());
  const requestURL = `${getServerUrl()}/promos`;

  try {
    const token = localStorage.getItem("PointOfSaleToken")
    const promo = yield call(request, requestURL, {
      body: JSON.stringify(new_promo),
      headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`},
      method: 'POST'
    });

    yield put(resetCreatePromoForm()); 
    yield put(createPromo(promo)); 


  } catch (err) {
    console.log("err")
    console.log(err)
  }
}

export function* sagaDeletePromo() {
    
  const selected_promo = yield select(makeSelectParam('selected_promo'));
  const requestURL = `${getServerUrl()}/promos/${selected_promo}`;

  try {
    const token = localStorage.getItem("PointOfSaleToken")
    const deleted_promo = yield call(request, requestURL, {
      body: JSON.stringify({_id: selected_promo}),
      headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`},
      method: 'DELETE'
    });

    yield put(removePromo(deleted_promo._id));
    yield put(resetCreatePromoForm()); 
  } catch (err) {
    console.log("err")
    console.log(err)
  }


  }



/**
 * Root saga manages watcher lifecycle
 */
export default function* savePromo() {
    yield takeLatest(SAVE_PROMO, sagaSavePromo);
    yield takeLatest(DELETE_PROMO, sagaDeletePromo);
  }