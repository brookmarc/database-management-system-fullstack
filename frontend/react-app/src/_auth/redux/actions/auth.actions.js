import * as Types from '../constants/auth.constants'
import { logoutService } from '../../../services/auth.service'

export const loginAction = credentials => {
  return {
    type: Types.LOGIN_USER_START,
    payload: credentials
  }
}

export const loginSuccess = (currUserObj) => ({
  type: Types.LOGIN_USER_SUCCESS,
  payload: currUserObj
})


export const loginFailure = (error) => ({
  type: Types.LOGIN_USER_FAILURE,
  payload: error,
})

export const clearLoginError = () => dispatch => {
  dispatch({
    type: Types.CLEAR_LOGIN_ERROR
  })
}


export const refetchTokenStart = credential => ({
  type: Types.REFETCH_TOKEN_START,
  payload: credential
})

export const refetchTokenSuccess = success => ({
  type: Types.REFETCH_TOKEN_SUCCESS,
  payload: success
})

export const refetchTokenFailure = error => ({
  type: Types.REFETCH_TOKEN_FAILURE,
  payload: error
})


export const changeUserFullname = (newFullname) => dispatch => {
  dispatch({
    type: Types.CHANGE_USER_FULLNAME,
    payload: newFullname
  })
}

export const logoutAction = () => async (dispatch) => {
  await logoutService()
  dispatch({
    type: Types.LOGOUT,
  })
}





