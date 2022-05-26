import {UPDATE_ITEM_REQUEST} from '../constants'
import { mutationsApi } from '../../../../services/api.service'
import {updateItemDone, updateItemFailure} from '../actions/updateData.actions'

const baseFlaskUrl = process.env.REACT_APP_FLASK_BASE_URL

export const updateMiddleware = store => next => action => {
  if (action && action.type === UPDATE_ITEM_REQUEST) {
    next({type: UPDATE_ITEM_REQUEST})
    mutationsApi(`${baseFlaskUrl}/api/operations/mysql/edit`, 'put', action.updateData)
      .then(res => {
	if (res && res.isSuccess !== null && res.isSuccess !== undefined) {
          if (res.isSuccess === false) {
            next(updateItemFailure(res))
	  } else {
            next(updateItemDone(res))
	  }
	}
      })
      .catch(error => {
	console.error(error)
	next(updateItemFailure(error))
      })
  }
  next(action)
}

export default updateMiddleware





