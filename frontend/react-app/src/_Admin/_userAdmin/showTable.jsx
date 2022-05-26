import React from 'react'
import { useMemo } from 'react'
import styled from 'styled-components'
import { observer } from 'mobx-react'
import { userStore } from './mst/userStore'
import { 
  useTable,
  usePagination,
  useRowSelect,
  useResizeColumns,
  useBlockLayout,
} from 'react-table'
import { IndeterminateCheckbox } from '../../components/reactTable/indeterminateCheckbox'
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import ResetPassword from './components/resetPassword'

const ACCESS = {
  0: "超级用户",
  1: "管理员",
  2: "普通用户"
}

const ShowTable = ({ userList }) => {
  
  const data = useMemo(() => userList, [userList])
  const columns = useMemo (() => [
    {
      Header: '姓名',
      accessor: 'fullname',
      _id: "fullname"
    },
    {
      Header: '用户名',
      accessor: 'username',
      _id: "username"
    },
    {
      Header: '用户等级',
      accessor: 'accesslevel',
      _id: "accesslevel"
    },
    {
      Header: '密码',
      accessor: 'password',
      _id: "password"
    },
  ], []);
  
  const defaultColumn = useMemo(
    () => ({
      minWidth: 190,
      maxWidth: 430,
    }),
    []
  )

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    //rows,
    prepareRow, //
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    selectedFlatRows, //
    state: {
      pageIndex, 
      pageSize, 
      //selectedRowIds
    },
    resetResizing,
  } = useTable(
    { 
      columns, 
      data,
      defaultColumn,
    },
    usePagination,
    useResizeColumns,
    useRowSelect,
    hooks => {
      hooks.visibleColumns.push(columns => [
        {
	  id: "selection",
	  Header: ({ getToggleAllPageRowsSelectedProps}) => (
            <div className="table-checkbox">
	      <IndeterminateCheckbox {...getToggleAllPageRowsSelectedProps()} />
	    </div>
	  ),
	  Cell: ({ row }) => (
            <div className="table-checkbox">
	      <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
	    </div>
	  ), 
	},
	...columns,
      ])
    },
   useBlockLayout,
  )

  const totalUsersLen = data.length

  const selectedRows = []
  selectedFlatRows.map(
    d => selectedRows.push(d.values)
  )
 
  const rowKeys = []
  selectedRows.map(
    data => rowKeys.push(data.username)
  )

  userStore.setUserKeys(rowKeys)

  const rowData = []
  let len = selectedRows.length
  if (len <= 1) {
    selectedRows.map(
      data => rowData.push(data)
    )
  }

  userStore.setUserData(rowData)
  

  return (
    <React.Fragment>
      <Showtable>
        <table {...getTableProps()} className="table">
          <thead className="thead">
            {headerGroups.map((headerGroup, i) => (
              <tr {...headerGroup.getHeaderGroupProps()} className="tr" key={i}>
                {headerGroup.headers.map((column, i) => (
                  <th {...column.getHeaderProps()} key={i} className="th">
            	    {column.render('Header')}
		    <div
		      {...column.getResizerProps()}
		      className={`resizer ${column.isResizing ? 'isResizing' : '' }`}
	              key={i}
		    ></div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()} className="tbody">
            {page.map((row, i) => {
              prepareRow(row);
	      const rows = row.values
              return (
                <tr {...row.getRowProps} className="tr" key={i}>
                  {row.cells.map((cell, i) => {
		    const header = cell.column.Header
                    return (
                      <td {...cell.getCellProps()} key={i} className="td">
            	        {header === "用户等级" ? (
			  <div
			    className={`access-level user-level-${cell.value}`}
			  ><p>{`${ACCESS[cell.value]}`}</p></div>
			) : (header === "密码" ? (
                          <>
			    <ResetPassword 
			      username = {rows["username"]}
			    />
			  </>
			) : cell.render('Cell'))}
                      </td>
            	     )
                  })}
                </tr>
              )
            })}
          </tbody>
        </table>
	<div className="pagination">
	  <section className="page-btn">
	    <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}><KeyboardDoubleArrowLeftIcon /></button>{' '}
	    <button onClick={() => previousPage()} disabled={!canPreviousPage}><KeyboardArrowLeftIcon /></button>{' '}
	    <button onClick={() => nextPage()} disabled={!canNextPage}><KeyboardArrowRightIcon /></button>{' '}
	    <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}><KeyboardDoubleArrowRightIcon /></button>{' '}
	  </section>
	  <section className="page-index">
	    <div>页面{' '}<strong>{pageIndex + 1} 共 {pageOptions.length}页</strong>{' '}</div> 
	  </section>
	  <section className="page-num">
	    <div>
	      | 跳转页面:{' '}
	      <input
	        type="number"
	        min='1'
	        defaultValue={pageIndex + 1}
	        onChange={e => {
                  const page = e.target.value ? Number(e.target.value) - 1 : 0
		  gotoPage(page)
		}}
	        style={{ width: '100px'}}
              />
	    </div>
	  </section>{' '}
	  <section className="page-size">
	    <select
	      value={pageSize}
	      onChange={e => {setPageSize(Number(e.target.value))}}
	    >
	      {[3, 5, 10, 20, 30, 50].map((pageSize, i) => (
                <option value={pageSize} key={i}>显示 {pageSize}行</option>
	      ))}
	    </select>
	  </section>
	  <div className="resize-btn">
	    <button onClick={resetResizing}>恢复初始宽度</button>
	  </div>
	  <div className="display-users-num">
	    <p>用户总数: {totalUsersLen}</p>
	  </div>
	</div>
	<pre></pre>
      </Showtable>
    </React.Fragment>
  )
} 

export default observer(ShowTable);


const Showtable = styled.section`
  padding: .5rem 1.2rem 1.7rem 1.2rem;
  .table {
    margin: .5rem;
    border-spacing: 0;
    border: 1px solid #4b4b4d;
    .tr {
      :last-child {
        td {
          border-bottom: 0;
	}
      }
      td:first-child, th:first-child {
        width: 2.8rem !important;
      }
      th:first-child, th:last-child {
        .resizer {
          display: none;
	}
      }
    }
    th, td {
      padding: .7rem;
      border-right: 1px solid #574f51;
      position: relative;
      font-family: "Roboto","Arial",sans-serif;
      font-size: 1.2rem;
      font-weight: 400;
      :last-child {
        border-right: 0;
      }
    }
    .thead {
      background: #6c6c72;
      color: #edeef4;
      font-family: Arial;
    }
    td {
      display: flex;
      justify-content: center;
      align-items: center;
      .access-level {
        display: flex;
	justify-content: center;
	&:hover {
          cursor: default;
	}
      }
      .user-level-0 p {
        background: red;
	color: #fff;
	padding: 0 .3rem;
        border-radius: .3rem;
      }
      .user-level-1 p {
        background: yellow;
        color: #111;
	padding: 0 .3rem;
        border-radius: .3rem;
      }
      .user-level-2 p {
        background: blue;
	padding: 0 .3rem;
        border-radius: .3rem;
      }
    }
  }
  .table-checkbox {
    input {
      width: 1.1rem;
      height: 1.1rem;
    }
  }
  .resizer {
    display: inline-block;
    width: .3rem;
    height: 100%;
    position: absolute;
    right: 0;
    top: 0;
    transform: translateX(50%);
    z-index: 1;
    touch-action: none;
    &.isResizing {
      background: #7c7676;
    }
  }
  .pagination {
    font-family: Arial;
    font-size: 1.1rem;
    margin: 0.5rem 0;
    padding: 0.7rem;
    background: #37373a;
    display: flex;
    .page-btn {
      button {
        color: #292525;
	padding: .3rem;
	border: 1px solid #37373a;
	border-radius: 10%;
      }
      button:hover {
        cursor: pointer;
      }
    }
    .page-index {
      margin: .7rem;
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
	outline: none;
      }
    }
    .resize-btn {
      margin: .5rem 0 0 .9rem;
      button {
        background: #616162;
	color: #f3f2f2;
	font-size: .9rem;
	padding: .3rem;
	border: 1px solid #37373a;
	border-radius: .3rem;
	box-shadow: 1px 1px #2c2d33;
      }
      button:hover {
        cursor: pointer;
	background: #525258;
      }
    }
  }

  .reset-pwd-btn {
    button {
      background: #ddddd8;
      border-radius: .2rem;
      border: 1px solid #ddddd8;
      padding: 0 .3rem;
      &:hover {
        color: #12419a;
      }
    }
  }
  .display-users-num {
    display: flex;
    align-items: center;
    margin-left: .7rem;
  }

`

