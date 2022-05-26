import * as Types from '../constants'


export const createNewItem = (newAddObj) => ({
  type: Types.CREATE_ITEM_REQUEST,
  newAddData: newAddObj
})

export const createItemDone = (success) => ({
  type: Types.CREATE_ITEM_DONE,
  payload: success
})

export const createItemFailure = (error) => ({
  type: Types.CREATE_ITEM_ERROR,
  payload: error
})

export const createItemClose = (data) => ({
  type: Types.CREATE_ITEM_CLOSE,
  payload: data
})


