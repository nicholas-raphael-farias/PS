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
});

const Checkbox = (props) => {
  return (
    <div>
      <Field name={props.name}>
        {({ field, form }) => (
          <input
            type="radio"
            {...props}
            checked={field.value.includes(props.value)}
            onChange={() => {
              if (field.value.includes(props.value)) {
                const nextValue = field.value.filter(
                  value => value !== props.value
                );
                form.setFieldValue(props.name, nextValue);
              } else {
                const nextValue = [props.value];
                form.setFieldValue(props.name, nextValue);
              }
            }}
          />
        )}
      </Field>
      <label class="form-check-label" for="defaultCheck1">
        {props.label}
      </label>
    </div>
  );
}

const NewModifierForm = ({ setModValues, onSaveMod }) => (
  <div>
    <Formik
      initialValues={{name:'', is_optional: ['false'], is_multiple_choice: ['false']}}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          let response = {name: '', is_optional: false, is_multiple_choice: false}
          
          response.is_optional = values.is_optional[0] === "true" ? true:false
          response.is_multiple_choice = values.is_multiple_choice[0] === "true" ? true:false
          response.name = values.name
          setModValues(response)
          onSaveMod()
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
            <label for="exampleInputEmail1">Tipo</label> <br/>
            <div class="form-check form-check-inline">
              <Checkbox name="is_optional" value="false" label="Obligatorio"/>
            </div>
            <div class="form-check form-check-inline">
              <Checkbox name="is_optional" value="true" label="Opcional"/>
            </div>
          </div>

          <div className="form-group">
            <label for="exampleInputEmail1">Acepta multiples opciones?</label> <br/>
            <div class="form-check form-check-inline">
              <Checkbox name="is_multiple_choice" value="false" label="No"/>
            </div>
            <div class="form-check form-check-inline">
              <Checkbox name="is_multiple_choice" value="true" label="Si"/>
            </div>
          </div>

          <button className="btn btn-primary btn-block" type="submit" disabled={isSubmitting}>
            Crear Modificador
          </button>
        </form>
      )}
    </Formik>
  </div>
);

export default NewModifierForm