import * as Types from '../constants'


export const selectRowData = itemData => ({
  type: Types.SELECT_ITEM_DATA,
  payload: itemData
})

export const updateItemStart = (updateObj) => ({
  type: Types.UPDATE_ITEM_REQUEST,
  updateData: updateObj
})

export const updateItemDone = success => ({
  type: Types.UPDATE_ITEM_DONE,
  payload: success
})

export const updateItemFailure = error => ({
  type: Types.UPDATE_ITEM_ERROR,
  payload: error
})

export const updateItemClose = data => ({
  type: Types.UPDATE_ITEM_CLOSE,
  payload: data
})


