import React, {Component} from 'react'
import {inject, observer} from 'mobx-react'
import PasswordIcon from '@mui/icons-material/Password';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

@inject("mysqlStore")
@observer
class MysqlConfigForm extends Component<T> {
  constructor(props){
    super(props)

    this.state = {
      isPwdShow: false,
      isConfigEdit: false,
      isUpdated: false,
      error: null
    }

    this.store = this.props.mysqlStore
    this.mysqlConfigs = this.props.mysqlConfigs

    this.handlePwdShow = this.handlePwdShow.bind(this)
    this.handleConfigEdit = this.handleConfigEdit.bind(this)
    this.onhandleSubmit = this.onhandleSubmit.bind(this)
  }

  handlePwdShow(event: MouseEvent) {
    event.preventDefault()
    this.state.isPwdShow !== false ? (this.setState({isPwdShow: false}) ) : (
      this.setState({isPwdShow: true})
    )
  }

  handleConfigEdit(event: MouseEvent) {
    event.preventDefault()
    this.state.isConfigEdit !== false ? (
      this.setState({isConfigEdit: false})
    ) : ( this.setState({isConfigEdit: true}))
  }

  isEmptyObj(object) {
    for (const property in object) {
      return false;
    } 
    return true;
  }

  updateConfigsDone = () => {
    if (this.state.isUpdated) {
      this.fetchtimer = setTimeout(() => {
        this.props.refetchConfig()
      }, 50)
      this.edittimer = setTimeout(() => {
        this.setState({isConfigEdit: false})
      }, 100)
    }
  }

  async onhandleSubmit(event: MouseEvent) {
    event.preventDefault()
    let inputValues = {}
    if (window.confirm("你确定变更该数据库配置吗?")) {
      Object.entries(event.target.elements).forEach(([name, input]) => {
        if (input.type !== "submit") {
          inputValues[input.name] = input.value
        }
      })
      const data = Object(inputValues)

      try {
        if (!this.isEmptyObj(data)) {
          this.store.updateMysqlConfig(data)
          if (this.store.submitStatus && 
               this.store.submitStatus.isSuccess !== false) {
            await this.store.showMysqlConfig()
            await setTimeout(() => {this.setState({isUpdated: true}) }, 200)  
            await setTimeout(() => {this.updateConfigsDone() }, 300)
          }
        }
      } catch (e) {
        alert(e.message)
        this.setState({error: e.message})
        console.error('Failed to update mysql configs', e)
      }
    }
  }

  async componentDidMount() {
    await this.store.showMysqlConfig()   
  }

  componentWillUnmount() {
    this.setState({isPwdShow: false, isConfigEdit: false})
    clearTimeout(this.updateConfigsDone)
    clearTimeout(this.onhandleSubmit)
    clearTimeout(this.fetchtimer)
    clearTimeout(this.edittimer)
  }

  render() {
    const {isPwdShow, isConfigEdit} = this.state
    const mysqlConfigs = this.mysqlConfigs
    let configArr = []
    if (Array.isArray(mysqlConfigs) && mysqlConfigs[0] !== undefined) {
      configArr = Object.entries(mysqlConfigs[0])
    }
    
    let renderConfig = []
    configArr.forEach((data, i) => {
      renderConfig.push(
        <div key={i} className="config-item">
          <div className="config-key">{`${data[0]}`}$ </div> 
          {!isConfigEdit ? (<div className="config-value">
            {data[0].includes("password") ? (
              <div className="config-pwd-box">
                <div>
                  {!isPwdShow ? ( <PasswordIcon /> ) : (<>{`${data[1]}`}</>)}
                </div>
                <div className="config-pwd-visibility"
                  onClick={this.handlePwdShow}
                >
                  {!isPwdShow ? (<VisibilityIcon />) : (<VisibilityOffIcon />)}
                </div>
              </div>
            ) : (<>{`${data[1]}`}</>)}
          </div> ) : (
            <div className="config-input-box">
              <input
                className="config-form-input"
                type={data[0].includes("password") ? (
                  !isPwdShow ? "password" : "text") : "text"}
                name={`${data[0]}`}
                defaultValue={`${data[1]}`}
              />
              {data[0].includes("password") ? (
                <div className="config-pwd-visibility pwd-hide-icon"
                  onClick={this.handlePwdShow}
                >
                  {!isPwdShow ? (<VisibilityIcon />) : (<VisibilityOffIcon />)}
                </div> ) : null }
            </div>
          )}
          {/*<div className="config-edit-btn"><EditIcon /></div>*/}
        </div>
      )
    })

    return (
      <React.Fragment>
        <main className="mysql-config-box">
          <form className="mysql-config-form" onSubmit={this.onhandleSubmit}>
            {renderConfig}
            {!isConfigEdit ? (<div className="config-update-btn"
              onClick={this.handleConfigEdit}
            >
              <p>修改配置</p>
            </div> ) : (
              <div className="edit-btn-container">
                <div
                  className="config-update-sub"
                >
                  <input type="submit" value="确认" />
                </div>
                <div
                  className="config-update-btn"
                  onClick={this.handleConfigEdit}
                ><p>取消</p></div>
              </div>
            )}
          </form>
        </main>
      </React.Fragment>
    )
  }
}

export default React.memo(MysqlConfigForm)



