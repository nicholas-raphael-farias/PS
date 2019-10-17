/**
 * EmployeesPage selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectEmployees = state => state.employees || initialState;

const makeSelectEmployees = () =>
  createSelector(
    selectEmployees,
    employeesState => employeesState.employees,
  );


const makeSelectName = () =>
  createSelector(
    selectEmployees,
    employeesState => employeesState.name,
  );

const makeSelectEmail = () =>
  createSelector(
    selectEmployees,
    employeesState => employeesState.email,
  );

const makeSelectPhone = () =>
  createSelector(
    selectEmployees,
    employeesState => employeesState.phone,
  );

const makeSelectBirthday = () =>
  createSelector(
    selectEmployees,
    employeesState => employeesState.birthday,
  );

const makeSelectEmplFormVisibility = () =>
  createSelector(
    selectEmployees,
    employeesState => employeesState.isEmplFormVisible,
  );

const makeSelectFilterText = () =>
  createSelector(
    selectEmployees,
    employeesState => employeesState.filterText,
  );

const makeSelectEmployees2 = () =>
  createSelector(
    selectEmployees,
    employeesState => employeesState.employees.filter(employee =>    employee.name.startsWith(employeesState.filterText)),
  );

const makeSelectUpdteEmplFormVisibility = () =>
  createSelector(
    selectEmployees,
    employeesState => employeesState.isUpdteEmplFormVisible,
  );

const makeSelectToUpdteEmployee = () =>
  createSelector(
    selectEmployees,
    employeesState => employeesState.selectedEmplForUpdate,
  );
  
export { selectEmployees, makeSelectEmployees, makeSelectName, makeSelectEmail, makeSelectPhone, makeSelectBirthday, makeSelectEmplFormVisibility, makeSelectFilterText, makeSelectEmployees2, makeSelectUpdteEmplFormVisibility, makeSelectToUpdteEmployee};