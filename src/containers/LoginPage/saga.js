/**
 * Gets the repositories of the user from Github
 */

import { call, put, select, takeLatest } from 'redux-saga/effects';
import { CHECK_CREDENTIALS } from './constants';
import { createSession, checkCredentials } from './actions';
import { makeSelectCode, makeSelectEmail } from './selectors';
import request from './../../utils/request';
/**
 * THIS CANT BE HERE 
 */
const crypto = require('crypto');

/**
 * 
 */
export function* checkCredentialsSaga() {
  // Select username from store
  const code = yield select(makeSelectCode());
  const email = yield select(makeSelectEmail());
  const requestURL = `http://localhost:3030/authentication`;

  try {
    const authResponse = yield call(request, requestURL, {
      body: JSON.stringify({code:code, email: email, strategy: "local"}),
      headers: {'Content-Type': 'application/json'},
      method: 'POST'
    });

    localStorage.setItem('PointOfSaleToken', authResponse.accessToken);
    console.log(authResponse)
    yield put(createSession(authResponse.user));

  } catch (err) {
    console.log("err")
    console.log(err)
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* sagaListener() {
  yield takeLatest(CHECK_CREDENTIALS, checkCredentialsSaga);
}