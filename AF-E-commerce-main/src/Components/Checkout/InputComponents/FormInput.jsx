import React, { useState } from 'react'
import "./FormInput.scss"

const FormInput = (props) => {
    const {label,errorMessage, onChange , id, ...inputProps} = props;
    const [focused,setFocused] = useState(false)
    const handleFocus =(e)=>{
        setFocused(true);
    }
  return (
    <div className='formInput'>
      <label>{label}</label>
      <input {...inputProps} onChange={onChange} required="true" onBlur={handleFocus} focused={focused.toString()}/>
      <span className='errormessage'>{errorMessage}</span>
    </div>
  )
}

export default FormInput
