import { combineEpics } from 'redux-observable'
import mysqlCRUDEpic from '../_Operations/_mysqlCRUD/redux/middlewares/epics'

const rootEpic = combineEpics(
  mysqlCRUDEpic,
)

export default rootEpic

