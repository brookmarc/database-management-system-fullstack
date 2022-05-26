import React from "react";
import styled from 'styled-components'
import CheckIcon from '@mui/icons-material/Check';
import ErrorIcon from '@mui/icons-material/Error';

const InputField = props => {
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
    classes = {}
  } = props;


  const {inputContainer, inputForm, inputError} = classes

  return (
    <React.StrictMode>
      <Inputfield className={inputContainer}>
	<label>{label}: </label>
	<div className={inputForm}>
	  <input 
	    type={type} 
	    name={name} 
	    value={value} 
	    defaultValue={defaultValue} 
	    placeholder={placeholder}
	    onChange={handleChange} 
	  />
          {children}
	  <i className={`form-icon ${isValid ? 'valid-icon' : 'invalid-icon'}`}>
            {value !== "" ? (
              isValid ? <CheckIcon /> : <ErrorIcon />
	    ) : (null)}
	  </i>
	</div>
	<div className={inputError}>
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

