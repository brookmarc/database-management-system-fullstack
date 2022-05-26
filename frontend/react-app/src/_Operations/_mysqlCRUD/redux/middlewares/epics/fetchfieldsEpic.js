import { from } from 'rxjs'
import { ofType } from 'redux-observable'
import { mergeMap } from 'rxjs/operators'
import { map } from 'rxjs/operators'
import {FETCH_ITEMS_REQUEST} from '../../constants'
import {fetchfields} from '../../actions/fetchfields.actions'
import { queriesApi } from '../../../../../services/api.service'

const baseFlaskUrl = process.env.REACT_APP_FLASK_BASE_URL

export const fetchfieldsEpic = action$ =>
  action$.pipe(
    ofType(FETCH_ITEMS_REQUEST),
    mergeMap(action =>
      from(queriesApi(baseFlaskUrl + `/api/operations/mysql/tablefields/${action.payload}`)).pipe(
        map(response => 
	   fetchfields(response)
	)
      )
    )
  )



