import React, { memo, useEffect, useState } from 'react'

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale, setDefaultLocale } from  "react-datepicker";
import es from 'date-fns/locale/es';
import { Formik, ErrorMessage, Field } from 'formik';
import * as Yup from 'yup';

import './theme-checkbox-radio.css';

registerLocale('es', es)

const validationSchema = Yup.object().shape({
	value: Yup.number()
		.integer('el valor debe ser un entero')
		.required('valor requerido')
		.min(1, 'minimo 1%')
		.typeError('valor debe ser un numero'),
	type: Yup.string()
		.required('costo requerido'),
	target: Yup.string()
		.required('producto o categoria requerido'),
	name: Yup.string()
		.required('nombre requerido'),
	target_value: Yup.string()
		.required('campo requerido'),
});

const mapType = (type) => {
    switch (type) {
      case '1':
        return 'Descuento';
      case '2':
        return '2x1';
      case '3':
        return '3x1';
      default:
        break;
    }
	}


const NewPromoForm =({categories, products, onChangeNp, onSavePromo}) => {
		let today = Date.now()
    return (
      <div className="col-12">

				<Formik
					initialValues={{value: 1, type: 'porcentage', target: 'product', name: '', target_value:'', expiration_date: today}}
					validationSchema={validationSchema}
					onSubmit={(values, { setSubmitting }) => {
						console.log(values)
						onChangeNp(values)
						onSavePromo()
						setSubmitting(false)
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
              className="invalid-feedback"
            />
          </div>

					<div class="n-chk">
						<label class="new-control new-radio new-radio-text radio-primary" style={{display:"inline"}}>
							<input type="radio" class="new-control-input" name="type" checked={values.type === "porcentage"} onChange={() => setFieldValue("type", "porcentage")}/>
							<span class="new-control-indicator"></span><span class="new-radio-content"> Descuento por porcentaje</span>
						</label>
					</div>

					<div class="n-chk">
						<label class="new-control new-radio new-radio-text radio-primary" style={{display:"inline"}}>
							<input type="radio" class="new-control-input" name="type" checked={values.type === "price"} onChange={() => setFieldValue("type", "price")}/>
							<span class="new-control-indicator"></span><span class="new-radio-content"> Descuento en precio</span>
						</label>
					</div>

					<div className="form-group">
            <label>{ values.type === "porcentage" ? "Porcentaje" : "Precio"}</label>
            <Field
              name="value"
              className={errors.value && touched.value ? "form-control is-invalid" : "form-control"}
              onBlur={handleBlur}
              placeholder={ values.type === "porcentage" ? "Ingresar porcentaje" : "Ingresar precio"}
              type="text"
            />
            <ErrorMessage
              name="value"
              component="div"
              className="invalid-feedback"
            />
          </div>


					<div class="n-chk">
						<label class="new-control new-radio new-radio-text radio-primary" style={{display:"inline"}}>
							<input type="radio" class="new-control-input" name="target" checked={values.target === "product"} onChange={() => {
								setFieldValue("target_value", "")
								setFieldValue("target", "product")
							}}/>
							<span class="new-control-indicator"></span><span class="new-radio-content"> Promocion para producto</span>
						</label>
					</div>

					<div class="n-chk">
						<label class="new-control new-radio new-radio-text radio-primary" style={{display:"inline"}}>
							<input type="radio" class="new-control-input" name="target" checked={values.target === "category"} onChange={() => {
								setFieldValue("target_value", "")
								setFieldValue("target", "category")
							}}/>
							<span class="new-control-indicator"></span><span class="new-radio-content"> Promocion para cagetoria de productos</span>
						</label>
					</div>




          <div className="form-group">
            <label>{values.target === "producto" ? "Producto" : "Categoria"}</label>
          
            <Field as="select" name="target_value" className={errors.target_value && touched.target_value ? "form-control is-invalid" : "form-control"}>
							<option value='' selected>Seleccionar Opcion</option>
							{ values.target === "product" ? 
								products.map((product) =>  <option value={product.name}> {product.name} </option> )  : 
								categories.map((category) =>  <option value={category.name}> {category.name} </option> ) 
							}
            </Field>

            <ErrorMessage
              name="target_value"
              component="div"
              className="invalid-feedback"
            />
          </div>


					<div className="form-group">
          	<label>Fecha de Expiracion</label> <br/>
						<DatePicker
							locale="es"
							className="form-control"
							selected={new Date(values.expiration_date)}
							name='expiration_date'
							onSelect={(value) => setFieldValue("expiration_date", value)}
							showMonthDropdown
							showYearDropdown
						/>
        </div>

          <button className="btn btn-primary btn-block" type="submit" disabled={isSubmitting}>
            Crear Promocion
          </button>
        </form>
      )}
    </Formik>


          
      </div>
    );
  }

export default NewPromoForm