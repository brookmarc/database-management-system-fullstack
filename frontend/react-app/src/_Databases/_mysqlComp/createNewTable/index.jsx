import React from 'react'
import { useEffect } from 'react'
import styled from 'styled-components'
import { observer } from 'mobx-react'
import { tableStore } from '../mst/tablemodelStore'
import AddIcon from '@mui/icons-material/Add'
import CreateTableInput from './createTableForm'
import CloseIcon from '@mui/icons-material/Close';

export const ModalHOC = (WrapperComp) => {
  return class HOC extends React.Component {
    constructor() {
      super()
      this.state = { show: false }
      this.showModal = this.showModal.bind(this)
      this.hideModal = this.hideModal.bind(this)
    }

    showModal = () => { this.setState({ show: true })}
    hideModal = () => { this.setState({ show: false })}

    render() {
      return (
        <>
	  <Modalhoc>
            <main className='modal-btn-container'>
              <button className='modal-item-btn' type="button" onClick={this.showModal}>
	        <div className='add-new-box'><AddIcon className="add-new-icon" /></div>
	        <p>新建MySQL表格</p>
	      </button>
            </main>
	  </Modalhoc>
          <WrapperComp {...this.props} show={this.state.show} handleClose={this.hideModal} />
        </>
      )
    }
  }
}


const Modalhoc = styled.div`
  .modal-btn-container {
    .modal-item-btn {
      border: 1px solid rgba(25, 118, 210, 0.5);    
      border-radius: 4px;
      margin-left: 7px;
      background: none;
      display: flex;
      height: 42px;
      padding: 7px 15px;
      p{
        font-size: 0.875rem;
        color: #1976d2;
        padding-top: 6px;
        font-family: "Roboto","Helvetica","Arial",sans-serif;
        text-transform: uppercase;
      }
    }
    .modal-item-btn:hover {
      cursor: pointer;
      border: 1px solid #1976d2;
    }
  }
  .modal-btn-icon {
    border-radius: 50%;
    color: #b2b2b6;
  }
  .add-new-box {
    border-radius: 50%;
    color: #b2b2b6;
    .add-new-icon {
      padding-top: 3px;
    }
  }
`


const CreateNewModel = ({show, handleClose}) => {
  const showHideClassName = show ? 'modal display-block' : 'modal display-none'

  useEffect(() => {
    tableStore.fetchTablesFn()
  }, [])

  return (
    <>
     <Createmodel>
       <div className={showHideClassName}>
         <section className="modal-main">
	  <div className="modal-container-main">
	     <div onClick={handleClose} className="modal-btn-close">
	       <i><CloseIcon /></i>
	     </div>
	   </div>
	   <div className='modal-header'>
	     <h3>新建MySQL数据库表格</h3>
	   </div>
           <section className='modal-fieldInput'>
	     <CreateTableInput closeModal={handleClose} />
	   </section>
	 </section>
       </div>
     </Createmodel>
    </>
  )
}


const CreateNewTableBox = observer(ModalHOC(CreateNewModel))

export default CreateNewTableBox

const Createmodel = styled.section`
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
  .modal-header {
    position: relative;
    margin-bottom: 18px;
    margin-top: 13px;
    h3 {
      font-family: "Roboto","Arial",sans-serif;
      font-size: 1.5rem;
      font-weight: 600;
      color: #7c7d81;
      text-align: center;
    }
  }
  .modal-btn-close {
    right: -0.7rem !important;
    top: -.7rem !important;
    background: #9d9c9a !important;
    &:hover {
      background: #adaca9 !important;
    }
  }

  .modal-fieldInput {
  }
  .modal-close {
    position: relative;
    top: -11px;
    right: -98%;
    width:35px;
    button {
      border-radius: 50%;
      border: none;
      height: 35px;
      padding: 5px 5px;
      color: #fff;
      background: #a99f9d;
    }
    button:hover {
      cursor: pointer;
      color: #8d7976;
      background: #ebdfdf;
    }
  }
`







