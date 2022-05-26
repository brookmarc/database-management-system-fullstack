import { takeLatest } from 'redux-saga/effects'
import loginSaga from './authenticationSaga'

import * as Types from '../../../constants/auth.constants'

export default function* watchAuthentication(){
  yield takeLatest(Types.LOGIN_USER, loginSaga);
}


