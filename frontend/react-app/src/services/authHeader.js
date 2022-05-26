import { getToken } from './token.service'

export const authHeader = () => {
  const _token = getToken()
  if (_token !== "") {
    return {
      headers: {
        //Authorization: 'Bearer ' + user.accessToken 
        'Authorization': `${_token}`,
        'Content-Type': 'application/json'
      }
    }
  } else {
    return {}
  }
}


