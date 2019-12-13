/**
 * Checks the users credentials and creates the session
 */
import { getServerUrl } from './../../utils/serverURL';
import { call, put, select, takeLatest } from 'redux-saga/effects';
import { CHECK_CREDENTIALS } from './constants';
import { createSession } from './actions';
import { makeSelectCode, makeSelectEmail } from './selectors';
import request from './../../utils/request';

/**
 * 
 */
export function* checkCredentialsSaga() {
  const code = yield select(makeSelectCode());
  const email = yield select(makeSelectEmail());
  const requestURL = `${getServerUrl()}/authentication`;

  try {
    const authResponse = yield call(request, requestURL, {
      body: JSON.stringify({code:code, email: email, strategy: "local"}),
      headers: {'Content-Type': 'application/json'},
      method: 'POST'
    });

    localStorage.setItem('PointOfSaleToken', authResponse.accessToken);
    yield put(createSession(authResponse.user));

  } catch (err) {
    console.log("login error")
    console.log(err)
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* sagaListener() {
  yield takeLatest(CHECK_CREDENTIALS, checkCredentialsSaga);
}