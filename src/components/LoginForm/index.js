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
  <div>
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
        <form onSubmit={handleSubmit} autoComplete="off">

        <div className="form-group">
          <Field
            name="email"
            className={errors.email && touched.email ? "form-control is-invalid" : "form-control"}
            onBlur={handleBlur}
            placeholder="Ingresar correo electrónico"
            type="email"
          />
          <ErrorMessage
            name="email"
            component="div"
            className="error_message"
          />
        </div>
        <div className="form-group">
          <Field
            name="code"
            className={errors.code && touched.code ? "form-control is-invalid" : "form-control"}
            onBlur={handleBlur}
            placeholder="Ingresar codigo"
            type="text"
          />
          <ErrorMessage
            name="code"
            component="div"
            className="error_message"
          />
        </div>
          <button className="btn btn-dark btn-block" type="submit" disabled={isSubmitting}>
            Ingresar
          </button>
        </form>
      )}
    </Formik>
  </div>
);

export default LoginForm