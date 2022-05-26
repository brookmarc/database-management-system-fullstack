import React, {Component} from 'react'
import {inject, observer} from 'mobx-react'
//import styled from 'styled-components'
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import MysqlConfigForm from './mysqlConfigForm'


@inject("mysqlStore")
@observer
class MysqlConfig extends Component<T> {
  constructor(props) {
    super(props)

    this.state = {
      loading: true,
      data: null,
      error: null
    }
    
    this.store = this.props.mysqlStore
    this.showMysqlConfig = this.props.mysqlStore.showMysqlConfig
    this.mysqlConfigs = []
  }

  refetchConfig = () => {
    this.setState({loading: true})
  }

  async componentDidMount() {
    try {
      await this.showMysqlConfig()
      this.mysqlConfigs = this.store.mysqlConfigs
      if (this.mysqlConfigs.isSuccess !== false){
        this.setState({loading: false, data: this.mysqlConfigs})
      }
    } catch (e) {
      this.setState({error: e.message})
      console.error('failed to fetch mysql configs from mobx', e)
    }
  }


  getSnapshotBeforeUpdate(prevProps, prevState) {
    if (prevState.loading !== this.state.loading) {
      return this.state.loading
    }
    return null
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (snapshot !== null) {
      if (this.store.mysqlConfigs.isSuccess !== false) {
        this.setState({loading: false, data: this.store.mysqlConfigs})
      } else {
        this.showMysqlConfig()
        window.location.reload()
      }
    }
  }

  componentWillUnmount() {
    this.setState({loading: false})
  }

  render() {
    const { data, error, loading } = this.state
    return (
      <React.Fragment>
        <section className="mysql-config-container">
          <div className="mysql-config-header">
            <p>MySQL 配置管理</p>
            <NavigateNextIcon />
            <p style={{color: "rgb(153, 153, 157)"}}>...</p>
          </div>
          {!!error ? (<><p>{error}</p></>) : (
            loading ? (<><p>Loading ...</p></>) : (
              <MysqlConfigForm
                mysqlConfigs={data}
                refetchConfig={this.refetchConfig}
              />
            )
          )}
        </section>
      </React.Fragment>
    )
  }
}

export default React.memo(MysqlConfig)


//const Styles = styled.section``


