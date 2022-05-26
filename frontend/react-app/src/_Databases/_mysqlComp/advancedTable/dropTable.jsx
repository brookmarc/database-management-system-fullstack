import React from 'react'
import { SelectField } from '../components/selectField'

const DropTable = ({ inputs, handleChange, tableList }) => {
  return (
    <React.Fragment>
      <SelectField 
        label="需删除表格名称"
	name="sel_tbname"
	value={inputs.sel_tbname}
	onChange={handleChange}
	optList={tableList}
	required="required"
      />
    </React.Fragment>
  )
}

export default React.memo(DropTable)

