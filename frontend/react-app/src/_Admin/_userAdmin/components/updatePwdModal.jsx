import React from 'react'
import { ModalHOC } from '../../../components/hoc/modalHOC' 
import styled from 'styled-components'
import { observer } from 'mobx-react'
import { userStore } from '../mst/userStore'
import CloseIcon from '@mui/icons-material/Close';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import UpdateUserPassword from './updatePassword'


const ModalBtn = () => {
  return (
    <>
      <Modalbtn>
        <ManageAccountsIcon /><p>修改密码</p>
      </Modalbtn>
    </>
  )
}

const Modalbtn = styled.div`
  display: flex;
  p {
    margin-left: .37rem;
    padding-top: .13rem;
  }
` 


const ModifyPwdComp = ({show, handleClose, closeMore}) => {
  const showHideClassName = show ? 'modal display-block' : 'modal display-none'
  const selectedUserData = userStore.oneUserData
  const selUserDataLen = selectedUserData.length

  const RemarkWarn = () => {
    return (
      <>
	<div className="d-remark-warn">
	  <p>&#xf0a4; Hi, 伙计! 当前无数据，请选择一条及仅仅选择一条用户进行修改密码!</p>
	</div>
      </>
    )
  }

  return (
    <React.StrictMode>
     <Styles>
       <div className={showHideClassName} onClick={handleClose}>
         <section className="modal-main" onClick={e => e.stopPropagation()}>
	   <header className="header-container">
             <div className="modal-close-btn" onClick={handleClose}>
	       <div className="close-icon"><CloseIcon /></div>
	     </div>
	   </header>
           <main className='modal-content'>
	    <div className="update-pwd-header"><h3>变更用户密码</h3></div>
	    {selUserDataLen === undefined ? (
	       <RemarkWarn />
	    ) : (
	      selUserDataLen === 1 ? (
	        <UpdateUserPassword 
		   closeModal={handleClose} 
		   selectedUserData={selectedUserData} 
		   closeMore={closeMore}
	        />
	      ) : (
                <RemarkWarn />
	      )
	    )}
	   </main>
	 </section>
       </div>
     </Styles>
    </React.StrictMode>
  )
}

const UpdatePasswordBox = observer(ModalHOC(ModifyPwdComp, ModalBtn))

export default UpdatePasswordBox

const Styles = styled.section`
  .modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.6);
    z-index: 13;
  }
  .modal-main {
    position: absolute;
    background: white;
    border-radius: 7px;
    height: auto;
    top: 45%;
    left: 50%;
    transform: translate(-50%, -50%);
    .modal-content {
      min-width: 31rem;
      max-width: 33rem;
    }
  }
  .display-block{
    display: block;
  }
  .display-none{
    display: none;
  }
  .modal-close-btn {
    position: relative;
    top: .3rem;
    right: -94%;
    width: 1.7rem;
    .close-icon > svg {
      border-radius: 50%;
      height: 1.2rem;
      width: 1.2rem;
      padding: .17rem;
      &:hover {
	color: #fafafa;
	background: blue;
      }
    }
  }
  .d-remark-warn {
    color: red;
    padding: 2rem;
  }
  .update-pwd-header {
    position: relative;
    top: -9px;
    margin: .3rem 2.5rem;
    h3 {
      font-size: 1.42rem !important;
      font-weight: bold;
      font-family: Arial;
      color: #8d8d91;
      text-align: center;
    }
  }
`







