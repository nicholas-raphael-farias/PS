import React, { useEffect, memo } from 'react'
import PropTypes from 'prop-types';
import { Redirect } from 'react-router';

import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import { useInjectReducer } from './../../utils/injectReducer';
import { useInjectSaga } from './../../utils/injectSaga';

import { changeCode, changeEmail, checkCredentials } from './actions';

import { makeSelectCode, makeSelectEmail, makeSelectWasAccepted } from './selectors';

import reducer from './reducer';
import saga from './saga';

const key = 'login';

export function LoginPage({
code, 
email,
wasAccepted,
onChangeCode,
onChangeEmail,
checkCredentials
}) {

  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
  
  return (
    <div className="row justify-content-center">
      {wasAccepted ? <Redirect to="/dashboard" /> : null }
      <div className="col-4" style={{marginTop:'calc(50vh - 160px)'}}>
        <div className="card">
          <div className="card-body">
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">INGRESAR CORREO ELECTRÓNICO</label>
              <input type="email" className="form-control" value={email} onChange={onChangeEmail} placeholder="Ingresar correo electrónico"/>
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">INGRESAR CÓDIGO</label>
              <input type="password" className="form-control" value={code} onChange={onChangeCode} placeholder="Ingresar Código"/>
              <small className="form-text text-muted">Tu código es personal, no lo compartas con nadie.</small>
            </div>
          </div>
        </div>          
        <div className="btn btn-dark" style={{marginTop:'24px', width:'160px'}} onClick={() => checkCredentials(code, email)}>Ingresar</div>
      </div>
    </div>
  )
}

LoginPage.propTypes = {
  code: PropTypes.string,
  email: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  code: makeSelectCode(),
  email: makeSelectEmail(),
  wasAccepted: makeSelectWasAccepted(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onChangeCode: (evt) => dispatch(changeCode(evt.target.value)),
    onChangeEmail: (evt) => dispatch(changeEmail(evt.target.value)),
    checkCredentials: (code, email) => {
      console.log("click")
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
)(LoginPage);
