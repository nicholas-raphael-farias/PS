import React from 'react'

import Product from './../Product'
import Timeline from './../Timeline'
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

const FinishBuyingProcessBtn = ({onRedirectToCheckout}) => {
  return (
    <div onClick={onRedirectToCheckout} className="btn btn-dark" style={{position:"absolute", right:"24px", bottom:"24px"}}>
      Cobrar
    </div>
  )
}




const Chooser = ({products, onAddToTicket, product_modifiers, active_modifier, step_bar_helper, onAddOption, onSelectOption, onAddSelectedOption, onCancelProduct, onRedirectToCheckout}) => {

  return (
    <div className="col-8" style={{height:"100vh"}}>
      <h1>Productos</h1> 

      {product_modifiers.length === 0 ? 
      <div className="row">
        <div className="col-12" style={{display:'flex', flexWrap:'wrap', justifyContent:'center'}}>
            {products.map(product => 
              <Product product={product} onAddToTicket={onAddToTicket}/>
            )}
        </div>
      </div> :
    
      <div>
        <Timeline step_bar_helper={step_bar_helper}/> 
        <Modifier modifier={active_modifier} onAddOption={onAddOption} onSelectOption={onSelectOption} onAddSelectedOption={onAddSelectedOption}/>
      </div>
    
    }
      

    </div>
  )
}

export default Chooser
