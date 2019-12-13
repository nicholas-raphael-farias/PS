import React, { useEffect, memo } from 'react'
import PropTypes from 'prop-types';
import { Formik, ErrorMessage, Field } from 'formik';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import es from 'date-fns/locale/es';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('email invalido')
    .required('email requerido'),
  name: Yup.string()
    .required('nombre requerido')
    .min(5, 'el nombre debe tener minimo 5 caracteres'),
  phone: Yup.string()
    .required('telefono requerido')
    .matches(/\d{10}/, 'el telefono debe tener 10 digitos'),
  password: Yup.string()
    .required('constraseña requerida')
    .min(5, 'la contraseña debe tener minimo 5 caracteres'),
});

const DatePickerField = ({ name, value, errors, touched, onChange }) => {
  return (
    <DatePicker
      name={name}
      locale="es"
      className={errors && touched ? "form-control is-invalid" : "form-control"}
      showMonthDropdown
      showYearDropdown
      selected={(value && new Date(value)) || new Date()}
      onChange={val => {
        onChange(name, val);
      }}
    />
  );
};

const NewEmployeeForm = ({onSetValues, onSaveEmployee}) => (
  <div>
    <Formik
      initialValues={{ name: '', email: '', phone:'', birthday: new Date(), password: ''}}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          console.log(values)
          console.log('values')
          onSetValues(values)
          onSaveEmployee()
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
          <label>Nombre(s)</label>
          <Field
            name="name"
            className={errors.name && touched.name ? "form-control is-invalid" : "form-control"}
            onBlur={handleBlur}
            placeholder="Ingresar nombre(s)"
            type="text"
          />
          <ErrorMessage
            name="name"
            component="div"
            className="error_message"
          />
        </div>
        <div className="form-group">
          <label>Correo electronico</label>
          <Field
            name="email"
            className={errors.email && touched.email ? "form-control is-invalid" : "form-control"}
            onBlur={handleBlur}
            placeholder="Ingresar correo electronico"
            type="email"
          />
          <ErrorMessage
            name="email"
            component="div"
            className="error_message"
          />
        </div>
        <div className="form-group">
          <label>Telefono</label>
          <Field
            name="phone"
            className={errors.phone && touched.phone ? "form-control is-invalid" : "form-control"}
            onBlur={handleBlur}
            placeholder="Ingresar telefono (10 digitos)"
            type="text"
          />
          <ErrorMessage
            name="phone"
            component="div"
            className="error_message"
          />
        </div>

        <div className="form-group">
          <label>Fecha de nacimiento</label> <br/>
          <DatePickerField
            errors={errors.birthday}
            touched={touched.birthday}
            name="birthday"
            value={values.birthday}
            onChange={setFieldValue}
          />
          <ErrorMessage
            name="birthday"
            component="div"
            className="error_message"
          />
        </div>       

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
            Crear
          </button>
        </form>
      )}
    </Formik>
  </div>
);

export default NewEmployeeForm