import React, { useEffect, memo } from 'react'
import PropTypes from 'prop-types';
import { Redirect } from 'react-router';

import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import { useInjectReducer } from './../../utils/injectReducer';
import { useInjectSaga } from './../../utils/injectSaga';

import { changeName, changeEmail, changeCode, createOwner } from './actions';

import { makeSelectName, makeSelectEmail, makeSelectCode, makeSelectWasCreated } from './selectors';

import reducer from './reducer';
import saga from './saga';

const key = 'signup';

export function SignupPage({
  name, 
  email,
  code,
  wasOwnerCreated,
  onChangeName,
  onChangeEmail,
  onChangeCode,
  onCreateOwner,
}) {

  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  return (
      <div className="row justify-content-center">
        {wasOwnerCreated ? <Redirect to="/login" /> : null }
        <div className="col-4">
          <div className="card" style={{marginTop:'calc(50vh - 200px)'}}>
            <div className="card-body" style={{textAlign:'left'}}>
              <div className="form-group">
                <label>Nombre(s)</label>
                <input value={name} onChange={onChangeName} type="text" className="form-control" placeholder="Nombre(s)"/>
              </div>
              <div className="form-group">
                <label>Correo Electrónico</label>
                <input value={email} onChange={onChangeEmail} type="email" className="form-control" placeholder="Correo Electrónico"/>
              </div>
              <div className="form-group">
                <label>Código</label>
                <input value={code} onChange={onChangeCode} type="password" className="form-control" placeholder="Código"/>
              </div>
              <div className="btn btn-dark" onClick={() => onCreateOwner({name: name, email: email, password: code})} style={{width:'100%'}}>Crear</div>
            </div>
          </div>
        </div>
      </div>
  )
}


SignupPage.propTypes = {
  name: PropTypes.string,
  email: PropTypes.string,
  code: PropTypes.string,
  onChangeName: PropTypes.func,
  onChangeEmail: PropTypes.func,
  onChangeCode: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  name: makeSelectName(),
  email: makeSelectEmail(),
  code: makeSelectCode(),
  wasOwnerCreated: makeSelectWasCreated(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onChangeName: evt => dispatch(changeName(evt.target.value)),
    onChangeEmail: evt => dispatch(changeEmail(evt.target.value)),
    onChangeCode: evt => dispatch(changeCode(evt.target.value)),
    onCreateOwner: owner => {
      console.log("sadadasdas");
      dispatch(createOwner(owner))
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
)(SignupPage);
