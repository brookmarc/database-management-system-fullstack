import React from 'react'
import {useEffect} from 'react'
import styled from 'styled-components'
import { observer } from 'mobx-react'
import { inject } from 'mobx-react'
import { tableStore } from '../mst/tablemodelStore'
import { useForm, useNestedForm } from '../hooks'
import { InputField } from '../components/inputField'
import { SelectField } from '../components/selectField'
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';



const CreateInputSql = async(nestedInputs) => {
  const sqlArr = []
  for (let obj of nestedInputs) {
    let sqlItem = ""
    obj.datatype === 'VARCHAR' ? (
      sqlItem = `${obj.field} ${obj.datatype}(${obj.length}) ${obj.Null} ${obj.extra}`
      ) : (
        sqlItem = `${obj.field} ${obj.datatype} ${obj.Null} ${obj.extra}`
      )
    let sqlString = sqlItem.replaceAll("undefined", "")
    //let sqlString = sqlItem.replace("undefined", "")
    sqlArr.push(sqlString)
  }
  const fieldList = sqlArr.join(', ')

  return fieldList
}



const CreateTableInput = ({ closeModal, mysqlStore }) => {
  useEffect(() => {mysqlStore.fetchTableName()}, [mysqlStore])

  const tablesArr = []
  tableStore.tableList.forEach(i => {
    tablesArr.push(i)
  })

  const initialState = [{}]
  const { inputs, setInputs, handleChange } = useForm({})
  const { nestedInputs, setNestedInputs,  onhandleChange, handleSubmitData } = useNestedForm(initialState)
  
  const input_tbname = inputs.new_tbname
 
  let isInclude
  let errorInputTbname = ""

  if (input_tbname === undefined) {
    errorInputTbname = ""
  } else if (tablesArr.includes(input_tbname)) {
    isInclude = false
    errorInputTbname = "Invalid input or same as current table name! "
  } else {
    isInclude = true
    errorInputTbname = ""
  }

  const input_obj = {}
  const input_sql = CreateInputSql(nestedInputs)
  input_obj['input_sql'] = input_sql
  input_obj['input_tbname'] = inputs.new_tbname

  let addForm = () => {
    setNestedInputs([...nestedInputs, {}])
  }

  let removeForm = (i) => {
    let newValues = [...nestedInputs]
    newValues.splice(i, 1)
    setNestedInputs(newValues)
  }

  let resetForm = () => {
    setInputs({})
    setNestedInputs(initialState)
  }

  let handleSubmit = async (e) => {
    e.preventDefault()
    try {
      handleSubmitData(input_obj, initialState, setInputs, closeModal, mysqlStore)
    } catch(e) {
      alert('Submitted failed!')
    }
  }

  return (
    <React.Fragment>
    <Addremoveform>
      <form onSubmit={handleSubmit}>
	<div className="input-tbname">
	  {InputTableName(inputs, handleChange, isInclude, errorInputTbname)}
	  <hr style={{backgroundColor: '#7a0909', color: '#7a0909', height: .5, opacity: 0.5}} />
	</div>
	{NestedInputForm(nestedInputs, onhandleChange, removeForm)}
	<section className="btn-container">
	  <div className="btn-add-box">
            <button 
	      className="btn-add" 
	      type="button" 
	      onClick={() => addForm()}
	    ><AddIcon /></button>
	  </div>
	  <div className="btn-section">
	    <button 
	      className="btn-submit" 
	      type="submit"
	    >提交</button>
	    <button 
	      className="btn-reset" 
	      type="button" 
	      onClick={() => resetForm()}
	    >重置</button>
	  </div>
	</section>
      </form>
    </Addremoveform>
    </React.Fragment>
  )
}

export default inject(({mysqlStore}) => ({mysqlStore}))(observer(CreateTableInput))


export const InputTableName = (inputs, handleChange, isInclude, errorInputTbname) => {
  return (
    <React.StrictMode>
     <InputField
       label="新表格名称"
       type="text"
       name="new_tbname"
       value={inputs.new_tbname}
       onChange={handleChange}
       required="required"
       placeholder="请输入一个新表格名称..."
       isValid={isInclude}
       errorMessage={errorInputTbname}
     />
    </React.StrictMode>
  )
}


export const NestedInputForm = (nestedInputs, onhandleChange, removeForm) => {
  return (
    <React.StrictMode>
     <section className='input-section'>
       {nestedInputs.map((element, index) => (
         <div className={`form-inline ${element.datatype === 'VARCHAR' ? 'input-var' : ''}`} key={index}>
           <InputField 
     	     label={`字段名 ${index+1}`}
     	     type="text"
     	     name="field"
     	     value={element.field}
     	     onChange={e => onhandleChange(index, e)}
     	     required="required"
           />
           <SelectField 
             label="数据类型"
     	     name="datatype"
     	     value={element.datatype}
     	     onChange={e => onhandleChange(index, e)}
     	     optList={{VARCHAR: 'VARCHAR', INTEGER: 'INTEGER', BIGINT: 'BIGINT', TEXT: 'TEXT', JSON: 'JSON', DATE: 'DATE', DATETIME: 'DATETIME'}}
     	     required="required"
           />
           {element.datatype === 'VARCHAR' ? (
             <InputField
       	       label="长度"
       	       type="number"
       	       name="length"
       	       value={element.length}
       	       onChange={e => onhandleChange(index, e)}
       	       required="required"
       	     />
           ) : ("")}
           <SelectField 
     	     label="是否缺省值"
     	     name="Null"
     	     value={element.Null}
     	     onChange={e => onhandleChange(index, e)}
     	     optList={{'NULL': 'NULL', 'NOT NULL': 'NOT NULL'}}
           />
           <InputField 
     	     label="其他(可选)"
	     classes="input-extra"
     	     type="text"
     	     name="extra"
     	     value={element.extra}
     	     onChange={e => onhandleChange(index, e)}
	     placeholder=""
           />
            {index ? 
                <button type="button" className="btn-remove"
                  onClick={() => removeForm(index)}
              ><RemoveIcon /></button> : null
            }
         </div>
       ))}
     </section>
    </React.StrictMode>
  )
}




const Addremoveform = styled.div`
  margin-left: 18px;
  * {box-sizing: border-box}
  .input-tbname {
    margin-bottom: 10px;
    margin-right: 27px;
    label {
      font-weight: bold;
      color: #3e69ab;
      font-size: 17px;
      font-family: Arial;
      position: relative;
      left: 15px;
    }
    input {
      font-size: 19px;
      color: #180505;
      margin: 3px 5px 3px 7px;
      padding: 7px 0 7px 21px;
      background-color: #f1f1f1;
      border: 1px solid #dcd8d8;
      border-radius: 3px;
      width: 30%;
      position: relative;
      left: 37px;
    }
    input:focus {
      width: 38%;
      outline: none;
      background: #dfdcdc;
      border: 1px solid #dfdcdc;
    }
  }
  .input-section {
    max-height: 26.8rem;
    overflow: auto;
    .form-inline {
      width: 62rem;
      display: flex;
      flex-flow: row wrap;
      align-items: center;
      .input-form {
        label {
          margin: 3px 5px 3px 0;
          font-size: 16px;
          font-family: Arial;
        }
        input {
          vertical-align: middle;
          padding: 5px;
          width: 150px;
	  outline: none;
        }
	input:focus {
	  background: #dfdcdc;
	  border: #dfdcdc;
	}
	input[type=number] {
          width: 80px;
	}
        select {
          width: 125px;
          height: 32px;
	  outline: none;
        }
	input, select {
          border-radius: 3px;
          background-color: #ded3d3;
          border: 1px solid #d3d4e2;
	  font-size: 16px;
	  font-family: Arial;
          margin: 3px 5px 3px 0;
	}
      }
      .input-extra {
	input:focus {
          width: 220px;
	}
      }
    }
    .input-var {
      width: 71rem;
    }
  }
  .btn-container {
    .btn-section {
      width: 180px;
      position: relative;
      left: 75%;
      .btn-submit {
        background-color: #3b4753;
	border: 1px solid #3b4753;
	color: white;
	font-size: 16px;
	padding: 9px 25px;
	border-radius: 3px;
	margin-bottom: 0.9rem;
	margin-right: 5px;
      }
      .btn-submit:hover{
        background-color: #476c90;
	cursor: pointer;
	border: 1px solid #476c90;
      }
      .btn-reset {
        border: none;
	background: none;
	color: #3c3c45;
	font-size: 19px;
	text-decoration: underline;
      }
      .btn-reset:hover {
        cursor: pointer;
	color: #12129c;
      }
    }
  }
  .btn-remove {
    padding: 2px 3px 0 3px; 
    color: #0313fc;
    background-color: rgb(230, 227, 227);
    border: none; 
    border-radius: 50%;
  }
  .btn-remove:hover {
    color: #f8f7f7;
    background-color: rgb(143, 138, 138);
    cursor: default;
  }
  .btn-add-box {
    width: 2.7rem;
    position: relative;
    left: 3%;
    bottom: 1%;
  }
  .btn-add {
    left:2000%;
    width: 1.8rem;
    height: 1.8rem;
    color: #faf9f7;
    background: #4b4bad;
    border: none; 
    border-radius: 50%;
    padding: .15rem 0 0 .1rem;
  }
  .btn-add:hover {
    background-color: rgb(25, 14, 119);
    cursor: default;
  }
  .input-form{
    .error-message, .error-icon { color: red; }
    .right-icon { color: blue; }
    .right-icon, .error-icon {
      position: absolute;
      padding: 11px 0 0 0;
    }
    .error-message {
      margin: 0 0 3px 0;
    }
  }
`

