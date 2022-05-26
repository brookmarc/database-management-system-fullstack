import React from 'react'
import styled from 'styled-components'

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
	        <p>excute</p>
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
`


const AlterModel = ({show, handleClose}) => {
  const showHideClassName = show ? 'modal display-block' : 'modal display-none'

  return (
    <>
     <Altermodel>
       <div className={showHideClassName}>
         <section className="modal-main">
	   <div className='modal-header'>
	     <h3>Execute confirmation diaload</h3>
	   </div>

           <div className='modal-button'>
	     <button type="button">Submit</button>
	     <button type="button" onClick={handleClose}>Cancel</button>
	   </div>
	 </section>
       </div>
     </Altermodel>
    </>
  )
}


const AlterModelBox = ModalHOC(AlterModel)

export default AlterModelBox

const Altermodel = styled.section`
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







