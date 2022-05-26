import { combineReducers } from 'redux'
import fetchdataReducer from './fetchdata.reducer'
import createReducer from './createdata.reducer'
import updateReducer from './updatedata.reducer'
import deleteReducer from './deletedata.reducer'

const mysqlCRUDReducers = combineReducers({
  dataLists: fetchdataReducer,
  createData: createReducer,
  editData: updateReducer,
  deleteData: deleteReducer,
})

export default mysqlCRUDReducers
