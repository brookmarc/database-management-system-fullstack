import * as Types from '../constants'


export const selectMultiRows = multiRows => ({
  type: Types.SELECT_MULTI_ROWS,
  payload: multiRows
})

export const deleteItemByKeys = (deleteObj) => ({
  type: Types.DELETE_ITEM_BY_KEYS,
  deleteDataObj: deleteObj
})

export const deleteItemDone = success => ({
  type: Types.DELETE_ITEM_DONE,
  payload: success
})

export const deleteItemFailure = error => ({
  type: Types.DELETE_ITEM_ERROR,
  payload: error
})

export const deleteItemClose = data => ({
  type: Types.DELETE_ITEM_CLOSE,
  payload: data
})

