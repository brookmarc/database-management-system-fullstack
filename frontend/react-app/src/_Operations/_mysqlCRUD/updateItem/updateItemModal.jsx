import React from 'react'
import styled from 'styled-components'
import UpdateItemForm from './updateItemForm'
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch } from 'react-redux'
import {updateItemClose} from '../redux/actions/updateData.actions'

export const UpdateModalHOC = (WrapperComp) => {
  return class HOC extends React.Component {
    constructor() {
      super()
      this.state = { show: false }
      this.showModal = this.showModal.bind(this)
      this.hideModal = this.hideModal.bind(this)
    }

    showModal = () => { this.setState({ show: true })}
    hideModal = () => { 
      this.setState({ show: false })
    }

    render() {
      return (
        <React.Fragment>
	  <Updatemodalhoc>
          <main className='modal-btn-container'>
            <button 
	      className='modal-item-btn' 
	      type="button" 
	      onClick={this.showModal}
	    >
	      <div className='update-btn-icon'><EditIcon /></div>
	      <p>更新记录</p>
	    </button>
          </main>
	  </Updatemodalhoc>
          <WrapperComp {...this.props} show={this.state.show} handleClose={this.hideModal} />
        </React.Fragment>
      )
    }
  }
}


const Updatemodalhoc = styled.div`
  .modal-btn-container {
    .modal-item-btn {
      border: none;    
      border-radius: 4px;
      margin-left: 7px;
      background: none;
      display: flex;
      height: 2rem;
      background: #3e3e40;
      padding: 1px 9px;
      color: #e9e6e6;
      box-shadow: inset -1px -1px #5e5f60,inset 1px 1px #272424,inset -2px -2px #151516,inset 2px 2px #7d7777 !important;
      p{
        font-size: 0.875rem;
        color: #e9e6e6;
        padding-top: 6px;
        font-family: "Roboto","Helvetica","Arial",sans-serif;
        text-transform: uppercase;
      }
    }
    .modal-item-btn:hover {
      cursor: pointer;
      background: #575758;
    }
  }
  .update-btn-icon {
    border-radius: 50%;
    color: #bdbdbe;
  }
`


const UpdateData = React.memo(({tableEnChData, show, handleClose}) => {
  const showHideClassName = show ? 'modal-box display-block' : 'modal display-none'
  const dispatch = useDispatch()

  const onHandleClose = e => {
    e.preventDefault()
    handleClose()
    setTimeout(() => {
      dispatch(updateItemClose({}))
    }, 100)
  }

  return (
    <React.Fragment>
     <Updatedata>
       <div className={showHideClassName}>
         <section className="modal-main">
	   <main className="modal-container-main">
	     <div className='modal-btn-close' onClick={onHandleClose}>
	       <i><CloseIcon /></i>
	     </div>
	     <div className='modal-header'>
	       <h3>更新MySQL数据库表格记录</h3>
	     </div>
	     <UpdateItemForm 
	       tableEnChData={tableEnChData}
	       handleClose={handleClose}
	     />
	   </main>
	 </section>
       </div>
     </Updatedata>
    </React.Fragment>
  )
})


const UpdateDataBox = UpdateModalHOC(UpdateData)

export default React.memo(UpdateDataBox)

const Updatedata = styled.section`
  .modal-box {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: 13;
  }
  .modal-main {
    position: absolute;
    background: white;
    color: black;
    padding: 1.2rem;
    border-radius: 7px;
    height: auto;
    top: 45%;
    left: 50%;
    transform: translate(-50%, -50%)
  }
  .display-block{
    display: block;
  }
  .display-none{
    display: none;
  }
  .modal-header {
    margin: 10px 0 3px 15px;
    font-family: "Roboto", "Arial", sans-serif;
    h3 {
      font-size: 1.5rem;
      font-weight: 600;
      color: #6d6e70;
    }
  }
`







