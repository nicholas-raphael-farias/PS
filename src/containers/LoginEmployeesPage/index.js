import React, { useEffect, memo } from 'react'
import PropTypes from 'prop-types';
import { Redirect } from 'react-router';

import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import { useInjectReducer } from './../../utils/injectReducer';
import { useInjectSaga } from './../../utils/injectSaga';

import { changeCode, checkCredentials } from './actions';

import { makeSelectCode, makeSelectWasAccepted } from './selectors';

import reducer from './reducer';
import saga from './saga';

import './css/form-1.css';
import './css/switches.css';
import './css/theme-checkbox-radio.css';

const key = 'loginEmployees';

export function LoginEmployeesPage({
code, 
wasAccepted,
onChangeCode,
checkCredentials
}) {

  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
  
  return (
    <div class="form-container">
      {wasAccepted ? <Redirect to="/employees/buy_process" /> : null }
    <div class="form-form">
      <div class="form-form-wrap">
        <div class="form-container">
          <div class="form-content">

            <div class="d-flex user-meta">
              <div class="">
                <p class="">EMPLEADOS BUBBLETOWN</p>
              </div>
            </div>

            <form class="text-left">
              <div class="form">
                <div id="password-field" class="field-wrapper input mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-lock"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                  <input id="password" name="password" type="password" class="form-control" placeholder="Codigo"/>
                </div>
                <div class="d-sm-flex justify-content-between">
                  <div class="field-wrapper toggle-pass">
                    <p class="d-inline-block">Mostrar codigo</p>
                    <label class="switch s-primary">
                      <input type="checkbox" id="toggle-password" class="d-none" value={code} onChange={onChangeCode}/>
                      <span class="slider round"></span>
                    </label>
                  </div>
                  <div class="field-wrapper">
                    <div class="btn btn-primary"  onClick={() => checkCredentials(code)}>Ingresar</div>
                  </div>
                </div>
              </div>
            </form>                        
            <p class="terms-conditions">No compartas tu codigo con nadie, <a href="/PS/login"> Bubble Town</a>. <a href="javascript:void(0);">Contactar al administrador</a>, <a href="/help">Preguntas Frecuentes</a>.</p>

          </div>                    
        </div>
      </div>
    </div>
    <div className="form-image">
      <img src="/PS/logo3.png" style={{position:'absolute', margin:'auto', width:'500px', height:'500px', top:'calc(50% - 250px)', left: 'calc(50% - 250px)'}}/>
    </div>
</div>
  )
}

LoginEmployeesPage.propTypes = {
  code: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  code: makeSelectCode(),
  wasAccepted: makeSelectWasAccepted(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onChangeCode: (evt) => dispatch(changeCode(evt.target.value)),
    checkCredentials: (code, email) => {
      dispatch(checkCredentials(code, email))
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);


export default compose(
  withConnect,
  memo,
)(LoginEmployeesPage);
