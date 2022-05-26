import React from 'react'
import styled from 'styled-components'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import DeleteIcon from '@mui/icons-material/Delete';
import Modal from '@mui/material/Modal'
import DeleteItemForm from './deleteItemForm'
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch } from 'react-redux'
import { deleteItemClose } from '../redux/actions/deletedata.actions'

const style = {
  position: 'absolute',
  top: '43%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  borderRadius: '7px',
  boxShadow: 24,
  p: 4,
}

const DeleteItemModal =(props)=> {
  const tableEnChData = props.tableEnChData
  const [open, setOpen] = React.useState(false)
  const dispatch = useDispatch()

  const handleOpen = () => setOpen(true)
  const handleClose = () => {
    setOpen(false)
    setTimeout(() => {
      dispatch(deleteItemClose({}))
    }, 100)
  }
  
  return (
    <React.Fragment>
    <Modalbox>
      <div className="modal-header-container">
        <Button onClick={handleOpen} className="modal-header-btn">
            <div className='delete-btn-box'><DeleteIcon className="delete-item-icon" /></div> 
            <p>删除记录</p>
        </Button>
      </div>
      <Modal
        open={open}
        //onClose={handleClose}
      >
        <Box sx={style}>
          <section className='modal-box'>
	    <main className="modal-container-main delete-modal">
	      <div className="modal-btn-close modal-delete-close" onClick={handleClose}>
	        <i><CloseIcon /></i>
	      </div>
	      <DeleteItemForm 
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

export default React.memo(DeleteItemModal)

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
 .delete-btn-box{
   border-radius: 50%;
   color: #bdbdbe;
   .delete-item-icon{
     padding-top:4px;
   }
 }
`
