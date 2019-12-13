import React, {useEffect, memo} from 'react';
import axios from 'axios';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { getServerUrl } from './../../utils/serverURL';
import { createStructuredSelector } from 'reselect';
import { useInjectReducer } from './../../utils/injectReducer';
import { useInjectSaga } from './../../utils/injectSaga';
import Navbar from '../../components/Navbar';
import Modal from '../../components/Modal';

import NewModifierForm from './../../components/NewModifierForm'
import NewOptForm from './../../components/NewOptForm'

import { 
  loadProduct, 
  changeFormState, 
  setModValues,
  setOptValues,
  saveMod, 
  saveOpt
} from './actions';
import { 
  makeSelectProduct, 
  makeSelectFormStatus, 
  makeSelectModifier, 
  makeSelectChosenModifier, 
  makeSelectOption,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
const key = 'ultimate';

const Modifier = ({modifier,onChangeFormState}) => {

  const formatType = (type) => {
    switch (type) {
      case "0":
        return "Opcional"
      case "1":
        return "Obligatorio"
      case "2":
        return "Seleccion multiple"
      default:
        break;
    }
  };


  return(
    <div className="card" style={{width: '240px', margin:'8px'}}>
      <div class="modal-header">
        <span>{modifier.name}</span>
        <div style={{  position: "absolute", float: "right", width: "50%", right: "8px", top: "2px", textAlign:"right"}}>
          <span className="badge badge-info">{modifier.is_optional ? "Opcional" : "Obligatorio" }</span>
          <span className="badge badge-info">{modifier.is_multiple_choice ? "Opcion Multiple" : null }</span>
        </div>
      </div>
      <div className="card-body">
        {modifier.options.map(opt => {
          return(
            <span class="badge badge-info" style={{width:"100%", height:"32px", padding:"8px"}}>
              <span style={{float:"left", fontSize:"16px"}}>{opt.name}</span>
              <span style={{float:"right", fontSize:"16px"}}>{opt.price}</span>
            </span>
          );
        })}
      </div>
      <div 
      className="btn btn-dark" 
      style={{position:"relative", width:"88%", bottom:"10px", margin:"auto"}}
      onClick={() => onChangeFormState("crt_opt", true, modifier.name)}>
        +
      </div>
    </div>
  );
}

const CreateModifier = ({new_modifier, onChangeFormState, onChangeMod, onSaveMod}) => {
  return(
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLiveLabel">Crear Modificador</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close" onClick={() => onChangeFormState("crt_mod", false)}>
          <span aria-hidden="true">×</span>
        </button>
      </div>
      <div class="modal-body">
        <div class="form-group">
          <label for="exampleInputEmail1">Nombre del Bloque</label>
          <input 
            type="text" 
            class="form-control" 
            placeholder="Nombre del Bloque"
            value={new_modifier.name}
            onChange={(evt) => onChangeMod("name", evt.target.value)}/>
        </div>
        <div className="form-group">
          <label for="exampleInputEmail1">Tipo</label> <br/>
          <div class="form-check form-check-inline">
            <input 
              class="form-check-input" 
              type="radio" 
              checked={!new_modifier.is_optional}
              onChange={() => onChangeMod("is_optional", false)}/>
            <label class="form-check-label">
              Obligatorio
            </label>
          </div>
          <div class="form-check form-check-inline">
            <input 
              class="form-check-input" 
              type="radio" 
              checked={new_modifier.is_optional}
              onChange={() => onChangeMod("is_optional", true)}/>
            <label class="form-check-label">
              Opcional
            </label>
          </div>
        </div>

        <div className="form-group">
          <label for="exampleInputEmail1">Acepta multiples opciones?</label> <br/>
          <div class="form-check form-check-inline">
            <input class="form-check-input"
              type="radio" 
              checked={!new_modifier.is_multiple_choice}
              onChange={() => onChangeMod("is_multiple_choice", false)}/>
            <label class="form-check-label">
              No
            </label>
          </div>
          <div class="form-check form-check-inline">
            <input class="form-check-input"
              type="radio" 
              checked={new_modifier.is_multiple_choice}
              onChange={() => onChangeMod("is_multiple_choice", true)}/>
            <label class="form-check-label">
              Si
            </label>
          </div>
        </div>









       
        <div 
          className="btn btn-dark" 
          onClick={onSaveMod}>
          Crear Bloque
        </div>
      </div>
    </div>
  );
};

const CreateOpt = ({new_option, onChangeFormState, onChangeOption, onSaveOpt}) => {
  return(
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLiveLabel">Crear Opcion</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close" onClick={() => onChangeFormState("crt_opt", false)}>
          <span aria-hidden="true">×</span>
        </button>
      </div>
      <div class="modal-body">
        <div class="form-group">
          <label for="exampleInputEmail1">Nombre de la opcion</label>
          <input 
            type="text" 
            class="form-control" 
            placeholder="Nombre de la opcion"
            value={new_option.name}
            onChange={(evt) => onChangeOption("name", evt.target.value)}/>
        </div>
        <div class="form-group">
          <label for="exampleInputEmail1">Precio</label>
          <input 
            type="text" 
            class="form-control" 
            placeholder="Precio"
            value={new_option.price}
            onChange={(evt) => onChangeOption("price", evt.target.value)}/>
        </div>
        <div className="btn btn-dark" onClick={onSaveOpt}>
          Crear Opcion
        </div>  
      </div>


      </div> 
  );
}

export function UltimateSingle({
  product,
  new_modifier, 
  match, 
  form_status, 
  chosen_modifier,
  new_option,
  onChangeFormState, 
  setModValues,
  setOptValues,
  onLoadProduct,
  onSaveMod,
  onChangeOption,
  onSaveOpt,
}) {

  let children;
  let children2;
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  useEffect(() => {

    const requestURL = `${getServerUrl()}/products/${match.params.productId}`;
    try {
      const token = localStorage.getItem("PointOfSaleToken")

      axios.get(requestURL, {
        headers: {'Authorization': `Bearer ${token}`}
      })
      .then(({ data }) => {
        console.log(data);
        onLoadProduct(data);
      });

    } catch (err) {
      console.log("err")
      console.log(err)
    }

  }, []);

  children =(
    <div className="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Crear Modificador</h5>
        <button type="button" class="close" onClick={() => onChangeFormState("crt_mod", false)}>
          <span aria-hidden="true">×</span>
        </button>
      </div>
      <div className="modal-body">
        <NewModifierForm setModValues={setModValues} onSaveMod={onSaveMod}/>
      </div>
    </div>

    //<CreateModifier 
    //  new_modifier={new_modifier} 
    //  onChangeFormState={onChangeFormState} 
    //  onChangeMod={onChangeMod} 
    //  onSaveMod={onSaveMod}/>
  );

  children2 =(
    <div className="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Crear Opcion</h5>
        <button type="button" class="close" onClick={() => onChangeFormState("crt_opt", false)}>
          <span aria-hidden="true">×</span>
        </button>
      </div>
      <div className="modal-body">
        <NewOptForm setOptValues={setOptValues} onSaveOpt={onSaveOpt}/>
      </div>
    </div>
    //<CreateOpt 
    //  new_option={new_option}
    //  onChangeFormState={onChangeFormState}  
    //  onChangeOption={onChangeOption}
    //  onSaveOpt={onSaveOpt}/>
  );


  return (
    <div className="container-fluid" style={{padding: '0px'}}>
      <Navbar is_active='product' />
      <Modal is_visible={form_status.is_vsbl_crt_mod} children={children} />
      <Modal is_visible={form_status.is_vsbl_crt_opt} children={children2} />
      <div className="row justify-content-center">
        <div className="col-6">
          <h1>Producto: {product.name}</h1>
        </div>
        <div className="col-6">
          <div className="btn btn-dark" style={{marginTop: "12px"}} onClick={() => onChangeFormState("crt_mod", true)}>Crear Bloque</div>
        </div>
      </div>

      <div className="row">
        <div className="col-12" style={{display:'flex', flexWrap:'wrap', justifyContent:'center'}}>
          {product.modifiers.map(mod => 
            <div>
              <Modifier modifier={mod} onChangeFormState={onChangeFormState} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}


UltimateSingle.propTypes = {
};

const mapStateToProps = createStructuredSelector({
  product: makeSelectProduct(),
  form_status: makeSelectFormStatus(),
  new_modifier: makeSelectModifier(),
  chosen_modifier: makeSelectChosenModifier(),
  new_option: makeSelectOption(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onLoadProduct: (product) => dispatch(loadProduct(product)),
    onChangeFormState: (form, new_state, opt) => {dispatch(changeFormState(form, new_state, opt)); console.log("change")},
    setModValues: (modifier) => dispatch(setModValues(modifier)),
    setOptValues: (option) => dispatch(setOptValues(option)),
    onSaveMod: () => dispatch(saveMod()),
    onSaveOpt: () => dispatch(saveOpt()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);


export default compose(
  withConnect,
  memo,
)(UltimateSingle);

