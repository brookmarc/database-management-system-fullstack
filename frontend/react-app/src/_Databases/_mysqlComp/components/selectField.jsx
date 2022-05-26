import React from 'react'

export const SelectField = (props) => {
  const {
    label = "",
    name,
    value,
    onChange,
    optList,
    placeholder,
    required
  } = props

  let optionList = []
  let isArr = Array.isArray(optList)
  if (!isArr) {
    for (const [key, value] of Object.entries(optList)) {
      optionList.push(<option value={value} key={value}>{key}</option>)
    }
  } else {
    optList.forEach((item, i) => {
      optionList.push(<option value={item} key={i}>{item}</option>)
    })
  }

  return (
    <React.StrictMode>
      <div className="input-form">
        <label>{label}:</label>
	<select 
          name={name}
	  value={value || ""}
	  onChange={onChange}
	  placeholder={placeholder}
	  required={required}
	>
	  <option value="">请选择...</option>
	  {optionList}
	</select>
      </div>
    </React.StrictMode>
  )
}




