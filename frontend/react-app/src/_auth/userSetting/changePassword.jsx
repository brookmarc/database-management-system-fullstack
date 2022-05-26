import React from 'react'
import { useState } from 'react'
import { useRef } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { 
  loginAction, 
} from '../redux/actions/auth.actions'
import { useForm } from "react-hook-form";
import { useMutation } from '@apollo/client';
import { 
  UPDATE_USER_PASSWORD, 
} from '../../graphql/gqlUserTypes';
import styled from 'styled-components'
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
//import CheckIcon from '@mui/icons-material/Check';

const ChangePassword = (props) => {
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
  const { closePwdBox, closeSettingUser } = props
  const dispatch = useDispatch()
  const loggedInUser = useSelector(state => state.authState.loginStatus.currentUser)
  const Username = loggedInUser.user_name

  const [oldPwdShow, setOldPwdShow] = useState(false)
  const [pwdShow, setPwdShow] = useState(false)
  const [confirmPwdShow, setConfirmPwdShow] = useState(false)
  const {
    register,
    //getValues,
    handleSubmit,
    //data,
    formState,
    reset,
    //control,
    watch,
    //setValue,
    //setError,
    //clearError
  } = useForm();

  const [updateError, setUpdateError] = useState("")

  //const [modifyCurrPwdFn, {loading, error}] = useMutation(UPDATE_USER_PASSWORD, {
  const [modifyCurrPwdFn] = useMutation(UPDATE_USER_PASSWORD, 
  //{
  //  refetchQueries: [
  //    FETCH_USERS,
  //    'users'
  //  ],
  //}
  )


  const { errors } = formState
  const oldPassword = useRef({})
  oldPassword.current = watch("oldPassword", "")

  const newPassword = useRef({})
  newPassword.current = watch("newPassword", "")

  const confirmPwd = useRef({})
  confirmPwd.current = watch("confirmPwd", "")

	
  const pwdLengthIsValid = (pwd) =>{
    if (pwd.trim().length < 6 || pwd.trim().length > 12){
      return false
    }
    return true
  }

  const CheckPwdInRegex = (regex_str) => {
    const checkPwdInner = (input_newPwd) => {
      if (input_newPwd !== undefined) {
        if (input_newPwd.match(regex_str)) {
          return true
	}
	return false
      }
    }
    return checkPwdInner
  }

  const regex_str = /^(?=\S*[a-z])(?=\S*[A-Z])(?=\S*\d)(?=\S*[^\w\s])\S{6,12}$/
  //const regex_str = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&.])[A-Za-z\d$@$!%*?&.]{6, 12}/
  const _newPwdIsStrong = CheckPwdInRegex(regex_str)


  function CheckNewPwdNotSameOld(oldPassword) {
    const checkNewPwd = (newPassword) => {
      if (oldPassword !== undefined && newPassword !== undefined) {
        if (oldPassword !== newPassword) {
          return true
	}
	return false
      }
    }
    return checkNewPwd
  }
  const newPwdNotSameOld = CheckNewPwdNotSameOld(oldPassword.current)

  function CheckPwdIsMatch(newPassword) {
    function pwdIsMatched(confirmedPwd) {
      if (newPassword !== undefined && confirmedPwd !== undefined) {
        if (newPassword !== confirmedPwd) {
          return false
	}
	return true
      }
    }
    return pwdIsMatched
  }
  const pwdIsMatchedFn = CheckPwdIsMatch(newPassword.current)


  const onSubmit = async (sub_data) => {
    await sleep(200)
    
    try {
      const modifyTimer = await setTimeout(() => {
        modifyCurrPwdFn({variables: {
          username: Username,
	  currPassword: sub_data.oldPassword,
          newPassword: sub_data.newPassword,
	  confirmedPwd: sub_data.confirmPwd
	}}) 
	  .then(res => {
            //console.log(res.data)
	    let isSucc, errorMsg = ""
	    if (res && res.data && Object.keys(res.data.updateUserPassword).length !== 0) {
              isSucc = res.data.updateUserPassword.ok
	      errorMsg = res.data.updateUserPassword.error
	      if (isSucc !== false && errorMsg === ""){
                setTimeout(() => {
                  reset()
                }, 200)
                setTimeout(() => {
                  closeSettingUser()
                  closePwdBox()
                }, 500)
                setTimeout(() => {
                  dispatch(loginAction({
                    username: Username,
                    password: sub_data.newPassword
                  }))
                }, 800)
	      } else {
                console.error(errorMsg)
		setUpdateError(errorMsg)
	      }
	    }
	  })
      }, 100)

      const closeTimer = await setTimeout(() => {
        clearTimeout(modifyTimer)
      }, 200)
	
      clearTimeout(closeTimer)

    } catch (error) {
      console.error('Failed to modify the password')
    }
  }


  const registerOptions = {
    oldPassword: {
      required: "请输入旧密码！",
      validate: {
      }
    },
    newPassword: {
      required: "请输入新密码！",
      validate: {
        lenghIsValid: (value) => pwdLengthIsValid(value) || "新密码长度为6-12个字符！",
	pwdNotSameOld: (value) => newPwdNotSameOld(value) || "新密码不能与旧密码相同！",
	pwdIsStrong: (value) => _newPwdIsStrong(value) || "新密码必须包含至少一个大写字母，小写字母和一个特殊符号！",
      }
    },
    confirmedPwd: {
      minLength: {
        value: 6,
        message: "密码确认不能少于6位！",
      },
      validate: {
        pwdIsMatched: (value) => pwdIsMatchedFn(value) || "密码确认不匹配!"
      }
    }
  }


  const resetInput = e => {
    e.preventDefault()
    reset()
    setUpdateError("")
  }

  return (
    <React.StrictMode>
      <Styles>
	<form onSubmit={handleSubmit(onSubmit)} className="form-container">
	  <section className="form-input">
	    <label>旧密码:</label>
	    <input 
	      id="oldPassword"
	      type={oldPwdShow ? "text" : "password"}
	      name="oldPassword"
	      placeholder="请输入旧密码"
	      {...register("oldPassword", registerOptions.oldPassword)}
	    />
	    <i className={`togglePwd ${oldPwdShow ? 'show' : 'hidden'}`}>
	      <button 
	        onClick={e => {
                  e.preventDefault()
                  setOldPwdShow(!oldPwdShow)
		}}
	      >
	        {oldPassword.current === undefined ? (null) : (
		  oldPassword.current.trim().length !== 0 ? (
		    oldPwdShow ? <VisibilityOffIcon /> : <VisibilityIcon />) : null)}
	      </button>
	    </i>
	    <div className="form-error">
              {errors?.oldPassword && errors?.oldPassword?.message !== null &&
		      (errors?.oldPassword?.message.length !== 0? (
	        <p>{errors?.oldPassword?.message}</p>) : (null)
	      )}
	    </div>
	    {updateError.length !== 0 ? (
              <>
	        <div className="form-error"><p>{updateError}</p></div>
	      </>
	    ) : null}
          </section>

	  <section className="form-input">
	    <label>新密码:</label>
	    <input 
	      id="newPassword"
	      type={pwdShow ? "text" : "password"}
	      name="newPassword"
	      placeholder="请输入新密码"
	      {...register("newPassword", registerOptions.newPassword)}
	    />
	    <i className={`togglePwd ${pwdShow ? 'show' : 'hidden'}`}>
	      <button 
	        onClick={e => {
                  e.preventDefault()
                  setPwdShow(!pwdShow)
		}}
	      >
	        {newPassword.current === undefined ? (null) : (
		  newPassword.current.trim().length !== 0 ? (
		    pwdShow ? <VisibilityOffIcon /> : <VisibilityIcon />) : null)}
	      </button>
	    </i>
	    <div className="form-error">
              {errors?.newPassword && (errors?.newPassword?.message.length !== 0? (
	        <p>{errors?.newPassword?.message}</p>) : null
	      )}
	    </div>
          </section>

	  {newPassword.current === undefined ? (null) : (newPassword.current.length < 6 ? (null) : (
	    <section className="form-input">
              <label>确认密码:</label>
	      <input 
	        id="confirmPwd"
	        type={confirmPwdShow ? "text" : "password"}
	        name="confimPwd"
	        placeholder="请确认新密码"
	        {...register("confirmPwd", registerOptions.confirmedPwd)}
	      />
	      <i className={`togglePwd ${confirmPwdShow ? 'show' : 'hidden'}`}>
		<button onClick={ e => {
                  e.preventDefault()
                  setConfirmPwdShow(!confirmPwdShow)
	        }}
		>{confirmPwd.current !== undefined && confirmPwd.current.trim().length !== 0 ? (
		   confirmPwdShow ? <VisibilityOffIcon /> : <VisibilityIcon />) : null}
		</button>
	      </i>
	      <div className="form-error">
	        {errors?.confirmPwd && <p>{errors?.confirmPwd?.message}</p>}
	      </div>
	    </section>
	  ))}
	  <div className="form-btn">
	    <div className="form-sub-btn"><input type="submit" value="提交"/></div>
	    <div className="form-reset-btn" onClick={resetInput}><p>重置</p></div>
	  </div>
	</form>
      </Styles>
    </React.StrictMode>
  )
}

export default React.memo(ChangePassword)


const Styles = styled.section`
  width: 30rem;
  .form-container {
    width: 90%;
  }
  margin: 12% 0 9% 5%;
  .form-input {
    position: relative;
    margin-bottom: 1rem;
    label {
      color: #080808;
      font-size: 1.1rem;
      font-family: Arial;
    }
    input {
      width: 100%;
      height: 2.1rem;
      margin-top: .3rem;
      padding-top: .3rem;
      padding-bottom: .3rem;
      padding-left: .9rem;
      font-size: 1.2rem;
      background: #dedddd;
      //box-shadow: 2px 3px #393636;
      color: #0a0a0a;
      outline: none;
      border: none;
      border-radius: .2rem;
    }
  }
  .form-error {
    margin: .2rem 0 .3rem 0;
    font-size: 1rem;
    p {
      color: red;
      font-family: Arial;
    }
    p::before {
      display: inline;
      content: "⚠️ ";
      //content: "⚠ ";
    }
  }
  .togglePwd {
    position: absolute;
    top: 2.4rem;
    right: .3rem;
    button {
      background: none;
      border-radius: 50%;
      border: none;
    }
    button:hover {
      cursor: pointer;
    }
  }
  .show button {
    color: #3f62ca;
  }
  .hidden button {
    color: #686868;
  }
  .form-control {
    postion: relative;
    .form-icon {
      position: absolute;
      top: 2.1rem;
      right: 1.3rem;
    }
    .valid-icon {
      color: #19c300;
    }
    .invalid-icon {
      color: #cfbf6d;
    }
  }
  .form-btn {
    margin: .3rem 0 1.5rem 0;
    display: flex;
    .form-sub-btn > input {
      width: 7.5rem;
      height: 2.7rem;
      color: #eee !important;
      background: #0d10ce;
      box-shadow: none;
      font-size: 1.2rem;
      border: 1px solid #0d10ce;
      border-radius: .3rem;
      &:hover {
        cursor: default;
	background: #0c0eaa;
	border: 1px solid #0c0eaa;
      }
    }
    .form-reset-btn {
      display: flex;
      align-items: end;
      margin-left: .7rem;
      background: none;
      border: none;
      color: #3a3636 !important;
      font-size: 1.2rem;
      text-decoration: underline;
      &:hover {
        cursor: default;
	color: #5a5656 !important;
      }
      p {
        padding-bottom: .3rem;
      }
    }
  }
  .sel-user-info {
    background: #d2d2d3;
    margin-bottom: 1.3rem;
    padding: .3rem;
    color: #2b2bf7;
    h5 {
      font-size: 1.1rem;
      margin-bottom: .3rem;
      color: #2f2f8e;
    }
    p {
      font-size: .9rem;
    }
    p:before {
      content: "\f007";
      color: #1616bf;
      margin-right: .2rem;
      margin-left: .7rem;
    }
    em {
      color: red;
    }
  }
`

