import React from 'react'
import { ModalHOC } from '../../../components/hoc/modalHOC' 
import styled from 'styled-components'
import { observer } from 'mobx-react'
import CloseIcon from '@mui/icons-material/Close';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import DeleteUser from './deleteUser'


const ModalBtn = () => {
  return (
    <>
      <Modalbtn>
        <PersonRemoveIcon /><p>删除用户</p>
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

const DeleteUserComp = ({show, handleClose, closeMore}) => {
  const showHideClassName = show ? 'modal display-block' : 'modal display-none'

  return (
    <React.StrictMode>
     <Styles>
       <div className={showHideClassName}>
         <section className="modal-main">
           <div className='modal-close-btn' onClick={handleClose}>
	     <div className="close-icon"><CloseIcon /></div>
	   </div>
           <main className='modal-content'>
	     <DeleteUser 
	       closeModal={handleClose} 
	       closeMore={closeMore}
	     />
	   </main>
	 </section>
       </div>
     </Styles>
    </React.StrictMode>
  )
}

const DeleteUserBox = observer(ModalHOC(DeleteUserComp, ModalBtn))

export default DeleteUserBox

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
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%)
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
`







