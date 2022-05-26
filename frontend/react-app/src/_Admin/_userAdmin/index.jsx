import React from 'react'
import styled from "styled-components"
import UserTableApollo from './userTableApollo'
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';

const UserAdmin = () => {
  return (
    <React.Fragment>
      <Useradmin>
	<header className="admin-header">
	  <div className="admin-header-box">
	    <div className="admin-header-icon"><SupervisorAccountIcon /></div>
	    <div className="admin-header-title"><p>用户管理</p></div>
	  </div>
	</header>
	<section>
	  <UserTableApollo />
	</section>
      </Useradmin>
    </React.Fragment>
  )
}

export default React.memo(UserAdmin)

const Useradmin = styled.section`
  .admin-header-box {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    font-family: "Roboto", "Arial", sans-serif;
    font-size: 1.4rem;
    line-height: 2rem;
    font-weight: 600;
    color: #91908f;
    padding: 0.3rem 0 0.3rem 0.7rem;
    .admin-header-icon {
      display: flex;
      height: 1.5rem;
      width: 1.5rem;
      margin-right: 0.5rem;
    }
    &:hover {
      cursor: cell;
    }
  }
`

