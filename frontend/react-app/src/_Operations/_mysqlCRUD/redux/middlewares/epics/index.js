import { combineEpics } from 'redux-observable'
import { fetchdataEpic } from './fetchdataEpic'
import { fetchfieldsEpic } from './fetchfieldsEpic'

const mysqlCRUDEpic = combineEpics(
  fetchdataEpic,
  fetchfieldsEpic,
)

export default mysqlCRUDEpic

