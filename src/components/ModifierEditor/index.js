import React from 'react'
import Modifier from './../Modifier'



const CancelBtn = ({onCancelProduct}) => {
  return (
    <div>
      <div className="btn btn-info" style={{position:"absolute", top:"40px", left:"40px"}}
      onClick={onCancelProduct}>
        Cancelar
      </div>
    </div>
  )
}


const ModifierEditor = ({active_modifier, onCancelProduct, onAddEditedOption, onSelectOption, onAddEditedSelectedOption}) => {
  return (
    <div className="col-8" style={{height:"100vh"}}>
        
      <CancelBtn onCancelProduct={onCancelProduct}/>
    
      <h1>Editor</h1>     
      <Modifier modifier={active_modifier} onAddOption={onAddEditedOption} onSelectOption={onSelectOption} onAddSelectedOption={onAddEditedSelectedOption}/>

    </div>
  )
}

export default ModifierEditor