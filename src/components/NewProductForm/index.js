import React, { useEffect, memo } from 'react'
import PropTypes from 'prop-types';
import { Formik, ErrorMessage, Field } from 'formik';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import es from 'date-fns/locale/es';
import * as Yup from 'yup';

import './theme-checkbox-radio.css';

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required('nombre requerido')
    .min(5, 'el nombre debe tener minimo 5 caracteres'),
  price: Yup.number()
  .typeError('el costo debe ser un numero')
  .required('costo requerido')
  .min(1, 'el costo debe ser mayor a cero'),
});


const Checkbox = (props) => {
  return (
    <div class="n-chk">
      <label class="new-control new-checkbox new-checkbox-text checkbox-primary">
      <Field name={props.name}>
        {({ field, form }) => (
          <input
            type="checkbox"
            class="new-control-input"
            {...props}
            checked={field.value.includes(props.value)}
            onChange={() => {
              if (field.value.includes(props.value)) {
                const nextValue = field.value.filter(
                  value => value !== props.value
                );
                form.setFieldValue(props.name, nextValue);
              } else {
                const nextValue = field.value.concat(props.value);
                form.setFieldValue(props.name, nextValue);
              }
            }}
          />
        )}
      </Field>
      <span class="new-control-indicator"></span> 
      <span class="new-chk-content">El producto tiene precio ?</span>
      </label>
    </div>
  );
}

const NewProductForm = ({ categories, onCreateProduct }) => (
  <div>
    <Formik
      initialValues={{name:'', has_price: [], price: 1, category: ''}}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          let response = 
            values.has_price.length > 0 ? 
            { name: values.name, has_price: true, price: values.price, category: values.category } : 
            { name: values.name, has_price: false, price: 0, category: values.category }
          onCreateProduct(response)
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
            <label>Categoria</label>
          
            <Field as="select" name="category" className="form-control">
              {categories.map( category => {
                return(<option value={category.name}>{category.name}</option>)
              })}
            </Field>

            <ErrorMessage
              name="category"
              component="div"
              className="error_message"
            />
          </div>

          <Checkbox name="has_price" value="true" />

         {values.has_price.length > 0 ?  
          <div className="form-group">
            <label>Precio</label>
            <Field
              name="price"
              className={errors.price && touched.price ? "form-control is-invalid" : "form-control"}
              onBlur={handleBlur}
              placeholder="Ingresar precio"
              type="text"
            />
            <ErrorMessage
              name="price"
              component="div"
              className="error_message"
            />
            </div>
         : null}

          <button className="btn btn-primary btn-block" type="submit" disabled={isSubmitting}>
            Crear Producto
          </button>
        </form>
      )}
    </Formik>
  </div>
);

export default NewProductForm