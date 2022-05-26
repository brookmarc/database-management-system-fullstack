import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { 
  loginAction, 
} from './redux/actions/auth.actions'
import Button from '@mui/material/Button'
import Input from '@mui/material/Input'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import PersonIcon from '@mui/icons-material/Person';
import KeyIcon from '@mui/icons-material/Key';
import styled from 'styled-components'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';


const LoginComponent = (props) => {

  const {closeModal} = props

  const loginStatus = useSelector(state => state.authState.loginStatus)

  const [showPwd, setShowPwd] = useState(false)
  let isLoginSucc = false
  let errorMessage = ""

  const [credentials, setCredentials] = useState({username:'', password: ''})

  const login_dispatch = useDispatch()

  const onhandleChange = e => 
    setCredentials({ ...credentials, [e.target.name]: e.target.value })

  const onhandleSubmit = async e => {
    e.preventDefault()
    try {
      await login_dispatch(loginAction(credentials))
      
      const closeTimer = await setTimeout(() => {
	isLoginSucc = true
        closeModal();
      }, 800)

      clearTimeout(closeTimer)

    } catch (error) {
      console.error('Failed login')
    }
  }

  if (loginStatus && loginStatus.error !== null &&
       loginStatus.isLoggedIn === false) {
     errorMessage = loginStatus.error.message
     isLoginSucc = loginStatus.error.success
  }


  return (
    <React.Fragment>
    <Styles className='login-box'>
      <section className='login-container center'>
       <form className='login-form' onSubmit={onhandleSubmit} >
          <section className='input-box'>
	    <i className='input-icon'><PersonIcon /></i>
            <Input 
	      placeholder='用户名' 
	      className='login-input' 
	      type="text" 
	      name="username" 
	      id="uname" 
	      onChange={onhandleChange}
	      value={credentials.username}
	      required
	    />
          </section>
          <section className='input-box'>
	    <i className='input-icon'><KeyIcon /></i>
            <Input 
	      placeholder='密码' 
	      className='login-input' 
	      type={showPwd ? "text" : "password"} 
	      name="password" 
	      id="pwd" 
	      onChange={onhandleChange}
	      value={credentials.password}
	      required
	    /> 
	    <i className={`togglePwd ${showPwd ? 'show' : 'hidden'} `}>
	      <div
	        onClick={e => {
                  e.preventDefault()
		  setShowPwd(!showPwd)
		}}
	      >
	        {credentials.password === undefined ? (null) : (
                  credentials.password.trim().length !== 0 ? (
                    showPwd ? <VisibilityOffIcon /> : <VisibilityIcon />
		  ) : (null)
		)}
	      </div>
	    </i>
          </section>
	  <div className="login-error-box">
	    {isLoginSucc === false && errorMessage !== "" ? (
              <>
		<div className="login-error-icon"><ErrorOutlineIcon /></div>
		<div className="login-error-msg"><p>{errorMessage}</p></div>
	      </>
	    ) : null}
	  </div>
          <section className='input-box input-btn'>
            <Button variant="contained" color="primary" type="submit">
	      登录 
	    </Button> <span />
          </section>
        </form>
      </section>
    </Styles>
    </React.Fragment>
  )
  
}


export default React.memo(LoginComponent)


const Styles = styled.div`
  .login-container {
    padding: 1rem 2rem 1rem 3rem;
    border-radius: 25px;
    font-family: Arial;

    .login-form{
      .input-box{
        position: relative;
	padding-left: 1.9rem;
	margin-top: 1rem;
	.togglePwd {
          position: absolute;
	  right: 3.2rem;
	  top: .8rem;
	  color: #717179;
	}
	.input-icon {
          padding: 0 .7rem 0 0;
	  position: absolute;
	  left: -.2rem;
	  top: .59rem;
	  svg {
	    color: #9a9999;;
	    font-size: 1.8rem;
	  }
	}
      }
      .login-input{
        width: 90%;
	font-family: "Roboto","Arial",sans-serif;
	font-size: 1.3rem;
	line-height: 1rem;
	font-weight: 400;
	color: #000;
	padding: .2rem 0 .2rem .39rem;
      }
      .input-btn{ 
        text-align: left; 
	margin-top: 1.7rem;
	button {
	}
      }
    }
    .login-error-box {
      margin-top: .5rem;
      display: flex;
      align-items: center;
      .login-error-icon {
        color: red;
	margin-right: .3rem;
      }
      .login-error-msg {
        color: red;
      }
    }
  }
`


