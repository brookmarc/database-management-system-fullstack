import React from 'react'
import styled from 'styled-components'
import { Routes, Route } from 'react-router-dom'
import { useSelector } from 'react-redux'
import MysqlCRUD from './_mysqlCRUD'

const OperationsComp = () => {
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
          <main className="op-container">
	    {accessLevel === null ? (null) : (
              <Routes>
		<Route path="mysql-crud/*" element={<MysqlCRUD />} />
	      </Routes>
	    )}
	  </main>
	</Styles>
      }
    </React.Fragment>
  )
}

export default React.memo(OperationsComp)

const Styles = styled.section``

