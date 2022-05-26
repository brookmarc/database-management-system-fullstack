import React, {useEffect, useState} from 'react'
import { useCallback, useMemo } from 'react'
import styled from 'styled-components'
import { observer, inject } from 'mobx-react'
import { useSelector } from 'react-redux'
import { mysqlCRUDStore } from '../../mst/mysqlCRUDStore'
import ShowTableData from '../showTableData'
import CreateNewItemModal from '../../createNewItem'
import SearchItemBar from '../../searchItem'
import UpdateDataBox from '../../updateItem/updateItemModal'
import DeleteItemModal from '../../deleteItem'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CloseIcon from '@mui/icons-material/Close';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Skeleton from '@mui/material/Skeleton';
import OptionMysqlDatabase from '../../../../components/widgets/optionMysqlDB'


const SelectTable = ({mysqlStore}) => {
  const currUser = useSelector(state => state.authState.loginStatus.currentUser)
  let currAccessLevel
  if (currUser !== undefined && currUser !== null) {
    currAccessLevel = currUser.access_level
  }

  const tableData = useSelector(state => state.mainState.dataLists.tableLists)
  let isFetched = true
  if (tableData && tableData.isSuccess !== null) {
    isFetched = tableData.isSuccess
  } else {
    isFetched = true
  }

  const [searchInput, setSearchInput] = useState({})
  const [moreActionOpen, setMoreActionOpen] = useState(false)
  // --------- OPTION DATABASE WITH MOBX -----------
  useEffect(() => {mysqlStore.fetchMysqlDB()}, [mysqlStore])
  const [moreDBOpen, setMoreDBOpen] = useState(false)
  const [selectedMysqlDB, setSelectedMysqlDBFn] = useState("")
  const setSelectedMysqlDB = (data) => {
    setSelectedMysqlDBFn(data)
  }

  // eslint-disable-next-line
  let optionDBObj = useMemo(() => ({}))
  optionDBObj['optionDatabase'] = selectedMysqlDB

  useEffect(() => {
    mysqlStore.setOptionMysqlDB(optionDBObj)
  }, [mysqlStore, optionDBObj])

  // fetch table field en-ch pair data
  useEffect(() => {
    mysqlStore.fetchMysqlEnChPair(selectedMysqlDB)
  }, [mysqlStore, selectedMysqlDB])


  const onMoreDBOpen = async e => {
    e.preventDefault()
    moreDBOpen === false ? (setMoreDBOpen(true)) : (setMoreDBOpen(false))
  }
  const onMoreDBClose = async e => {
    e.preventDefault()
    await setTimeout(() => {setMoreDBOpen(false)}, 100)
    await setTimeout(() => {setSelectedMysqlDB("")}, 200)
  }

  // --------------------------------------
  const onMoreActionOpen = async e => {
    e.preventDefault()
    moreActionOpen === false ? (setMoreActionOpen(true)) : (
      setMoreActionOpen(false)
    )
  }
  const onMoreActionClose = async e => {
    e.preventDefault()
    await setTimeout(() => {setMoreActionOpen(false)}, 100)
  }

  const getSearchInputFn = useCallback((searchObj) => {
    setSearchInput(searchObj)
  }, [])

  useEffect(() => {
     setTimeout(() => {mysqlCRUDStore.fetchTablesFn()}, 200)
  }, [selectedMysqlDB])

  const tablesArr = []
  mysqlCRUDStore.tableList.forEach(i => {tablesArr.push(i)})

  useEffect(() => {mysqlStore.fetchTableName()}, [mysqlStore])

  const [tbname, setTbname] = React.useState({value: ''})
  const handleChange = e => {
    setTbname({value: e.target.value})
  }

  // +++++++++++++++++ handling fieldname with Mobx ++++++++++++++++
  let sel_tbname = ""
  if (tbname.value !== ""){
    sel_tbname = tbname.value
  }
  useEffect(() => {mysqlStore.fetchFieldname(sel_tbname)}, [mysqlStore, sel_tbname])

  useEffect(() => {
    if (sel_tbname !== ""){
      mysqlCRUDStore.fetchModelFields(sel_tbname)
    }
  }, [sel_tbname])

  const fieldEnChData = useMemo(() => 
    mysqlStore.mysqlFieldEnCh, 
    [mysqlStore.mysqlFieldEnCh])
  let tableEnChData = []
  if (fieldEnChData.length !== 0 && sel_tbname !== ""){
    tableEnChData.push(fieldEnChData[0][sel_tbname])
  }

  return (
    <React.Fragment>
    <Styles>
      <header className='mysql-crud-header-bar'>
	<section className="hg-option-box">
	  {currAccessLevel <= 1 ? (<div className="more-db-option">
	  <>
	    {moreDBOpen === false ? (
              <div className="more-option-btn" onClick={onMoreDBOpen}>
	        <p>更多数据库</p>
	        <MoreVertIcon />
	      </div>
	    ) : (
              <>
	        <section className="more-db-container">
	          <section className="more-db-box">
	    	    <OptionMysqlDatabase 
                      handleSelect={setSelectedMysqlDB}
	    	    />
	    	    <div
	    	      onClick={onMoreDBClose}
	    	      className="more-option-close"
	    	    >
	    	      <CloseIcon />
	    	    </div>
	          </section>
	        </section>
	      </>
	    )}
	  </>
	  </div>
	  ) : null }
	  <div>
            <form className='table-list-form' onSubmit={e => e.preventDefault()}>
	      {TableOptionList(tablesArr, tbname, handleChange)}
            </form>
	  </div>
	</section>
	{sel_tbname !== "" && isFetched !== false? (
	<>
	  <section>
	    <div className='table-search-bar'>
	      <SearchItemBar 
		tableEnChData={tableEnChData}
		getSearchInputFn={getSearchInputFn} 
	      />
	    </div>
	  </section>
	  
	  {moreActionOpen === false ? (
            <div className="mysql-more-action" onClick={onMoreActionOpen}>
	      <p>更多操作</p>
	      <MoreHorizIcon />
	    </div>
	  ) : (
	    <>
	    <section className="mysql-action-container">
	      <section className='mysql-action-bar'>
	        <div className='mysql-create-box'>
		  <CreateNewItemModal
		    tableEnChData={tableEnChData}
		  />
		</div>
	        <div className='mysql-update-box'>
		  <UpdateDataBox 
		    tableEnChData={tableEnChData}
		  />
		</div>
	        <div className='mysql-delete-box'>
		  <DeleteItemModal 
		    tableEnChData={tableEnChData}
		  />
		</div>
	      </section>
	      <div onClick={onMoreActionClose} className="mysql-more-close"><CloseIcon /></div>
	    </section>
	    </>
	  )}
	</>
	) : null }
      </header>
      {sel_tbname !== ""? (
       <>
         <ShowTableData 
	   tableName={sel_tbname} 
	   searchInputObj={searchInput}
	   mysqlStore={mysqlStore}
	 />
       </> 
      ) : (
	<>
	  <section className="mysql-no-data">
	    <div className="mysql-no-data-icon"><i><MoreHorizIcon /></i></div>
	    <div className="mysql-no-data-remark"><p>网络自动化运维MySQL数据库操作</p></div>
	    <div className="mysql-no-data-remark"><p>MYSQL DATABASE OPERATIONS OF NETWORK AUTOMATIC MAINTENANCE</p></div>
	    <div className="mysql-no-data-skele">
	      <Skeleton />
	      <Skeleton animation="wave" />
	      <Skeleton animation={false} />
	    </div>
	  </section>
	</>
      )}
    </Styles>
    </React.Fragment>
  )
}

export default inject(({mysqlStore}) => ({mysqlStore}))(observer(SelectTable))


const TableOptionList = (tablesArr, tbname, handleChange) => {
  let OptionList = []
  tablesArr.forEach((tbname, i) => {
    OptionList.push(<option value={tbname} key={i}>{tbname}</option>)
  })

  return (
    <React.StrictMode>
      <select
	className="table-list-opt"
	value={tbname.value}
	onChange={handleChange}
      >
        <option value="">---选择MySQL表格---</option>
	{OptionList}
      </select>
    </React.StrictMode>
  )
}



// =======================================
const Styles = styled.section`
  .table-list-opt{
    width: 250px;
    height: 39px;
    padding-left: 18px;
    padding-right: 13px;
    font-size: 21px;
    font-family: "Roboto","Arial",sans-serif;
    background: #30231D;
    border: 1px solid #30231D;
    color: #ccc;
    border-radius: 21px;
    outline: none;
  }
  .table-list-opt:hover {
    background: #222;
    cursor: pointer;
    color: #03aded;
  }
  .select-label {
    font-family: "Roboto","Arial",sans-serif;
    font-weight: 500;
    color: #8f9193;
    font-size: 21px;
    padding-right: 8px;
  }

    .mysql-action-bar {
      position: relative;
    }
  
  .mysql-more-action {
    height: 1.8rem;
    background: #c0bebe;
    color: #111;
    padding: .2rem .9rem;
    font-size: 1.2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: .3rem;
    //box-shadow: inset -1px -1px #84888c,inset 1px 1px #F0F0F0,inset -2px -2px #85898d,inset 2px 2px #dfdfdf !important;
    &:hover {
      cursor: default;
      background: #b2b0b0 !important;
      //box-shadow: inset -1px -1px #191b1e,inset 1px 1px #3F3131,inset -2px -2px #2a2c2e,inset 2px 2px #2c2727 !important;
    }
  }

  .mysql-action-container {
    display: flex;
    background: #fbfb00;
    padding: .2rem .3rem .2rem 1rem;
    border-radius: .3rem;
    position: relative;
    .mysql-more-close {
      color: #f8f8f9;
      top: -.6rem;
      position: absolute;
      left: -.6rem;
      svg { 
	background: #f15454;
	border-radius: 50%;
	height: 1rem;
	width: 1rem;
	padding: .13rem;
      }
    }
  }

  .mysql-no-data {
    height: 81vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .mysql-no-data-icon {
    i > svg {
        width: 20rem;
	height: 7rem;
	color: #aeaaaa;
      }
    }
    .mysql-no-data-remark {
      p {
        font-size: 1.9rem;
	color: #6c6969;
      }
    }
    .mysql-no-data-skele {
      width: 25rem;
    }
  }

  .hg-option-box {
    display: flex;
    flex-direction: row;
    align-items: center;
    .more-db-option {
      margin: 0 1.5rem 0 .5rem;
      .more-option-btn {
        color: #111;
	font-size: 1.2rem;
	background: #c0bebe;
	display: flex;
	align-items: center;
	padding: .2rem .3rem;
	border-radius: .3rem;
	box-shadow: inset -1px -1px #84888c,inset 1px 1px #F0F0F0,inset -2px -2px #85898d,inset 2px 2px #dfdfdf !important;
	&:hover {
          cursor: default;
	  background: #b7b5b5;
	}
      }
    }
  }
  .more-db-container {
    background: #fbfb00;
    display: flex;
    padding: .2rem 1.3rem .2rem 1rem;
    border-radius: .3rem;
    position: relative;
    .more-option-close {
      color: #f8f8f9;
      top: -.6rem;
      position: absolute;
      right: -.6rem;
      svg {
        background: #f15454;
        border-radius: 50%;
        height: 1rem;
        width: 1rem;
        padding: .13rem;
      }
    }
  }
  .mysql-no-data-remark p {
    color: #a09c9c !important;
  }
`

