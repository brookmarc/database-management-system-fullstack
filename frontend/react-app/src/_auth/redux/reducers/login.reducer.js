import * as Types from '../constants/auth.constants'

const initialState = {
  userData: null,
  currentUser: null,
  error: null,
  isLoggedIn: false
}

const loginReducer = (state=initialState, action) => {
  switch (action.type) {
    case Types.LOGIN_USER_START:
      return {
        ...state,
	userData: action.payload,
	currentUser: null,
	error: null,
	isLoggedIn: false
      }
    case Types.LOGIN_USER_SUCCESS:
      return {
        ...state,
	currentUser: action.payload,
	userData: null,
	error: null,
	isLoggedIn: true
      }
    case Types.LOGIN_USER_FAILURE:
      return {
        ...state,
	currentUser: null,
	userData: null,
	error: action.payload,
	isLoggedIn: false
      }
    case Types.CLEAR_LOGIN_ERROR:
      return {
        ...state,
	error: null,
      }
    case Types.REFETCH_TOKEN_START:
      return {
        ...state,
	userData: action.payload,
	error: null,
	isLoggedIn: true
      }
    case Types.REFETCH_TOKEN_SUCCESS:
      return {
        ...state,
	userData: null,
	refetchStatus: action.payload,
	error: null,
	isLoggedIn: true
      }
    case Types.REFETCH_TOKEN_FAILURE:
      return {
        ...state,
	userData: null,
	error: action.payload,
	isLoggedIn: false
      }
    case Types.CHANGE_USER_FULLNAME:
      return {
        ...state,
	full_name: state.currentUser.full_name = action.payload
      }
    case Types.LOGOUT:
      return {
        initialState
      }
    default:
      return state
  }
}


export default loginReducer

