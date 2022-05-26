import React from 'react'
import {useState} from 'react'
import styled from 'styled-components'
import SearchIcon from '@mui/icons-material/Search';
import SearchItemForm from './searchItemForm'

const SearchItemBar = (props) => {
  const getSearchInputFn = props.getSearchInputFn
  const tableEnChData = props.tableEnChData

  const [searchOpen, setSearchOpen] = useState(false)
 
  const handleSearchOpen = async e => {
    e.preventDefault()
    searchOpen === false ? (setSearchOpen(true)) : (
      setSearchOpen(false)
    )
  }

  return (
    <React.Fragment>
    <Styles>
      <main className="mysql-search-container">
	{searchOpen === false ? (
        <div className="s-btn-box">
	  <i className='s-btn-icon'><SearchIcon /></i>
	  <input 
            type="button"
	    value="通过字段搜索 ..."
	    className="search-btn"
	    onClick = {handleSearchOpen}
	  />
	</div>
	) : (
          <>
	    <SearchItemForm 
	      tableEnChData = {tableEnChData}
	      onSearchClose = {setSearchOpen}
	      getSearchInputFn = {getSearchInputFn}
	    />
	  </>
	)
	}
      </main>
    </Styles>
    </React.Fragment>
  )
}

export default React.memo(SearchItemBar)

const Styles = styled.div`
  .mysql-search-container{
    .s-btn-box{
      .search-btn{
        width: 100%;
	height: 39px;
	font-size: 21px;
	background: #D4D4D5;
	border: #50205D;
	color: #7e7373;
	border-radius: 21px;
	padding-left: 45px;
	padding-right: 2.7rem;
	outline: none;
      }
      .search-btn:hover{
        background: #BBBBBE;
      }
      .s-btn-icon{
        position: absolute;
	padding: 10px 0 0 10px;
	color: #5c5a5a;
      }
    }
  }
`

