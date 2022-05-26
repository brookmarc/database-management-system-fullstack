import React from 'react'
import styled from "styled-components"
import { useForm } from '../hooks'
import { OptCurrentField } from '../components'

const DropField = ({ tablename, fieldList }) => {

  const initialState = {cur_field: ''}
  const {inputs, handleChange, onSubmitData} = useForm(initialState)

  const input_sql = `ALTER TABLE ${tablename} DROP COLUMN ${inputs.cur_field}`

  const input_obj = {}
  if (tablename.length !== 0){
    input_obj['input_sql'] = input_sql
  }

  const handleSubmit = e => {
    e.preventDefault()
    try {
      onSubmitData(input_obj, initialState, tablename)
    } catch(e) {
      alert('Submitted failed')
    }
  }

  return (
    <React.Fragment>
      <Dropfield>
	<form onSubmit={handleSubmit} className="form-box">
	  <section className="input-container">
	    {OptCurrentField(inputs, handleChange, fieldList)}
	  </section>
	  <div className="input-btn">
            <button>确认提交</button>
	  </div>
	</form>
      </Dropfield>
    </React.Fragment>
  )
}

export default React.memo(DropField)

const Dropfield = styled.section``

