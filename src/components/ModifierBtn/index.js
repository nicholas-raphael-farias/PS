import React from 'react'

const ModifierBtn = ({option, modifier_name, onAddOption}) => {
  return (
    <div className="btn btn-dark" onClick={() => onAddOption(option, modifier_name)}>{option.name}</div>
  )
}

export default ModifierBtn
