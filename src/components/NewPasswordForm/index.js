import React, { useEffect, memo } from 'react'
import PropTypes from 'prop-types';
import { Formik, ErrorMessage, Field } from 'formik';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import es from 'date-fns/locale/es';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  password: Yup.string()
    .required('constraseña requerida')
    .min(5, 'la contraseña debe tener minimo 5 caracteres'),
});

const NewPasswordForm = ({onUpdatePswd}) => (
  <div>
    <Formik
      initialValues={{ password: '' }}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          console.log(values)
          console.log('values')
          onUpdatePswd(values.password)
          //onSaveEmployee()
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
        setFieldValue,
        /* and other goodies */
      }) => (
        <form onSubmit={handleSubmit} autoComplete="off">     
          <div className="form-group">
            <label>Contraseña</label>
            <Field
              name="password"
              className={errors.password && touched.password ? "form-control is-invalid" : "form-control"}
              onBlur={handleBlur}
              placeholder="Ingresar contraseña"
              type="password"
            />
            <ErrorMessage
              name="password"
              component="div"
              className="error_message"
            />
            <small class="form-text text-muted">
              Tu contraseña debe contener mínimo 5 caracteres.
            </small>
          </div>
          <button className="btn btn-dark btn-block" type="submit" disabled={isSubmitting}>
            Actualizar
          </button>
        </form>
      )}
    </Formik>
  </div>
);

export default NewPasswordForm