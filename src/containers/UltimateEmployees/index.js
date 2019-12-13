import React, {useEffect, memo} from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { createStructuredSelector } from 'reselect';
import { useInjectReducer } from './../../utils/injectReducer';
import { useInjectSaga } from './../../utils/injectSaga';
import { 
  loadEmployees, 
  saveEmployee, 
  changeVisibility, 
  deleteEmployee, 
  selectEmployee, 
  updateSelectedEmployee, 
  changeFilter, 
  changeNewPswd, 
  updatePassword,
  setValues } from './actions';

import { 
  makeSelectEmployees, 
  makeSelectFormVisibility, 
  makeSelectNewEmployee, 
  makeSelectSelectedEmployee, 
  makeSelectFilter, 
  makeSelectFilteredEmployees, 
  makeSelectPswdVisibility, 
  makeSelectNewPswdVisibility, 
  makeSelectNewPswd } from './selectors';

import { getServerUrl } from './../../utils/serverURL';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale, setDefaultLocale } from  "react-datepicker";
import es from 'date-fns/locale/es';

import NewEmployeeForm from './../../components/NewEmployeeForm'
import UpdateEmployeeForm from './../../components/UpdateEmployeeForm'
import NewPasswordForm from './../../components/NewPasswordForm'


import Navbar from '../../components/Navbar';
import Modal from '../../components/Modal';
import Search from './Search.svg';
import Img from '../../components/Img';
import reducer from './reducer';
import saga from './saga';
const key = 'employees';
registerLocale('es', es);

const NewPassForm = ({new_pswd, is_new_pswd_visible, changeVisibility, onChangeNewPswd, onUpdatePswd}) => {
  return(
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Cambiar Contraseña</h5>
        <button type="button" class="close" onClick={() => changeVisibility("updtPswdForm", false)}>
          <span aria-hidden="true">×</span>
        </button>
      </div>
      <div class="modal-body">
        <div class="form-group">
          <label>Nueva Contraseña</label>
          <label 
            class="float-right" 
            style={{cursor:"pointer", fontSize:"75%"}}
            onClick={() => changeVisibility("new_password", !is_new_pswd_visible)}>  
            { is_new_pswd_visible ? <img src="eye.png" style={{height:"16px", margin:"0 4px"}} /> : null }
            <b>Mostrar</b>
          </label>
          <input 
            type={is_new_pswd_visible ? "text" : "password"}
            class="form-control"
            placeholder="Contraseña"
            value={new_pswd}
            onChange={onChangeNewPswd}
          />
          <small class="form-text text-muted">
            Tu contraseña debe contener mínimo 5 caracteres.
          </small>
        </div>
      <div 
        className="btn btn-dark" 
        style={{marginTop: "8px"}}
        onClick={onUpdatePswd}>
          Cambiar Contraseña
      </div>
    </div>
    </div>
  );
}

const Table = ({employees, changeVisibility, onDeleteEmployee, onSelectEmployee}) => {
  return(
    employees.map(e => {
      return(
        <tr>
        <td style={{border:"none"}} scope="row">{e._id}</td>
        <td style={{border:"none"}}>{e.name}</td>
        <td style={{border:"none"}}>{e.email}</td>
        <td style={{border:"none"}}>{e.phone}</td>
        <td style={{border:"none"}}>{typeof(e.birthday) === 'object' ? e.birthday.toLocaleDateString("es-MX") : new Date(e.birthday).toLocaleDateString() }</td>
        <td style={{border:"none"}}>{e.status === 0 ? <span class="badge badge-secondary">Inactivo</span> : <span class="badge badge-secondary">Activo</span>}</td>
        <td style={{border:"none"}}>      
          <img src="p.png" style={{height:"16px", cursor:"pointer", margin:"0 4px"}} onClick={() => {
            onSelectEmployee(e._id);
            changeVisibility("updtForm", true);
          }}/>
          <img src="r.png" style={{height:"16px", cursor:"pointer", margin:"0 4px"}} onClick={() => {
            onSelectEmployee(e._id);
            onDeleteEmployee();
          }}/>
        </td>
      </tr>
      );
    }));
};

function EmployeesUltimate({
  employees,
  form_visibility,
  new_employee,
  selected_employee,
  filter,
  filtered_employees,
  is_pswd_visible,
  is_new_pswd_visible,
  new_pswd,
  onLoadEmployees,
  changeVisibility,
  onChangeEmployee,
  onSaveEmployee,
  onDeleteEmployee,
  onSelectEmployee,
  onUpdateSelected,
  onChangeFilter,
  onChangeNewPswd,
  onUpdatePswd,
  onSetValues,
}) {
  let children;
  let children2;
  let children3;
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

  children = (
    <div className="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Crear Empleado</h5>
        <button type="button" class="close" onClick={() => changeVisibility("crtForm", false)}>
          <span aria-hidden="true">×</span>
        </button>
      </div>
      <div className="modal-body">
        <NewEmployeeForm onSetValues={onSetValues} onSaveEmployee={onSaveEmployee}/>
      </div>
    </div>
  );

  children2 = (
    <div className="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Actualizar Empleado</h5>
        <button type="button" class="close" onClick={() => changeVisibility("updtForm", false)}>
          <span aria-hidden="true">×</span>
        </button>
      </div>
      <div className="modal-body">
        <UpdateEmployeeForm 
          employee={selected_employee} 
          onSetValues={onSetValues} 
          onSaveEmployee={onSaveEmployee} 
          changeVisibility={changeVisibility}
          onUpdateSelected={onUpdateSelected}/>
      </div>
    </div>
  );

  children3 = (
    <div className="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Actualizar Contraseña</h5>
        <button type="button" class="close" onClick={() => changeVisibility("updtPswdForm", false)}>
          <span aria-hidden="true">×</span>
        </button>
      </div>
      <div className="modal-body">
        <NewPasswordForm
          onUpdatePswd={onUpdatePswd}
        />
      </div>
    </div>
  );

  return (
    <div className="container-fluid" style={{padding: '0px'}}>
      <Navbar is_active='employees' />
      <Modal is_visible={form_visibility.crtForm} children={children} />
      <Modal is_visible={form_visibility.updtForm} children={children2} />
      <Modal is_visible={form_visibility.updtPswdForm} children={children3} />

      <div style={{position:'absolute', top:'68px', right:'8px', width:'200px', zIndex:"1"}}>
        <div className="input-group">
          <div className="input-group-prepend">
            <span className="input-group-text"><Img src={Search} alt="desc" style={{width:'16px', heigth: '100%'}}/></span>
          </div>
          <input type="text" className="form-control" placeholder="Buscar" value={filter} onChange={onChangeFilter} />
        </div>
      </div>

      <div className="row justify-content-center">
        <div className="col-6">
          <h1>Empleadxs</h1>
        </div>
        <div className="col-6">    
        <div className="btn btn-dark" style={{marginTop: "12px"}} onClick={() => changeVisibility("crtForm", true)} >Crear Empleado</div>      
        </div>
      </div>

      <div className="col-12">
      <table class="table table-hover" style={{backgroundColor:"white", borderRadius:"8px", marginTop:"8vh", boxShadow:"0px 3px 5px -1px rgba(0, 0, 0, 0.06), 0px 6px 10px 0px rgba(0, 0, 0, 0.042), 0px 1px 18px 0px rgba(0, 0, 0, 0.036)"}}>
          <thead>
            <tr style={{color: "rgba(0, 0, 0, 0.54)", fontSize:"12px", lineHeight:"1.3rem", borderRadius:"4px"}}>
              <th style={{borderBottom:"1px solid #dee2e6", borderTop:"none", padding:"0.5rem"}} scope="col">ID</th>
              <th style={{borderBottom:"1px solid #dee2e6", borderTop:"none", padding:"0.5rem"}} scope="col">Nombre</th>
              <th style={{borderBottom:"1px solid #dee2e6", borderTop:"none", padding:"0.5rem"}} scope="col">Email</th>
              <th style={{borderBottom:"1px solid #dee2e6", borderTop:"none", padding:"0.5rem"}} scope="col">Teléfono</th>
              <th style={{borderBottom:"1px solid #dee2e6", borderTop:"none", padding:"0.5rem"}} scope="col">Cumpleaños</th>
              <th style={{borderBottom:"1px solid #dee2e6", borderTop:"none", padding:"0.5rem"}} scope="col">Estado</th>
              <th style={{borderBottom:"1px solid #dee2e6", borderTop:"none", padding:"0.5rem"}} scope="col">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filter === "" ? 
              <Table 
                employees={employees} 
                changeVisibility={changeVisibility} 
                onDeleteEmployee={onDeleteEmployee}
                onSelectEmployee={onSelectEmployee}/> :
              <Table 
                employees={filtered_employees} 
                changeVisibility={changeVisibility} 
                onDeleteEmployee={onDeleteEmployee}
                onSelectEmployee={onSelectEmployee}/>}
     
          </tbody>
        </table>
      </div>
    </div>
  );
}

EmployeesUltimate.propTypes = {
  employees: PropTypes.array,
};

const mapStateToProps = createStructuredSelector({
  employees: makeSelectEmployees(),
  form_visibility: makeSelectFormVisibility(),
  new_employee: makeSelectNewEmployee(),
  selected_employee: makeSelectSelectedEmployee(),
  filter: makeSelectFilter(),
  filtered_employees: makeSelectFilteredEmployees(),
  is_pswd_visible: makeSelectPswdVisibility(),
  is_new_pswd_visible: makeSelectNewPswdVisibility(),
  new_pswd: makeSelectNewPswd(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onLoadEmployees: (employees) => dispatch(loadEmployees(employees)),
    changeVisibility: (form, visibility) => dispatch(changeVisibility(form, visibility)),
    onSaveEmployee: () => dispatch(saveEmployee()),
    onDeleteEmployee: (id) => dispatch(deleteEmployee(id)),
    onSelectEmployee: (id) => dispatch(selectEmployee(id)),
    onUpdateSelected: (values) => dispatch(updateSelectedEmployee(values)),
    onChangeFilter: (evt) => dispatch(changeFilter(evt.target.value)),
    onChangeNewPswd: (evt) => dispatch(changeNewPswd(evt.target.value)),
    onUpdatePswd: (new_password) => dispatch(updatePassword(new_password)),
    onSetValues: (new_employee_data) => dispatch(setValues(new_employee_data)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);


export default compose(
  withConnect,
  memo,
)(EmployeesUltimate);
