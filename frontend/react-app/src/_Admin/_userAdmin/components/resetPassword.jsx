import React, {useState} from 'react'
import styled from 'styled-components'
import {useMutation} from '@apollo/client'
import { RESET_USER_PASSWORD } from '../graphql/gqlTypes'
import CloseIcon from '@mui/icons-material/Close';
import VisibilityIcon from '@mui/icons-material/Visibility';


const ResetPassword = (props) => {
  const curr_user = props.username
  const [ resetUserPwdFn ] = useMutation(
    RESET_USER_PASSWORD
  )
  const [isOpenReset, setIsOpenReset] = useState(false)
  const [isPwdShow, setIsPwdShow] = useState(false)
  const [input, setInput] = useState("")

  const onOpenReset = () => {
    isOpenReset !== false ? setIsOpenReset(false) : setIsOpenReset(true)
    setInput("")
    setIsPwdShow(false)
  }
  const onPwdShow = () => {
    isPwdShow !== false ? setIsPwdShow(false) : setIsPwdShow(true)
  }

  const handleResetChange = e => {
    setInput(e.target.value)
  }
  
  let newPwdObj = {}
  const onhandleResetPwd = e => {
    e.preventDefault()
    if (window.confirm("你确定重置当前用户密码吗？")) {
      newPwdObj['uname'] = curr_user
      newPwdObj['newPwd'] = input
      console.log(newPwdObj)
      console.log(resetUserPwdFn)

      try {
        setTimeout(() => {
          resetUserPwdFn({variables: {
            username: newPwdObj.uname,
	    initPassword: newPwdObj.newPwd
	  } })
	}, 100)
	setTimeout(() => {
          onOpenReset()
	}, 500)
      } catch(error) {
        console.error('Failed to reset password!')
      }
    }
  }
  
  return (
    <React.Fragment>
     <Styles>
      {isOpenReset !== true ? (
	<div 
	  onClick={onOpenReset}
	  className="reset-pwd-open"
	>
	  <p>密码重置</p>
	</div> ) : (
          <>
	    <div className="reset-pwd-container">
	      <form 
		className="reset-pwd-form"
		onSubmit={onhandleResetPwd}
	      >
		<div className="reset-pwd-input">
		  <input 
		    type={isPwdShow ? "text" : "password"}
		    minLength="6"
		    maxLength="9"
		    required
		    name="initPassword"
		    placeholder="输入重置新密码..."
		    onChange={handleResetChange}
		    value={input}
		  />
		  <div 
		    className="pwd-show-btn"
		    onClick={onPwdShow}
		  ><VisibilityIcon /></div>
		</div>
		<input type="submit" value="提交"/>
	      </form>
	      <div 
		onClick={onOpenReset}
		className="reset-pwd-close"
	      ><CloseIcon /></div>
	    </div>
	  </>
	)}
     </Styles>
    </React.Fragment>
  )
}

export default React.memo(ResetPassword)


const Styles = styled.section`
  .reset-pwd-open {
    display: inline-block;
    p {
      text-decoration: underline;
      color: #236bf5;
      &:hover {
        cursor: default;
	color: #265abe;
      }
    }
  }
  .reset-pwd-container {
    display: flex;
    .reset-pwd-form {
      display: flex;
      .reset-pwd-input {
        display: flex;
	align-items: center;
	position: relative;
	.pwd-show-btn {
          position: absolute;
	  display: flex;
	  right: .3rem;
	  color: #555;
	  &:hover {
            color: #777;
	  }
	}
      }
    }
    .reset-pwd-form {
      font-family: "Roboto","Arial",sans-serif;
      input[type=text],
      input[type=password] {
        border-radius: .2rem;
	border: none;
	outline: none;
	padding-left: .7rem;
        font-size: 1.1rem;
        font-weight: 400;
	width: 11rem;
      }
      input[type=submit] {
        background: #787879;
	color: #f9f6f6;
	border: none;
	border-radius: .2rem;
	margin-left: .1rem;
	padding: 0 .3rem;
	&:hover {
          background: #8e8e90;
	}
      }
    }
    .reset-pwd-close {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-left: .3rem;
      svg {
        height: 1rem;
	width: 1rem;
	padding: .1rem;
	border-radius: 50%;
	background: red;
      }
    }
  }
`


