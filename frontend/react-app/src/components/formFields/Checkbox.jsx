import React from "react";
import styled from 'styled-components'

const CheckboxField = props => {
  const {
    label,
    type,
    name,
    value,
    defaultValue,
    placeholder,
    handleChange,
    errorMessage,
    isValid,
    children,
    classes
  } = props;

  return (
    <React.StrictMode>
      <Inputfield>
	<label>{label}</label>
	<div>
	  <input 
	    type={type} 
	    name={name} 
	    value={value} 
	    defaultValue={defaultValue} 
	    placeholder={placeholder}
	    onChange={handleChange} 
	  />
          {children}
	</div>
	<div>
	  {errorMessage && !isValid && (
            <p>{errorMessage}</p>
	  )}
	</div>
      </Inputfield>
    </React.StrictMode>
  )
}

export default React.memo(InputField)

const Inputfield = styled.div``

