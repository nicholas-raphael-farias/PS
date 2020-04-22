import React, { useEffect, memo } from 'react'
import PropTypes from 'prop-types';
import { Formik, ErrorMessage, Field } from 'formik';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import es from 'date-fns/locale/es';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required('nombre requerido')
    .min(5, 'el nombre debe tener minimo 5 caracteres'),
  price: Yup.number()
  .typeError('el costo debe ser un numero')
  .required('costo requerido')
  .min(1, 'el costo debe ser mayor a cero'),
});


const NewOptForm = ({ setOptValues, onSaveOpt }) => (
  <div>
    <Formik
      initialValues={{name:'', price: 0}}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          console.log(values)
          setOptValues(values)
          onSaveOpt()
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
            <label>Nombre</label>
            <Field
              name="name"
              className={errors.name && touched.name ? "form-control is-invalid" : "form-control"}
              onBlur={handleBlur}
              placeholder="Ingresar nombre"
              type="text"
            />
            <ErrorMessage
              name="name"
              component="div"
              className="error_message"
            />
          </div>
          

       
          <div className="form-group">
            <label>Costo</label>
            <Field
              name="price"
              className={errors.price && touched.price ? "form-control is-invalid" : "form-control"}
              onBlur={handleBlur}
              placeholder="Ingresar costo"
              type="text"
            />
            <ErrorMessage
              name="price"
              component="div"
              className="error_message"
            />
          </div>

          <button className="btn btn-primary btn-block" type="submit" disabled={isSubmitting}>
            Crear Producto
          </button>
        </form>
      )}
    </Formik>
  </div>
);

export default NewOptForm