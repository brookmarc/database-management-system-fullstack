import React from 'react'
import { InputField } from '../components/inputField'
import { SelectField } from '../components/selectField'

const DropOption = ({ inputs, handleChange }) => {
  const OptDropType = (dropType) => {
    return (
      dropType === "" ? (<></>) : ( 
        dropType === "PRIMARY KEY" ? (<></>) : (
          <>
            <InputField 
              label="删除对象"
              type="text"
              name="indexName"
              value={inputs.indexName}
              onChange={handleChange}
              required="required"
              placeholder="输入index索引或key键值"
            />
          </>
	)
      )
    )
  }

  return (
    <React.Fragment>
      <SelectField 
	label="删除类型"
	name="dropType"
	value={inputs.dropType}
	onChange={handleChange}
	optList={{'INDEX索引': 'INDEX', 'PRIMARY KEY主键': 'PRIMARY KEY', 'FOREIGN KEY外键': 'FOREIGN KEY'}}
      />
      {OptDropType(inputs.dropType)} 
    </React.Fragment>
  )
}

export default React.memo(DropOption)


