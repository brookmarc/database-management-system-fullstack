import React from 'react'
import { Routes, Route} from 'react-router-dom'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import Header from '../components/commons/header'
import Footer from '../components/commons/footer'
import Admin from '../_Admin'
import DatabasesComp from '../_Databases'
import OperationsComp from '../_Operations'
import Skeleton from '@mui/material/Skeleton';
import TokenCheckerHOC from '../hoc/tokenCheckerHOC'

const Homepage = React.memo((props) => {
  const loginStatus = useSelector(state => state.authState.loginStatus)

  return(
    <React.Fragment>
        <Homecomponent>
          <Header />
          {loginStatus.isLoggedIn && loginStatus.currentUser !== null ? (
            <Routes>
	      <Route path='/' element={
                <>
		  <div className="skeleton">
		    <div className="home-timer">
		    </div>
		    <div className="skeleton-msg-ch"><p>网络自动化运维数据库管理系统</p></div>
		    <div className="skeleton-msg"><p>DATABASE MANAGEMENT SYSTEM OF NETWORK AUTOMATIC MAINTENANCE</p></div>
		    <div className="skeleton-icon">
		      <Skeleton />
		      <Skeleton animation="wave" />
		      <Skeleton animation={false} />
		    </div>
		  </div>
		</>
	      } />
              <Route path='nwms/v1/admin/*' element={ <Admin /> } />
              <Route path='nwms/v1/db/*' element={ <DatabasesComp /> } />
	      <Route path='nwms/v1/operation/*' element={ <OperationsComp /> } />
            </Routes>
          ) : (
            <div className="skeleton-box">
	      <div className="skeleton">
		<div className="skeleton-msg-ch"><p>网络自动化运维数据库管理系统</p></div>
		<div className="skeleton-msg"><p>DATABASE MANAGEMENT SYSTEM OF NETWORK AUTOMATIC MAINTENANCE</p></div>
		<div className="skeleton-icon">
	          <Skeleton />
	          <Skeleton animation="wave" />
	          <Skeleton animation={false} />
		</div>
	      </div>
	    </div>
	  )}
          <Footer />
        </Homecomponent>
    </React.Fragment>
  )
})

export default TokenCheckerHOC(Homepage)


const Homecomponent = styled.section`
  .skeleton {
    height: 90vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .skeleton-msg {
      font-family: "Roboto","Arial",sans-serif;
      font-size: 1.7rem;
      line-height: 2rem;
      font-weight: 500;
      color: #9c9797;
    }
    .skeleton-msg-ch {
      font-size: 2.1rem;
      color: #9c9797;
    }
    .skeleton-icon {
      margin: 2rem 0;
      width: 58rem;
    }
    .home-timer {
      h2 {
        font-family: "Roboto","Arial",sans-serif;
        font-size: 5.9rem;
	font-weight: 700;
	color: #aeaeaa;
      }
      h1 {
        font-family: "Roboto","Arial",sans-serif;
        font-size: 2.9rem;
	font-weight: 500;
	color: #aeaeaa;
      }
    }
  }
`

