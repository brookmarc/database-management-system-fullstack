import React from 'react'
import { useState } from 'react'
import { useQuery, gql } from '@apollo/client'
import styled from 'styled-components'
import ShowTable from './showTable'
import TableActions from './tableAction'
import Button from '@mui/material/Button';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import SearchIcon from '@mui/icons-material/Search';
import SearchOffIcon from '@mui/icons-material/SearchOff';
import ClearIcon from '@mui/icons-material/Clear';

const FETCH_USERS = gql`
  query {
    users {
      fullname
      username
      password
      accesslevel
    }
  }
`


const UserTableApollo = () => {
   const [expand, setExpand] = useState(false)
   const [searchOpen, setSearchOpen] = useState(false)
   const [searchItem, setSearchItem] = useState("")
   const [focus, setFocus] = useState(false)


   const { loading, error, data } = useQuery(FETCH_USERS, {
     fetchPolicy: "network-only",
     nextFetchPolicy: "cache-first"
     //fetchPolicy: "cache-first",
   });

   if (loading) return <p>Loading...</p>
   if (error) return <p>`Error : ${error.message} `</p>
   
   const usersObj = data.users

   function makeFilter(userObj) {
     function Filter(inputName) {
       const newUsers = userObj.filter(function(obj){
	 return (obj['username']).includes(inputName.toLowerCase())
       })
       return newUsers
     }
     return Filter
   }
   const userList = makeFilter(usersObj)(searchItem)

   const handleExpandAction = (e) => {
     expand === false ? (setExpand(true)) : (setExpand(false))
   }

   const handleSearchAction = e => {
     e.preventDefault()
     searchOpen === false ? (setSearchOpen(true)) : (
       setSearchOpen(false)
     )
     setSearchItem("")
     setFocus(false)
   } 

   const searchSection = () => {
     return searchOpen === false ? (
       <div className="search-btn">
         <Button onClick={handleSearchAction}><ManageSearchIcon /></Button>
       </div>
       ) : (
         <div className="search-box">
           <form className={`search-input ${focus ? 'input-focus' : ''}`} 
	     onSubmit={e => e.preventDefault()}
	   >
             <i className="search-icon"><SearchIcon /></i>
             <input 
               type="search"
      	       placeholder="搜索用户帐号... "
      	       value={searchItem}
      	       onChange={e => {
		 e.preventDefault()
		 setSearchItem(e.target.value)
		 }
	       }
      	       onFocus={() => setFocus(true)}
             />
             {searchItem !== "" ? (
               <i className="clear-icon" 
      	         onClick={e => {
      	           e.preventDefault()
      	           setSearchItem("")
      	           setFocus(false)
      	         }}
      	       >
      	         <ClearIcon />
      	       </i>
             ) : ("")}
           </form>
           <i className="search-cancel" onClick={handleSearchAction}>
             <SearchOffIcon />
           </i>
         </div>
       )
   } 


   return (
     <React.Fragment>
       <Styles>
         <header className="header-box">
           {expand === false ? (
             <section className="more-box">
	       <div className="more-btn">
	         <Button onClick={handleExpandAction} variant="contained">
          	   更多操作 ...<ExpandMoreIcon />
	         </Button>
	       </div>
	       {searchSection()}
	     </section>
           ) : (
             <section className="less-box">
	       <div className="less-btn">
	         <Button onClick={handleExpandAction} variant="contained">
          	   关闭<ExpandLessIcon />
	         </Button>
	       </div>
	       {searchSection()}
	     </section>
           )}
           {expand === true ? (<TableActions setExpand={setExpand} userData={usersObj}/>) : ("")}
         </header>
         <main className="table-box">
           <ShowTable userList={userList} />
         </main>
       </Styles>
     </React.Fragment>
   )
}

export default React.memo(UserTableApollo)

const Styles = styled.section`
  display: grid;
  grid-template-columns: 31rem 1fr;
  grid-template-areas:
    "header table";
  .header-box {
    grid-area: header;
    margin: .5rem 0 .9rem .5rem;
    .more-btn, .less-btn button {
      //margin-bottom: .7rem;
    }
    .more-box {
      display: flex;
      .more-btn > button {
        background: #4e4949;
	border: 1px solid #4e4949;
	color: #c9c0c0;
      }
    }
    .less-box {
      display: flex;
      .less-btn > button {
        background: #4e4949;
	border: 1px solid #4e4949;
	color: #c9c0c0;
      }
    }
  }
  .table-box {
    grid-area: table;
  }

  .search-btn > button {
    margin-left: .3rem;
    height: 3rem;
    padding: 0 .5rem;
    background: #4e4949;
    border: 1px solid #4e4949;
    border-radius: .3rem;
    color: #c9c0c0;
    box-shadow: 0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12);
  }
  .search-btn > button:hover {
    cursor: pointer;
  }
  .search-box {
    display: flex;
    align-items: center;
  }
  .search-box > button {
    color: #d43636;
  }
  .search-input {
    margin-left: .7rem;
    height: 40px;
    position: relative;
  }
  .search-input > input {
    width: 12rem;
    height: 2.5rem;
    font-size: 1.4rem;
    background: #413535;
    border: #50205D;
    color: #bfbbbf;
    border-radius: 1.3rem;
    padding-left: 2.3rem;
    outline: none;
    box-shadow: 0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12);
  }
  .search-input > input:hover {
    background: #1A1715;
    color: #bfbbbf;
  }
  .input-focus > input {
    width: 15rem;
  }
  .search-icon {
    position: absolute;
    padding: 10px 0 0 10px;
    color: #5c5a5a;
  }
  .clear-icon {
    position: absolute;
    left: 85%;
    padding-top: .5rem;
    color: #ad1a1a;
  }
  .clear-icon:hover {
    cursor: pointer;
  }
  .search-cancel {
    color: #a09999;
    background: #373434;
    padding: .3rem .5rem;
    margin-left: .2rem;
    border-radius: 50%;
  }
  .search-cancel:hover {
    background: #312f2f;
    cursor: default;
  }
`


