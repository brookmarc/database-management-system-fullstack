import React from 'react'
import { OptCurrentField } from '../components'
import { InputField } from '../components/inputField'
import { SelectField } from '../components/selectField'

const AddOption = ({ inputs, handleChange, fieldList }) => {
  const OptKeyType = (keyType) => {
    return (
      keyType === "PRIMARY KEY" ? (
	<>{OptCurrentField(inputs, handleChange, fieldList)}</>
      ) : (
        keyType === "UNIQUE KEY" ? (
	  <>
	    <InputField 
              label="字段名字"
	      type="text"
	      name="fieldname"
	      value={inputs.fieldname}
	      onChange={handleChange}
	      required="required"
	      placeholder="比如: 字段1, 字段2, ..."
	    />
	  </>
	) : (
          keyType === "FOREIGN KEY" ? (
            <>
	      {OptCurrentField(inputs, handleChange, fieldList)}
	      <InputField
	        label="引用表格"
	        type="text"
	        name="refTbname"
	        value={inputs.refTbname}
	        onChange={handleChange}
	        required="required"
	        placeholder="输入你的 reference table"
	      />
	      <InputField 
                label="引用字段名字"
	        type="text"
	        name="fieldname2"
	        value={inputs.fieldname2}
	        onChange={handleChange}
	        required="required"
	        placeholder="输入引用表格字段reference field"
	      />
            </>                                  
	  ) : (<></>)
	)
      )
    )
  }

  return (
    <React.Fragment>
      <SelectField 
        label="Key值类型"
	name="keyType"
        value={inputs.keyType}
	onChange={handleChange}
	optList={{'UNIQUE KEY 唯一键': 'UNIQUE KEY', 'PRIMARY KEY 主键': 'PRIMARY KEY', 'FOREIGN KEY 外键': 'FOREIGN KEY'}}
      />
      {OptKeyType(inputs.keyType)}
    </React.Fragment>
  )
}


export default React.memo(AddOption)

