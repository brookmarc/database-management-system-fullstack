import React, {useState} from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import LogoutComponent from '../../../_auth/Logout.component.jsx' 
import SettingUserBox from './settingUserBox'


const ACCESS ={
  0: "超级用户",
  1: "管理员",
  2: "普通用户"
}

const AccountMultiMenuPage = () => {
  const [openMenu, setOpenMenu] = useState(false)

  let userLoggedInObj = {}
  let Fullname, Username, Accesslevel
  const loginStatus = useSelector(state => state.authState.loginStatus)
  if (loginStatus && loginStatus.currentUser !== null &&
       loginStatus.currentUser.user_name !== undefined) {
     userLoggedInObj = loginStatus.currentUser
     Fullname = userLoggedInObj.full_name
     Username = userLoggedInObj.user_name
     Accesslevel = userLoggedInObj.access_level
  }


  const handleOpenMenu = () => {
    openMenu === false ? (setOpenMenu(true)) : (setOpenMenu(false))
  }
  const handleCloseMenu = () => {
    setOpenMenu(false)
  }
  
  return (
    <React.Fragment>
      <Styles>
	<section className="topbar-menu-btn" onClick={handleOpenMenu}>
	  <div className="topbar-menu-container">
	    <div className="topbar-menu-icon"><AccountCircleIcon /></div>
	    <div className="topbar-menu-content"><p>{Fullname}</p></div>
	  </div>
	</section>
	{openMenu === true ? (
          <section className="multi-menu-render" onClick={handleCloseMenu}>
            <div className="multi-menu-container" onClick={e => e.stopPropagation()}>
	      <section className="login-user-info">
		<div className="login-header">
		  <p>登录用户信息 </p>
		</div>
		<div className="login-active-info">
		  <div className="login-info-content">
		    <p>登录帐号: </p> 
		    <p className="login-active-content">{Username}</p>
		  </div>
		  <div className="login-info-content">
		    <p>用户权限: </p> 
		    <p className="login-active-content">
		      {`${ACCESS[Accesslevel]}`}
		    </p>
		  </div>
		</div>
	      </section>
	      <section className="multi-menu-list">
		<section>
		  <LogoutComponent username={Username} />
		</section>
		<section>
		  <SettingUserBox currUser={Fullname} uname={Username} />
		</section>
		<section>
                  <div className="multi-menu-item">
		    <div className="link-left-icon"><HelpOutlineIcon /></div> 
		    <div className="link-content"><p>帮助</p></div>
		    <div className="link-right-icon"><ArrowForwardIosIcon /></div>
		  </div>
		</section>
	      </section>
	    </div>
	  </section>
	) : null}
      </Styles>
    </React.Fragment>
  )
}

export default React.memo(AccountMultiMenuPage)

const Styles = styled.header`
  position: relative;
  .topbar-menu-btn {
    display: flex;
    .topbar-menu-container {
      display: flex;
      align-items: center;
      flex-direction: row;
      padding: 0 1rem 0 .3rem;
      .topbar-menu-icon { 
        color: #efefe9;
	display: flex;
        svg {
          width: 2.3rem;
          height: 2.3rem;
	  color: #a19f9f;
        }
      }
      .topbar-menu-content {
	font-family: "Roboto","Arial",sans-serif;
	font-size: 1.2rem;
	line-height: 2rem;
	font-weight: 530;
	margin-left: .7rem;
	p {
	  color: #A9A9A5;
	}
      }
      &:hover {
        color: #FC7;
        background: #00004D;
      }
    }
  }
  .topbar-menu-btn:hover {
    cursor: pointer;
  }
  .multi-menu-render {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0,0,0,0.1);
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: center;
    -webkit-justify-content: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-align-items: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    z-index: 10;

    .multi-menu-container {
      position: absolute;
      top: 3.1rem;
      right: 3.9rem;
      z-index: 3;
      border-radius: .1rem;
      display: flex;
      flex-direction: column;
      .login-user-info {
        background: #060505;
	color: #d1d1d3;
	padding: 1rem;
	font-family: "Roboto","Arial",sans-serif;
	font-size: 1.2rem;
	font-weight: 400;
	.login-header {
         font-weight: 700 !important;
	 margin-bottom: .7rem;
	 border-bottom: 1px solid #1c1a1a;
	}
	.login-active-info {
          .login-info-content {
            display: flex;
	    flex-direction: row;
	    .login-active-content {
              margin-left: .37rem;
	      font-weight: 500 !important;
	      color: #03aded !important; 
	    }
	  }
	}
      }
      .multi-menu-list {
        background: #060505;
        color: #f1ecec;
	padding: 1rem 0;
	border-top: 2px solid #1c1a1a;
	.multi-menu-item {
          padding: .7rem 0 .7rem 1rem;
	  display: flex;
	  flex-direction: row;
	  align-items: center;
	  .link-content > p {
	    font-family: "Roboto","Arial",sans-serif;
	    font-size: 1.4rem;
	    line-height: 2rem;
	    font-weight: 400;
	    padding-bottom: .27rem;
	  }
	  .link-content {
            width: 13rem;
	  }
	  .link-left-icon {
            margin-right: 1.6rem;
	  }
	  .link-right-icon {
            margin-left: 1rem;
	    margin-right: .7rem;
	  }
	}
        
	.multi-menu-item:hover {
	  background: #161111;
	  color: #03aded !important;
	  cursor: pointer;
	}
	&:nth-child(n) {
          
	}
      }
    }
  }
  .user-setting-container {
    display: relative;
  }
  .user-setting-dropdown {
    font-family: "Roboto","Arial",sans-serif; 
    font-size: 1.4rem;
    line-height: 2rem;
    font-weight: 400;
    display: none;
    position: absolute;
    background: #f1ecec;
    color: #060505;
    min-width: 15rem;
    right: 20rem;
    top: 15rem;
    z-index: 5;
    border-radius: .3rem;
    .dropdown-item {
      padding: 1rem;
    }
  }
  .user-setting-container:hover .user-setting-dropdown {display: block}
`

