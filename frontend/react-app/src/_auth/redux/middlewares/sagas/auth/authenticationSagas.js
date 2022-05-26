import {all, call, put, takeLatest} from 'redux-saga/effects'
import * as Types from '../../../constants/auth.constants'
import { loginService } from '../../../../../services/auth.service'
import { getToken } from '../../../../../services/token.service'
import jwt_decode from 'jwt-decode'

import {
  loginSuccess,
  loginFailure,
} from '../../../actions/auth.actions'

function isEmptyObj(object) {
  for (const property in object) {
    return false
  } 
  return true
}

export function* loginWithCredentials({payload: {username, password}}) {
  try {
    let currUserObj = {}
    let isLoggedIn = false
    let loginError = {}
    yield loginService(username, password)
      .then(res => {
        if (res && res.success !== undefined && res.success === true ) {
	  const loginToken = getToken()
	  const userObj = jwt_decode(loginToken)
	  if (userObj && !isEmptyObj(userObj) && 
	        userObj.iat < userObj.exp ) {
            currUserObj["full_name"] = userObj.user_fullname
            currUserObj["user_name"] = userObj.user_name
            currUserObj["user_pwd"] = userObj.user_pwd
            currUserObj["access_level"] = userObj.access_level

	    isLoggedIn = true

	  } else {
            console.warn('Invalid token! Failed to login!')
	    isLoggedIn = false
	    loginError['success'] = false
            loginError['message'] = "Invalid token! Please login again!"
	  }
	  
	} else {
	  console.warn('Failed to login!')
	  isLoggedIn = false
	  loginError['success'] = res.success
	  loginError['message'] = res.message
	}
      })
    if (isLoggedIn === true && 
	 !isEmptyObj(currUserObj) ) {
      yield put(loginSuccess(currUserObj))
    } else {
      yield put(loginFailure(loginError))
    }
  } catch (error) {
    console.log(error)
    yield put(loginFailure(error))
  }
}

export function* onLoginStart() {
  yield takeLatest(Types.LOGIN_USER_START, loginWithCredentials)
}

export function* authenticationSagas() {
  yield all([
    call(onLoginStart)
  ])
}

