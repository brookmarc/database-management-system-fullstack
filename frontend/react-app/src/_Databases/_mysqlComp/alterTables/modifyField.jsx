import React from 'react'
import styled from "styled-components"
import { useForm } from '../hooks'
import { OptCurrentField, OptLengthInput, OptDataType, OptNullable, InputTextarea } from '../components'

const ModifyField = ({ tablename, fieldList }) => {
  const initialState ={ cur_field: '', datatype: '', length: '', Null: '', extra: '' }
  const { inputs, handleChange, onSubmitData } = useForm(initialState)
  const input_sql = `ALTER TABLE ${tablename} MODIFY COLUMN ${inputs.cur_field} ${inputs.datatype}(${inputs.length}) ${inputs.Null} ${inputs.extra}`

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
      <Modifyfield>
	<form onSubmit={handleSubmit}  className="form-box">
          <section className="input-container">
	    {OptCurrentField(inputs, handleChange, fieldList)}
	    {OptDataType(inputs, handleChange)}
	    {OptLengthInput(inputs, handleChange)}
	    {OptNullable(inputs, handleChange)}
	    {InputTextarea(inputs, handleChange)}
	  </section>
	  <div className="input-btn">
            <button>确认提交</button>
	  </div>
	</form>
      </Modifyfield>
    </React.Fragment>
  )
}

export default React.memo(ModifyField)

const Modifyfield = styled.section``

