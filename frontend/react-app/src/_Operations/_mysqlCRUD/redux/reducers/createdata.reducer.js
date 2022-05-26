import * as Types from '../constants'

const initialState = {
  isLoading: true,
}

const createReducer = (state=initialState, action) => {
  switch(action.type){
    case Types.CREATE_ITEM_REQUEST:
      return {
        ...state,
	isLoading: true,
      }
    case Types.CREATE_ITEM_DONE:
      console.log(action.payload)
      return {
        ...state,
        isLoading: false,
        responseData: action.payload
      }
    case Types.CREATE_ITEM_ERROR:
      console.log(action.payload)
      return {
	...state,
        isLoading: true,
        responseData: action.payload
      }
    case Types.CREATE_ITEM_CLOSE:
      return {
        ...state,
        isLoading: true,
	responseData: action.payload
      }
    default:
      return state
  }
}

export default createReducer

