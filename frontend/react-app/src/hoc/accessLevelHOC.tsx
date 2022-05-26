import React, {FunctionComponent, Component} from 'react'


const AccessLevelHOC: FunctionComponent<T> = (Wrapper, limitLevel) => {
  class HOC extends Component<T> {
    constructor(props) {
      super(props)
      this.state = {
        show: false,
      }
      this.limit = limitLevel
      this.checkAccessFn = this.checkAccessFn.bind(this)
    }

    componentDidMount() {
      this.checkAccessFn(this.props.accessLevel)
    }

    checkAccessFn = (level: number) => {
      if (level <= this.limit) {
        this.setState({show: true})
      } else {
        this.setState({show: false})
      }
    }

    render() {
      return this.state.show && <Wrapper {...this.props} />
    }
  }
  return HOC
}


export default AccessLevelHOC

