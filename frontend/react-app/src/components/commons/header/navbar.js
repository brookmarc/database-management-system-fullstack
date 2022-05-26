import React from 'react'
import styled from 'styled-components'
import {Link} from 'react-router-dom'
import { createSvgIcon } from '@mui/material/utils'
import TopBarLinks from './topBarLinks'

const HomeIcon = createSvgIcon(
  <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />, 'home'
)


const Navbar = () => {
  return (
    <React.Fragment>
    <NavBar className='nav-bar'>
      <section className="nav-bar-list">
        <div
	  title="主页"
	>
	  <Link to='/'>
	    <HomeIcon 
	      color="primary" 
	      className="homeicon" 
	    />
	  </Link>
	</div>
	<TopBarLinks />
      </section>
    </NavBar>
    </React.Fragment>
  )
}

export default React.memo(Navbar)

const NavBar = styled.nav`
  .nav-bar ul{
    display: flex;
    flex-direction: column;
  }
  .nav-bar-list {
    list-style: none;
    display: flex;
    align-items: center;
  }
  .nav-bar-list li{
    padding: 8px 30px;
  }
  .nav-list {
    padding: 8px 10px;
  }
  .nav-bar-admin {
  }
  ul a{
    color: #ffc;
    font-family: Arial;
    font-size: 23px;
    margin: 0 13px;
    border-radius: 9px;
  }
  ul a:hover{
    color: #FC7;
    background: #00004D;
  }
  .homeicon {
    height: 38px;
    width: 38px;
  }

`

