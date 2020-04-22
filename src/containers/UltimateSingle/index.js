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
import ContainerWrapper from './../../components/ContainerWrapper';

import './css/datatables.css';
import './css/dt-global_style.css';
import './css/notes.css';
import './css/breadcrumb.css';

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

    <div class={`note-item all-notes note-personal`}>
        <div class="note-inner-content" style={{cursor:"pointer"}}>
            <div class="note-content">

                <div style={{  position: "absolute", float: "right", width: "30%", right: "16px", top: "8px", display:"flex", flexDirection:"column", flexWrap:"wrap"}}>
                  <span className="badge badge-info" style={{margin:"4px"}}>{modifier.is_optional ? "Opcional" : "Obligatorio" }</span>
                  <span className="badge badge-info" style={{margin:"4px"}}>{modifier.is_multiple_choice ? "Opcion Multiple" : null }</span>
                </div>

                <p class="note-title" data-noteTitle="Meeting Scheduled at 4:50pm">{modifier.name}</p>
                <p class="meta-time">11/08/2019</p>
                <div class="note-description-content">
                {modifier.options.map(opt => {
                  return(
                    <p>{opt.name} - Precio: ${opt.price}</p>
                  );
                })}

            
                </div>

            </div>
            <div class="note-action">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-star fav-note"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-star delete-note"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                <svg onClick={() => onChangeFormState("crt_opt", true, modifier.name)}
                  xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-star create-option"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>                 
            </div>
            <div class="note-footer">
                <div class="tags-selector btn-group">
                    <a class="nav-link dropdown-toggle d-icon label-group" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="true">
                        <div class="tags">
                            <div class="g-dot-personal"></div>
                            <div class="g-dot-work"></div>
                            <div class="g-dot-social"></div>
                            <div class="g-dot-important"></div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-more-vertical"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg>
                        </div>
                    </a>
                    <div class="dropdown-menu dropdown-menu-right d-icon-menu">
                        <a class="note-personal label-group-item label-personal dropdown-item position-relative g-dot-personal" href="javascript:void(0);"> Personal</a>
                        <a class="note-work label-group-item label-work dropdown-item position-relative g-dot-work" href="javascript:void(0);"> Work</a>
                        <a class="note-social label-group-item label-social dropdown-item position-relative g-dot-social" href="javascript:void(0);"> Social</a>
                        <a class="note-important label-group-item label-important dropdown-item position-relative g-dot-important" href="javascript:void(0);"> Important</a>
                    </div>
                </div>
            </div>
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

    <ContainerWrapper active_page={'productos'}>

      <Modal is_visible={form_status.is_vsbl_crt_mod} children={children} />
      <Modal is_visible={form_status.is_vsbl_crt_opt} children={children2} />


      <div id="content">
        <div className="layout-px-spacing">

        <div className="row" style={{marginTop:"24px"}}>
          <div className="col-10">
            <nav class="breadcrumb-two" aria-label="breadcrumb">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item"><a href="/PS/ultimate">Productos</a></li>
                    <li class="breadcrumb-item active"><a href="javascript:void(0);">{product.name}</a></li>
                    <li class="breadcrumb-item" aria-current="page"><a href="javascript:void(0);"></a></li>
                </ol>
            </nav>
          </div>
          <div className="col-2">

            <div className="btn btn-primary" style={{float:"right"}} onClick={() =>  onChangeFormState("crt_mod", true)}>
              Crear Modificador
            </div>
          </div>
        </div>


        <div class="row app-notes layout-top-spacing" id="cancel-row">
          <div class="col-lg-12">
            <div class="app-container">
              <div class="app-note-container">
                <div class="app-note-overlay"></div>
                  <div id="ct" class="note-container note-grid">

                  {product.modifiers.map(mod => 
                    <Modifier modifier={mod} onChangeFormState={onChangeFormState} />
                  )}

                  </div>
              </div>
            </div>
          </div>
        </div>



        </div>
      </div>
    
    </ContainerWrapper>
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

