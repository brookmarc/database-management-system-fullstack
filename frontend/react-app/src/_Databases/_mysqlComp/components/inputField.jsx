import React from 'react'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';

export const InputField = (props) => {
  const {
    label = "",
    type,
    name,
    value,
    onChange,
    validate,
    placeholder,
    required,
    classes,
    isValid,
    errorMessage
  } = props


  return (
    <React.StrictMode>
      <div className={`input-form ${classes}`}>
        <label>{label}:</label>
	{type === "number" ? (
          <input 
	    min="1"
	    max="65535"
            type={type}
            name={name}
            value={value || ""}
            onChange={onChange}
            validate={validate}
            placeholder={placeholder}
	    required={required}
          />
	) : (type === "text" ? (
               <input
	         type={type}
	         name={name}
	         value={value || ""}
	         onChange={onChange}
	         validate={validate}
	         placeholder={placeholder}
	         required={required}
	       />
	    ) : (
              <textarea 
		name={name}
		value={value || ""}
		onChange={onChange}
		validate={validate}
		placeholder={placeholder}
	      />
	    )
	)}
	{ value === undefined || value.length === 0 ? ("") : (
            isValid === false ? (<i className="error-icon"><ErrorIcon /></i>) : (
	    isValid === true ? (<i className="right-icon"><CheckCircleIcon /></i>) : (""))) 
	}
        <p className="error-message" >{errorMessage}</p>
      </div>
    </React.StrictMode>
  )
}





