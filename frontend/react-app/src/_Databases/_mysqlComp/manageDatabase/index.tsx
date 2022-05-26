import React, {Component, MouseEvent} from 'react'
import styled from 'styled-components'
import AddIcon from '@mui/icons-material/Add';
import AddNewDBForm from './addNewDBForm'
//import AccessLevelHOC from '../../../hoc/accessLevelHOC'
import {inject, observer} from 'mobx-react'


type AddNewDB = {
  isOpenAdd: Boolean
}


@inject("mysqlStore")
@observer
class ManageDatabase extends Component<{}, AddNewDB> {
  constructor(props) {
    super(props)
    this.state = {
      isOpenAdd: false,
    }
    this.onHandleOpenAdd = this.onHandleOpenAdd.bind(this)
    this.onHandleCloseAdd = this.onHandleCloseAdd.bind(this)
    this.createNewDB = this.props.mysqlStore.createNewDatabase
    this.refetchDB = this.props.mysqlStore.fetchMysqlDB
  }

  onHandleOpenAdd(event: MouseEvent) {
    event.preventDefault()
    this.setState({isOpenAdd: true})
  }
  onHandleCloseAdd() {
    this.setState({isOpenAdd: false})
  }

  componentDidMount() {
  }

  render() {
    return (
      <React.Fragment>
        <Styles>
          {this.state.isOpenAdd === false ? (
            <div
              className="add-newdb-btn"
              onClick={this.onHandleOpenAdd}
            >
              <div><AddIcon /></div>
              <div><p>新增数据库</p></div>
            </div>
          ) : (
            <section>
              <AddNewDBForm 
                onCloseAdd={this.onHandleCloseAdd} 
                createNewDB = {this.createNewDB}
                refetchDB = {this.refetchDB}
              />
            </section>
          )}
        </Styles>
      </React.Fragment>
    )
  }
}


export default React.memo(ManageDatabase)
//export default AccessLevelHOC(ManageDatabase)

const Styles = styled.section`
  display: flex;
  flex-direction: row;
`
 
