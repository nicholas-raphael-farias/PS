import React, { useEffect, memo } from 'react'
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import { useInjectReducer } from './../../utils/injectReducer';

import { changeName, changeEmail, changeCode } from './actions';

import { makeSelectName, makeSelectEmail, makeSelectCode } from './selectors';

import reducer from './reducer';

const key = 'signup';

export function SignupPage({
  name, 
  email,
  code,
  onChangeName,
  onChangeEmail,
  onChangeCode,
}) {

  useInjectReducer({ key, reducer });

  return (
      <div className="row justify-content-center">
        <div className="col-4">
          <div className="card" style={{marginTop:'calc(50vh - 200px)'}}>
            <div className="card-body" style={{textAlign:'left'}}>
              <div class="form-group">
                <label>Nombre(s)</label>
                <input value={name} onChange={onChangeName} type="text" class="form-control" placeholder="Nombre(s)"/>
              </div>
              <div class="form-group">
                <label>Correo Electrónico</label>
                <input value={email} onChange={onChangeEmail} type="email" class="form-control" placeholder="Correo Electrónico"/>
              </div>
              <div class="form-group">
                <label>Código</label>
                <input value={code} onChange={onChangeCode} type="password" class="form-control" placeholder="Código"/>
              </div>
              <div className="btn btn-dark" style={{width:'100%'}}>Crear</div>
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
});

export function mapDispatchToProps(dispatch) {
  return {
    onChangeName: evt => dispatch(changeName(evt.target.value)),
    onChangeEmail: evt => dispatch(changeEmail(evt.target.value)),
    onChangeCode: evt => dispatch(changeCode(evt.target.value)),
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
