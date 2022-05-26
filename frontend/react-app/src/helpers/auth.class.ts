import historyService from '../services/history'
import AuthToken from '../helpers/authToken.class'
import jwt_decode from 'jwt-decode'


class AuthHelper extends AuthToken {

  async handleLogoutFn() {
    await historyService.push('/')
    await setTimeout(() => {
      localStorage.clear();
      window.location.reload();
    }, 100)
  }

  async authVerifyFn() {
    if (this._accessToken !== "") {
      if (jwt_decode(this._accessToken).exp*1000 < Date.now()) {
	this.InvalidToken()
	this.handleLogoutFn()
        return false
      } else {
	//this.IsValidToken()
	return true
      }
    } else {
      this.withoutToken()
      this.handleLogoutFn()
      return false
    }
  }

  withoutToken() {
    console.log("There are no token or already deleted!")
  }
  InvalidToken() {
    console.log("This token has been expired!")
  }

}

export default AuthHelper




