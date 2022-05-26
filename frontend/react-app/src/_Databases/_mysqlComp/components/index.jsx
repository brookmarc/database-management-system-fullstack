import React from "react"
import { InputField } from './inputField'
import { SelectField } from './selectField'

export const OptCurrentField = (inputs, handleChange, fieldList) => {
  return (
    <React.StrictMode>
      <SelectField
	label="字段名"
	name="cur_field"
	value={inputs.cur_field}
	onChange={handleChange}
	optList={fieldList}
	required="required"
      />
    </React.StrictMode>
  )
}

export const OptLengthInput = (inputs, handleChange) => {
  return inputs.datatype !== 'VARCHAR' ? (<></>) : (
    <React.StrictMode>
      <InputField 
        label="长度"
	type="number"
	name="length"
	value={inputs.length}
	onChange={handleChange}
	required="required"
      />
    </React.StrictMode>
  )
}


export const OptDataType = (inputs, handleChange) => {
  const optList = {VARCHAR: 'VARCHAR', INTEGER: 'INTEGER', BIGINT: 'BIGINT', TEXT: 'TEXT', BOOLEAN: 'BOOLEAN', JSON: 'JSON', DATE: 'DATE', DATETIME: 'DATETIME'}

  return (
    <React.StrictMode>
      <SelectField
	label="数据类型"
	name="datatype"
	value={inputs.datatype}
	onChange={handleChange}
	optList={optList}
	required="required"
      />
    </React.StrictMode>
  )  
}


export const OptNullable = (inputs, handleChange) => {
  return (
    <React.StrictMode>
    <SelectField
      label="是否缺省值"
      name="Null"
      value={inputs.Null}
      onChange={handleChange}
      optList={{'可缺省值': 'NULL', '不可缺省值': 'NOT NULL'}}
    />
    </React.StrictMode>
  )
}


export const InputTextarea = (inputs, handleChange) => {
  return (
    <React.StrictMode>
    <InputField
      label="其他(可选)"
      type="textarea"
      name="extra"
      value={inputs.extra}
      onChange={handleChange}
      placeholder="例如: AUTO_INCREMENT"
    />
    </React.StrictMode>
  )
}

