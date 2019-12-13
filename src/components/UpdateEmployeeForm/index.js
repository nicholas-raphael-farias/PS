import React, { useEffect, memo } from 'react'
import PropTypes from 'prop-types'
import { Formik, ErrorMessage, Field } from 'formik'
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import es from 'date-fns/locale/es'
import * as Yup from 'yup'

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
})

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
}

const UpdateEmployeeForm = ({employee, onSetValues, onSaveEmployee, changeVisibility, onUpdateSelected}) => (
  <div>
    <Formik
      enableReinitialize={true}
      initialValues={{ name: employee.name, email: employee.email, phone:employee.phone, birthday: employee.birthday }}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          console.log(values)
          console.log('values')
          onUpdateSelected(values)
          setSubmitting(false)
        }, 400);
      }}
    >
      {({
        values,
        errors,
        touched,
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
            value={values.name}
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

        <div className="col-12">
          <button className="btn btn-dark" type="submit">
          Actualizar Empleado
          </button>
          <div className="btn btn-secondary"
            style={{float: "right"}}
            onClick={() => {
              changeVisibility("updtForm", false)
              changeVisibility("updtPswdForm", true)
            }}>
            Cambiar Contraseña
          </div>
        </div>
      </form>
      )}
    </Formik>
  </div>
)
export default UpdateEmployeeForm;