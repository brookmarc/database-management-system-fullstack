import React from 'react'
import { InputField } from '../components/inputField'

const UpdateOption = ({inputs, handleChange}) => {
  return (
    <React.Fragment>
      <InputField 
        label="SET"
	type="text"
	name="setItems"
	value={inputs.setItems}
	onChange={handleChange}
	required="required"
	placeholder="例如: col1=value1, col2=value2, ..."
      />
      <InputField 
        label="WHERE (条件可选)"
	type="text"
	name="condition"
	value={inputs.condition}
	onChange={handleChange}
	placeholder="optional condition"
      />
    </React.Fragment>
  )
}

export default React.memo(UpdateOption)


