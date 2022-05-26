import { of } from 'rxjs'
import { catchError } from 'rxjs'
import { from } from 'rxjs'
import { ofType } from 'redux-observable'
import { mergeMap } from 'rxjs/operators'
import { map } from 'rxjs/operators'
import {
  FETCH_ITEMS_REQUEST,
} from '../../constants'

import {
  fetchdataFullfilled,
  fetchdataFailure
} from '../../actions/fetchdata.actions'
import { queriesApi } from '../../../../../services/api.service'

const baseFlaskUrl = process.env.REACT_APP_FLASK_BASE_URL


export const fetchdataEpic = action$ =>
  action$.pipe(
    ofType(FETCH_ITEMS_REQUEST),
    mergeMap(action =>
      from(queriesApi(baseFlaskUrl + `/api/operations/mysql/show/${action.payload}`)).pipe(
	map(response => fetchdataFullfilled(response)),
	catchError((error) => {
	  of(fetchdataFailure(error))
	  console.log(error)
	})
      )
    ),
  )



