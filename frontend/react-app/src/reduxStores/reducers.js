import { combineReducers } from 'redux'
import authReducers from '../_auth/redux/reducers'
import mysqlCRUDReducers from '../_Operations/_mysqlCRUD/redux/reducers'

const rootReducer = combineReducers({
  authState: authReducers,
  mainState: mysqlCRUDReducers,
})

export default rootReducer

