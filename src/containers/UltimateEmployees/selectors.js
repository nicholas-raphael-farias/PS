/**
 * ProductPage selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectEmp = state => state.employees || initialState;

const makeSelectEmployees = () =>
  createSelector(
    selectEmp,
    empState => empState.employees,
  );

const makeSelectFilteredEmployees = () =>
  createSelector(
    selectEmp,
    employeesState => employeesState.employees.filter(employee => employee.name.startsWith(employeesState.filter)),
  );

const makeSelectProduct = () =>
  createSelector(
    selectEmp,
    empState => {
      return{
        name: empState.productName,
        hasPrice: empState.productHasPrice,
        price: empState.productPrice,
      };
    },
  );

const makeSelectNewEmployee = () =>
  createSelector(
    selectEmp,
    empState => {
      return {
        name: empState.name,
        email: empState.email,
        phone: empState.phone,
        birthday: empState.birthday,
        password: empState.password,
      };
    },
  );

const makeSelectFormVisibility = () =>
  createSelector(
    selectEmp,
    empState => {
      return({
        crtForm: empState.is_crtForm_visible,
        updtForm: empState.is_updtForm_visible,
        updtPswdForm: empState.is_updtPswdForm_visible,
      });
    },
  );

const makeSelectSelectedEmployee = () =>
  createSelector(
    selectEmp,
    empState => empState.selected_employee,
  );

const makeSelectFilter = () =>
  createSelector(
    selectEmp,
    empState => empState.filter,
  );

const makeSelectPswdVisibility = () =>
  createSelector(
    selectEmp,
    empState => empState.is_password_visible,
  );

const makeSelectNewPswdVisibility = () =>
  createSelector(
    selectEmp,
    empState => empState.is_new_password_visible,
  );

const makeSelectNewPswd = () =>
  createSelector(
    selectEmp,
    empState => empState.new_password,
  );

export { makeSelectEmployees, makeSelectFormVisibility, makeSelectNewEmployee, makeSelectSelectedEmployee, makeSelectFilter, makeSelectFilteredEmployees, makeSelectPswdVisibility, makeSelectNewPswdVisibility, makeSelectNewPswd };