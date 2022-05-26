import * as Types from '../constants'

const initialState = {
  isLoading: true,
  selectedRowData: [],
}

const updateReducer = (state=initialState, action) => {
  switch(action.type){
    case Types.SELECT_ITEM_DATA:
      return {
        ...state,
	isLoading: true,
	selectedRowData: action.payload,
      }
    case Types.UPDATE_ITEM_REQUEST:
      return {
        ...state,
        isLoading: true,
      }
    case Types.UPDATE_ITEM_DONE:
      return {
        ...state,
	isLoading: false,
	responseData: action.payload
      }
    case Types.UPDATE_ITEM_ERROR:
      return {
        ...state,
	isLoading: true,
	responseData: action.payload
      }
    case Types.UPDATE_ITEM_CLOSE:
      return {
        ...state,
	isLoading: true,
	responseData: action.payload
      }
    default:
      return state
  }
}

export default updateReducer
