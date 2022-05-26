import React from 'react'
import styled from 'styled-components'
import { Routes, Route } from "react-router-dom"
import { useSelector } from 'react-redux'
import UserAdmin from "./_userAdmin"
import DatabaseConfig from "./_dbConfigAdmin"

const Admin = () => {
	
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
          <section className="admin-container">
            {accessLevel !== 0 ? (null) : (
              <Routes>
                <Route path="users/*" element={ <UserAdmin /> } />
                <Route path="db-configs/*" element={ <DatabaseConfig /> } />
              </Routes>
            )}
          </section>
        </Styles>
      }
    </React.Fragment>
  )
}

export default React.memo(Admin)

const Styles = styled.section`
  .admin-header {
    background: #141313;
    .header-box {
      padding: 1.2rem;
      button:nth-child(n) {
        margin-right: 1.2rem;
        a { color: #e2e1e5;}
      }
      p {
        color: #d1d1d3;
	font-family: "Roboto","Arial",sans-serif;
	font-size: 1.5rem;
	line-height: 2rem;
	font-weight: 600;
	color: #91908f;
      }
    }
  }
  .admin-container {
    background: #353035;
    color: #f0eef0;
    font-family: Arial;
  }
`

