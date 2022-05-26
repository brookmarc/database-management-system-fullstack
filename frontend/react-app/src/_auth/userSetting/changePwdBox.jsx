import React from 'react'
import styled from 'styled-components'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import DehazeIcon from '@mui/icons-material/Dehaze';
import CloseIcon from '@mui/icons-material/Close';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

import ChangePassword from './changePassword'

const style = {
  position: 'absolute',
  top: '35%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  border: 'none',
  boxShadow: 0,
  outline: 'none',
  borderRadius: '.2rem',
  p: 4,
  padding: 0,
}

const ChangePwdBox =({ closeSettingUser })=> {
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  
  return (
    <React.StrictMode>
      <div onClick={handleOpen} >
	<div className="setting-pwd-btn">
	  <div className="link-content"><p>password</p></div>
	  <div className="link-right-icon">
	    <div><MoreHorizIcon /></div>
	    <div><ArrowForwardIosIcon /></div>
	  </div>
	</div>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
      >
        <Box sx={style}>
	  <Styles>
            <section className='modal-box'>
	      <header className="header-container">
	        <div><DehazeIcon /></div>
	        <div className="modal-title"><p>变更密码</p></div>
	        <div className="modal-close-btn" onClick={handleClose}>
	          <div className="close-icon"><CloseIcon /></div>
	        </div>
	      </header>
	      <main className="main-container">
	        <div>
	          <ChangePassword 
	            closePwdBox={handleClose} 
	            closeSettingUser={closeSettingUser} 
	          />
	        </div>
	      </main>
            </section>
	  </Styles>
        </Box>
      </Modal>
    </React.StrictMode>
  )
}

export default React.memo(ChangePwdBox)

const Styles = styled.section`
  .modal-box {
    .header-container {
      background: #201f1f;
      color: #f9f9f9;
      display: flex;
      justify-content: space-between;
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
            padding: .17rem;
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
	}
      }
    }
  }
`
