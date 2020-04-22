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

import ContainerWrapper from './../../components/ContainerWrapper';

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

import './css/datatables.css';
import './css/dt-global_style.css';
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
    <ContainerWrapper active_page={'empleados'}>

      <Modal style={{color:'black'}} is_visible={form_visibility.crtForm} children={children} />
      <Modal is_visible={form_visibility.updtForm} children={children2} />
      <Modal is_visible={form_visibility.updtPswdForm} children={children3} />

      <div id="content">

      <div class="layout-px-spacing">

        <div class="row layout-top-spacing" id="cancel-row">

            <div class="col-xl-12 col-lg-12 col-sm-12  layout-spacing">
                <div class="widget-content widget-content-area br-6">
                    <div class="table-responsive mb-4 mt-4">
                        <div id="zero-config_wrapper" class="dataTables_wrapper container-fluid dt-bootstrap4">
                          <div class="row">
                            <div class="col-sm-12 col-md-6">
                              <div class="dataTables_length" id="zero-config_length">
                                {/* To keep the button on the left */}
                              </div>
                            </div>
                            <div class="col-sm-12 col-md-6">
                              <div id="zero-config_filter" class="dataTables_filter">
                                <label><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-search"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                                  <button class="btn btn-primary mb-2" onClick={() => changeVisibility("crtForm", true)}>Crear Empleado</button>
                                </label>
                              </div>
                            </div>
                          </div>

                          <div class="row">
                            <div class="col-sm-12"><table id="zero-config" class="table table-hover dataTable" style={{width:'100%'}} role="grid" aria-describedby="zero-config_info">
                            <thead>
                                <tr role="row">
                                  <th tabindex="0" aria-controls="zero-config" rowspan="1" colspan="1" aria-sort="ascending" aria-label="Name: activate to sort column descending" style={{width:"246px"}}>ID</th>
                                  <th tabindex="1" aria-controls="zero-config" rowspan="1" colspan="1" aria-label="Position: activate to sort column ascending" style={{width:"390px"}}>Nombre</th>
                                  <th tabindex="2" aria-controls="zero-config" rowspan="1" colspan="1" aria-label="Office: activate to sort column ascending" style={{width:"174px"}}>Correo</th>
                                  <th tabindex="3" aria-controls="zero-config" rowspan="1" colspan="1" aria-label="Age: activate to sort column ascending" style={{width:"86px"}}>Telefono</th>
                                  <th tabindex="4" aria-controls="zero-config" rowspan="1" colspan="1" aria-label="Start date: activate to sort column ascending" style={{width:"199px"}}>Cumpleanos</th>
                                  <th tabindex="5" aria-controls="zero-config" rowspan="1" colspan="1" aria-label="Salary: activate to sort column ascending" style={{width:"138px"}}>Estado</th>
                                  <th tabindex="6" aria-controls="zero-config" rowspan="1" colspan="1" aria-label="Salary: activate to sort column ascending" style={{width:"138px"}}>Acciones</th>
                                  <th class="no-content sorting" tabindex="0" aria-controls="zero-config" rowspan="1" colspan="1" aria-label=": activate to sort column ascending" style={{width:"48px"}}></th>
                                  </tr>
                            </thead>
                            <tbody>
                              {employees.map(e => {
                                  return(
                                    <tr role="row">
                                    <td class="sorting_1">{e._id}</td>
                                    <td style={{border:"none"}}>{e.name}</td>
                                    <td style={{border:"none"}}>{e.email}</td>
                                    <td style={{border:"none"}}>{e.phone}</td>
                                    <td style={{border:"none"}}>{typeof(e.birthday) === 'object' ? e.birthday.toLocaleDateString("es-MX") : new Date(e.birthday).toLocaleDateString() }</td>
                                    <td style={{border:"none"}}>{e.status === 0 ? <span class="badge badge-secondary">Inactivo</span> : <span class="badge badge-secondary">Activo</span>}</td>

                                    <td>
                                      <svg onClick={() => { 
                                        onSelectEmployee(e._id);
                                        onDeleteEmployee();
                                      }} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x-circle table-cancel"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>
                                      <svg onClick={() => {
                                        onSelectEmployee(e._id);
                                        changeVisibility("updtForm", true);
                                      }} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x-circle table-edit"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                                    </td>
                                  </tr>
                                  );
                                })
                              }
  
                         </tbody>
                            <tfoot>
                                <tr>
                                  <th rowspan="1" colspan="1">ID</th>
                                  <th rowspan="1" colspan="1">Nombre</th>
                                  <th rowspan="1" colspan="1">Correo</th>
                                  <th rowspan="1" colspan="1">Telefono</th>
                                  <th rowspan="1" colspan="1">Cumpleanos</th>
                                  <th rowspan="1" colspan="1">Estado</th>
                                  <th rowspan="1" colspan="1">Acciones</th>
                                  <th rowspan="1" colspan="1"></th>
                                </tr>
                            </tfoot>
                        </table></div></div>
                        </div>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </div>


    </ContainerWrapper>
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
