/**
 * Gets the repositories of the user from Github
 */
import { getServerUrl } from './../../utils/serverURL';
import { call, put, select, takeLatest } from 'redux-saga/effects';
import { SAVE_PROMO, DELETE_PROMO } from './constants';
import { makeSelectNewPromo, makeSelectParam } from './selectors';
import { resetCreatePromoForm } from './actions';
import request from './../../utils/request';
/**
 * 
 */
export function* sagaSavePromo() {
  const new_promo = yield select(makeSelectNewPromo());
  const requestURL = `${getServerUrl()}/promos`;

  try {
    const token = localStorage.getItem("PointOfSaleToken")
    const authResponse = yield call(request, requestURL, {
      body: JSON.stringify({tipo: new_promo.type, porcentaje: new_promo.porcentage, producto: new_promo.product, fecha_expiracion: new_promo.expiration_date}),
      headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`},
      method: 'POST'
    });

    console.log(authResponse);

    yield put(resetCreatePromoForm()); 
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
    const authResponse = yield call(request, requestURL, {
      body: JSON.stringify({_id: selected_promo}),
      headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`},
      method: 'DELETE'
    });

    console.log(authResponse);

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