import React from 'react'
import { useMemo } from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useRef } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { createDropMenuList } from './utils/createDropComponent'
import { AdminDropMenuObj } from './menuItems/adminDropMenu'
import { DatabasesDropMenuObj } from './menuItems/databasesDropMenu'
import { OperationsDropMenuObj } from './menuItems/operationsDropMenu'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import './header.scss'


const TOPMENUCH = {
  "Admin": "系统管理",
  "Databases": "数据库管理",
  "Operations": "数据库操作"
}

const TopBarLinks = () => {
  const initialState = useMemo(() =>({
    Admin: false,
    Databases: false,
    Operations: false
  }), [])
  const [openDropMenu, setOpenDropMenu] = useState(initialState)

  
  const adminDropMenuObj = useMemo(() => {
    return AdminDropMenuObj
  }, [])
  const adminDropMenuList = createDropMenuList(adminDropMenuObj)

  const databasesDropMenuObj = useMemo(() => {
    return DatabasesDropMenuObj
  }, [])
  const databasesDropMenuList = createDropMenuList(databasesDropMenuObj)

  const operationsDropMenuObj = useMemo(() => {
    return OperationsDropMenuObj
  }, [])
  const operationsDropMenuList = createDropMenuList(operationsDropMenuObj)

  const loginStatus = useSelector(state => state.authState.loginStatus)
  
  let currAccessLevel
  if (loginStatus.currentUser !== undefined && 
	  loginStatus.currentUser !== null && 
	    loginStatus.isLoggedIn === true && 
	      loginStatus.error === null
    ){
    currAccessLevel = loginStatus.currentUser.access_level
  }
  
 
  useEffect(() => {
    document.addEventListener('click', e => {
      if (e.target.closest('#dropdown-content')){
	return
      }
      if (e.target.closest('#dropdown-header')){
	return
      }
      setOpenDropMenu(initialState)
    })
    document.removeEventListener('click', e => {
      if (e.target.closest('#dropdown-content')){
	return
      }
      if (e.target.closest('#dropdown-header')){
	return
      }
      setOpenDropMenu(initialState)
    })
  }, [initialState])

  const dropRef = useRef()


  const TopMenuItem = (props) => {
    return (
      <React.Fragment>
	<section 
	  ref = {dropRef}
	  id="dropdown-header"
	  className={`topbarMenu top-render`} 
	  onClick={e => {
	    e.preventDefault()
	    openDropMenu[props.topmenuTitle] === null || openDropMenu[props.topmenuTitle] === undefined ? (
	      setOpenDropMenu({...initialState, [props.topmenuTitle]: false})
	    ) : (
	    openDropMenu[props.topmenuTitle] !== false ? (
	      setOpenDropMenu({...initialState, [props.topmenuTitle]: false})) : (
	        setOpenDropMenu({...initialState, [props.topmenuTitle]: true})
	      )
	    )
	  }}
	>
	  <div><p>{TOPMENUCH[props.topmenuTitle]}</p></div>
	  {props.children}
	</section>
      </React.Fragment>
    )
  }


  const DropMenuItem = (props) => {
    return (
      <React.Fragment>
	<div className="drop-menu-box" id="dropdown-content"
	>
	  <section className="dropMenu drop-render"
	  >
	    <div className="drop-menu-container" >
	     {props.children}
	    </div>
	  </section>
	</div>
      </React.Fragment>
    )
  }

  const MultiMenu = (props) => {
    return (
      <React.StrictMode>
	<section className="multi-menu-box">
	  <div className="multi-menu-container">
	    <TopMenuItem
	      topmenuTitle={props.topmenuTitle}
	    >
	      {props.topmenuChild}
	    </TopMenuItem>
            {openDropMenu[props.topmenuTitle] === true ? (
	       <DropMenuItem 
	         topmenuTitle={props.topmenuTitle}
	       >
	         {props.dropmenuChild}
	       </DropMenuItem>
	     ) : null
            }
	  </div>
	</section>
      </React.StrictMode>
    )
  }


  const AdminMenu = () => {
    const menuName = "Admin"
    return (
      <React.StrictMode>
	<MultiMenu 
	  topmenuTitle = {menuName}
	  topmenuChild = {<DropIcon classes="drop-icon" menuName={menuName}/>}
	  dropmenuChild = {adminDropMenuList}
	/>
      </React.StrictMode>
    )
  }
   
  const DatabaseMenu = () => {
    const menuName = "Databases"
    return (
      <React.StrictMode>
	<MultiMenu 
	  topmenuTitle = {menuName}
	  topmenuChild = {<DropIcon classes="drop-icon" menuName={menuName}/>}
	  dropmenuChild = {databasesDropMenuList}
	/>
      </React.StrictMode>
    )
  }

  const OperationMenu = () => {
    const menuName="Operations"
    return (
      <React.StrictMode>
	<MultiMenu 
	  topmenuTitle = {menuName}
	  topmenuChild = {<DropIcon classes="drop-icon" menuName={menuName}/>}
	  dropmenuChild = {operationsDropMenuList}
	/>
      </React.StrictMode>
    )
  }

  const createAccessMenuFn = (accessLevel) => {
    switch(accessLevel) {
      case 0: 
        return (
          <React.StrictMode>
            <AdminMenu />
	    <DatabaseMenu />
            <OperationMenu />
          </React.StrictMode>
	)
      case 1: 
        return (
          <React.StrictMode>
	    <DatabaseMenu />
            <OperationMenu />
          </React.StrictMode>
	)
      case 2:
	return (
          <React.StrictMode>
            <OperationMenu />
          </React.StrictMode>
	)
      default:
        return (<></>)
    }
  }



  const DropIcon = (props) => {
    return (
      <React.StrictMode>
	<div className={props.classes}>
	  { openDropMenu[props.menuName] === null || openDropMenu[props.menuName] === undefined? (
	      <ExpandMoreIcon />
	    ) : (
	    openDropMenu[props.menuName] === false ? <ExpandMoreIcon /> : <ExpandLessIcon />)}
	</div>
      </React.StrictMode>
    )
  }

  return (
    <React.Fragment>
      <Styles>
	<section className="topbar-menu-container">
	 {createAccessMenuFn(currAccessLevel)}
	</section>
      </Styles>
    </React.Fragment>
  )
}

export default React.memo(TopBarLinks)

const Styles = styled.nav`
  .topbar-menu-container {
    .topbarMenu a {
      color: #ffffeb;
    }
  }
`


