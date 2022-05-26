//import { takeLatest } from 'redux-saga/effects'
import { fork } from 'redux-saga/effects'
import {authenticationSagas}  from '../_auth/redux/middlewares/sagas/auth/authenticationSagas'

export default function* rootSaga() {
  yield fork(authenticationSagas)
}

