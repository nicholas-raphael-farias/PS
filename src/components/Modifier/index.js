import React from 'react'
import ModifierBtn from './../ModifierBtn'
import ModifierSelect from './../ModifierSelect'



const OptionalModifierBtn = ({modifier_name, options, onAddSelectedOption}) => {
  return(
    <div className="btn btn-dark" style={{position:"absolute", bottom:"40px", right:"40px"}}
    onClick={()=> onAddSelectedOption(options, modifier_name)}>
        Continuar
    </div>
  )
}


const Modifier = ({modifier, onAddOption, onSelectOption, onAddSelectedOption}) => {

  return (
    <div className="row"> 
      <div className="col-12">
        {modifier.name}
      </div>
      <div className="col-12" style={{display:'flex', flexWrap:'wrap', justifyContent:'center'}}>
        {modifier.options.map(o => {
          if(!modifier.is_optional){
            return(<ModifierBtn option={o} modifier_name={modifier.name} onAddOption={onAddOption}/>)
          } else {
           return(<ModifierSelect option={o} modifier_name={modifier.name} onSelectOption={onSelectOption}/>) 
          }
        })}
      </div>
      {modifier.is_optional ? <OptionalModifierBtn onAddSelectedOption={onAddSelectedOption} modifier_name={modifier.name} options={modifier.options}/> : null}
    </div>
  )
}

export default Modifier
