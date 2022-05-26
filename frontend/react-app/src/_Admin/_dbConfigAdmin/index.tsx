import React, {Component} from 'react'
import styled from 'styled-components'
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import MysqlConfig from './mysqlConfig'
import './dbConfig.scss'

class DatabaseConfig extends Component<T> {
  render() {
    return (
      <React.Fragment>
        <Styles>
          <header className="db-config-header">
            <div className="header-box">
              <div className="header-box-icon">
                <i><SupervisedUserCircleIcon /></i>
              </div>
              <div><p>数据库配置管理</p></div>
            </div>
          </header>
          <main className="db-config-container">
            <MysqlConfig />
          </main>
        </Styles>
      </React.Fragment>
    )
  }
}

export default React.memo(DatabaseConfig)


const Styles = styled.section``


