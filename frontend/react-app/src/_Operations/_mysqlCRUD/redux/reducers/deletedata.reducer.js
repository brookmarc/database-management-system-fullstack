import * as Types from '../constants'

const initialState = {
  isLoading: true,
  responseData: {}
}

const deletedataReducer = (state=initialState, action) => {
  switch(action.type) {
    case Types.SELECT_MULTI_ROWS:
      return {
        ...state,
	isLoading: true,
	selectMultiRows: action.payload,
      }
    case Types.DELETE_ITEM_BY_KEYS:
      return {
        ...state,
	isLoading: true,
      }
    case Types.DELETE_ITEM_DONE:
      return {
        ...state,
	isLoading: false,
	responseData: action.payload
      }
    case Types.DELETE_ITEM_ERROR:
      return {
        ...state,
	isLoading: true,
	responseData: action.payload
      }
    case Types.DELETE_ITEM_CLOSE:
      return {
        ...state,
	isLoading: true,
	responseData: action.payload
      }
    default:
      return state
  }
}

export default deletedataReducer
