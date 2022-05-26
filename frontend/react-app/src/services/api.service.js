import axios from 'axios'
import {authHeader} from './authHeader'
import AuthHelper from '../helpers/auth.class'
import { getToken } from './token.service'


export const queriesApi = async (endpoint) => {
  const _token = getToken()
  const auth = new AuthHelper()
  auth._accessToken = _token
  const isValid = await auth.authVerifyFn()
  try {
    if (isValid) {
      let result
      const header = await authHeader()
      await axios.get(`${endpoint}`, header, {mode:'cors'})
        .then((res) => {
           result = res.data
        })
      return result
    }
  } catch(error) {
    console.error("Failed to query!")
  }
}


export const mutationsApi = async (endpoint, methods, data) => {
  const _token = getToken()
  const auth = new AuthHelper()
  auth._accessToken = _token
  const isValid = await auth.authVerifyFn()
  try {
    if (isValid) {
      let result
      const header = await authHeader()
      await axios({
        method: `${methods}`,
        mode: 'cors',
        url: `${endpoint}`,
        data,
        headers: header.headers
      })
      .then((res) => {
        result = res.data
      })
      return result
    }
  } catch(error) {
    console.error("Failed to mutation!")
  }
}


