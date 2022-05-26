import React from 'react'
import styled from 'styled-components'
import { Routes, Route } from "react-router-dom"
import { useSelector } from "react-redux"
import MysqlComp from './_mysqlComp'

const DatabasesComp = () => {
  const loginStatus = useSelector(state => state.authState.loginStatus)

 
  let isLoggedIn, accessLevel
  if (loginStatus) {
    isLoggedIn = loginStatus.isLoggedIn
    if (loginStatus.currentUser !== null) {
      accessLevel = loginStatus.currentUser.access_level
    }
  }

  return (
    <React.Fragment>
      {isLoggedIn && 
        <Styles>
	  <main className="db-container">
	    {accessLevel >= 2 ? (null) : (
              <Routes>
		<Route path="mysql/*" element={<MysqlComp />} />
	      </Routes>
	    )}
	  </main>
        </Styles>
      }
    </React.Fragment>
  )
}

export default React.memo(DatabasesComp)

const Styles = styled.section``

