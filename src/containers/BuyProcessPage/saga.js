import { getServerUrl } from './../../utils/serverURL';
import { call, put, select, takeLatest } from 'redux-saga/effects';
import { SAVE_TICKET } from './constants';
import { makeSelectBoughtProducts, makeSelectTicketSubtotal, makeSelectDiscount } from './selectors';
import { redirectToCheckout } from './actions';
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
    const discount = yield select(makeSelectDiscount());
    console.log(discount)
  
    try {
      const token = localStorage.getItem("PointOfSaleToken")
      const total = subtotal - discount
      const iva = total * 0.16
      const saved_ticket = yield call(request, requestURL, {
        body: JSON.stringify({productos: products, id_participante: null, tipo_de_pago:'pendiente', subtotal: subtotal, total: total, iva: iva}),
        headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`},
        method: 'POST'
      });
  
    yield put(redirectToCheckout(saved_ticket._id)); 
      
    } catch (err) {
      console.log("err")
      console.log(err)
    }
  }



/**
 * Root saga manages watcher lifecycle
 */
export default function* sagaListener() {
    yield takeLatest(SAVE_TICKET, sagaSaveTicket);
  }