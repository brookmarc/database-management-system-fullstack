import React from 'react'
import { useEffect } from 'react'
import { useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { fetchTablename } from '../../redux/actions/fetchdata.actions'
import { fetchdataFullfilled } from '../../redux/actions/fetchdata.actions'
import { fetchfields } from '../../redux/actions/fetchfields.actions'
import ShowDataLists from './showTables'
import ErrorIcon from '@mui/icons-material/Error';


const ShowTableData = props => {
  const mysqlStore = props.mysqlStore
  const tablename = props.tableName
  const searchInputObj = props.searchInputObj
  const tableData = useSelector(state => state.mainState.dataLists.tableLists)
  const fieldname = useSelector(state => state.mainState.dataLists.tableFields)
	
  const fieldEnChData = useMemo(() => mysqlStore.mysqlFieldEnCh, [mysqlStore.mysqlFieldEnCh])
  let tableEnChData = []
  if (fieldEnChData.length !== 0 && tablename !=="") {
    tableEnChData.push(fieldEnChData[0][tablename])
  }

  let isSuccess = true
  let error_code = null
  let error_message = ""
  if (tableData && tableData.isSuccess !== null) {
    isSuccess = tableData.isSuccess
    if (tableData.code !== null && tableData.message !== "") {
      error_code = tableData.code
      error_message = tableData.message
    }
  }
  
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchTablename(tablename))
  }, [dispatch, tablename])

  useEffect(() => {
    dispatch(fetchdataFullfilled(tablename))
  }, [dispatch, tablename])

  useEffect(() => {
    dispatch(fetchfields(tablename))
  }, [dispatch, tablename])

  return (
    <Showtabledata>
      <React.Fragment>
	{tableData !== null && isSuccess !== false ? (
	<>
          <ShowDataLists 
            tablelists={tableData} 
            tablename={tablename} 
            fieldname={fieldname} 
            searchInputObj={searchInputObj}
	    tableEnChData={tableEnChData}
          />
	</>
	) : (
	 error_code !== null && error_message !== "" ? (
	    <>
	      <div className="error-remark-box">
	        <div>Error code: {`${tableData.code}`}</div>
	        <div className="error-msg-box">
	          <div className="error-msg-icon"><ErrorIcon /></div>
	          <div><p>{`${tableData.message}`}</p></div>
	        </div>
	      </div>
	    </>
	  ) : (
	    <>
	      <div className="error-remark-box">
		<p>There are maybe exist errors appear in current table!</p>
	      </div>
	    </>
	  )
	)}
      </React.Fragment>
    </Showtabledata>
  )
}

export default React.memo(ShowTableData)

const Showtabledata = styled.section``


