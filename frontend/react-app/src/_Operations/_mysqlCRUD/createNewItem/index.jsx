import React from 'react'
import styled from 'styled-components'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import AddIcon from '@mui/icons-material/Add';
import Modal from '@mui/material/Modal'
import AddnewItem from './addNewItems'
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch } from 'react-redux'
import { createItemClose } from '../redux/actions/createdata.actions'

const style = {
  position: 'absolute',
  top: '45%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  //border: '1px solid #000',
  borderRadius: '7px',
  boxShadow: 24,
  p: 4,
}

const CreateNewItemModal =(props)=> {
  const [open, setOpen] = React.useState(false)
  const dispatch = useDispatch()

  const handleOpen = () => setOpen(true)
  const handleClose = () => {
    setOpen(false)
    dispatch(createItemClose({}))
  }


  const tableEnChData = props.tableEnChData
  
  return (
    <React.Fragment>
    <Modalbox>
      <div className="modal-header-container">
        <Button onClick={handleOpen} className="modal-header-btn">
            <div className='add-btn-box'><AddIcon className="add-btn-icon" /></div> 
            <p>新增记录</p>
        </Button>
      </div>
      <Modal
        open={open}
        //onClose={handleClose}
      >
        <Box sx={style}>
          <section className='modal-box'>
	    <main className="modal-container-main">
	      <div className="modal-btn-close" onClick={handleClose}>
	        <i><CloseIcon /></i>
	      </div>
	      <AddnewItem 
	        tableEnChData={tableEnChData}
	        closeModal={handleClose}
	      />
	    </main>
          </section>
        </Box>
      </Modal>
    </Modalbox>
    </React.Fragment>
  )
}

export default React.memo(CreateNewItemModal)

const Modalbox = styled.section`
 .modal-header-container {
   margin-left: 7px;
   .modal-header-btn {
     height: 2rem;
     background: #3e3e40;
     padding: 1px 9px;
     color: #e9e6e6;
     box-shadow: inset -1px -1px #5e5f60,inset 1px 1px #272424,inset -2px -2px #151516,inset 2px 2px #7d7777 !important;
     &:hover {
       background: #575758;
     }
   }
 }
 .add-btn-box{
   border-radius: 50%;
   color: #bdbdbe;
   .add-btn-icon{
     padding-top:4px;
   }
 }
`
