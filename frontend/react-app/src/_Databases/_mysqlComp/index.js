import React, {useEffect, useState} from 'react'
import { useMemo } from 'react'
import { inject, observer } from 'mobx-react'
import { tableStore } from './mst/tablemodelStore'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import ShowTables from './showtables'
import CreateNewTableBox from './createNewTable'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CloseIcon from '@mui/icons-material/Close';
import OptionMysqlDatabase from '../../components/widgets/optionMysqlDB'
import HeaderAction from './components/headerAction'
import './mysqlComp.scss'

const MysqlComp = ({mysqlStore}) => {
  useEffect(() => {mysqlStore.fetchMysqlDB()}, [mysqlStore])
  const [selectedMysqlDB, setSelectedMysqlDB ] = useState("")
  const currUser = useSelector(state => state.authState.loginStatus.currentUser)
  let accessLevel
  if (currUser) {
    accessLevel = currUser.access_level
  }

  // eslint-disable-next-line
  let optionDBObj = useMemo(() => ({}))
  optionDBObj['optionDatabase'] = selectedMysqlDB

  
  useEffect(() => {
    mysqlStore.setOptionMysqlDB(optionDBObj)
  }, [mysqlStore, optionDBObj])

  // fetch mysql table en-ch pair data 
  useEffect(() => {
    mysqlStore.fetchMysqlEnChPair(selectedMysqlDB)
  }, [mysqlStore, selectedMysqlDB])

  const [moreDBOpen, setMoreDBOpen] = useState(false)
  useEffect(() => {
    setTimeout(() => {tableStore.fetchTablesFn()}, 200)
  }, [selectedMysqlDB])
  
  const onMoreDBOpen = async e => {
    e.preventDefault()
    moreDBOpen === false ? (setMoreDBOpen(true)) : (
      setMoreDBOpen(false)
    )
  }
  const onMoreDBClose = async e => {
    e.preventDefault()
    await setTimeout(() => {setMoreDBOpen(false)}, 100)
    await setTimeout(() => {setSelectedMysqlDB("")}, 200)
  }


  const [tbname, setTbname] = useState({value: ""})
  const handleChange = e => {
    setTbname({value: e.target.value})
  }
  const sel_tbname = tbname.value

  const tables_list = tableStore.tableList
  const tablesArr = []
  tables_list.forEach(i => { tablesArr.push(i)})


  return (
    <React.Fragment>
      <Styles>
        <header className="table-hg">
	  <section className="hg-option-box">
	    <div className="more-db-option">
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
		        tableStore={tableStore}
		      />
		    </section>
		    <div 
		      onClick={onMoreDBClose}
		      className="more-option-close"
		    >
		      <CloseIcon />
		    </div>
		  </section>
		</>
	     )}
	    </div>
	    <div>
	      <form className="hg-tname">
	        <label className="select-label"></label>
	        {TableListOpt(tablesArr, tbname, handleChange)}
	      </form>
	    </div>
	  </section>
	  <section className="header-action-container">
	    <div className="hg-create">
              <CreateNewTableBox />
            </div>
	    <HeaderAction accessLevel={accessLevel} />
	  </section>
        </header>
	{sel_tbname !== "" ? (
	<>
          <section className="table-desc">
            <ShowTables 
	      tablename = {sel_tbname} 
	      setTbname = {setTbname} 
	      tablesArr = {tablesArr}
	      currMysqlDB = {selectedMysqlDB}
	    />
          </section>
	</> 
	) : (
          <>
	    <section className="mysql-no-data">
	      <div className="mysql-no-data-icon"><i><MoreHorizIcon /></i></div>
	      <div className="mysql-no-data-remark"><p>网络自动化运维MySQL数据库管理</p></div>
	      <div className="mysql-no-data-remark"><p>MYSQL DATABASE MANAGEMENT OF NETWORK AUTOMATIC MAINTENANCE</p></div>
	    </section>
	  </>
	)}
      </Styles>
    </React.Fragment>
  )
}

export default inject(({mysqlStore}) => ({mysqlStore}))(observer(MysqlComp))

const TableListOpt = (tablesArr, tbname,  handleChange) => {
  return (
    <React.StrictMode>
      <select
        className="table-list-opt"
        value={tbname.value}
        onChange={handleChange}
      >
        <option value="">---选择MySQL表格---</option>
        {tablesArr.map((tablename, i) => {
          return (
            <option value={tablename} key={i}>{tablename}</option>
         )
        })}
      </select>
    </React.StrictMode>
  )
}


const Styles = styled.section`
  .table-hg {
    background: #141313;
    padding: .3rem .5rem .3rem 0;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
  .hg-option-box {
    display: flex;
    flex-direction: row;
    align-items: center;
    .more-db-option {
      margin: 0 1.5rem 0 .5rem;
      .more-option-btn {
	color: #202020;
	background: #dfdcdc;
        display: flex;
	align-items: center;
	padding: .2rem .3rem;
	border-radius: .2rem;
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
  .select-label {
    font-family: Arial;
    color: #27b;
    font-size: 21px;
    font-weight: bold;
    padding-right: 8px;
  }
  .table-list-opt {
    width: 250px;
    height: 43px;
    padding-left: 18px;
    padding-right: 13px;
    font-size: 21px;
    font-family: Arial;
    background: #30231D;
    border: #50205D;
    color: #989;
    border-radius: 21px;
    outline: none;
  }
  .table-desc {
    //background: #dfdfe7;
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
  }
  .header-action-container {
    display: flex;
    flex-direaction: row;
    //color: #FFFFEB;
  }
`



