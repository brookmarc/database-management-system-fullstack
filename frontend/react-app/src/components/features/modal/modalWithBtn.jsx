import React from 'react'
import styled from 'styled-components'
import Button from '@mui/material/Button';

export const ModalHOCWithBtn = (WrapperComp, ModalBtn) => {
  return class HOC extends React.Component {
    constructor() {
      super()
      this.state = { show: false }
      this.showModal = this.showModal.bind(this)
      this.hideModal = this.hideModal.bind(this)
    }

    showModal = () => { 
      //e.stopPropagation()
      this.setState({ show: true })
    }
    hideModal = () => { 
      //e.stopPropagation()
      this.setState({ show: false })
    }

    render() {
      return (
        <>
	  <Modalhoc>
	    <main className=''>
	      <Button onClick={this.showModal}>
	        <ModalBtn />
	      </Button>
            </main>
	  </Modalhoc>
          <WrapperComp {...this.props} show={this.state.show} handleClose={this.hideModal} />
        </>
      )
    }
  }
}

const Modalhoc = styled.div``








