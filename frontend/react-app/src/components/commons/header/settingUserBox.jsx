import React, { useState } from 'react'
import styled from 'styled-components'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import DehazeIcon from '@mui/icons-material/Dehaze';
import CloseIcon from '@mui/icons-material/Close';
import SettingsIcon from '@mui/icons-material/Settings';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import EditIcon from '@mui/icons-material/Edit';
import ChangePwdBox from '../../../_auth/userSetting/changePwdBox'
import { UPDATE_USER_FULLNAME } from '../../../graphql/gqlUserTypes'
import { useMutation } from '@apollo/client'
import { useDispatch } from 'react-redux'
import { changeUserFullname } from '../../../_auth/redux/actions/auth.actions'

const style = {
  position: 'absolute',
  top: '35%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  //border: '0px solid #000',
  border: 'none',
  //boxShadow: 24,
  outline: 'none',
  boxShadow: 0,
  borderRadius: '.2rem',
  p: 4,
  padding: 0,
}

const SettingUserBox =(props)=> {
  const currUser = props.currUser
  const uname = props.uname
  const [ updateUserFnameFn ] = useMutation(UPDATE_USER_FULLNAME)
  const dispatch = useDispatch()

  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const [isOpenEdit, setIsOpenEdit] = useState(false)
  const [input, setInput] = useState("")

  const onOpenEdit = () => {
    isOpenEdit !== false ? setIsOpenEdit(false) : setIsOpenEdit(true)
  }

  const handleEditUname = e => {
    setInput(e.target.value)
  }

  let newUnameObj = {}
  const onhandleEditUname = async e => {
    e.preventDefault()
    if (window.confirm("你确定更改吗?")) {
      newUnameObj['uname'] = uname
      newUnameObj['newFname'] = input

      try {
	const modifyTimer = await setTimeout(() => {
	  updateUserFnameFn({variables: {
            username: newUnameObj.uname,
	    newFullname: newUnameObj.newFname
	  } })
	}, 100)
	const changeFnameTimer = await setTimeout(() => {
          if (newUnameObj.newFname !== "") {
            dispatch(changeUserFullname(newUnameObj.newFname))
	  }
	}, 500)
	const closeEditTimer = await setTimeout(() => {
          onOpenEdit()
	}, 800)
	
	const closeTimer = await setTimeout(() => {
          clearTimeout(modifyTimer)
	  clearTimeout(changeFnameTimer)
	  clearTimeout(closeEditTimer)
	}, 1000)

	clearTimeout(closeTimer)

      } catch(error) {
        console.error('Failed to update fullname', error)
      }
    }
  }
  
  return (
    <React.Fragment>
      <div onClick={handleOpen} >
	<div className="multi-menu-item">
	  <div className="link-left-icon"><SettingsIcon /></div>
	  <div className="link-content"><p>用户设置</p></div>
	  <div className="link-right-icon"><ArrowForwardIosIcon /></div>
	</div>
      </div>
      <Modal
        open={open}
      >
        <Box sx={style}>
	  <Styles>
            <section className='modal-box'>
	      <header className="header-container">
	        <div><DehazeIcon /></div>
	        <div className="modal-title"><p>用户设置</p></div>
	        <div className="modal-close-btn" onClick={handleClose}>
	          <div className="close-icon"><CloseIcon /></div>
	        </div>
	      </header>
	      <main className="main-container">
	        <div className="setting-content">
	          {isOpenEdit !== true ? (<section className="setting-uname">
	            <div className="setting-title">
	              <p>用户名:</p><span/>
	              <p className="setting-title-user">{`${currUser}`}</p>
	            </div>
	            <div className="edit-btn" onClick={onOpenEdit}>
	              <EditIcon />
	            </div>
	          </section> ) : (
                    <>
		     <div className="edit-fname-box">
		       <form
			 className="edit-fname-form"
			 onSubmit={onhandleEditUname}
		       >
			 <div className="edit-fname-input">
			   <input
			     type="text"
			     required
			     name="newFullname"
			     onChange={handleEditUname}
			     value={input}
			     placeholder="请输入新用户名..."
			   />
			 </div>
			 <div className="edit-fname-sub">
			   <input type="submit" value="提交" />
			 </div>
		       </form>
		       <div
			 onClick={onOpenEdit}
			 className="edit-fname-close"
		       ><p>取消</p></div>
		     </div>
		    </>
		  )}
	          <section className="setting-pwd">
	            <div className="setting-title">
	              <p>密码管理</p>
	            </div>
	            <div><ChangePwdBox closeSettingUser={handleClose} /></div>
	          </section>
	        </div>
	      </main>
            </section>
	  </Styles>
        </Box>
      </Modal>
    </React.Fragment>
  )
}

export default React.memo(SettingUserBox)

const Styles = styled.section`
  .modal-box {
    .header-container {
      background: #201f1f;
      color: #f9f9f9;
      display: flex;
      justify-content: space-between;
      width: 35rem;
      //height: 2.9rem;
      align-items: center;
      padding: .3rem .2rem .1rem .2rem;
      .modal-close-btn {
        .close-icon {
          padding-top: .1rem;
	}
        .close-icon > svg {
          padding: .17rem;
	  border: none;
	  background: #db5041;
	  border-radius: 50%;
	  color: #fafafa;
	  height: 1.1rem;
	  width: 1.1rem;
	  &:hover {
            background: #e43f2d;
	  }
	}
      }
      .modal-title {
        color: #d1d1d3;
	font-family: "Roboto","Arial",sans-serif;
	font-size: 1.2rem;
	line-height: 2rem;
	font-weight: 400;
      }
    }
    .main-container {
      margin: 1rem;
      .setting-content {
        margin: 3rem 5rem;
        .setting-uname {
          display: flex;
	  flex-direction: row;
	  justify-content: space-between;
	  margin-bottom: 2rem;
        }
	.setting-pwd {
          display: flex;
	  flex-direction: column;
	  .change-pwd-render {
            display: flex;
	    flex-direction: row;
	    justify-content: space-between;
	  }
	}
	.setting-title {
          display: flex;
	  color: #1b202e;
	  font-family: "Roboto","Arial",sans-serif;
	  font-size: 1.2rem;
	  line-height: 2rem;
	  font-weight: 600;
	  .setting-title-user {
            margin-left: .5rem;
	    color: #3e4654;
	    font-weight: 500;
	  }
	}
      }
      .setting-pwd-btn {
        border: 1px solid #6d6c6c;
	background: #6d6c6c;
	border-radius: .25rem;
	height: 2.9rem;
	align-items: center;
        display: flex;
	flex-direction: row;
	justify-content: space-between;
	.link-right-icon {
          display: flex;
	  padding-right: .5rem;
	  color: #a7a5a5;
	}
	.link-content {
	  padding-left: .9rem;
          p {
            color: #fff;
	    font-family: "Roboto","Arial",sans-serif;
	    font-size: 1.3rem;
	    line-height: 2rem;
	    font-weight: 500;
	  }
	}
	&:hover {
          background: #434339;
	  cursor: pointer;
	}
      }
    }
  }
  .setting-uname {
    height: 2rem;
    .edit-btn svg {
      background: #e0dddd;
      border-radius: 50%;
      padding: .1rem;
      color: #666;
      &:hover {
        background: #f1ecec;
	color: #666;
      }
    }
  }

  .edit-fname-box {
    display: flex;
    margin-bottom: 2rem;
    font-family: "Roboto","Arial",sans-serif;
    font-size: 1.2rem;
    line-height: 2rem;
    font-weight: 500;
    .edit-fname-form {
      display: flex;
      .edit-fname-input input {
        height: 2rem;
	width: 14rem;
	outline: none;
	padding-left: .5rem;
        font-family: "Roboto","Arial",sans-serif;
        font-size: 1.2rem;
        line-height: 2rem;
        font-weight: 500;
      }
      .edit-fname-sub {
        margin: 0 .3rem;
	input {
	  padding: 0 .5rem;
          font-family: "Roboto","Arial",sans-serif;
          font-size: 1.1rem;
          line-height: 2rem;
          font-weight: 500;
	  background: #9e9ea2;
	  color: #fcfdfe;
	  border-radius: .1rem;
	  &:hover {
            background: #7b7b7e;
	  }
	}
      }
    }
    .edit-fname-close {
      text-decoration: underline;
      display: flex;
      justify-content: end;
      align-items: end;
      &:hover {
        cursor: default;
	color: #333;
      }
    }
  }
`
