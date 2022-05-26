

class AuthToken {
  _accessToken: string;

  constructor(accessToken: string) {
    this._accessToken = accessToken
  }

  set setToken(accessToken: string) {
    if (_accessToken.length > 0) {
       this._accessToken = accessToken
    }
  }

  get getToken() {
    return this._accessToken
  }


}

export default AuthToken

