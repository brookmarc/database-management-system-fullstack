import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useMemo } from 'react'
import Select from 'react-select'
import { createWhereStrFn } from '../utils/createWhereStrFn'
import styled from 'styled-components'
import { observer } from 'mobx-react'
import { mysqlCRUDStore } from '../mst/mysqlCRUDStore'
import { useSelector, useDispatch } from 'react-redux'
import { 
  updateItemStart,
  updateItemClose
} from '../redux/actions/updateData.actions'
import { fetchTablename } from '../redux/actions/fetchdata.actions'
import ErrorIcon from '@mui/icons-material/Error';

const UpdateItemForm = props => {
  const handleClose = props.handleClose
  const tableEnChData = props.tableEnChData
  const initialMultiSelect = useMemo(() => ({selOption: []}), [])
  const [multiSelect, setMultiSelect] = useState(initialMultiSelect)
  let multiSelData = []
	
  function isArrEmpty(arr) {
    return (Array.isArray(arr) && arr.length === 0)
  }
  //function isStrEmpty(str) {
  //  return (!str || str.length === 0)
  //}

  const fieldname = useSelector(state => state.mainState.dataLists.tableFields)
  //console.log(fieldname)
  const updateStatus = useSelector(state => state.mainState.editData)
  
  const tbFeatures = mysqlCRUDStore.tableFeatures
  let tableFeaturesArr = []
  if (tbFeatures !== undefined && tbFeatures !== null) {
    for (let featureItem of tbFeatures) {
      tableFeaturesArr.push(featureItem)
    }
  }
  
  // ---------------------------------->
  const FieldList = !isArrEmpty(fieldname) ? ( fieldname) : ([])

  const tbKeyList = mysqlCRUDStore.tableKeyList
	
  let tableKeyArr = []
  if (tbKeyList !== undefined ) {
    tbKeyList.forEach(i => tableKeyArr.push(i))
  }

  // --- Start --->
  let itemKeyArr = []
  for (const itemKey of tableKeyArr) {
    itemKeyArr.push(itemKey.Field)
  }
  const IsItemKeyArrEmpty = isArrEmpty(itemKeyArr)

  const dispatch = useDispatch()
  const tablename = useSelector(state => state.mainState.dataLists.tableName)
  const editRowData = useSelector(state => state.mainState.editData.selectedRowData)
  const selectedData = editRowData[0]

  // --- END ---
  
  const editData = (selectedData !== undefined) ? selectedData : {}

  const whereStrFn = createWhereStrFn(editData)

  // ------- handle update data-------->
  const pairArr = Object.entries(editData)


  function createEditData(arr){
    function innerFn(fieldArr){
      for (let i in fieldArr) {
        if (fieldArr[i]['Field'] === arr[i][0]) {
           arr[i].push(fieldArr[i]['Type'])
           arr[i].push(fieldArr[i]['Extra'])
        }
      }
    }
    return innerFn
  }

  let edit_data = []
  if (Array.isArray(pairArr) && pairArr.length !== 0) {
    edit_data = createEditData(pairArr)(tableFeaturesArr)
  }

  const editdataArr = edit_data !== undefined ? edit_data : pairArr


  // ----- handle multi option change---->
  const handleMultiOptChange = (multiSelect) => {
    setMultiSelect({multiSelect})
  }
  
  const multiSelArr = multiSelect.multiSelect

  if (multiSelArr !== undefined) {
    multiSelData = []
    for (let data of multiSelArr) {
      multiSelData.push(data.value)
    }
  }
  // --- END ----


  // --- CREATE OPTION KEYS --->
  const createOptionKeys = (fieldArr) => {

    let optionList = []
    if (Array.isArray(fieldArr) && fieldArr.length !== 0) {
      optionList = []
      for (let i=0; i<fieldArr.length; i++){
        let optItemObj = {}
	optItemObj['value'] = fieldArr[i]
	optItemObj['label'] = tableEnChData.length !== 0 &&
	  tableEnChData[0] !== undefined ? (
            tableEnChData[0][fieldArr[i]] !== undefined &&
	      tableEnChData[0][fieldArr[i]] !== "" ? (
	      tableEnChData[0][fieldArr[i]]
	    ) : (fieldArr[i])
	  ) : (fieldArr[i])
	optionList[i] = optItemObj
      }
    }

    
    return (
      <>
        <section className="multi-select-box">
	  <Select 
	    options={optionList} 
	    value={multiSelect.selOption}
	    onChange={handleMultiOptChange}
	    isMulti
	  />
        </section>
      </>
    )
  }
  // --- END ---

  let error_code = null
  let error_msg = ""
  let is_updated = false
  if (updateStatus.responseData !== undefined &&
       updateStatus.responseData !== null
  ) {
    if (updateStatus.isLoading === false &&
         updateStatus.responseData.isSuccess === true 
    ) {
      is_updated = true
    } else {
      error_code = updateStatus.responseData.code
      error_msg = updateStatus.responseData.message
      is_updated = false
    }
  }



  //// eslint-disable-next-line
  useEffect(() => {
    if (is_updated === true) {
      setTimeout(() => {
	dispatch(fetchTablename(tablename))
      }, 10)
      setTimeout(() => {
	dispatch(updateItemClose({}))
      }, 30)
      setTimeout(() => {
	setMultiSelect(initialMultiSelect)
      }, 50)
      setTimeout(() => {
	handleClose()
      }, 70)
    }
    return () => {clearTimeout()}
  }, [is_updated, dispatch, handleClose, tablename, initialMultiSelect])

  // ------ handle Submit ------->
  let inputValues = {}
  //let submitObj = {}
  let multiAlertMessage = '此表格需要选择至少一个字段，请选择之后再提交确认！'
  let multiSuggestMessage = "Hi，老伙计!! 如果你不能确保仅仅选择一个字段对应的数据是唯一的，请选择至少两个及以上!"

  const onhandleSubmit = async e => {
    e.preventDefault()
    if (window.confirm("你是否确定提交...?")) {
      Object.entries(e.target.elements).forEach(([name, input]) => {
        if (input.type !== 'submit') {
          inputValues[input.name] = input.value
        }
      }) 
      const updateRowObj = Object(inputValues)
      
      let whereString = ''
      let submitObj = {}

      if (IsItemKeyArrEmpty === true){
        if (!isArrEmpty(multiSelData)) {
          whereString = await whereStrFn(multiSelData)
        }
      } else if (IsItemKeyArrEmpty === false) {
        whereString = await whereStrFn(itemKeyArr)
      }

      try {
        if (whereString === undefined || whereString.length === 0){
          alert ('条件选择不能为空！')
	} else {
	  submitObj = {}
	  await setTimeout(() => {
	    submitObj['tablename'] = tablename
	    submitObj['updateRowObj'] = updateRowObj
	    submitObj['whereCondition'] = whereString
	  }, 100)
	  await setTimeout(() => {
            dispatch(updateItemStart(submitObj))
	  }, 300)
	}
      } catch (error) {
        console.error('Failed to update item!')
      }
    }
  }
  // --- END ---


  return (
    <React.Fragment>
    <Styles>
      <>
      {!isArrEmpty(editdataArr) ? (
      <form onSubmit={onhandleSubmit} className='update-form-box'>
        <div className="form-curr-item">
	  <h3>当前表格: {tablename}</h3>
	</div>
	
	<section className="mutation-form-box">
	{editdataArr.map((field, i) => (
	  field[3] !== "auto_increment" ? (
            <div key={i} className="form-box">
              <div className="form-label">
	        <label htmlFor={`${field[0]}`}>
		  {tableEnChData.length !== 0 &&
		    tableEnChData[0] !== undefined ? (
		      tableEnChData[0][field[0]] !== undefined &&
			tableEnChData[0][field[0]] !== "" ? (
                        tableEnChData[0][field[0]]
		      ) : ( field[0] ) 
		    ) : ( field[0] )} :
		</label>
	      </div>
	      <>
	      {!field[2].includes("text") ? (
	        <input 
	          type={!field[2].includes("date") ? "text" : "date"} 
	          name={`${field[0]}`} 
	          className="form-input" 
		  required={field[2].includes("date") ? true : false}
	          defaultValue={`${field[1]}`}  
	        /> ) : (
                <textarea 
	          name={`${field[0]}`} 
	          className="form-input" 
	          defaultValue={`${field[1]}`}  
		/>
	      )}
	      </>
	    </div>
	  ) : null
	))}
	</section>

	<div className='edit-btn-container'>
          <button type="submit" className='sub-btn'>提交</button>
	</div>
      </form>
      ) : (
        <div className="empty-data-box">
	  <p>当前无数据，请选择一条需要更新的记录进行数据更新！</p>
	</div>
      )}
      </>
      {IsItemKeyArrEmpty === true && editdataArr.length !== 0 ? (
        <>
	  <div><p>条件选择:</p></div>
	  {createOptionKeys(FieldList)}
	  {isArrEmpty(multiSelData) ? (
	    <div style={{color: 'red'}}><p>{multiAlertMessage}</p></div>
	  ) : (multiSelData.length < 2 ? (
	     <div style={{color: 'blue'}}><p>{multiSuggestMessage}</p></div>
	    ) : (null))}
	</>
      ) : null  }
      <>
	{updateStatus.responseData !== undefined &&
	  updateStatus.responseData !== null &&
	   updateStatus.isLoading === true &&
	    updateStatus.responseData.isSuccess === false ? (
           <div className="error-remark-box">
	     <div><p>错误代码: {`${error_code}`}</p></div>
	     <div className="error-msg-box">
	       <div className="error-msg-icon"><ErrorIcon /></div>
	       <div><p>{`${error_msg}`}</p></div>
	     </div>
	   </div>
	 ) : null }
      </>
    </Styles>
    </React.Fragment>
  )
}

export default observer(UpdateItemForm)


const Styles = styled.section`
  .update-form-box {
    padding-top: .5rem;
    .form-box {
      display: flex;
      margin: 8px 0 8px 0;
      .form-label {
        width: 180px;
	padding-top: 3px;
	padding-left: 5px;
	font-size: 18px;
	font-family: Arial;
	color: #082d9a;
      }
      .form-input {
        width: 660px;
	outline: none;
	height: 35px;
	padding-left: 13px;
	font-size: 17px;
	color: #305090;
      }
    }
    .form-curr-item{
      padding-bottom: .5rem;
      padding-left: .5rem;
      color: #89a2c7;
      font-family: Arial;
    }
  }

  .edit-btn-container {
    margin: 15px 19px 5px 15px;
    .sub-btn{
      width: 91px;
      height: 35px;
      background: #2929a1;
      color: #dfe1db;
      font-size: 17px;
      border: none;
      border-radius: 5px;
    }
    .sub-btn:hover {
      background: #181881;
      cursor: pointer;
    }
    .cancel-btn {
      margin-left: 10px;
      border: none;
      background: none;
      font-size: 16px;
      color: #2929a1;
      text-decoration: underline;
    }
    .cancel-btn:hover {
      cursor: pointer;
      color: #281881;
    }
  }
  .multi-select-box {
  }
  .mutation-form-box {
    max-height: 26.8rem;
    overflow: auto;
  }
`

