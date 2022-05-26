import { ApolloLink } from '@apollo/client'
import jwt_decode from 'jwt-decode'
import AuthHelper from '../helpers/auth.class'

export const authMiddleware = new ApolloLink(async (operation, forward) => {
  // add the authorization to the headers
  const auth = new AuthHelper()
  const user = JSON.parse(localStorage.getItem('user'))
  let token
  if (user && user.accessToken) {
    const accessToken = user.accessToken
    if (jwt_decode(accessToken).exp*1000 < Date.now()){
      auth.handleLogoutFn()
    } else {
      token =  accessToken
    }
  }

  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      //authorization: token ? `Bearer ${token}` : "", 
      authorization: token ? `${token}` : "", 
      credentials: 'include',
      //credentials: 'same-origin',
    }
  }));

  return forward(operation);
})

