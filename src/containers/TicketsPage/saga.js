import { getServerUrl } from './../../utils/serverURL';
import { call, put, select, takeLatest } from 'redux-saga/effects';
import { REQUEST_TCK_CANCEL } from './constants';
import { makeSelectParam } from './selectors';
import { cancelTicket } from './actions';
import request from './../../utils/request';

export function* sagaCancelTicket() {
  // Select username from store
  const ticket_id = yield select(makeSelectParam('selected_tck_id'));
  const requestURL = `${getServerUrl()}/tickets/${ticket_id}`;

  try {
    const token = localStorage.getItem("PointOfSaleToken")
    const cancelled_ticket = yield call(request, requestURL, {
      body: JSON.stringify({status: "cancelado"}),
      headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`},
      method: 'PATCH'
    });

    yield put(cancelTicket(cancelled_ticket._id)); 
    
  } catch (err) {
    console.log("err")
    console.log(err)
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* sagaListener() {
  yield takeLatest(REQUEST_TCK_CANCEL, sagaCancelTicket);
}