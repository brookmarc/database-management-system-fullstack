import { fork } from 'redux-saga/effects'
//import watchAuthentication from './auth/watchers'
import {authenticationSagas} from './auth/authenticationSagas'

export default function* authSagas() {
  //yield fork(watchAuthentication)
  yield fork(authenticationSagas)
}


