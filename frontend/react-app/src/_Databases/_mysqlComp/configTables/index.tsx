import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import styled from 'styled-components'
import MysqlFieldEnCh from './mysqlFieldEnCh'
import './mysqlFieldEnCh.scss'

@inject("mysqlStore")
@observer
class MysqlTableConfig extends Component<{tablename, fieldList, currMysqlDB}, T> {
  constructor(props) {
    super(props)

    this.state = {
      loading: true,
      data: null,
      error: null
    }
    this.mysqlStore = this.props.mysqlStore
  }

   

  render() {
    return (
      <React.Fragment>
        <Styles>
          <header className="mysql-table-config">
            <div><p>MySQL表格字段英-中文配对</p></div>
          </header>
          <main>
            <MysqlFieldEnCh 
              tablename={this.props.tablename} 
              fieldList={this.props.fieldList}
              currMysqlDB={this.props.currMysqlDB}
              mysqlStore={this.props.mysqlStore}
            />
          </main>
        </Styles>
      </React.Fragment>
    )
  }
}

export default React.memo(MysqlTableConfig)


const Styles = styled.section`
  color: #dbd7d7;
  .mysql-table-config {
    border-bottom: 1px dashed;
    padding: .3rem;
    margin-right: 1.5rem;
    font-weight: 600;
  }
`

