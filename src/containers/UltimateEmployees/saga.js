

import { call, put, select, takeLatest } from 'redux-saga/effects';
import { SAVE_EMPLOYEE, DELETE_EMPLOYEE, UPDATE_EMPLOYEE } from './constants';
import { makeSelectNewEmployee, makeSelectSelectedEmployee } from './selectors';
import { createEmployee, deletedEmployee, updatedEmployee } from './actions';
import request from './../../utils/request';
import produce from 'immer';

export function* sagaSaveEmployee() {
  // Select username from store
  const employee = yield select(makeSelectNewEmployee());
  const requestURL = `http://localhost:3030/employees`;

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
  const s_employee = yield select(makeSelectSelectedEmployee());
  const requestURL = `http://localhost:3030/employees/${s_employee._id}`;

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
  const requestURL = `http://localhost:3030/employees/${s_employee._id}`;

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

/**
 * Root saga manages watcher lifecycle
 */
export default function* sagaListener() {
  yield takeLatest(SAVE_EMPLOYEE, sagaSaveEmployee);
  yield takeLatest(DELETE_EMPLOYEE, sagaDeleteEmployee);
  yield takeLatest(UPDATE_EMPLOYEE, sagaUpdateEmployee);
}