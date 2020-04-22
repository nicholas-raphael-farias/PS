import React, { useEffect, memo } from 'react'
import PropTypes from 'prop-types';
import { Formik, ErrorMessage, Field } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('email invalido')
    .required('email requerido'),
  code: Yup.string()
    .required('código requerido')
    .min(3, 'Ingresa mas de 3 caracteres')
  });

const LoginForm = ({onSetValues, checkCredentials}) => (
    <Formik
      initialValues={{ email: '', code: ''}}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          onSetValues(values.code, values.email)
          checkCredentials()
          setSubmitting(false)
        }, 400);
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        /* and other goodies */
      }) => (

        <div className="form-form">
        <div className="form-form-wrap">
          <div className="form-container">
            <div className="form-content">
              <h1 className="">Inicia Sesion <a href="index.html"><span className="brand-name">BubbleTown</span></a></h1>
              <p className="signup-link">Nuevo aqui? <a href="auth_register.html">Crea una cuenta</a></p>
              <form className="text-left" onSubmit={handleSubmit} autoComplete="off">
                <div className="form">

                  <div id="email-field" className="field-wrapper input">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-user"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                    <Field
                      name="email"
                      className={errors.email && touched.email ? "form-control is-invalid" : "form-control"}
                      onBlur={handleBlur}
                      placeholder="Correo electronico"
                      type="email"
                    />
                     <ErrorMessage
                        name="email"
                        component="div"
                        className="invalid-feedback"
                      />
                  </div>

                  <div id="password-field" className="field-wrapper input mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-lock"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                    <Field
                      id="code"
                      name="code"
                      className={errors.code && touched.code ? "form-control is-invalid" : "form-control"}
                      onBlur={handleBlur}
                      placeholder="Contrasena"
                      type="password"
                    />
                    <ErrorMessage
                      name="code"
                      component="div"
                      className="invalid-feedback"
                    />
                  </div>
                  
                  <div className="d-sm-flex justify-content-between">
                    <div className="field-wrapper toggle-pass">
                      <p className="d-inline-block">Mostrar Contrasena</p>
                      <label className="switch s-primary">
                          <input type="checkbox" id="toggle-password" className="d-none"/>
                          <span className="slider round"></span>
                      </label>
                    </div>
                    <div className="field-wrapper">
                      <button className="btn btn-primary" type="submit" disabled={isSubmitting}>
                        Iniciar Sesion
                      </button>
                    </div>
                  </div>

                  <div className="field-wrapper text-center keep-logged-in">
                    <div className="n-chk new-checkbox checkbox-outline-primary">
                      <label className="new-control new-checkbox checkbox-outline-primary">
                        <input type="checkbox" className="new-control-input"/>
                        <span className="new-control-indicator"></span>Recuerdame
                      </label>
                    </div>
                  </div>

                  <div className="field-wrapper">
                    <a href="auth_pass_recovery.html" className="forgot-pass-link">Olvidaste tu contrasena?</a>
                  </div>

                </div>
              </form>                       
            </div>                    
          </div>
        </div>
      </div>
      )}
    </Formik>
);

export default LoginForm