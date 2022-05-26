import React from 'react'
import {Link} from 'react-router-dom'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'
import { logoutAction } from './redux/actions/auth.actions'
import LogoutIcon from '@mui/icons-material/Logout';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import AuthHelper from '../helpers/auth.class'

const LogoutComponent = ({username}) => {
  const dispatch = useDispatch()
  const logout = new AuthHelper()

  const logoutConfirm = async (e) => {
    e.preventDefault()
    const confirmBox = window.confirm(
      `你确定退出当前帐号 "${username}" 登录吗?`
    )
    if (confirmBox === true) {
      try {
	await dispatch(logoutAction())
	await logout.handleLogoutFn()
      } catch(error) {
        console.error('Failed to logout!')
      }
    }
  }

  return (
    <>
      <Styles>
        <Link to='/' onClick = {logoutConfirm}>
          <div className="multi-menu-item">
            <div className="link-left-icon"><LogoutIcon /></div> 
              <div className="link-content"><p>退出登录</p></div> 
            <div className="link-right-icon"><ArrowForwardIosIcon /></div> 
          </div>
        </Link>
      </Styles>
    </>
  )
}

export default LogoutComponent


const Styles = styled.section`
  a {
    color: #f1ecec;
  }
`
