import React from 'react'
import styled from "styled-components"
import { useForm } from '../hooks'
import { OptCurrentField } from '../components'
import { InputField } from '../components/inputField'

const RenameField = ({ tablename, fieldList }) => {
  const initialState = {cur_field: '', new_field: ''}
  const {inputs, handleChange, onSubmitData} = useForm(initialState)

  const input_sql = `ALTER TABLE ${tablename} RENAME COLUMN ${inputs.cur_field} TO ${inputs.new_field}`

  const input_obj = {}
  if (tablename.length !== 0){
    input_obj['input_sql'] = input_sql
  }

  const handleSubmit = e => {
    e.preventDefault()
    try {
      onSubmitData(input_obj, initialState, tablename)
    } catch (e) {
      alert('Submitted failed')
    }
  }

  return (
    <React.Fragment>
      <Renamefield>
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
	  </section>
	  <div className="input-btn">
	    <button>确认提交</button>
	  </div>
	</form>
      </Renamefield>
    </React.Fragment>
  )
}

export default React.memo(RenameField)

const Renamefield = styled.section``

