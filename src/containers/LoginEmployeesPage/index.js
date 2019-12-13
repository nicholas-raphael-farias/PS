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
    <div className="row justify-content-center">
      {wasAccepted ? <Redirect to="/employees/buy_process" /> : null }
      <div className="col-4" style={{marginTop:'calc(50vh - 160px)'}}>
        <div className="card">
          <div className="card-body">
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">INGRESAR CÓDIGO</label>
              <input type="password" className="form-control" value={code} onChange={onChangeCode} placeholder="Ingresar Código"/>
              <small className="form-text text-muted">Tu código es personal, no lo compartas con nadie.</small>
            </div>
          </div>
        </div>          
        <div className="btn btn-dark" style={{marginTop:'24px', width:'160px'}} onClick={() => checkCredentials(code)}>Ingresar</div>
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
