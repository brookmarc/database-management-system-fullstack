import * as Types from '../constants'

export const fetchTablename = tablename => ({
  type: Types.FETCH_ITEMS_REQUEST, 
  payload: tablename
})

export const fetchdataFullfilled = datalist => {
  return {
    type: Types.FETCH_ITEMS_FULLFILLED,
    payload: datalist
  }
}

export const fetchdataFailure = (message) => ({
  type: Types.FETCH_ITEMS_FAILURE,
  payload: message
})


