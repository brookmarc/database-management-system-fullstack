import React from 'react'
import styled from "styled-components"
import { useForm } from '../hooks'
import { 
  OptLengthInput, 
  OptDataType, 
  InputTextarea,
} from '../components'
import { InputField } from '../components/inputField'
import { SelectField } from '../components/selectField'

const AddNewfield = ({ tablename, fieldList }) => {
  const initialState = {field: '', datatype: '', length: '', Null: '', position: '', afterCol: '', extra: ''}
  const { inputs,  handleChange, onSubmitData } = useForm(initialState)

  const dataType = inputs['datatype']

  const input_obj = {}
  if (tablename.length !== 0) {
    const input_sql = CreateInputSql(dataType, tablename, inputs)
    input_obj['input_sql'] = input_sql
  }

  const handleSubmit = e => {
    e.preventDefault()
    try {
      onSubmitData(input_obj, initialState, tablename)
    } catch(e) {
      console.error('Submitted failed!')
    }
  }

  return (
    <React.Fragment>
      <Addnewfield>
	<form onSubmit={handleSubmit} className="form-box">
          <section className="input-container">
	    <InputField 
	      label="字段名"
	      type="text"
	      name="field"
	      value={inputs.field}
	      onChange={handleChange}
	      required="required"
	    />
	    {OptDataType(inputs, handleChange)}
	    {OptLengthInput(inputs, handleChange)}
	    <SelectField
	      label="是否缺省值"
	      name="Null"
	      value={inputs.Null}
	      onChange={handleChange}
	      optList={{'可缺省值': 'NULL', '不可缺省值': 'NOT NULL'}}
	    />
	    <SelectField
	      label="位置"
	      name="position"
	      value={inputs.position}
	      onChange={handleChange}
	      optList={{'之后': 'AFTER', '首位': 'FIRST'}}
	    />
	    {inputs.position === "AFTER" ? (
	      <SelectField
	        label="字段定位"
	        name="afterCol"
	        value={inputs.afterCol}
	        onChange={handleChange}
		optList={fieldList}
	        required="required"
	      />
	      ) : ("")
	    }
	    {InputTextarea(inputs, handleChange)}
	  </section>
	  <div className="input-btn">
            <button>确认提交</button>
	  </div>
	</form>
      </Addnewfield>
    </React.Fragment>
  )
}

export default React.memo(AddNewfield)


const CreateInputSql = (dataType, tablename, inputs) => {
  let input_sql = ""
  if (dataType !== 'VARCHAR') {
    input_sql = `ALTER TABLE ${tablename} ADD COLUMN ${inputs.field} ${inputs.datatype} ${inputs.Null} ${inputs.extra} ${inputs.position} ${inputs.afterCol}`
  } else {
    input_sql = `ALTER TABLE ${tablename} ADD COLUMN ${inputs.field} ${inputs.datatype}(${inputs.length}) ${inputs.Null} ${inputs.extra} ${inputs.position} ${inputs.afterCol}`
  }
  return input_sql
}


const Addnewfield = styled.section``

