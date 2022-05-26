import React, { useEffect, useMemo } from 'react'
import { useDispatch } from 'react-redux'
import { selectRowData } from '../../../redux/actions/updateData.actions'
import { selectMultiRows } from '../../../redux/actions/deletedata.actions'

import { 
  useTable, 
  usePagination, 
  useResizeColumns, 
  //useBlockLayout,
  useRowSelect,
  //useGroupBy,
  //useGlobalFilter,
  //useFilters,
  useSortBy,
} from 'react-table'

import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import { IndeterminateCheckbox } from './indeterminateCheckbox'


const TableLists = ({ columns, data, totalLen, filterLen, tableEnChData }) => {
  const dispatch = useDispatch()

  const defaultColumn = useMemo(
    () => ({
      minWidth: 300,
      maxWidth: 700,
    }),
    []
  )

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page, // page for the table based on the data passed
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    selectedFlatRows,
    state: { 
      pageIndex, 
      pageSize, 
    },
  } = useTable (
    {
      columns,
      data,
      defaultColumn,
    },
    useSortBy,
    usePagination,
    useResizeColumns,
    //useBlockLayout,
    useRowSelect,
    hooks => {
      hooks.visibleColumns.push(columns => [
        // make a column for selection
        {
          id: 'selection',
          Header: ({ getToggleAllPageRowsSelectedProps }) => (
            <div className="table-checkbox">
              <IndeterminateCheckbox {...getToggleAllPageRowsSelectedProps()} />
            </div>
          ),
          // The cell can use the individual row's getToggleRowSelectedProps
          // method to the render a checkbox
          Cell: ({ row }) => (
            <div className="table-checkbox">
              <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
            </div>
          ),
        },
        ...columns,
      ])
    }
  )

  // eslint-disable-next-line
  const selectedRows = useMemo(() => ([]))
  selectedFlatRows.map(
    d => selectedRows.push(d.values)
  )


  useEffect(() => {
    dispatch(selectMultiRows(selectedRows))
  }, [dispatch, selectedRows])

  // eslint-disable-next-line
  const rowData = useMemo(() => ([]))
  let len = selectedRows.length
  if (len <= 1) {
    selectedRows.map(
      data => rowData.push(data)
    )
  }

  useEffect(() => {
    dispatch(selectRowData(rowData))
  }, [dispatch, rowData])


  return (
    <React.Fragment>
      <main>
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()} className="head-tr">
	        {headerGroup.headers.map((column, i) => {
		  return (
                  <th {...column.getHeaderProps(column.getSortByToggleProps())} className="head-th" key={i}>
		    {tableEnChData.length !== 0 && 
			    tableEnChData[0] !== undefined ? (
		      tableEnChData[0][column.Header] !== undefined &&
			tableEnChData[0][column.Header] !== ""? (
                        tableEnChData[0][column.Header]
		      ) : ( column.render('Header') )
		    ) : ( column.render('Header') )}
	            <div className="thead-sort">
                     {column.isSorted
                        ? column.isSortedDesc
			   ? <div>🔽</div> : <div>🔼</div>
			     : <div></div>
		     }
		    </div>
		    {<div
		      {...column.getResizerProps()}
		      className={`resizer ${column.isResizing ? 'isResizing' : ''}`}
		     ></div>
		    }
		  </th>
		)})}
	      </tr>
	    ))}
	  </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row, i) => {
              prepareRow(row)
	      return (
                <tr {...row.getRowProps()} className="tr-row">
                  {row.cells.map(cell => {
                    return (
		      <td 
		        {...cell.getCellProps()}
			className={cell.value !== undefined &&
			  cell.value !== null ? (
			    cell.value.length > 35 ? (
                              "td-over-length"
			    ) : ( cell.value.length > 15 ? (
                                "td-middle-length" 
			      ) : ( cell.value.length > 3 ? (
                                  "td-normal-length"
				) : ("td-small-length")
			      )
			    )
			  ) : ("")}
		      >
		        {cell.render('Cell')}
		      </td>
		    )
		  })}
		</tr>
	      )
	    })}
	  </tbody>
        </table>
	<section className="pagination">
	  <section className='page-btn'>
            <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}><KeyboardDoubleArrowLeftIcon /></button>{' '}
	    <button onClick={() => previousPage()} disabled={!canPreviousPage}><KeyboardArrowLeftIcon /></button>{' '}
	    <button onClick={() => nextPage()} disabled={!canNextPage}><KeyboardArrowRightIcon /></button>{' '}
	    <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}><KeyboardDoubleArrowRightIcon /></button>{' '}
	  </section>
	  <section className='page-index'>
            <div>页面{' '}<strong>{pageIndex + 1} 共 {pageOptions.length}</strong>页{' '}</div>
	  </section>
	  <section className='page-num'>
	    <div>
              | 跳转:{' '}
	      <input
                type="number"
	        min='1'
	        defaultValue={pageIndex + 1}
	        onChange={e => {
                  const page = e.target.value ? Number(e.target.value) - 1 : 0
	          gotoPage(page)
	        }}
	        style={{ width: '100px' }}
	      />
	    </div>
	  </section>{' '}
	  <section className='page-size'>
	    <select
              value={pageSize}
	      onChange={e => { setPageSize(Number(e.target.value)) }}
	    >
              {[5, 10, 20, 30, 40, 50, 100].map(pageSize => (
                <option key={pageSize} value={pageSize}>
                  显示 {pageSize}条
	        </option>
	      ))}
	    </select>
	  </section>
	  <section className="page-rows-count">
	    <div>
	     <p>总共数量 <strong>{`${totalLen}`}</strong> 行</p>
	    </div>
	    {filterLen !== 0 ? (<div>
	      <p>总共搜索数量: <strong>{`${filterLen}`}</strong> 行</p>
	    </div>) : null }
	  </section>
	</section>
      </main>
    </React.Fragment>
  )
}

export default React.memo(TableLists)
