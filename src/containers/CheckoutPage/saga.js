import { getServerUrl } from './../../utils/serverURL';
import { call, put, select, takeLatest } from 'redux-saga/effects';
import { CHOOSE_PAYMENT_METHOD } from './constants';
import { makeSelectTicket, makeSelectPaymentMethod } from './selectors';
import { } from './actions';
import request from './../../utils/request';
import produce from 'immer';


export function* sagaSavePaymentMethod() {

  console.log('choose payment method')
  
  const ticket_id = yield select(makeSelectTicket('_id'))
  const payment_method = yield select(makeSelectPaymentMethod());

  try {
    const token = localStorage.getItem("PointOfSaleToken")
    const requestURL = `${getServerUrl()}/tickets/${ticket_id}`;

    yield call(request, requestURL, {
      body: JSON.stringify({tipo_de_pago: payment_method}),
      headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`},
      method: 'PATCH'
    });

  } catch (err) {
    console.log("err")
    console.log(err)
  }
}



/**
* Root saga manages watcher lifecycle
*/
export default function* sagaListener() {
  yield takeLatest(CHOOSE_PAYMENT_METHOD, sagaSavePaymentMethod);
}
