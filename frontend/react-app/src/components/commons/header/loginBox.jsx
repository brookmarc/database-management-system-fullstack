import React from 'react'
import styled from 'styled-components'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import DehazeIcon from '@mui/icons-material/Dehaze';
import CloseIcon from '@mui/icons-material/Close';
import LoginIcon from '@mui/icons-material/Login';
import LoginComponent from '../../../_auth/loginComponent'
import { clearLoginError } from '../../../_auth/redux/actions/auth.actions'
import { useDispatch } from 'react-redux'
import './header.scss'

const style = {
  position: 'absolute',
  top: '35%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  //border: '0px solid #000',
  border: 'none',
  //boxShadow: 24,
  boxShadow: 0,
  outline: 'none',
  borderRadius: '.2rem',
  p: 4,
  padding: 0,
}

const LoginBox =()=> {
  const dispatch = useDispatch()
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = async () => {
    setOpen(false)
    await dispatch(clearLoginError())
  }
  
  return (
    <React.Fragment>
      <section onClick={handleOpen} className="modal-header-btn">
	<Styles className="modal-link-btn" styles={{display: 'flex'}}>
	  <div className="link-content"><p>LOGIN</p></div>
	  <div className="link-right-icon"><LoginIcon /></div>
	</Styles>
      </section>
      <Modal
        open={open}
      >
        <Box sx={style}>
	  <Styles>
            <section className='modal-box'>
	      <header className="header-container">
	        <div><DehazeIcon /></div>
	        <div className="modal-title"><p>登录</p></div>
	        <div className="modal-close-btn" onClick={handleClose}>
	          <div className="close-icon"><CloseIcon /></div>
	        </div>
	      </header>
	      <main className="main-container">
	        <div className="setting-content">
	          <section className="setting-pwd">
	            <div className="login-container">
	              <LoginComponent closeModal={handleClose}/>
	            </div>
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

export default React.memo(LoginBox)

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
      //margin: 1rem;
      .setting-content {
        margin: 2rem 1rem;
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
  .modal-link-btn {
    background: #f9ff13 !important;
    color: #0707cd !important;
  }

`
