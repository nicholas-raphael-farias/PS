/**
 * Gets the repositories of the user from Github
 */

import { call, put, select, takeLatest } from 'redux-saga/effects';
import { CREATE_OWNER } from './constants';
import { updateOwner } from './actions';

import request from './../../utils/request';
import { makeSelectName, makeSelectEmail, makeSelectCode } from './selectors';

/**
 * 
 */
export function* createOwnerSaga() {

  console.log("create owner")

  // Select username from store
  const name = yield select(makeSelectName());
  const email = yield select(makeSelectEmail());
  const code = yield select(makeSelectCode());

  const requestURL = `http://localhost:3030/users`;

  try {
    // Call our request helper (see 'utils/request')
    const createdOwner = yield call(request, requestURL, {
      body: JSON.stringify({name:name, email: email, code: code}),
      headers: {'Content-Type': 'application/json'},
      method: 'POST'
    });
    yield put(updateOwner(createdOwner));
  } catch (err) {
    console.log(err)
    //yield put(repoLoadingError(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* sagaListener() {
  yield takeLatest(CREATE_OWNER, createOwnerSaga);
}