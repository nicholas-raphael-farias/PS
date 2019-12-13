import { getServerUrl } from './../../utils/serverURL';
import { call, put, select, takeLatest } from 'redux-saga/effects';
import { SAVE_EMPLOYEE, DELETE_EMPLOYEE, UPDATE_EMPLOYEE, UPDATE_PASSWORD } from './constants';
import { makeSelectNewEmployee, makeSelectSelectedEmployee, makeSelectNewPswd } from './selectors';
import { createEmployee, deletedEmployee, updatedEmployee, updatedPassword } from './actions';
import request from './../../utils/request';
import produce from 'immer';
import { hashPassword } from './../../utils/hash';

export function* sagaSaveEmployee() {
  // Select username from store
  const employee = yield select(makeSelectNewEmployee());
  console.log(employee)
  const requestURL = `${getServerUrl()}/employees`;

  try {
    const token = localStorage.getItem("PointOfSaleToken")
    const saved_employee = yield call(request, requestURL, {
      body: JSON.stringify(employee),
      headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`},
      method: 'POST'
    });

    yield put(createEmployee(saved_employee)); 
    
  } catch (err) {
    console.log("err")
    console.log(err)
  }
}

export function* sagaDeleteEmployee() {
  // Select username from store
  const s_employee = yield select(makeSelectSelectedEmployee())
  console.log("delete employee")
  console.log(s_employee)
  const requestURL = `${getServerUrl()}/employees/${s_employee._id}`;

  try {
    const token = localStorage.getItem("PointOfSaleToken")
    const deleted_employee = yield call(request, requestURL, {
      body: JSON.stringify(s_employee),
      headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`},
      method: 'DELETE'
    });
    console.log(deleted_employee);

    yield put(deletedEmployee(deleted_employee)); 
    
  } catch (err) {
    console.log("err")
    console.log(err)
  }
}

export function* sagaUpdateEmployee() {
  // Select username from store
  const s_employee = yield select(makeSelectSelectedEmployee());
  console.log("employee");
  console.log(s_employee);
  const requestURL = `${getServerUrl()}/employees/${s_employee._id}`;

  try {
    const token = localStorage.getItem("PointOfSaleToken")
    const updated_employee = yield call(request, requestURL, {
      body: JSON.stringify(s_employee),
      headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`},
      method: 'PATCH'
    });
    console.log(updated_employee);

    yield put(updatedEmployee(updated_employee)); 
    
  } catch (err) {
    console.log("err")
    console.log(err)
  }
}

export function* sagaUpdatePswd() {
  // Select username from store
  const new_password = yield select(makeSelectNewPswd());
  const s_employee = yield select(makeSelectSelectedEmployee());
  const requestURL = `${getServerUrl()}/employees/${s_employee._id}`;

  try {
    const token = localStorage.getItem("PointOfSaleToken")
    const updated_employee = yield call(request, requestURL, {
      body: JSON.stringify({hashed_password: hashPassword(new_password)}),
      headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`},
      method: 'PATCH'
    });
    console.log(updated_employee);

    yield put(updatedPassword(updated_employee)); 
    
  } catch (err) {
    console.log("err")
    console.log(err)
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* sagaListener() {
  yield takeLatest(SAVE_EMPLOYEE, sagaSaveEmployee);
  yield takeLatest(DELETE_EMPLOYEE, sagaDeleteEmployee);
  yield takeLatest(UPDATE_EMPLOYEE, sagaUpdateEmployee);
  yield takeLatest(UPDATE_PASSWORD, sagaUpdatePswd);
}