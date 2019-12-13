import React, { memo, useEffect, useState } from 'react'
import axios from 'axios';
import Navbar from '../../components/Navbar'
import Img from './../../components/Img'
import Table from './../../components/Table'
import Banner from './Search.svg';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale, setDefaultLocale } from  "react-datepicker";
import es from 'date-fns/locale/es';

import PropTypes from 'prop-types';

import { getServerUrl } from './../../utils/serverURL';

import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import { useInjectReducer } from './../../utils/injectReducer';
import { useInjectSaga } from './../../utils/injectSaga';

import { changeName, changeEmail, changePhone, changeBirthday, changeFormVisibility, createEmployee, changeFilterText, changeUpdteFormVisibility, updateEmployee, changeUpdateEmployee, loadEmployees } from './actions';

import { makeSelectEmployees ,makeSelectName, makeSelectEmail, makeSelectPhone, makeSelectBirthday, makeSelectEmplFormVisibility, makeSelectFilterText, makeSelectEmployees2, makeSelectUpdteEmplFormVisibility, makeSelectToUpdteEmployee } from './selectors';

import NewEmployeeForm from './../../components/NewEmployeeForm'

import reducer from './reducer';
import saga from './saga';

const key = 'employees';

registerLocale('es', es)


const Form =(props) => {
  return (
    <div className="row justify-content-center" style={{marginTop:'5vh'}}>
      <div className="col-4 card">
        <div className="card-body" style={{textAlign:'left'}}>
          <div className="form-group">
            <label>Nombre(s)</label>
            <input type="text" className="form-control" placeholder="Nombre(s)" value={props.name} onChange={props.onChangeName}/>
          </div>
          <div className="form-group">
            <label>Email</label>
            <input type="email" className="form-control" placeholder="Email" value={props.email} onChange={props.onChangeEmail}/>
          </div>
          <div className="form-group">
            <label>Teléfono</label>
            <input type="text" className="form-control" placeholder="Teléfono" value={props.phone} onChange={props.onChangePhone}/>
          </div>
          <div className="form-group">
            <label>Cumpleaños</label> <br/>
            <DatePicker
              locale="es"
              className="form-control"
              selected={new Date(props.birthday)}
              onSelect={props.onChangeBirthday}
              showMonthDropdown
              showYearDropdown
            />
          </div>
          <div className="btn btn-dark" onClick={() => props.createEmployee(props.name, props.email, props.phone, props.birthday)}>
            Crear
          </div>
        </div>
      </div>
    </div>
  );
}

const UpdateEmplForm = (props) => {
  return(
    <div className="row justify-content-center" style={{marginTop:'5vh'}}>
      <div className="col-4 card">
        <div className="card-body" style={{textAlign:'left'}}>
          <div className="form-group">
            <label>Nombre(s)</label>
            <input name="updatedName" type="text" className="form-control" placeholder="Nombre(s)" value={props.employee.name} onChange={(evt) => props.onChangeUpdateEmpl("name", evt.target.value)}/>
          </div>
          <div className="form-group">
            <label>Email</label>
            <input name="updatedEmail" type="email" className="form-control" placeholder="Email" value={props.employee.email} />
          </div>
          <div className="form-group">
            <label>Teléfono</label>
            <input name="updatedPhone" type="text" className="form-control" placeholder="Teléfono" value={props.employee.phone} />
          </div>
          <div className="form-group">
            <label>Cumpleaños</label> <br/>
            <DatePicker
              locale="es"
              name="updatedBirthday"
              className="form-control"
              selected={new Date(props.employee.birthday)}
              showMonthDropdown
              showYearDropdown
            />
          </div>
          <div className="btn btn-dark" onClick={props.updateEmploye}>
            Actualizar
          </div>
        </div>
      </div>
    </div>
  );
}



export function EmployeesPage({
  employees,
  name, 
  email,
  phone, 
  birthday,
  isEmplFormVisible,
  isUpdtEmplFormVisible,
  filterText,
  filteredEmployees,
  toUpdteEmployee,
  onChangeName,
  onChangeEmail,
  onChangePhone,
  onChangeBirthday,
  onChangeEmplFormVisibility,
  onChangeUpdateFormVisibility,
  createEmployee,
  onChangeFilterText,
  onChangeUpdateEmpl,
  onLoadEmployees,
}) {

  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  useEffect(() => {

    const requestURL = `${getServerUrl()}/employees`;
    try {
      const token = localStorage.getItem("PointOfSaleToken")

      axios.get(requestURL, {
        headers: {'Authorization': `Bearer ${token}`}
      })
      .then(({ data }) => {
        onLoadEmployees(data.data);
      });

    } catch (err) {
      console.log("err")
      console.log(err)
    }

  }, []);

  return (
    <div>
      <Navbar is_active='employees'/>
      <h1>Empleados</h1>
      <div style={{position:'absolute', top:'64px', right:'320px'}}>
      <div className="btn btn-dark" onClick={onChangeEmplFormVisibility}>Crear empleado</div>
      </div>
      
      <div style={{position:'absolute', top:'64px', right:'8px', width:'240px'}}>
          <div className="input-group">
            <div className="input-group-prepend">
              <span className="input-group-text"><Img src={Banner} alt="desc" style={{width:'16px', heigth: '100%'}}/></span>
            </div>
            <input type="text" className="form-control" placeholder="Buscar" value={filterText} onChange={onChangeFilterText} />
          </div>
      </div>

      { isEmplFormVisible ? 
        <NewEmployeeForm/>
         : isUpdtEmplFormVisible ? <UpdateEmplForm employee={toUpdteEmployee} updateEmploye={updateEmployee} onChangeUpdateEmpl={onChangeUpdateEmpl} /> : <Table employees={filterText === '' ? employees : filteredEmployees} onChangeUpdateFormVisibility={onChangeUpdateFormVisibility}/> }

    </div>
  )
}

EmployeesPage.propTypes = {
  name: PropTypes.string,
  email: PropTypes.string,
  phone: PropTypes.string,
  birthday: PropTypes.instanceOf(Date),
  isEmplFormVisible: PropTypes.bool,
  onChangeEmplFormVisibility: PropTypes.func,
  onChangeName: PropTypes.func,
  onChangeEmail: PropTypes.func,
  onChangePhone: PropTypes.func,
  onChangeBirthday: PropTypes.func,
  createEmployee: PropTypes.func,
};


const mapStateToProps = createStructuredSelector({
  name: makeSelectName(),
  email: makeSelectEmail(),
  phone: makeSelectPhone(),
  birthday: makeSelectBirthday(),
  isEmplFormVisible: makeSelectEmplFormVisibility(),
  isUpdtEmplFormVisible: makeSelectUpdteEmplFormVisibility(),
  employees: makeSelectEmployees(),
  filterText: makeSelectFilterText(),
  filteredEmployees: makeSelectEmployees2(),
  toUpdteEmployee: makeSelectToUpdteEmployee(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onChangeEmplFormVisibility: () => dispatch(changeFormVisibility()),
    onChangeName: (evt) => dispatch(changeName(evt.target.value)),
    onChangeEmail: (evt) => dispatch(changeEmail(evt.target.value)),
    onChangePhone: (evt) => dispatch(changePhone(evt.target.value)),
    onChangeBirthday: (date) => dispatch(changeBirthday(date)),
    createEmployee: (name, email, phone, birthday) => dispatch(createEmployee({
      name: name,
      email: email,
      phone: phone,
      birthday: birthday,
    })),
    onChangeFilterText: (evt) => dispatch(changeFilterText(evt.target.value)),
    onChangeUpdateFormVisibility: (emp) => dispatch(changeUpdteFormVisibility(emp)),
    updateEmployee: () => dispatch(updateEmployee()),
    onChangeUpdateEmpl: (type, value) => dispatch(changeUpdateEmployee(type, value)),
    onLoadEmployees: (employees) => dispatch(loadEmployees(employees)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);


export default compose(
  withConnect,
  memo,
)(EmployeesPage);