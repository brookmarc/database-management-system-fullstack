import React from 'react'
import {useMemo} from 'react'
import { observer } from 'mobx-react'
import styled from 'styled-components'
import TableLists from './tableLists'
import { getColumns } from './tableUtils'
import { useTableSearchByKey } from '../../../hooks/useTableSearch'
import CircularProgress from '@mui/material/CircularProgress';

const ShowDataLists = (props) => {
  const tablename = props.tablename
  const tableData = props.tablelists
  const tableColumns = props.fieldname
  const searchInputObj = props.searchInputObj
  const tableEnChData = props.tableEnChData

  const searchInput = searchInputObj.searchInput
  const optionField = searchInputObj.optionField

  const columnValue = useMemo(() => ({
    tableColumns
  }), [tableColumns])
  const col_tmp = Object.values(columnValue).slice(0, 1).[0]
  const tableName = tablename
  const column_tmp = ['o']
  const columnsData = (col_tmp !== tableName && col_tmp !== null) ? columnValue : column_tmp

  if (columnsData === null && col_tmp === tableName) {
     localStorage.removeItem('persist:root')
     setTimeout(() => {
       window.location.reload();
     }, 200)
  }

  // ------ Assembling the columns -------->
  const columns = (col_tmp !== tableName) ? getColumns(columnsData) : getColumns(['o'])
  
  const dataTemp = [{"o": "loading ..."}]
  const originalData = (tableData !== tablename && tableData !== null) ? tableData : dataTemp
  let totalDataLength
  if (originalData !== null && originalData !== undefined) {
    totalDataLength = originalData.length
  } else {
    totalDataLength = 0
  }


  const {filteredData} = useTableSearchByKey({
    originalData: originalData,
    searchValue: searchInput,
    searchKey: optionField
  })


  let dataArr = [], filteredDataLen = 0
  if (optionField !== "" && optionField !== undefined) {
    if (searchInput !== "" && searchInput !== undefined) {
      dataArr = filteredData
      filteredDataLen = filteredData.length
    } else {
      dataArr = originalData
    }
  } else {
    dataArr = originalData
  }


  return (
    <React.Fragment>
      <Styles>
	{col_tmp !== tableName && columnsData !== null ? (
	  <TableLists 
            columns = {columns}
            data = {dataArr}
	    totalLen = {totalDataLength}
	    filterLen = {filteredDataLen}
	    tableEnChData = {tableEnChData}
          /> 
	) : (
          <div className="circular-progress-box">
	    <div><p>Loading ...</p></div>
	    <div><CircularProgress /></div>
	  </div>
	)}
      </Styles>
    </React.Fragment>
  )
}

export default observer(ShowDataLists)


const Styles = styled.section`
  table {
    border-spacing: 0;
    border: none;
    width: 100%;
    background: #222;
    color: #fff;

    tr {
      th {
	background: #0e06ab;
        color: #c0c1c3;
        border-right: 1px dashed;
        border-bottom: 2px solid;
        font-family: "Roboto","Arial",sans-serif;
        font-weight: 550;
        font-size: 1.1rem;
	text-align: center;
	z-index: 1;
	position: relative;
      }
      :last-child {
        td {
	}
      }
      td {
        border-right: 1px dashed #cecccc;
	text-align: center;
	padding: .5rem;
        font-family: "Roboto","Arial",sans-serif;
        font-weight: 400;
	background: #fff;
        color: #000;
      }
    }

    .tr-row:hover {
      background: #dddbdb;
      color: #11012f;
    }


    th,
    td {
      margin: 0;
      font-family: Arial;
      border-bottom: 1px solid #625a5a;
      min-width: 2rem;

      :last-child {
        border-right: 0;
      }

      :nth-child(1) {
        width: 2.1rem;
        text-align: center;
      }

      input {
        font-size: 1rem;
	padding: 0;
	margin: 0;
	border: 0;
      }
    }
  }
  .tr-row {
    word-break: break-word;
  }
  .td-small-length {
    min-width: 2.5rem;
    max-width: 5rem;
  }
  .td-normal-length {
    min-width: 4.5rem;
    max-width: 7rem;
  }
  .td-middle-length {
    min-width: 4.5rem;
    max-width: 9rem;
  }
  .td-over-length {
    overflow: hidden;
    min-width: 4.5rem
    max-width: 12rem;
    word-break: break-word;
  }

  .table-checkbox {
    input{
      width: 1.2rem;
      height: 1.2rem;
    }
  }

  .head-th {
    .table-checkbox {
      padding-top: 1.2rem;
    }
  }

  .thead-sort {
    display: inline-block;
    margin-left: 10px;
  }

  .resizer {
    display: inline-block;
    width: 4px;
    height: 100%;
    position: absolute;
    right: 0;
    top: 0;
    transform: translate(50%)
    z-index: 1
    touch-action: none;
    &.isResizing {
      background: white;
    }
  }

  .pagination {
    font-family: Arial;
    font-size: 1.1rem;
    padding: 0.7rem;
    background: #fbfb00;
    color: #111;
    display: flex;
    .page-btn button {
      color: #292525;
      padding: .3rem;
      border: 1px solid #fbfb00;
      :hover {
        cursor: pointer;
      }
    }
    .page-index {
      margin: .6rem;
    }
    .page-num {
      margin: .5rem;
      input {
        height: 1.7rem;
	border-radius: .2rem;
	border: none;
	outline: none;
	padding-left: .7rem;
	background: #b1aeae;
	font-size: 1.0rem;
      }
    }
    .page-size {
      margin: .5rem;
      select {
        height: 1.7rem;
	padding-left: .7rem;
	border: none;
	font-size: 1.0rem;
	background: #362929;
	color: #e2e0e4;
	border-radius: .2rem;
	width: 7rem;
      }
    }
  }

  .page-rows-count {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
`

