import React, { useEffect, memo } from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router'
import { connect } from 'react-redux'
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect'
import { useInjectReducer } from './../../utils/injectReducer'
import { useInjectSaga } from './../../utils/injectSaga'
import { setValues, checkCredentials } from './actions'
import { makeSelectWasAccepted } from './selectors'
import LoginForm from '../../components/LoginForm'
import reducer from './reducer'
import saga from './saga'

import './css/form-1.css';
import './css/switches.css';
import './css/theme-checkbox-radio.css';

const key = 'login'

export function LoginPage({
  was_accepted,
  onSetValues,
  checkCredentials
}) {

  useInjectReducer({ key, reducer })
  useInjectSaga({ key, saga })
  
  return (  
    <div className="form-container">

    {was_accepted ? <Redirect to="/dashboard" /> : null }

      <LoginForm onSetValues={onSetValues} checkCredentials={checkCredentials}/>

      <div className="form-image">
        <img src="logo3.png" style={{position:'absolute', margin:'auto', width:'500px', height:'500px', top:'calc(50% - 250px)', left: 'calc(50% - 250px)'}}/>
      </div>
    </div>
  
  )
}

LoginPage.propTypes = {
  was_accepted: PropTypes.bool,
  onSetValues: PropTypes.func,
  checkCredentials: PropTypes.func,
}

const mapStateToProps = createStructuredSelector({
  was_accepted: makeSelectWasAccepted(),
})

export function mapDispatchToProps(dispatch) {
  return {
    onSetValues: (code, email) => dispatch(setValues(code, email)),
    checkCredentials: () => dispatch(checkCredentials()),
  }
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
)


export default compose(
  withConnect,
  memo,
)(LoginPage)
