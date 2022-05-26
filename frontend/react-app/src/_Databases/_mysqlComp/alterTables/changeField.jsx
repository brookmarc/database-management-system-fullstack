import React from 'react'
import styled from "styled-components"
import { useForm } from '../hooks'
import { OptCurrentField, OptLengthInput, OptDataType, OptNullable, InputTextarea } from '../components'
import { InputField } from '../components/inputField'

const ChangeField = ({ tablename, fieldList }) => {
  const initialState = {cur_field: '', new_field: '', datatype: '', length: '', Null: '', extra: ''}
  const { inputs, handleChange, onSubmitData } = useForm(initialState)

  const input_sql = `ALTER TABLE ${tablename} CHANGE ${inputs.cur_field} ${inputs.new_field} ${inputs.datatype}(${inputs.length}) ${inputs.Null} ${inputs.extra} `

  const input_obj = {}
  if (tablename.length !== 0) {
    input_obj['input_sql'] = input_sql
  }

  const handleSubmit = e => {
    e.preventDefault()
    try {
      onSubmitData(input_obj, initialState, tablename)
    } catch(e) {
      alert('submitted failed!')
    }
  }

  return (
    <React.Fragment>
      <Changefield>
	<form onSubmit={handleSubmit}  className="form-box">
	  <section className="input-container">
	    {OptCurrentField(inputs, handleChange, fieldList)}
	    <InputField
	      label="新字段名"
	      type="text"
	      name="new_field"
	      value={inputs.new_field}
	      onChange={handleChange}
	      required="required"
	    />
	    {OptDataType(inputs, handleChange)}
	    {OptLengthInput(inputs, handleChange)}
	    {OptNullable(inputs, handleChange)}
	    {InputTextarea(inputs, handleChange)}
	  </section>
	  <div className="input-btn">
	    <button>确认变更</button>
	  </div>
	</form>
      </Changefield>
    </React.Fragment>
  )
}

export default React.memo(ChangeField)

const Changefield = styled.section``

