import {CREATE_ITEM_REQUEST} from '../constants'
import { mutationsApi } from '../../../../services/api.service'
import {createItemDone, createItemFailure} from '../actions/createdata.actions'

const baseFlaskUrl = process.env.REACT_APP_FLASK_BASE_URL

export const createMiddleware = store => next => action => {
  if (action && action.type === CREATE_ITEM_REQUEST) {
    next({type: CREATE_ITEM_REQUEST})
    mutationsApi(`${baseFlaskUrl}/api/operations/mysql/edit`, 'post', action.newAddData)
      .then(res => {
	if (res && res.isSuccess !== null && res.isSuccess !== undefined) {
	  if (res.isSuccess === false) {
	    next(createItemFailure(res))
	  } else {
            next(createItemDone(res))
	  }
	}
      })
      .catch(error => {
	console.error(error)
	next(createItemFailure(error))
      })
  }
  next(action)
}

export default createMiddleware




