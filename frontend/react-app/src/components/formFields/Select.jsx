import React from "react";
import styled from 'styled-components'

const SelectField = props => {
  const {
    label = "",
    name,
    value,
    optionList,
    defaultValue,
    placeholder,
    handleChange,
    errorMessage,
    isValid,
    children,
    classes = {}
  } = props;

  const {inputContainer, inputForm, inputError} = classes

  let optionArr = []
  let isArr = Array.isArray(optionList)
  if (!isArr) {
    for (const [key, value] of Object.entries(optionList)) {
      optionArr.push(<option value={value} key={value}>{key}</option>)
    }
  } else {
    optionList.forEach(item => {
      optionArr.push(<option value={item}>{item}</option>)
    })
  }

  return (
    <React.StrictMode>
      <Selectfield className={inputContainer}>
	<label>{label}: </label>
	<div className={inputForm}>
	  <select 
	    name={name} 
	    value={value} 
	    defaultValue={defaultValue} 
	    placeholder={placeholder}
	    onChange={handleChange} 
	  >
	    {/*<option value=""></option>*/}
	    {optionArr}
	  </select>
          {children}
	</div>
	<div className={inputError}>
	  {errorMessage && !isValid && (
            <p>{errorMessage}</p>
	  )}
	</div>
      </Selectfield>
    </React.StrictMode>
  )
}

export default React.memo(SelectField)

const Selectfield = styled.div``

