import React from 'react'
import styled from 'styled-components'
import ExecuteComp from './executeCompnent'
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

export const ExecuteModalHOC = (WrapperComp) => {
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
	  <Excutemodalhoc>
          <main className='execute-btn-container'>
            <button className='execute-item-btn' type="button" onClick={this.showModal}>
	      <p>excute</p>
	      <div className='execute-btn-icon'><PlayArrowIcon /></div>
	    </button>
          </main>
	  </Excutemodalhoc>
          <WrapperComp {...this.props} show={this.state.show} handleClose={this.hideModal} />
        </>
      )
    }
  }
}


const Excutemodalhoc = styled.div`
  .execute-btn-container {
    .execute-item-btn {
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
    .execute-item-btn:hover {
      cursor: pointer;
      border: 1px solid #1976d2;
    }
  }
  .execute-btn-icon {
    border-radius: 50%;
    color: #b2b2b6;
  }
`


const ExecuteData = ({show, handleClose}) => {
  const showHideClassName = show ? 'modal display-block' : 'modal display-none'

  return (
    <>
     <Executedata>
       <div className={showHideClassName}>
         <section className="modal-main">
	   <div className='modal-header'>
	     <h3>Execute confirmation diaload</h3>
	   </div>
	   <ExecuteComp />
           <div className='modal-button'>
	     <button type="button">Submit</button>
	     <button type="button" onClick={handleClose}>Cancel</button>
	   </div>
	 </section>
       </div>
     </Executedata>
    </>
  )
}


const ExecuteDataBox = ExecuteModalHOC(ExecuteData)

export default ExecuteDataBox

const Executedata = styled.section`
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
    width: 500px;
    border-radius: 7px;
    height: auto;
    top: 30%;
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
    margin: 10px 0 21px 15px;
    h3 {
      font-size: 17px;
      font-family: inherit;
      color: #0d0000;
    }
  }
`







