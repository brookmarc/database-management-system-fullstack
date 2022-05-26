import React from 'react'
import { useState, useEffect } from 'react'
import { useRef } from 'react'
import {useSelector} from 'react-redux'
import styled from 'styled-components'
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import FilterListIcon from '@mui/icons-material/FilterList';
import SearchOffIcon from '@mui/icons-material/SearchOff';

const SearchItemForm = props => {
  const getSearchInputFn = props.getSearchInputFn
  const tableEnChData = props.tableEnChData

  const searchClose = props.onSearchClose

  function isArrEmpty(arr) {
    return (Array.isArray(arr) && arr.length === 0)
  }

  const offSearchRef = useRef()

  const [optValue, setOptValue] = useState("")
  const optionRef = useRef("")
  const [searchInput, setSearchInput] = useState("")
  const searchInputRef = useRef("")

  let searchInputObj = {} 

  const handleOptionChange = e => {
    e.preventDefault()
    setOptValue(e.target.value)
  }
  useEffect(() => {
    optionRef.current.value = optValue
  }, [optValue])
  const optFieldName = optionRef.current.value

  const handleInputChange = async e => {
    e.preventDefault()
    const _target = e.target.value
    if (_target !== "") {
      await setSearchInput(_target)
    } else {
      await getSearchInputFn(searchInputObj)
    }
  } 
  useEffect(() => {
    searchInputRef.current.value = searchInput
  }, [searchInput])
  const searchInputValue = searchInputRef.current.value

  const fieldname = useSelector(state => state.mainState.dataLists.tableFields)
  const FieldList = Array.isArray(fieldname) && !isArrEmpty(fieldname) ? (fieldname) : ([])

  let SearchOptList = []
  if (Array.isArray(FieldList) && !isArrEmpty(FieldList)){
    FieldList.forEach((opt, i) => {
      SearchOptList.push(
        <option value={opt} key={i}>
	  {tableEnChData.length !== 0 &&
	    tableEnChData[0] !== undefined ? (
              tableEnChData[0][opt] !== undefined &&
		tableEnChData[0][opt] !== "" ? (
                tableEnChData[0][opt]
	      ) : ( opt )
	    ) : ( opt )}
	</option>
      )
    })
  }

  const onhandleInputCancel = async e => {
    e.preventDefault()
    await setSearchInput("")
    await getSearchInputFn(searchInputObj)
  }

  const onSearchClose = async () => {
    await setSearchInput("")
    await getSearchInputFn(searchInputObj)
    await setTimeout(() => {
      searchClose(false)
    }, 200)
  }

  useEffect(() => {
    const offSearch = offSearchRef.current

    if (offSearchRef && offSearch) {
      //offSearchRef.current.addEventListener('click', onSearchClose)
      offSearch.addEventListener('click', onSearchClose)
    } 
    return () => {
      if (offSearchRef && offSearch) {
        offSearch.removeEventListener('click', onSearchClose)
      }
    }
  })

  const onhandleSearchSubmit = async e => {
    e.preventDefault()
    let searchInputObj = {}
    try {
      searchInputObj['optionField'] = optFieldName
      searchInputObj['searchInput'] = searchInputValue
      await getSearchInputFn(searchInputObj)
    } catch (error) {
      console.error('Failed to submit search value')
    }
  }

  return (
    <React.Fragment>
     <Styles>
       <form className="mysql-search-box" onSubmit={onhandleSearchSubmit}>
	 <section className="mysql-s-container">
	   <div className="mysql-s-opt">
	    <i><FilterListIcon /></i>
	    <select
	      className="mysql-select-box"
	      ref={optionRef}
	      value={optionRef.current.value}
	      onChange={handleOptionChange}
	    >
	     <option value="" disabled>选择字段</option>
	     {SearchOptList}
	    </select>
	  </div>
	   <input 
	     type="search"
	     placeholder={optFieldName !== "" && optFieldName !== undefined ? (
               "搜索 ..."
	     ) : ("请选择一个筛选字段 ...")}
	     className="mysql-s-input"
	     ref={searchInputRef}
	     value={searchInputRef.current.value}
	     onChange={handleInputChange}
	     disabled={optFieldName !== "" && optFieldName !== undefined ? false : true}
	   />
	   {searchInputValue !== undefined && searchInputValue !== "" ? (
	     <i className="search-input-cancel" onClick={onhandleInputCancel}>
	       <CloseIcon />
	     </i>
	    ) : null }
	   <div 
	     className="mysql-s-btn" 
	     title="Search"
	     onClick={onhandleSearchSubmit}
	   >
	     <i alt="search"><SearchIcon /></i>
	   </div>
	 </section>
	 <div
	   ref={offSearchRef}
	   className="mysql-s-close" 
	 >
	   <SearchOffIcon />
	 </div>
       </form>
     </Styles>
    </React.Fragment>
  )
}

export default React.memo(SearchItemForm)

const Styles = styled.section`
  .mysql-search-box {
    display: felx;
    flex-direction: row;
    position: relative;
    .mysql-s-container {
      display: flex;
      .mysql-s-input {
        height: 39px;
	width: 37rem;
	padding: 0 1.9rem 0 10rem;
	font-size: 1.3rem;
	outline: none;
	border: 1px solid black;
      }
      .search-input-cancel {
        position: absolute;
	right: 8.7rem;
	padding: .6rem 0 0 .3rem;
	color: #222;
	&:hover {
          color: #03aded;
	}
      }
      .mysql-s-btn {
        background: #222;
	width: 5rem;
	color: #eff0f1;
	display: flex;
	justify-content: center;
	align-items: center;
	i > svg {
          width: 1.9rem;
	  height: 1.9rem;
	}
	&:hover {
          color: #03aded;
	}
      }
    }
    .mysql-s-opt {
      position: absolute;
      .mysql-select-box {
	border: 1px solid #222;
        height: 39px;
        width: 9rem;
	background: #222;
	color: #FFFFEB;
	font-size: 1.3rem;
	padding-left: 1.5rem;
	outline: none;
	&:hover {
          color: #03aded;
	}
      }
      i {
        position: absolute;
	padding-top: .55rem;
	padding-left: .2rem;
	color: #ffffeb;
      }
    }
    .mysql-s-close {
      height: 39px;
      margin-left: .7rem;
      svg {
	color: #bbb8b8;
	width: 1.6rem;
	height: 1.6rem;
	border-radius: 50%;
	background: #373535;
	padding: .3rem;
	&:hover {
          color: #03aded;
	}
      }
    }
  }
`


