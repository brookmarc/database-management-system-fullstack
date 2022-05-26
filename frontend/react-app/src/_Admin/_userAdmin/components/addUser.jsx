import React from 'react'
import { forwardRef } from 'react'
import { useState } from 'react'
import { useRef } from 'react'
import { useForm } from "react-hook-form";
//import { useMutation, gql } from '@apollo/client'
import { useMutation } from '@apollo/client'
import { ADD_USER, FETCH_USERS } from '../graphql/gqlTypes'
import styled from 'styled-components'
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import CheckIcon from '@mui/icons-material/Check';
import ErrorIcon from '@mui/icons-material/Error';


const AddUser = ({ userData }) => {
  const [addError, setAddError] = useState("")
  const [pwd, setPwd] = useState("")
  const [pwdShow, setPwdShow] = useState(false)
  const [confirmPwdShow, setConfirmPwdShow] = useState(false)
  const {
    register,
    getValues,
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


  //const [mutateAddUser, { loadig: mutationLoading, error: mutationError }] = useMutation(ADD_USER)
  const [addUserFn, { loading: mutationLoading, error: mutationError}] = useMutation(
    ADD_USER, 
    {
      update(cache, {data}){
	try {
          if (data !== undefined) {
            const newUserData = data?.mutateAddUser.user
	    const existUsers = cache.readQuery({
              query: FETCH_USERS,
	    })
	    const newUsers = existUsers?.users.concat(newUserData)
	    
	    if (newUserData && existUsers) {
              cache.writeQuery({
                query: FETCH_USERS,
	        data: {
                  users: [...newUsers],
	        },
	      });
	    }
	  }
	} catch (error) {
          console.error("Failed to add new user!")
	}
      }
    },
  )


  const { errors } = formState
  const confirmPwd = useRef({})
  confirmPwd.current = watch("confirmPwd", "")
  const username = useRef({})
  username.current = watch("username", "")

  let unameArr = []
  for (let i of userData) {
    unameArr.push(i.username)
  }

  function CheckUnameFn(unameArr) {
    function checkUsername(input_uname) {
      if (unameArr.includes(input_uname)) {
        return false
      } 
      return true
    }
    return checkUsername
  }
  const CheckUname = CheckUnameFn(unameArr)

  const onPasswordChange = e => {
    e.preventDefault()
    setPwd(e.target.value)
  }

  const togglePassword = (e) => {
    e.preventDefault()
    setPwdShow(!pwdShow)
  }

  const pwdLengthIsValid = (pwd) =>{
    if (pwd.trim().length < 6 || pwd.trim().length > 9){
      return false
    }
    return true
  }

  function CheckPwdIsMatch(password){
    function pwdIsMatched(confirmedPwd) {
      if (password !== undefined && confirmedPwd !== undefined) {
        if (password !== confirmedPwd) {
          return false
	}
	return true
      }
    }
    return pwdIsMatched
  }
  const pwdIsMatchedFn = CheckPwdIsMatch(pwd)

  const CheckIsStrFirst = (string) => {
    const firstStrChar = string.charAt(0).match(/[a-z]/i)
    return firstStrChar !== null ? (
      firstStrChar.length !== 0 ? ( true ) : ( false )) : (false)
  }

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

  const onSubmit = async () => {
    const input_value = getValues()
    await sleep(200)
    if (window.confirm("是否确定新增该用户?")) {
      try {
        await setTimeout(() => {
          addUserFn({variables: {
            fullname: input_value.fullname,
            username: input_value.username,
            password: input_value.password,
            confirmPwd: input_value.confirmPwd,
            accesslevel: input_value.accesslevel
          } })
	    .then(res => {
	      console.log(res.data)
              let isSucc, errorMsg = ""
	      if (res && res.data &&
	      Object.keys(res.data.mutateAddUser).length !== 0) {
                isSucc = res.data.mutateAddUser.ok
		errorMsg = res.data.mutateAddUser.error
		if (isSucc !== false && errorMsg === "") {
                  setTimeout(() => {
                    reset()
                  }, 500)
		} else {
                  console.log(errorMsg)
		  setAddError(errorMsg)
		}
	      }
	    })
        }, 100)
      } catch(error) {
        console.error('Failed to add a new user')
      }
    }
  }

  const Select = forwardRef(({ onChange, name, label }, ref) => (
    <>
      <label>{label}:</label>
      <select name={name} ref={ref} onChange={onChange}>
	<option value="">--选择--</option>
	<option value="0">超级用户</option>
	<option value="1">管理员</option>
	<option value="2">普通用户</option>
      </select>
      <div className="form-error">
        {errors?.accesslevel?.type === "required" && <p>需填入用户等级！</p>}
      </div>
    </>
  ))

  const registerOptions = {
    fullname: {
      required: "需填入用户姓名!",
      minLength: {
        value: 2,
	message: "用户姓名需超过2个字符!"
      },
      maxLength: {
        value: 25,
	message: "用户姓名不能超过25个字符！"
      }
    },
    username: {
      required: "需填入用户名!",
      minLength: {
        value: 2,
	message: "用户名需超过2字符！"
      },
      maxLength: {
        value: 12,
	message: "用户名不能超过12个字符！"
      },
      validate: {
        isUnique: (value) => CheckUname(value) || `该用户名 "${value}" 已经存在!!`,
	isStrFirst: (value) => CheckIsStrFirst(value) || "第一个字符需要填入字符串!"
      }
    },
    password: {
      required: "需填入用户密码!",
      validate: {
        lenghIsValid: (value) => pwdLengthIsValid(value) || "密码至少需要6位字符及不高于9位！"
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

  return (
    <React.Fragment>
      <Adduser>
	<form onSubmit={handleSubmit(onSubmit)}>
	  <div className="form-input">
	    <label>姓名:</label>
	    <input 
	      type="text"
	      name="fullname"
	      placeholder="请输入用户姓名..."
              {...register("fullname", registerOptions.fullname)}
	    />
	    <div className="form-error">
	      {errors?.fullname && <p>{errors?.fullname?.message}</p>}
	    </div>
          </div>
	  <div className="form-input">
	    <label>用户名:</label>
	    <div className="form-control">
	      <input 
	        id="username"
	        type="text"
	        name="username"
	        placeholder="请输入用户名..."
	        {...register("username", registerOptions.username)}
	      />
	      <i
	        className={`form-icon ${errors.username ? 'invalid-icon' : 'valid-icon'}`}
	      >{username.current !== undefined && username.current.trim().length !== 0 ? (
	           !errors.username ? (<CheckIcon />) : (<ErrorIcon />)) : null }
	      </i>
	    </div>
	    <div className="form-error">
	      {errors?.username && errors?.username?.message !== null ? (
		errors?.username?.message.length !== 0? (
		 <p>{errors?.username?.message}</p>) : null
	      ) : null}
	    </div>
	    {addError.length !== 0 ? (
              <>
		<div className="form-error"><p>{addError}</p></div>
	      </>
	    ) : null}
          </div>
	  <div className="form-input">
	    <label>密码:</label>
	    <input 
	      id="password"
	      type={pwdShow ? "text" : "password"}
	      name="password"
	      placeholder="请输入密码..."
	      {...register("password", registerOptions.password)}
	      onChange={onPasswordChange}
	    />
	    <i className={`togglePwd ${pwdShow ? 'show' : 'hidden'}`}>
	      <button 
	        onClick={togglePassword}
	      >
	        {pwd.trim().length !== 0 ? (
		  pwdShow ? <VisibilityOffIcon /> : <VisibilityIcon />) : null}
	      </button>
	    </i>
	    <div className="form-error">
              {errors?.password && (errors?.password?.message.length !== 0? (
	        <p>{errors?.password?.message}</p>) : null
	      )}
	    </div>
          </div>
	  {pwd.length < 6 ? (null) : (
	    <div className="form-input">
              <label>确认密码:</label>
	      <input 
	        id="confirmPwd"
	        type={confirmPwdShow ? "text" : "password"}
	        placeholder="请再次确认密码..."
	        name="confimPwd"
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
	    </div>
	  )}
	  <div className="form-input">
	    <Select label="用户等级" {...register("accesslevel", {required: true})} />
          </div>
	  <div className="form-btn">
	    <input type="submit" value="提交"/>
	    <button type="button" onClick={() => reset()}>重置</button>
	  </div>
	</form>
	{mutationLoading && <p>Loading...</p>}
	{mutationError && <p>Error :( Please try again</p>}
      </Adduser>
    </React.Fragment>
  )
}

export default React.memo(AddUser)


const Adduser = styled.section`
  width: 93%;
  margin: 3% 0 0 3%;
  .form-input {
    position: relative;
    margin-bottom: 1rem;
    label {
      color: #ded1cd;;
      font-size: 1.1rem;
      font-family: Arial;
    }
    input {
      width: 100%;
      height: 2.1rem;
      margin-top: .3rem;
      padding-top: .3rem;
      padding-bottom: .3rem;
    }
    select {
      width: 39%;
      height: 2.7rem;
      margin-left: .3rem;
    }
    input, select {
      padding-left: .9rem;
      font-size: 1.2rem;
      background: #564c4b;
      box-shadow: 2px 3px #393636;
      color: #f7ecec;
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
      //content: "⚠️ ";
      content: "⚠ ";
    }
  }
  .is-invalid {
    //border-color: #dc3545;
    //padding-right: calc(1.5em + .75rem);
    //background-repeat: no-repeat;
    //background-position: right calc(.375em + .1875rem) center;
    //background-size: calc(.75em + .375rem) calc(.75em + .375rem);
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
      top: 2.4rem;
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
    input {
      width: 7.5rem;
      height: 2.7rem;
      color: #dcd0d0;
      background: #1d3c63;
      box-shadow: 2px 3px #312929;
      font-size: 1.3rem;
      border: 1px solid #1d3c63;
      border-radius: .3rem;
    }
    input:hover {
      background: #3b526f;
      border: 1px solid #3b526f;
      cursor: default;
    }
    button {
      margin-left: .7rem;
      background: none;
      border: none;
      color: #cbc0c0;
      font-size: 1.2rem;
      text-decoration: underline;
    }
    button:hover {
      cursor: default;
      color: #928989;
    }
  }
`

