import React from 'react'

const ModifierSelect = ({option, modifier_name, onSelectOption}) => {
  return (
    <div 
      className={option.is_selected ? "btn btn-dark" : "btn btn-dark disabled"}
      onClick={() => onSelectOption(option, modifier_name)}
      >{option.name}</div>
  )
}

export default ModifierSelect
