import {DELETE_ITEM_BY_KEYS} from '../constants'
import { mutationsApi } from '../../../../services/api.service'
import {deleteItemDone, deleteItemFailure} from '../actions/deletedata.actions'

const baseFlaskUrl = process.env.REACT_APP_FLASK_BASE_URL

const deleteMiddleware = store => next => action => {
  if (action && action.type === DELETE_ITEM_BY_KEYS) {
    next({type: DELETE_ITEM_BY_KEYS})
    mutationsApi(`${baseFlaskUrl}/api/operations/mysql/delete`, 'post', action.deleteDataObj)
      .then(res => {
	if (res && res.isSuccess !== null && res.isSuccess !== undefined) {
          if (res.isSuccess === false) {
            next(deleteItemFailure)
	  } else {
            next(deleteItemDone(res))
	  }
	}
      })
      .catch(error => {
	console.error(error)
	next(deleteItemFailure(error))
      })
  }
  next(action)
}

export default deleteMiddleware

