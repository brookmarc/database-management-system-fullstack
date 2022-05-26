import React from 'react'
import { InputField } from '../components/inputField'

const CreateIndex = ({ inputs, handleChange }) => {
  return (
    <React.Fragment>
      <InputField 
        label="Index索引名字"
	type="text"
	name="indexName"
	value={inputs.indexName}
	onChange={handleChange}
	placeholder="例如: idx_name"
      />
      <InputField 
        label="关联字段"
	type="text"
	name="fields"
	value={inputs.fields}
	onChange={handleChange}
	placeholder="例如: 字段1, 字段2, ..."
      />
    </React.Fragment>
  )
}

export default React.memo(CreateIndex)
