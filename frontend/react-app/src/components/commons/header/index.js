import React from 'react'
import { useState, useRef } from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import DensityMediumIcon from '@mui/icons-material/DensityMedium';
import LogoDevIcon from '@mui/icons-material/LogoDev';
import Navbar from './navbar'
import AccountMultiMenuPage from './accountMultiMenu'
import LoginBox from './loginBox'
import GuideMenuComp from './guideMenuComp'

const Header = () => {
  let isLoggedIn = false
  const loginStatus = useSelector(state => state.authState.loginStatus)
  if (loginStatus && loginStatus.currentUser !== null) {
    isLoggedIn = loginStatus.isLoggedIn
  }
  

  const [openGuideMenu, setOpenGuideMenu] = useState(false)
  const handleOpenGuideMenu = e => {
    e.preventDefault()
    isLoggedIn ? (
      openGuideMenu === false ? (setOpenGuideMenu(true)) : (setOpenGuideMenu(false))
    ) : (setOpenGuideMenu(false))
  }
  
  const handleCloseGuideMenu = e => {
    e.preventDefault()
    setOpenGuideMenu(false)
  }

  const guideMenuRef = useRef()

  return (
    <React.Fragment>
     <Headercomponent>
       <section className="header-guide-container">
	 <section
	   className="header-guide-box"
	 >
	   <div
	    id="header-guide-btn"
	    className="header-guide-btn"
	    ref={guideMenuRef}
	    onClick={handleOpenGuideMenu}
	   >
	     <div><i><DensityMediumIcon /></i></div>
	   </div>
	   {openGuideMenu === true && isLoggedIn ? (
	      <div className="header-guide-content-box" onClick={handleCloseGuideMenu}>
	        <section className="header-guide-content-render"
		  onClick={e => e.stopPropagation()}
		>
		  <main className="header-guide-main-container">
		    <GuideMenuComp />
		  </main>
		</section>
	      </div>
	     ) : null
	   }
	 </section>
         <div className="header-company-logo">
	  <div><i><LogoDevIcon /></i></div>
	  <div><p>COMPANY LOGO</p></div>
	 </div>
       </section>
       <section>
	  <Navbar />
       </section>
       <section className="account-container">
	 {isLoggedIn ? (<AccountMultiMenuPage />) : (<LoginBox />)}
       </section>
     </Headercomponent>
    </React.Fragment>
  )
}

export default React.memo(Header)

const Headercomponent = styled.header`
  padding: 0 .3rem;
  background: #09090b;
  color: #FFFFEB;
  display: grid;
  grid-template-columns: 250px auto 23rem;
  align-items: center

  .account-container {
    .modal-header-btn {
      .modal-link-btn {
        display: flex;
	justify-content: center;
	align-items: center;
      }
    }
  }

  .header-guide-container{
    display: flex;
    justify-content: space-between;
    align-items: center;
    .header-guide-box {
      position: relative;
    }
    .header-guide-btn {
      border-radius: 50%;
      margin-right: 1rem;
      svg {
	padding: .35rem;
	width: 1.7rem;
	height: 1.7rem;
	border-radius: 50%;
	&:hover {
	  background: #211f1f;
	  color: #03aded;
	}
      }
    }
    .header-guide-content-box {
      position: fixed;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      background-color: rgba(0, 0, 0, 0.1);
      z-index: 10;
      .header-guide-content-render {
        .header-guide-main-container {
          position: absolute;
	  margin-top: 42px;
          width: 19rem;
	  height: 100vh;
	  background: #111111;
	  //background: #f9f9f9;
	  color: #fff;
	  z-index: 10;
	  box-shadow: 0px 11px 15px -7px rgba(0,0,0,0.2),0px 24px 38px 3px rgba(0,0,0,0.14),0px 9px 46px 8px rgba(0,0,0,0.12);
	}
      }
    }
  }

  .header-company-logo {
    margin: 0 1.2rem 0 0;
    display: flex;
  }

`
