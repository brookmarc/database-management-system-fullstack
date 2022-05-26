import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import styled from 'styled-components'
import Select from 'react-select'
import { useSelector, useDispatch } from 'react-redux'
import { mysqlCRUDStore } from '../mst/mysqlCRUDStore'
import { 
  deleteItemByKeys,
  deleteItemClose
} from '../redux/actions/deletedata.actions'
import { fetchTablename } from '../redux/actions/fetchdata.actions'
import { WithKeyWhereFn, WithoutKeyWhereFn } from './utils'
import ErrorIcon from '@mui/icons-material/Error';


export const  DeleteItemForm = (props) => {
  const closeModal = props.closeModal
  const tableEnChData = props.tableEnChData

  function isArrEmpty(arr) {
    return (Array.isArray(arr) && arr.length === 0)
  }
  //function isStrEmpty(str) {
  //  return (!str || str.length === 0)
  //}
  
  const dispatch = useDispatch()

  let isDisabled = true

  const [uniqueKey, setUniqueKey] = useState()
  const handleUniqueKey = e => {
    e.preventDefault()
    setUniqueKey(e.target.value)
  }

  const initialMultiSelect = {selOption: []}
  const [multiSelect, setMultiSelect] = useState(initialMultiSelect)
  let multiSelFields = []

  const handleMultiOptChange = (multiSelect) => {
    setMultiSelect({multiSelect})
  }
  const multiSelArr = multiSelect.multiSelect

  if (multiSelArr !== undefined) {
    multiSelFields = []
    for (let data of multiSelArr) {
      multiSelFields.push(data.value)
    }
  }

  const tablename = useSelector(state => state.mainState.dataLists.tableName)
  const fieldname = useSelector(state => state.mainState.dataLists.tableFields)
  const selectedRowsData = useSelector(state => state.mainState.deleteData.selectMultiRows)
  const deleteStatus = useSelector(state => state.mainState.deleteData)
  const FieldList = !isArrEmpty(fieldname) ? (fieldname) : ([])

  const tbKeyList = mysqlCRUDStore.tableKeyList

  let tablePRIField = []
  let tableUNIField = []
  if (tbKeyList !== undefined) {
    for (let keyItem of tbKeyList) {
      if (keyItem.Key === 'PRI') {
        tablePRIField.push(keyItem.Field)
      } else if (keyItem.Key === 'UNI') {
        tableUNIField.push(keyItem.Field)
      }
    }
  }

  let currKeyField = ''
  let currKeyFieldArr = []
  if (tablePRIField.length !== 0 ) {
    currKeyField = tablePRIField[0]
    isDisabled = false
  } else if (tablePRIField.length === 0) {
    if (tableUNIField.length === 1) {
      currKeyField = tableUNIField[0]
      isDisabled = false
    } else if (tableUNIField.length > 1) {
      currKeyFieldArr = tableUNIField
    }
  }
	
  const keyFieldsOption = (keyFields) => {
    let keyFieldsOpt = []
    if (keyFields.length > 1) {
      keyFields.forEach((keyField, i) => 
        keyFieldsOpt.push(
          <option value={keyField} key={i}>
	    {tableEnChData.length !== 0 && 
	      tableEnChData[0] !== undefined ? (
                tableEnChData[0][keyField] !== undefined &&
		  tableEnChData[0][keyField] !== "" ? (
                  tableEnChData[0][keyField]
		) : ( keyField )
	      ) : ( keyField )}
	  </option>
        )
      )
    }
    return keyFieldsOpt
  }

  
  let selectedKeyDatas = []
  let positionKey = ''
  if ( currKeyFieldArr.length === 0) {
    positionKey = currKeyField
    for (let keyObj of selectedRowsData) {
      selectedKeyDatas.push(keyObj[`${currKeyField}`])
    }
  } else if (currKeyFieldArr.length !== 0) {
     positionKey = uniqueKey
     for (let keyObj of selectedRowsData) {
       selectedKeyDatas.push(keyObj[`${uniqueKey}`])
     }
  }


  const withKeyWhereStr = WithKeyWhereFn(positionKey)(selectedKeyDatas)
  const withoutKeyWhereStr = WithoutKeyWhereFn(multiSelFields, selectedRowsData)()


  const whereString = !isArrEmpty(tbKeyList) ? (
    withKeyWhereStr
  ) : (withoutKeyWhereStr)
  
  
  // --- DISPLAY SELECTED DATA --->
  let showSelectedKeyDatas = []
  if (selectedKeyDatas.length !== 0) {
    selectedKeyDatas.forEach((keyData, i) => 
      showSelectedKeyDatas.push(<em key={i}>{`${keyData}`}</em>)
    )
  }
  

  // =>>>=||-- CREATE OPTION MULTI SELECT KEYS --->
  const createMultiSelectKeys = (fieldArr) => {
    let optionList = []
    if (Array.isArray(fieldArr) && fieldArr.length !== 0) {
      optionList = []
      for (let i=0; i<fieldArr.length; i++) {
        let optItemObj = {}
	optItemObj['value'] = fieldArr[i]
	optItemObj['label'] = tableEnChData.length !== 0 &&
          tableEnChData[0] !== undefined ? (
            tableEnChData[0][fieldArr[i]] !== undefined &&
	      tableEnChData[0][fieldArr[i]] !== "" ? (
              tableEnChData[0][fieldArr[i]]
	    ) : ( fieldArr[i] )
	  ) : ( fieldArr[i] )
	optionList[i] = optItemObj
      }
    }

    return (
      <>
	<section className="multi-select-box" style={{color: 'black'}}>
	  <Select
	    options = {optionList}
	    value = {multiSelect.selOption}
	    onChange = {handleMultiOptChange}
	    isMulti
	    required
	  />
	</section>
      </>
    )
  }

  // ---------------------------------------->
  let error_code = null
  let error_msg = ""
  let is_deleted = false
  if (deleteStatus.responseData !== undefined &&
       deleteStatus.responseData !== null
  ) {
    if (deleteStatus.isLoading === false &&
         deleteStatus.responseData.isSuccess === true
    ) {
      is_deleted = true
    } else {
      error_code = deleteStatus.responseData.code
      error_msg = deleteStatus.responseData.message
      is_deleted = false
    }
  }


  useEffect(() => {
    if (is_deleted === true) {
      setTimeout(() => {
        dispatch(fetchTablename(tablename))
      }, 10)
      setTimeout(() => {
        dispatch(deleteItemClose({}))
      }, 30)
      setTimeout(() => {
        closeModal()
      }, 50)
    }
  }, [is_deleted, tablename, dispatch, closeModal])

  // <----------------- END -------------------
  
  let REMARK_MESSAGE = '*请选择其中任意一个字段进行数据删除！'
  if (isArrEmpty(tbKeyList) && !isArrEmpty(multiSelFields)) {
    isDisabled = false
  }
  if (isArrEmpty(tablePRIField) && selectedKeyDatas[0] !== undefined) {
    isDisabled = false
  }
  

  const onhandleDelete = async e => {
    e.preventDefault()
    if (window.confirm("你确定删除这些数据记录吗...?")) {
      let deleteObj = {}

      try {
	deleteObj = {}
        await setTimeout(() => {
          deleteObj['tablename'] = tablename
	  deleteObj['whereCondition'] = whereString
	}, 100)
	await setTimeout(() => {
          dispatch(deleteItemByKeys(deleteObj))
	}, 200)
      } catch (error) {
        console.error('Failed to delete!')
      }
    }
  }


  return (
    <React.Fragment>
      <Styles>
        <div className="del-item-container" >
	  {!isArrEmpty(selectedRowsData) ? (
            <section className="del-content-box" >
              <header className="del-content-header">
                <h3>你确定需要删除以下选中的数据记录吗?</h3>
              </header>
	      <main className="del-content-main">
		<div className="del-content-info">
                  <div className="del-info-tbname">
		    <p>当前表格:</p> 
		    <strong>{tablename}</strong>
		  </div>
                  <div className="">
		   {selectedKeyDatas[0] !== undefined ? (
		     <div className="del-info-box">
		       <h3>以下是需要删除的数据记录:</h3> 
		       <div className="del-key-value">{showSelectedKeyDatas}</div>
		     </div>
		     ) : (
                     <div className="del-info-box">
		       <h3>此表格需要手动选择字段进行数据删除!</h3>
		     </div>
		   )} 
		  </div>
		</div>
		<div className="del-content-opt-box">
	          {tbKeyList.length !== 0 ? (
		    tablePRIField.length === 0 && tableUNIField.length > 1 ? (
	            <div className="del-content-option">
	              <select
	    	        value={uniqueKey}
	    	        onChange = {handleUniqueKey}
		        required
	    	      >
	                <option value="">请选择 ...</option>
	                {keyFieldsOption(currKeyFieldArr)}
	              </select>
		      { selectedKeyDatas[0] === undefined ? (
		        <div className="d-remark-box" style={{color: 'red'}}>
		          <p>{REMARK_MESSAGE}</p>
		        </div>
		      ) : null}
	            </div>
	          ) : (
	            <div style={{color: '#505062'}}>
	              <p>{`此表唯一关键值字段是: ${
	                   tableEnChData.length !== 0 && 
	                     tableEnChData[0] !== undefined ? (
                               tableEnChData[0][currKeyField] !== undefined &&
	                         tableEnChData[0][currKeyField] !== "" ? (
                                 tableEnChData[0][currKeyField]
	                       ) : ( currKeyField )
	                     ) : ( currKeyField )
		      }`}</p>
	            </div>
	          )) : (
	            <div>
	    	      {createMultiSelectKeys(FieldList)}
		      <div className="d-remark-box">
		      {isArrEmpty(multiSelFields) ? (
	                  <p style={{color: 'red'}}>* 请选择至少一位字段！</p>
	                ) : (
		  	multiSelFields.length < 2 ? (
                            <p style={{color: 'rgb(6, 186, 204)'}}>
		  	    Hi 老伙计! 如果你不能确保仅仅选择一位字段对应数据是唯一的,
		  	    请选择至少两位以上字段！ 
		  	  </p>
		          ) : null
		        )
		      }
		      </div>
                    </div>
	          ) }
		</div>
	      </main>
              <section className="cfm-btn-container">
                <div className="cfm-btn-box">
                  <button 
		    onClick={onhandleDelete}
		    disabled = {isDisabled}
		  >
		    <p>确认</p>
		  </button>
                </div>
              </section>
            </section>
	  ) : (
            <div className="empty-data-box">
              <p>Hi 老伙计! 当前无数据，请选择一条或多条记录进行数据删除!</p>
            </div>
	  )}
	</div>
	<>
	  {deleteStatus.responseData !== undefined &&
	    deleteStatus.responseData !== null &&
	     deleteStatus.isLoading === true &&
	      deleteStatus.responseData.isSuccess === false ? (
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


export default React.memo(DeleteItemForm)


const Styles = styled.section`
  .del-content-header {
    font-family: "Roboto", "Arial", sans-serif;
    h3 {
      font-size: 1.4rem;
      font-weight: 600;
      color: #6d6e70;
    }
  }
  .del-content-opt-box {
    .del-content-option select {
      font-family: "Roboto", "Arial", sans-serif;
      font-size: 1.2rem;
      width: 15rem;
      height: 2rem;
      outline: none;
    }
  }
  .del-content-info {
    .del-info-tbname {
      display: flex;
      p {
	color: #3f3f3d;
      }
      strong {
        margin-left: .2rem;
	color: blue;
      }
    }
    .del-info-box {
      h3 {
	font-size: 1rem;
	color: #3f3f3d;
	margin-bottom: .3rem;
      }
      .del-key-value {
        display: flex;
	flex-wrap: wrap;
        em {
	  background: #676764;
	  padding: .2rem .7rem;
	  margin: 0 .3rem;
	  border-radius: 1rem;
	  color: #fbf8f8;
	}
      }
    }
  }


`


