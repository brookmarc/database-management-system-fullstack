import * as Types from '../constants'


const initialState = {
  tableLists: [],
  tableFields: [],
  error: null,
  isLoading: false,
}

const fetchdataReducer = (state=initialState, action) => {
  switch(action.type) {
    case Types.FETCH_ITEMS_REQUEST:
      return {
	...state,
	isLoading: true,
	error: null,
        tableName: action.payload,
      }
    case Types.FETCH_ITEMS_FULLFILLED:
      return {
	...state,
	isLoading: false,
	error: null,
	tableLists: action.payload,
      }
    case Types.FETCH_ITEMS_FAILURE:
      return {
        tableLists: [],
	isLoading: false,
	error: action.payload,
      }
    case Types.FETCH_FIELDS:
      return {
        ...state,
        tableFields: action.payload,
      }
    default:
      return state
  }
}

export default fetchdataReducer

