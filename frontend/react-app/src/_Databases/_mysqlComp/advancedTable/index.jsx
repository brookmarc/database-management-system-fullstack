import React from 'react'
import styled from 'styled-components'
import { observer } from 'mobx-react'
import { inject } from 'mobx-react'
import { useForm } from '../hooks'
import { tableStore } from '../mst/tablemodelStore'
import DropOption from './dropOption'
import AddOption from './addOption'
import CreateIndex from './createIndex'
import UpdateOption from './updateOption'
import RenameTable from './renameTable'
import DropTable from './dropTable'


const AdvancedModifyTable = observer(({ tablename, setTbname, mysqlStore }) => {

  const tableModel = tableStore.tableModel
  let fieldArr = []
  tableModel.forEach(item => {
    fieldArr.push(item.Field)
  })

  const tablesArr = []
  tableStore.tableList.forEach(i => { tablesArr.push(i)})

  const initialState = {}
  const { inputs, handleChange, onSubmitData } = useForm(initialState)

  const actionType = inputs['actionType']

  const input_obj = {}

  if (actionType !== 'RENAME TO' && actionType !== 'DROP TABLE') {
    if (tablename.length !== 0) {
      const input_sql = CreateInputSql(actionType, tablename, inputs)
      input_obj['input_sql'] = input_sql
    }
  } else if (actionType === 'RENAME TO' || actionType === 'DROP TABLE') {
    const input_sql = CreateAlterTableSQL(inputs)
    input_obj['input_sql'] = input_sql
  }

  const handleSubmit = e => {
    e.preventDefault()
    try {
      onSubmitData(input_obj, initialState, tablename, actionType, setTbname, mysqlStore)
    } catch (e) {
      alert("Failed to submit!")
    }
  }


  const OptModifyType = (Type) => {
    switch (Type) {
      case 'ADD':
        return ( <><AddOption inputs={inputs} handleChange={handleChange} fieldList={fieldArr} /></> );
      case 'DROP':
        return ( <><DropOption inputs={inputs} handleChange={handleChange} fieldList={fieldArr} /></> );
      case 'CREATE INDEX':
        return ( <><CreateIndex inputs={inputs} handleChange={handleChange} /></> );
      case 'UPDATE':
        return ( <><UpdateOption inputs={inputs} handleChange={handleChange} /></> );
      case 'RENAME TO':
	return ( <><RenameTable inputs={inputs} handleChange={handleChange} tableList={tablesArr} mysqlStore={mysqlStore} /></>)
      case 'DROP TABLE':
	return ( <><DropTable inputs={inputs} handleChange={handleChange} tableList={tablesArr} mysqlStore={mysqlStore} /></> )
      default:
        return null
    }
  }

  return (
    <React.Fragment>
    <Advancedtable>
      <section>
	<div className="modify-header">
	  <h3>MySQL表格属性高级设置:</h3>
          <p>当前表格: <span className="header-em">{tablename}</span></p>
	</div>
	<section className="form-container">
	  <form onSubmit={handleSubmit} className="form-box">
	    <div className="input-form">
	      <label>设置类型:</label>
              <select 
	        required
	        name="actionType"
                value={inputs.actionType || ""}
	        onChange={handleChange}
	      >
                <option value="">请选择设置类型...</option>
                <option value="ADD">增加Key值</option>
                <option value="DROP">删除Key值或索引</option>
                <option value="CREATE INDEX">创建Index索引</option>
                <option value="UPDATE">更新数据</option>
                <option value="RENAME TO">表格重命名</option>
                <option value="DROP TABLE">删除表格</option>
	      </select>
	    </div>
	    {OptModifyType(inputs.actionType)}
	    <div className="input-btn">
              <button>确认提交</button>
	    </div>
	  </form>
	</section>
      </section>
    </Advancedtable>
    </React.Fragment>
  )
})

export default inject(({mysqlStore}) => ({mysqlStore}))(AdvancedModifyTable)


const CreateInputSql = (actionType, tablename, inputs) => {
  let input_sql = ""
  switch (actionType) {
    case 'ADD':
      if (inputs['keyType'] === 'PRIMARY KEY') {
        input_sql = `ALTER TABLE ${tablename} ${inputs.actionType} CONSTRAINT ${inputs.keyType} (${inputs.cur_field})`
      } else if (inputs['keyType'] === 'FOREIGN KEY') {
        input_sql = `ALTER TABLE ${tablename} ${inputs.actionType} CONSTRAINT ${inputs.keyType} (${inputs.cur_field}) REFERENCES ${inputs.refTbname} (${inputs.fieldname2})`
      } else {
        input_sql = `ALTER TABLE ${tablename} ${inputs.actionType} CONSTRAINT ${inputs.keyType} (${inputs.fieldname})`
      }
      return input_sql;
    case 'DROP':
      if (inputs['dropType'] !== 'PRIMARY KEY') {
        input_sql = `ALTER TABLE ${tablename} DROP ${inputs.dropType} ${inputs.indexName}`
      } else {
        input_sql = `ALTER TABLE ${tablename} DROP ${inputs.dropType}`
      }
      return input_sql;
    case 'CREATE INDEX':
      input_sql = `${inputs.actionType} ${inputs.indexName} ON ${tablename} (${inputs.fields})`
      return input_sql;
    case 'UPDATE':
      if (inputs['condition'] !== undefined){
        input_sql = `${inputs.actionType} ${tablename} SET ${inputs.setItems} WHERE ${inputs.condition}`
      } else {
        input_sql = `${inputs.actionType} ${tablename} SET ${inputs.setItems}`
      }
      return input_sql;
    case 'RENAME TO':
      input_sql = `ALTER TABLE ${inputs.sel_tbname} ${inputs.actionType} ${inputs.new_tbname}`
      return input_sql;
    case 'DROP TABLE':
      input_sql = `${inputs.actionType} ${inputs.sel_tbname}`
      return input_sql;
    default:
      return null;
  }
}

const CreateAlterTableSQL = (inputs) => {
  let input_sql = ""
  if (inputs.actionType === 'RENAME TO'){
    input_sql = `ALTER TABLE ${inputs.sel_tbname} ${inputs.actionType} ${inputs.new_tbname}`
  } else if (inputs.actionType === 'DROP TABLE') {
    input_sql = `${inputs.actionType} ${inputs.sel_tbname}`
  }
  return input_sql
}


const Advancedtable = styled.section`
  .form-container {
    margin: 20px 0 30px 0;
  }
  .modify-header {
    font-family: Arial;
    h3 {
      font-size: 19px;
      color: #caa3a3;
      font-weight: bold;
    }
    p {
      font-size: 15px;
      color: #7a6e6e;
      .header-em { color: #d7cbcb; }
    }
  }
  .input-form {
    margin: 5px 0 5px 0;
    label {
      color: #d7b6b6;
    }
    input {
      padding: 5px;
      font-family: Arial;
      font-size: 17px;
      background-color: #524d4d;
      border: 1px solid #4e4e53;
      vertical-align: middle;
      margin: 3px 5px 3px 10px;
      width: 300px;
      color: #eae5e5;
      border-radius: 3px;
    }
    select {
      width: 270px;
      height: 33px;
      font-family: Arial;
      font-size: 17px;
      color: #eae5e5;
      margin: 3px 5px 3px 10px;
      background-color: #524d4d;
      border: 1px solid #4e4e53;
      border-radius: 3px;
    }
  }
  .input-btn {
    button {
      padding: 8px 13px;
      background-color: #3b4753;
      border: 1px solid #3b4753;
      box-shadow: 1px 2px #441010;
      color: #dfd5d5;
      font-size: 17px;
    }
    button:hover {
      cursor: pointer;
      background-color: #2e3843;
      border: 1px solid #2e3843;
    }
  }
`

