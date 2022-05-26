import React, {Component} from 'react'
import { getToken } from '../services/token.service'
import jwt_decode from 'jwt-decode'
import AuthHelper from '../helpers/auth.class'

const TokenCheckerHOC = (Wrapper) => {
  return class extends Component {
    constructor(props) {
      super(props)
      this.state = {
        show: true,
      }
    }


    componentDidMount() {
      this.timerID = setInterval(
	() => this.checkExpiration(),
	10000
      );
    }

    componentWillUnmount() {
      clearInterval(this.timerID)
    }

    checkExpiration() {
      const token = getToken()
      const logout = new AuthHelper()
      
      if (token !== "") {
        const tokenObj = jwt_decode(token)
	if (tokenObj.exp + 300 < Date.now()/1000 ) {
          console.warn('Token has been expired!')
	  logout.handleLogoutFn()
	}
      }
    }

    render() {
      return this.state.show && <Wrapper {...this.props} {...this.state} />
    }
  }
}

export default TokenCheckerHOC

