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

const key = 'login'

export function LoginPage({
  was_accepted,
  onSetValues,
  checkCredentials
}) {

  useInjectReducer({ key, reducer })
  useInjectSaga({ key, saga })
  
  return (
    <div className="row justify-content-center">
      {was_accepted ? <Redirect to="/dashboard" /> : null }
      <div className="col-4" style={{marginTop:'calc(50vh - 160px)'}}>
        <div className="card">
          <div className="card-body">
            <LoginForm onSetValues={onSetValues} checkCredentials={checkCredentials}/>
          </div>
        </div>          
      </div>
    </div>
  )
}

LoginPage.propTypes = {
  was_accepted: PropTypes.bool,
  onSetValues: PropTypes.func,
  checkCredentials: PropTypes.string,
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
