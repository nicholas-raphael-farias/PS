import { getServerUrl } from './../../utils/serverURL';
import { call, put, select, takeLatest } from 'redux-saga/effects';
import { SAVE_TICKET } from './constants';
import { makeSelectBoughtProducts, makeSelectTicketSubtotal } from './selectors';
import { } from './actions';
import request from './../../utils/request';
import produce from 'immer';



export function* sagaSaveTicket() {
    // Select username from store
    const products = yield select(makeSelectBoughtProducts());
    console.log(products)
    const requestURL = `${getServerUrl()}/tickets`;
    console.log(requestURL)
    const subtotal = yield select(makeSelectTicketSubtotal());
    console.log(subtotal)
  
    //try {
    //  const token = localStorage.getItem("PointOfSaleToken")
    //  const saved_employee = yield call(request, requestURL, {
    //    body: JSON.stringify(employee),
    //    headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`},
    //    method: 'POST'
    //  });
  
    //  yield put(createEmployee(saved_employee)); 
      
    //} catch (err) {
    //  console.log("err")
    //  console.log(err)
    // }
  }



/**
 * Root saga manages watcher lifecycle
 */
export default function* sagaListener() {
    yield takeLatest(SAVE_TICKET, sagaSaveTicket);
  }