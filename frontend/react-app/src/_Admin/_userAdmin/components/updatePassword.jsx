import React from 'react'
import { useState } from 'react'
import { useRef } from 'react'
import { useForm } from "react-hook-form";
import { useMutation } from '@apollo/client'
//import { UPDATE_USER_PASSWORD } from '../graphql/gqlTypes'
import { UPDATE_USER_PASSWORD } from '../../../graphql/gqlUserTypes'
import styled from 'styled-components'
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const UpdateUserPassword = (props) => {

  const {closeModal, selectedUserData, closeMore} = props
  let currUserFullname = {}
  let currUsername = {}
  let currUserPwd = {}
  selectedUserData.forEach((item) => {
    currUserFullname['fullname'] = item.Fullname
    currUsername['username'] = item.Username
    currUserPwd['password'] = item.Password
  })


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
    //learError
  } = useForm();

  const [updateError, setUpdateError] = useState("")

  //const [updateUserPwdFn, {loading, error}] = useMutation(
  const [updateUserPwdFn] = useMutation(
    UPDATE_USER_PASSWORD, 
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


  //const CheckIsStrFirst = (string) => {
  //  const firstStrChar = string.charAt(0).match(/[a-z]/i)
  //  return firstStrChar !== null ? (
  //    firstStrChar.length !== 0 ? ( true ) : ( false )) : (false)
  //}

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

  const onSubmit = async (data) => {
    await sleep(200)
    //const values = getValues()
    const userData = {...data, ...currUsername}
    
    try {
      await setTimeout(() => {
        updateUserPwdFn({variables: {
	  username: userData.username,
          currPassword: userData.oldPassword,
          newPassword: userData.newPassword,
	  confirmedPwd: userData.confirmPwd
	},
	update: (cache) => {
          try {
            if (cache) {
              cache.modify({
                fields: {
                  users() {}
		}
	      })
	    }
	  } catch (error) {
            console.error("Failed to update the password")
	  }
	}
	})
	  .then(res => {
            let isSucc, errorMsg = ""
	    if (res && res.data &&
	    Object.keys(res.data.updateUserPassword).length !== 0) {
              isSucc = res.data.updateUserPassword.ok
	      errorMsg = res.data.updateUserPassword.error
	      if (isSucc !== false && errorMsg === "") {
                setTimeout(() => {
                  reset()
                }, 300)
                setTimeout(() => {
                  closeModal()
                  closeMore()
                }, 500)
	      } else {
                console.error(errorMsg)
		setUpdateError(errorMsg)
	      }
	    }
	  })
      }, 100)
      
      clearTimeout()

    } catch(error) {
      console.error('Failed to update the password')
    }
  }


  const registerOptions = {
    oldPassword: {
      required: "请输入当前密码！",
      validate: {
        //_oldPwdIsValid: (value) => _oldPwdIsValid(value) || "The password is invalid! Please check again!",
      }
    },
    newPassword: {
      required: "请输入需变更新密码！",
      validate: {
        lenghIsValid: (value) => pwdLengthIsValid(value) || "新密码需要至少6位及不超过12位！",
	pwdNotSameOld: (value) => newPwdNotSameOld(value) || "新密码不能相同于旧密码！",
	pwdIsStrong: (value) => _newPwdIsStrong(value) || "新密码需要包含至少一位大小字母及一个特殊字符！",
      }
    },
    confirmedPwd: {
      minLength: {
        value: 6,
        message: "确认密码不能少于6位！",
      },
      validate: {
        pwdIsMatched: (value) => pwdIsMatchedFn(value) || "确认密码不匹配，请再次确认!"
      }
    }
  }

  const resetInput = e => {
    e.preventDefault()
    reset()
    setUpdateError("")
  }

  return (
    <React.Fragment>
      <Styles>
	<div className="sel-user-info">
	  <h5>当前已选用户信息如下:</h5>
	  <p>用户姓名: <em>{`${currUserFullname.fullname}`}</em></p>
	  <p>用户名: <em>{`${currUsername.username}`}</em></p>
	</div>
	<form onSubmit={handleSubmit(onSubmit)}>
	  <section className="form-input">
	    <label>旧密码:</label>
	    <input 
	      id="oldPassword"
	      type={oldPwdShow ? "text" : "password"}
	      name="oldPassword"
	      placeholder="请输入旧密码..."
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
              {errors?.oldPassword && 
		  errors?.oldPassword?.message !== null && 
		      (errors?.oldPassword?.message.length !== 0? (
	        <p>{errors?.oldPassword?.message}</p>) : (null)
	      )}
	    </div>
          </section>

	  <section className="form-input">
	    <label>新密码:</label>
	    <input 
	      id="newPassword"
	      type={pwdShow ? "text" : "password"}
	      name="newPassword"
	      placeholder="请输入新密码..."
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
		placeholder="请确认密码..."
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
	    <div className="form-sub-btn">
	      <input type="submit" value="提交"/>
	    </div>
	    <div className="form-reset-btn" onClick={resetInput}>
	      <p>重置</p>
	    </div>
	  </div>
	</form>
	{updateError.length !== 0 ? (
          <>
	    <div className="form-error"><p>{updateError}</p></div>
	  </>
	) : null}
      </Styles>
    </React.Fragment>
  )
}

export default React.memo(UpdateUserPassword)


const Styles = styled.section`
  width: 90%;
  margin: 5% 0 7% 5%;
  .form-input {
    position: relative;
    margin-bottom: 1rem;
    label {
      color: #080808;
      font-size: 1.1rem;
      font-family: Arial;
    }
    input {
      width: 96%;
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
    right: 1.3rem;
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
    color: #f6a1a1;
  }
  .hidden button {
    color: #b0b0bb;
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
      background: #0d10ce !important;
      border: 1px solid #0d10ce !important;
      font-size: 1.2rem;
      font-weight: 400;
      border-radius: .3rem;
      box-shadow: none !important;
      &:hover {
        cursor: default;
	background: #0c0eaa !important;
	border: 1px solid #0c0eaa !important;
      }
    }
    .form-reset-btn {
      display: flex;
      align-items: end;
      margin-left: .7rem;
      background: none;
      border: none;
      color: #333 !important;
      font-size: 1.2rem;
      text-decoration: underline;
      &:hover {
        cursor: default;
        color: #928989 !important;
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

