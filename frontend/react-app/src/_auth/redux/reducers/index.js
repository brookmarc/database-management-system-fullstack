import { combineReducers } from 'redux'
import loginReducer from './login.reducer'

const authReducers = combineReducers({
  loginStatus: loginReducer,
})

export default authReducers
