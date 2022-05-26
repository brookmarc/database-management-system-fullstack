import React from 'react'
import styled from 'styled-components'

export const ModalHOCWithoutBtn = (WrapperComp, ModalBtn) => {
  return class HOC extends React.Component {
    constructor() {
      super()
      this.state = { show: false }
      this.showModal = this.showModal.bind(this)
      this.hideModal = this.hideModal.bind(this)
    }

    showModal = () => { 
      this.setState({ show: true })
    }
    hideModal = () => { 
      this.setState({ show: false })
    }

    render() {
      return (
        <>
	  <Modalhoc>
	    <main className='modal-container'>
	      <div onClick={this.showModal}>
	        <ModalBtn />
	      </div>
            </main>
	  </Modalhoc>
          <WrapperComp {...this.props} show={this.state.show} handleClose={this.hideModal} />
        </>
      )
    }
  }
}

const Modalhoc = styled.div``








