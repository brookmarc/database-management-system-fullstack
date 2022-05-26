import React from 'react'
import { SelectField } from '../components/selectField'
import { InputField } from '../components/inputField'

const RenameTable = ({ inputs, handleChange, tableList }) => {
  return (
    <React.Fragment>
      <SelectField 
        label="需变更表格名称"
	name="sel_tbname"
	value={inputs.sel_tbname}
	onChange={handleChange}
	optList={tableList}
	required="required"
      />
      <InputField 
        label="新表格名称"
	type="text"
	name="new_tbname"
	value={inputs.new_tbname}
	onChange={handleChange}
	required="required"
	placeholder="输入新表格名称"
      />
    </React.Fragment>
  )
}

export default React.memo(RenameTable)

