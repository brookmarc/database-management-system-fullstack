import React from 'react'
import { observer, inject } from 'mobx-react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import AddNewForm from './addNewForm'

const AddnewItem = ({mysqlStore, tableEnChData, closeModal}) => {

  const fieldsList = mysqlStore.fieldlist
  const tablename = useSelector(state => state.mainState.dataLists.tableName)

  return (
    <React.Fragment>
    <Addnewitem>
      <div className='add-new-header'>
	  <h3>新增MySQL数据库表格记录</h3>
	  <h5>当前表格: {tablename}</h5>
      </div>
      <div className="">
        <AddNewForm 
	  fieldsList={fieldsList} 
	  tablename={tablename} 
	  tableEnChData={tableEnChData}
	  closeModal={closeModal} 
	/>
      </div>
    </Addnewitem>
    </React.Fragment>
  )
}

export default inject(({mysqlStore}) => ({mysqlStore}))(observer(AddnewItem))

const Addnewitem = styled.div`
  max-width: 50rem;
  .add-new-header{
    margin: 5px 0 19px 23px;
    font-family: "Roboto","Arial",sans-serif;
    h3 {
      font-size: 1.5rem;
      font-weight: 600;
      color: #6d6e70;
    }
    h5 {
      font-size: 17px; 
      //color: #191970; 
      color: #89a2c7;
    }
  }
`




