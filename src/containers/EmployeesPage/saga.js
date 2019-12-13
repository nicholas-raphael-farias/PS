/**
 * Gets the repositories of the user from Github
 */
import { getServerUrl } from './../../utils/serverURL';
import { call, put, select, takeLatest } from 'redux-saga/effects';
import { CREATE_EMPLOYEE } from './constants';
import { makeSelectName, makeSelectEmail, makeSelectPhone, makeSelectBirthday } from './selectors';
import { resetCreateEmplForm, loadEmployees } from './actions';
import request from './../../utils/request';
/**
 * 
 */
export function* sagaSaveEmployee() {
  // Select username from store
  const name = yield select(makeSelectName());
  const email = yield select(makeSelectEmail());
  const phone = yield select(makeSelectPhone());
  const birthday = yield select(makeSelectBirthday());


  const requestURL = `${getServerUrl()}/employees`;

  try {
    const token = localStorage.getItem("PointOfSaleToken")
    const authResponse = yield call(request, requestURL, {
      body: JSON.stringify({name: name, email: email, phone: phone, birthday: birthday}),
      headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`},
      method: 'POST'
    });
    console.log(authResponse);

    yield put(resetCreateEmplForm()); 
  } catch (err) {
    console.log("err")
    console.log(err)
  }
}

export function* sagaLoadEmployees() {

  console.log("saga employees");

  const requestURL = `${getServerUrl()}/employees`;

  try {
    const token = localStorage.getItem("PointOfSaleToken")
    const employeesResponse = yield call(request, requestURL, {
      headers: {'Authorization': `Bearer ${token}`},
    });

    console.log("employees")
    console.log(employeesResponse)

    yield put(loadEmployees(employeesResponse.data)); 
  } catch (err) {
    console.log("err")
    console.log(err)
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* createEmployee() {
  yield takeLatest(CREATE_EMPLOYEE, sagaSaveEmployee);
}