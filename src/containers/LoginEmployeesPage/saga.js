/**
 * Gets the repositories of the user from Github
 */
import { getServerUrl } from './../../utils/serverURL';
import { call, put, select, takeLatest } from 'redux-saga/effects';
import { CHECK_CREDENTIALS } from './constants';
import { createSession, checkCredentials } from './actions';
import { makeSelectCode } from './selectors';
import request from './../../utils/request';
import { hashPassword } from './../../utils/hash';

/**
 * 
 */
export function* checkCredentialsSaga() {
  console.log('checked_credentials')
  // Select username from store
  const code = yield select(makeSelectCode());
  const requestURL = `${getServerUrl()}/employees?hashed_password=${hashPassword(code)}`;
  console.log(requestURL)
  try {
    const response = yield call(request, requestURL, {
      headers: {'Content-Type': 'application/json'},
      method: 'GET'
    });

    if(response.total > 0) {
      localStorage.setItem('employee', JSON.stringify(response.data[0]));
      console.log(response)
      yield put(createSession(response));
    }

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