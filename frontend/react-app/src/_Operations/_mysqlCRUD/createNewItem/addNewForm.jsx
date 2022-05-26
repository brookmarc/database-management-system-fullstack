import React from 'react'
import { useEffect } from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { 
  createNewItem,
  createItemClose
} from '../redux/actions/createdata.actions'
import { fetchTablename } from '../redux/actions/fetchdata.actions'
import { mysqlCRUDStore } from '../mst/mysqlCRUDStore'
import ErrorIcon from '@mui/icons-material/Error';

const AddNewForm = props => {
  const tbname = props.tablename
  const handleClose = props.closeModal
  const tableEnChData = props.tableEnChData
  const dispatch = useDispatch()
  const createStatus = useSelector(state => state.mainState.createData)

  const tbFeatures = mysqlCRUDStore.tableFeatures
  let tbFieldsArr = []
  if (tbFeatures !== undefined && tbFeatures !== null) {
    for (let item of tbFeatures) {
      tbFieldsArr.push(item)
    }
  }

  let error_code = null
  let error_msg = ""
  let is_created = false
  if (createStatus.responseData !== undefined && 
        createStatus.responseData !== null
  ) {
      if (createStatus.isLoading === false &&
           createStatus.responseData.isSuccess === true
      ) {
        is_created = true
      } else {
        error_code = createStatus.responseData.code
        error_msg = createStatus.responseData.message
	is_created = false
      }
  }

  useEffect(() => {
    if (is_created === true) {
      const fetchTb = setTimeout(() => {
        dispatch(fetchTablename(tbname))
      }, 10)
      setTimeout(() => {
        dispatch(createItemClose({}))
      }, 30)
      setTimeout(() => {
        handleClose()
      }, 50)
      return () => clearTimeout(fetchTb)
    }
  }, [is_created, dispatch, handleClose, tbname])


  let inputValues = {}
  let newAddObj = {}
  const onInputSubmit = async e => {
    e.preventDefault()
    if (window.confirm("Are you sure to add the new item?")) {
      Object.entries(e.target.elements).forEach(([name, input]) => {
        if (input.type !== 'submit') {
          inputValues[input.name] = input.value
        }
      })
      const newAddData = Object(inputValues)

      newAddObj = {}
      try {
        await setTimeout(() => {
          newAddObj['tablename'] = tbname
          newAddObj['inputData'] = newAddData
        }, 100)
        await setTimeout(() => {
          dispatch(createNewItem(newAddObj))
        }, 200)
      } catch (error) {
        console.error('Failed to submit!')
      }
    }
  }


  return (
    <React.Fragment>
    <Addnewform>
      <>
      <form onSubmit={onInputSubmit} className='add-new-form'>
	<section className="mutation-form-box">  
        {tbFieldsArr.length !== 0 ? (tbFieldsArr.map((item, i) => (
	  item.Extra !== "auto_increment" ? (
            <div key={i} className='add-new-box'>
              <div className='add-new-label'>
		<label htmlFor={`${item.Field}`}>
		  {tableEnChData.length !== 0 &&
		    tableEnChData[0] !== undefined ? (
                      tableEnChData[0][item.Field] !== undefined &&
			tableEnChData[0][item.Field] !== "" ? (
                        tableEnChData[0][item.Field]
		      ) : (item.Field)
		    ) : (item.Field)} : {
		      item["Null"].includes("NO") ||
			item["Type"].includes("date") ? (
			  <span style={{color: "red"}}>*</span> ) : null
		    }
		</label>
	      </div>
	      <>
	      {!item["Type"].includes("text") ? (
                <input 
	          type={!item["Type"].includes("date") ? "text" : "date"} 
	          name={`${item.Field}`}  
                  className='add-new-input'
	          required={item["Null"].includes("NO") ||
		    item["Type"].includes("date") ? true : false}
	          placeholder={`请输入你的${
		    tableEnChData.length !== 0 &&
		      tableEnChData[0] !== undefined ? (
                        tableEnChData[0][item.Field] !== undefined &&
			  tableEnChData[0][item.Field] !== "" ? (
                            tableEnChData[0][item.Field]
			  ) : (item.Field)
		      ) : (item.Field)}`} 
                /> ) : (
                <textarea
		  name={`${item.Field}`}  
                  className='add-new-input'
		  required={item["Null"].includes("NO") ? true : false}
		  placeholder={`请输入你的 ${
		    tableEnChData.length !== 0 &&
		      tableEnChData[0] !== undefined ? (
                        tableEnChData[0][item.Field] !== undefined &&
			  tableEnChData[0][item.Field] !== "" ? (
                            tableEnChData[0][item.Field]
			  ) : (item.Field)
		      ) : (item.Field)}`} 
		/>
	      )}
              </>
            </div>
	    ) : null
          )) ) : (
            <div><p>没有数据，请检查是否没有选中表格!</p></div>
	  )}
	  </section>
          <button variant="contained" className='add-new-btn'>确认提交</button>
      </form>
      </>
      <>
      {createStatus.responseData !== undefined && 
	 createStatus.responseData !== null &&
	   createStatus.isLoading === true &&
	     createStatus.responseData.isSuccess === false ? (
	 <div className="error-remark-box">
	   <div><p>Error code: {`${error_code}`}</p></div>
	   <div className="error-msg-box">
	     <div className="error-msg-icon"><ErrorIcon /></div>
	     <div><p>{`${error_msg}`}</p></div>
	   </div>
	 </div>
      ) : null}
      </>
    </Addnewform>
    </React.Fragment>
  )
}

export default React.memo(AddNewForm)


const Addnewform = styled.div`
  .add-new-form{
    margin: 3px 0 3px 23px;
    .add-new-box {
      margin-top: 7px;
      display: flex;
      .add-new-label {
        width: 180px;
        padding-top: 3px;
        padding-left: 9px;
	font-size: 18px;
	font-family: Arial;
	//color: #305050;
	color: #082d9a;
      }
    }
    .add-new-input{
      outline: none;
      width: 670px;
      height: 35px;
      padding-left: 13px;
      font-size: 17px;
      color: #02050e;
    }
    .add-new-btn{
      width: 95%;
      border-radius: 22px;
      margin-top: 25px;
      margin-left: 9px;
      background: #193ca5;
      color: #dcd6d6;
      padding: 7px 25px;
      text-align: center;
      text-decoration: none;
      display: inline-block;
      font-size: 17px;
      border: none;
      outline: none;
    }
    .add-new-btn:hover {
      background: #4c67b7;
      cursor: pointer;
    }
  }
  .mutation-form-box {
    max-height: 26.8rem;
    overflow: auto;
  }
`
